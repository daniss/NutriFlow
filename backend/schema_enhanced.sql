-- Enhanced PostgreSQL schema for NutriFlow subscribers table
-- This file contains the complete database schema with security and performance optimizations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create subscribers table with proper constraints
CREATE TABLE IF NOT EXISTS subscribers (
    -- Primary key using UUID v4 for security and distribution
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Email with strict constraints
    email VARCHAR(254) NOT NULL UNIQUE,
    
    -- Timestamp with timezone for proper date handling
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Optional: Add IP address for security tracking (anonymized)
    ip_hash VARCHAR(64),
    
    -- Optional: Add source tracking
    source VARCHAR(50) DEFAULT 'website',
    
    -- Add constraints
    CONSTRAINT email_format_check CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        AND LENGTH(email) >= 5
        AND LENGTH(email) <= 254
        AND email NOT LIKE '%..'
        AND email NOT LIKE '.%'
        AND email NOT LIKE '%.'
    ),
    
    CONSTRAINT email_lowercase_check CHECK (email = LOWER(email))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscribers_source ON subscribers(source);

-- Create function to automatically lowercase emails
CREATE OR REPLACE FUNCTION lowercase_email()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email = LOWER(TRIM(NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically lowercase emails on insert/update
DROP TRIGGER IF EXISTS trigger_lowercase_email ON subscribers;
CREATE TRIGGER trigger_lowercase_email
    BEFORE INSERT OR UPDATE ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION lowercase_email();

-- Add some useful views for analytics (optional)
CREATE OR REPLACE VIEW subscriber_stats AS
SELECT 
    COUNT(*) as total_subscribers,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7_days,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days,
    DATE_TRUNC('day', MIN(created_at)) as first_subscriber_date,
    DATE_TRUNC('day', MAX(created_at)) as latest_subscriber_date
FROM subscribers;

-- Add row-level security (optional, for multi-tenant scenarios)
-- ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Grant appropriate permissions
-- GRANT SELECT, INSERT ON subscribers TO nutriflow_app_user;
-- GRANT SELECT ON subscriber_stats TO nutriflow_app_user;

-- Add comments for documentation
COMMENT ON TABLE subscribers IS 'Table storing email subscribers for the NutriFlow SaaS application';
COMMENT ON COLUMN subscribers.id IS 'Unique identifier using UUID v4';
COMMENT ON COLUMN subscribers.email IS 'Email address, automatically converted to lowercase';
COMMENT ON COLUMN subscribers.created_at IS 'Timestamp when the subscriber was created';
COMMENT ON COLUMN subscribers.ip_hash IS 'Hashed IP address for security tracking (optional)';
COMMENT ON COLUMN subscribers.source IS 'Source of the subscription (website, api, etc.)';
