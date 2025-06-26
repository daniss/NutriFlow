-- SQL schema for NutriFlow subscribers table
-- This file can be run directly in PostgreSQL or used as reference

-- Create database (run this first if the database doesn't exist)
-- CREATE DATABASE nutriflow_db;

-- Connect to the database
-- \c nutriflow_db;

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Create index on created_at for analytics queries
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);

-- Add some constraints
ALTER TABLE subscribers 
ADD CONSTRAINT chk_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Sample queries for testing
-- INSERT INTO subscribers (email) VALUES ('test@example.com');
-- SELECT * FROM subscribers ORDER BY created_at DESC;
-- SELECT COUNT(*) as total_subscribers FROM subscribers;
