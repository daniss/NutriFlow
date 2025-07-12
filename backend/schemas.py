from pydantic import BaseModel, EmailStr, Field, validator
from datetime import datetime
from typing import Optional
import uuid
import re

class SubscriberCreate(BaseModel):
    """Schema for creating a new subscriber with enhanced validation"""
    email: EmailStr = Field(
        ...,
        description="Valid email address",
        min_length=5,
        max_length=254,  # RFC 5321 limit
        example="user@example.com"
    )
    
    @validator('email')
    def validate_email_security(cls, v):
        """Additional email validation for security"""
        email_str = str(v).lower().strip()
        
        # Block suspicious domains/patterns
        blocked_patterns = [
            r'\.temp\.',
            r'\.disposable\.',
            r'10minute',
            r'mailinator',
            r'guerrillamail',
        ]
        
        for pattern in blocked_patterns:
            if re.search(pattern, email_str, re.IGNORECASE):
                raise ValueError('Email domain not allowed')
        
        # Ensure email is properly formatted
        if '..' in email_str or email_str.startswith('.') or email_str.endswith('.'):
            raise ValueError('Invalid email format')
            
        return email_str

class SubscriberResponse(BaseModel):
    """Schema for subscriber response"""
    id: uuid.UUID
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class SubscribeResponse(BaseModel):
    """Schema for subscribe endpoint response"""
    message: str
    subscriber: Optional[SubscriberResponse] = None

class ErrorResponse(BaseModel):
    """Schema for error responses"""
    detail: str

class UnsubscribeRequest(BaseModel):
    """Schema for unsubscribe request"""
    email: EmailStr = Field(
        ...,
        description="Email address to unsubscribe",
        min_length=5,
        max_length=254,
        example="user@example.com"
    )
    
    @validator('email')
    def validate_email_format(cls, v):
        """Validate email format for unsubscribe"""
        email_str = str(v).lower().strip()
        
        # Basic security validation
        if '..' in email_str or email_str.startswith('.') or email_str.endswith('.'):
            raise ValueError('Invalid email format')
            
        return email_str

class UnsubscribeResponse(BaseModel):
    """Schema for unsubscribe response"""
    message: str
    email: str
