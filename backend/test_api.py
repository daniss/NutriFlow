#!/usr/bin/env python3
"""
Simple test script for the NutriFlow API
Run this after starting the API server to test functionality
"""

import requests
import json
import time

API_BASE = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{API_BASE}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure it's running on localhost:8000")
        return False
    return True

def test_subscribe_email():
    """Test email subscription"""
    print("\n📧 Testing email subscription...")
    
    # Test with valid email
    test_email = f"test_{int(time.time())}@example.com"
    data = {"email": test_email}
    
    try:
        response = requests.post(
            f"{API_BASE}/api/subscribe",
            headers={"Content-Type": "application/json"},
            data=json.dumps(data)
        )
        
        if response.status_code == 201:
            print(f"✅ Successfully subscribed: {test_email}")
            result = response.json()
            print(f"   Message: {result['message']}")
            print(f"   Subscriber ID: {result['subscriber']['id']}")
        else:
            print(f"❌ Subscription failed: {response.status_code}")
            print(f"   Error: {response.json()}")
            
    except Exception as e:
        print(f"❌ Error during subscription: {e}")

def test_duplicate_email():
    """Test duplicate email handling"""
    print("\n🔄 Testing duplicate email handling...")
    
    test_email = "duplicate@example.com"
    data = {"email": test_email}
    
    # Subscribe first time
    requests.post(
        f"{API_BASE}/api/subscribe",
        headers={"Content-Type": "application/json"},
        data=json.dumps(data)
    )
    
    # Try to subscribe again
    response = requests.post(
        f"{API_BASE}/api/subscribe",
        headers={"Content-Type": "application/json"},
        data=json.dumps(data)
    )
    
    if response.status_code == 400:
        print("✅ Duplicate email properly rejected")
        print(f"   Error message: {response.json()['detail']}")
    else:
        print(f"❌ Duplicate email not handled properly: {response.status_code}")

def test_invalid_email():
    """Test invalid email validation"""
    print("\n❌ Testing invalid email validation...")
    
    invalid_emails = ["invalid-email", "test@", "@example.com", ""]
    
    for email in invalid_emails:
        data = {"email": email}
        response = requests.post(
            f"{API_BASE}/api/subscribe",
            headers={"Content-Type": "application/json"},
            data=json.dumps(data)
        )
        
        if response.status_code == 422:
            print(f"✅ Invalid email '{email}' properly rejected")
        else:
            print(f"❌ Invalid email '{email}' not rejected: {response.status_code}")

def test_subscriber_count():
    """Test subscriber count endpoint"""
    print("\n📊 Testing subscriber count...")
    
    try:
        response = requests.get(f"{API_BASE}/api/subscribers/count")
        if response.status_code == 200:
            count = response.json()["total_subscribers"]
            print(f"✅ Current subscriber count: {count}")
        else:
            print(f"❌ Failed to get subscriber count: {response.status_code}")
    except Exception as e:
        print(f"❌ Error getting subscriber count: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting NutriFlow API Tests\n")
    
    if not test_health_check():
        print("\n❌ API is not running. Start it with: python main.py")
        return
    
    test_subscribe_email()
    test_duplicate_email()
    test_invalid_email()
    test_subscriber_count()
    
    print("\n✅ All tests completed!")
    print("\n💡 Next steps:")
    print("   1. Update your frontend to use: http://localhost:8000/api/subscribe")
    print("   2. Set up your production database")
    print("   3. Configure environment variables for production")

if __name__ == "__main__":
    main()
