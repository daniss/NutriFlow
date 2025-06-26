from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import logging
import re
import time

from database import get_db
from schemas import SubscriberCreate, SubscribeResponse, ErrorResponse
from services import SubscriberService
from security import get_client_ip, validate_request_headers

logger = logging.getLogger(__name__)

router = APIRouter()

# Email validation regex (more strict than Pydantic's default)
EMAIL_REGEX = re.compile(
    r'^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
)

def validate_email_format(email: str) -> bool:
    """Additional email validation beyond Pydantic"""
    if len(email) > 254:  # RFC 5321 limit
        return False
    if not EMAIL_REGEX.match(email):
        return False
    # Check for suspicious patterns
    suspicious_patterns = [
        r'\.{2,}',  # Multiple consecutive dots
        r'^\.|\.$',  # Starting or ending with dot
        r'@.*@',  # Multiple @ symbols
    ]
    for pattern in suspicious_patterns:
        if re.search(pattern, email):
            return False
    return True

@router.post(
    "/subscribe",
    response_model=SubscribeResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"model": ErrorResponse, "description": "Email déjà inscrit ou invalide"},
        422: {"model": ErrorResponse, "description": "Données invalides"},
        429: {"model": ErrorResponse, "description": "Trop de tentatives"},
    }
)
async def subscribe(
    subscriber_data: SubscriberCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Subscribe a new email to the newsletter/trial
    
    - **email**: Valid email address for subscription
    
    Security features:
    - Rate limiting (3 requests per 5 minutes per IP)
    - Email format validation
    - Duplicate detection
    - SQL injection protection
    - Request validation
    
    Returns success message and subscriber details if successful.
    Returns error if email is already subscribed, invalid, or rate limited.
    """
    start_time = time.time()
    client_ip = get_client_ip(request)
    
    try:
        # Validate request headers
        if not validate_request_headers(request):
            logger.warning(f"Invalid headers from {client_ip}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="En-têtes de requête invalides."
            )
        
        # Additional email validation
        if not validate_email_format(subscriber_data.email):
            logger.warning(f"Invalid email format from {client_ip}: {subscriber_data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Format d'email invalide."
            )
        
        # Check if subscriber already exists
        existing_subscriber = SubscriberService.get_subscriber_by_email(
            db=db, 
            email=subscriber_data.email
        )
        
        if existing_subscriber:
            logger.info(f"Duplicate subscription attempt from {client_ip}: {subscriber_data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cette adresse email est déjà inscrite à notre liste."
            )
        
        # Create new subscriber
        new_subscriber = SubscriberService.create_subscriber(
            db=db, 
            subscriber_data=subscriber_data
        )
        
        processing_time = round((time.time() - start_time) * 1000, 2)
        logger.info(f"New subscription from {client_ip}: {subscriber_data.email} ({processing_time}ms)")
        
        return SubscribeResponse(
            message="Inscription réussie ! Vérifiez votre email pour commencer votre essai gratuit de 14 jours.",
            subscriber=new_subscriber
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions (validation errors, duplicates, etc.)
        raise
    except IntegrityError as e:
        # Database constraint violation (duplicate email)
        logger.error(f"Database integrity error from {client_ip}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cette adresse email est déjà inscrite à notre liste."
        )
    except Exception as e:
        # Unexpected errors
        processing_time = round((time.time() - start_time) * 1000, 2)
        logger.error(f"Unexpected error from {client_ip} ({processing_time}ms): {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur interne s'est produite. Veuillez réessayer plus tard."
        )

@router.get("/subscribers/count")
async def get_subscriber_count(db: Session = Depends(get_db)):
    """
    Get total number of subscribers (for admin/analytics)
    """
    try:
        count = SubscriberService.get_subscriber_count(db=db)
        return {"total_subscribers": count}
    except Exception as e:
        logger.error(f"Error getting subscriber count: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur interne s'est produite."
        )
