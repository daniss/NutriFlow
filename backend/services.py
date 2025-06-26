from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import Subscriber
from schemas import SubscriberCreate
import logging

logger = logging.getLogger(__name__)

class SubscriberService:
    """Service for managing subscribers"""
    
    @staticmethod
    def create_subscriber(db: Session, subscriber_data: SubscriberCreate) -> Subscriber:
        """
        Create a new subscriber
        
        Args:
            db: Database session
            subscriber_data: Subscriber creation data
            
        Returns:
            Created subscriber
            
        Raises:
            IntegrityError: If email already exists
        """
        try:
            # Create new subscriber
            db_subscriber = Subscriber(email=subscriber_data.email)
            db.add(db_subscriber)
            db.commit()
            db.refresh(db_subscriber)
            
            logger.info(f"New subscriber created: {subscriber_data.email}")
            return db_subscriber
            
        except IntegrityError as e:
            db.rollback()
            logger.warning(f"Attempted to create duplicate subscriber: {subscriber_data.email}")
            raise e
    
    @staticmethod
    def get_subscriber_by_email(db: Session, email: str) -> Subscriber:
        """
        Get subscriber by email
        
        Args:
            db: Database session
            email: Email address
            
        Returns:
            Subscriber if found, None otherwise
        """
        return db.query(Subscriber).filter(Subscriber.email == email).first()
    
    @staticmethod
    def get_all_subscribers(db: Session, skip: int = 0, limit: int = 100):
        """
        Get all subscribers with pagination
        
        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            
        Returns:
            List of subscribers
        """
        return db.query(Subscriber).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_subscriber_count(db: Session) -> int:
        """
        Get total number of subscribers
        
        Args:
            db: Database session
            
        Returns:
            Total subscriber count
        """
        return db.query(Subscriber).count()
