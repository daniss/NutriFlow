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

    @staticmethod
    def unsubscribe_email(db: Session, email: str) -> bool:
        """
        Unsubscribe an email address by marking it in unsubscribed list
        
        For production use, this could:
        1. Add to unsubscribed_emails table
        2. Mark subscriber as inactive
        3. Store in external service like SendGrid suppressions
        
        For this demo, we'll store in a simple JSON file
        
        Args:
            db: Database session
            email: Email address to unsubscribe
            
        Returns:
            True if successfully unsubscribed, False if email not found
        """
        import json
        import os
        from pathlib import Path
        
        try:
            # Check if subscriber exists
            subscriber = db.query(Subscriber).filter(Subscriber.email == email).first()
            if not subscriber:
                logger.warning(f"Unsubscribe attempt for non-existent email: {email}")
                return False
            
            # Path to unsubscribed emails file
            unsubscribed_file = Path("unsubscribed_emails.json")
            
            # Load existing unsubscribed emails
            unsubscribed_emails = []
            if unsubscribed_file.exists():
                try:
                    with open(unsubscribed_file, 'r') as f:
                        unsubscribed_emails = json.load(f)
                except json.JSONDecodeError:
                    logger.warning("Invalid JSON in unsubscribed_emails.json, starting fresh")
                    unsubscribed_emails = []
            
            # Add email to unsubscribed list if not already there
            if email not in unsubscribed_emails:
                unsubscribed_emails.append(email)
                
                # Save updated list
                with open(unsubscribed_file, 'w') as f:
                    json.dump(unsubscribed_emails, f, indent=2)
                
                logger.info(f"Email unsubscribed successfully: {email}")
            else:
                logger.info(f"Email already unsubscribed: {email}")
            
            return True
            
        except Exception as e:
            logger.error(f"Error unsubscribing email {email}: {str(e)}")
            return False
    
    @staticmethod
    def is_email_unsubscribed(email: str) -> bool:
        """
        Check if an email is in the unsubscribed list
        
        Args:
            email: Email address to check
            
        Returns:
            True if email is unsubscribed, False otherwise
        """
        import json
        from pathlib import Path
        
        try:
            unsubscribed_file = Path("unsubscribed_emails.json")
            
            if not unsubscribed_file.exists():
                return False
            
            with open(unsubscribed_file, 'r') as f:
                unsubscribed_emails = json.load(f)
                return email in unsubscribed_emails
                
        except Exception as e:
            logger.error(f"Error checking unsubscribed status for {email}: {str(e)}")
            return False
