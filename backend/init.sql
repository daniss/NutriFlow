-- Initialize the NutriFlow database
-- This script runs when the PostgreSQL container starts for the first time

-- Create the subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);

-- Add email format constraint
ALTER TABLE subscribers 
ADD CONSTRAINT chk_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Insert some sample data for testing (optional)
INSERT INTO subscribers (email) VALUES 
  ('test@example.com'),
  ('demo@nutriflow.fr'),
  ('sample@dietitian.com')
ON CONFLICT (email) DO NOTHING;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nutriflow_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nutriflow_user;

-- Show table info
\d subscribers;

-- Show current data
SELECT COUNT(*) as total_subscribers FROM subscribers;
