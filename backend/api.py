from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import logging
import re
import time
import uuid

from database import get_db
from schemas import SubscriberCreate, SubscribeResponse, ErrorResponse, UnsubscribeRequest, UnsubscribeResponse
from services import SubscriberService
from security import get_client_ip, validate_request_headers
from config import settings

logger = logging.getLogger(__name__)

router = APIRouter()

# Enhanced email validation
EMAIL_REGEX = re.compile(
    r'^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
)

def validate_email_format(email: str) -> bool:
    """Enhanced email validation with security checks"""
    if len(email) > 254:  # RFC 5321 limit
        return False
    if not EMAIL_REGEX.match(email):
        return False
    
    # Additional security checks
    suspicious_patterns = [
        r'\.{2,}',      # Multiple consecutive dots
        r'^\.|\.$',     # Starting or ending with dot
        r'@.*@',        # Multiple @ symbols
        r'[<>]',        # HTML injection attempts
        r'[\'";]',      # SQL injection attempts
    ]
    
    for pattern in suspicious_patterns:
        if re.search(pattern, email):
            return False
    return True

def generate_request_id() -> str:
    """Generate unique request ID for tracking"""
    return str(uuid.uuid4())[:8]

@router.post(
    "/subscribe",
    response_model=SubscribeResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"model": ErrorResponse, "description": "Requête invalide"},
        422: {"model": ErrorResponse, "description": "Données invalides"},
        429: {"model": ErrorResponse, "description": "Trop de tentatives"},
        500: {"model": ErrorResponse, "description": "Erreur serveur"},
    }
)
async def subscribe(
    subscriber_data: SubscriberCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Subscribe a new email to the newsletter
    
    Enhanced security features:
    - Rate limiting per IP
    - Comprehensive email validation
    - Request validation and sanitization
    - SQL injection protection
    - Request tracking for monitoring
    """
    request_id = generate_request_id()
    start_time = time.time()
    client_ip = get_client_ip(request)
    
    # Add request ID to response headers
    request.state.request_id = request_id
    
    try:
        # Log all request details for debugging
        logger.info(f"[{request_id}] Subscribe request from {client_ip}")
        logger.info(f"[{request_id}] Headers: {dict(request.headers)}")
        logger.info(f"[{request_id}] Email: {subscriber_data.email}")
        logger.info(f"[{request_id}] Method: {request.method}, Path: {request.url.path}")
        
        # Validate request headers and format
        if not validate_request_headers(request):
            logger.warning(f"[{request_id}] Invalid headers from {client_ip}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Requête invalide." if settings.is_production else "En-têtes de requête invalides."
            )
        
        # Enhanced email validation
        if not validate_email_format(subscriber_data.email):
            logger.warning(f"[{request_id}] Invalid email format from {client_ip}: {subscriber_data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Format d'email invalide."
            )
        
        # Check for existing subscriber
        existing_subscriber = SubscriberService.get_subscriber_by_email(
            db=db, 
            email=subscriber_data.email
        )
        
        if existing_subscriber:
            logger.info(f"[{request_id}] Duplicate subscription from {client_ip}: {subscriber_data.email}")
            # Return same success message to prevent email enumeration
            if settings.is_production:
                return SubscribeResponse(
                    message="Inscription réussie ! Vérifiez votre email pour commencer votre essai gratuit de 14 jours.",
                    subscriber=existing_subscriber
                )
            else:
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
        logger.info(f"[{request_id}] New subscription from {client_ip}: {subscriber_data.email} ({processing_time}ms)")
        
        return SubscribeResponse(
            message="Inscription réussie ! Vérifiez votre email pour commencer votre essai gratuit de 14 jours.",
            subscriber=new_subscriber
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except IntegrityError as e:
        # Database constraint violation
        logger.error(f"[{request_id}] Database error from {client_ip}: {str(e)}")
        if settings.is_production:
            # Return generic message in production
            return SubscribeResponse(
                message="Inscription réussie ! Vérifiez votre email pour commencer votre essai gratuit de 14 jours.",
                subscriber=None
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cette adresse email est déjà inscrite à notre liste."
            )
    except Exception as e:
        # Unexpected errors
        processing_time = round((time.time() - start_time) * 1000, 2)
        logger.error(f"[{request_id}] Unexpected error from {client_ip} ({processing_time}ms): {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur interne s'est produite. Veuillez réessayer plus tard."
        )

@router.get("/subscribers/count")
async def get_subscriber_count(
    request: Request,
    db: Session = Depends(get_db),
    # Add simple admin key authentication for production
    admin_key: str = None
):
    """
    Get total number of subscribers (admin endpoint)
    Requires admin authentication in production
    """
    client_ip = get_client_ip(request)
    
    # Simple admin authentication for production
    if settings.is_production:
        expected_key = settings.SECRET_KEY[:16]  # Use part of secret key
        if not admin_key or admin_key != expected_key:
            logger.warning(f"Unauthorized access attempt to admin endpoint from {client_ip}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unauthorized"
            )
    
    try:
        count = SubscriberService.get_subscriber_count(db=db)
        logger.info(f"Admin endpoint accessed from {client_ip}: subscriber count = {count}")
        return {"total_subscribers": count}
    except Exception as e:
        logger.error(f"Error getting subscriber count from {client_ip}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur interne s'est produite."
        )

@router.post(
    "/unsubscribe",
    response_model=UnsubscribeResponse,
    status_code=status.HTTP_200_OK,
    responses={
        400: {"model": ErrorResponse, "description": "Requête invalide"},
        404: {"model": ErrorResponse, "description": "Email non trouvé"},
        422: {"model": ErrorResponse, "description": "Données invalides"},
        429: {"model": ErrorResponse, "description": "Trop de tentatives"},
        500: {"model": ErrorResponse, "description": "Erreur serveur"},
    }
)
async def unsubscribe(
    unsubscribe_data: UnsubscribeRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Unsubscribe an email from the newsletter
    
    Security features:
    - Rate limiting per IP
    - Email validation
    - Request tracking
    - Secure unsubscribe storage
    """
    request_id = generate_request_id()
    start_time = time.time()
    client_ip = get_client_ip(request)
    
    # Add request ID to response headers
    request.state.request_id = request_id
    
    try:
        logger.info(f"[{request_id}] Unsubscribe request from {client_ip}")
        logger.info(f"[{request_id}] Email: {unsubscribe_data.email}")
        
        # Validate request headers
        if not validate_request_headers(request):
            logger.warning(f"[{request_id}] Invalid headers from {client_ip}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Requête invalide." if settings.is_production else "En-têtes de requête invalides."
            )
        
        # Enhanced email validation
        if not validate_email_format(unsubscribe_data.email):
            logger.warning(f"[{request_id}] Invalid email format from {client_ip}: {unsubscribe_data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Format d'email invalide."
            )
        
        # Check if email is already unsubscribed
        if SubscriberService.is_email_unsubscribed(unsubscribe_data.email):
            logger.info(f"[{request_id}] Email already unsubscribed: {unsubscribe_data.email}")
            return UnsubscribeResponse(
                message="Vous avez été désabonné(e) avec succès.",
                email=unsubscribe_data.email
            )
        
        # Attempt to unsubscribe
        success = SubscriberService.unsubscribe_email(
            db=db, 
            email=unsubscribe_data.email
        )
        
        if not success:
            logger.warning(f"[{request_id}] Unsubscribe failed - email not found: {unsubscribe_data.email}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cette adresse email n'est pas inscrite à nos communications."
            )
        
        processing_time = round((time.time() - start_time) * 1000, 2)
        logger.info(f"[{request_id}] Successful unsubscribe from {client_ip}: {unsubscribe_data.email} ({processing_time}ms)")
        
        return UnsubscribeResponse(
            message="Vous avez été désabonné(e) avec succès.",
            email=unsubscribe_data.email
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Unexpected errors
        processing_time = round((time.time() - start_time) * 1000, 2)
        logger.error(f"[{request_id}] Unexpected error from {client_ip} ({processing_time}ms): {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur interne s'est produite. Veuillez réessayer plus tard."
        )
