#!/usr/bin/env python3
"""
Backend API Testing for WeHA
Tests all backend endpoints after .env restoration
"""

import requests
import json
from datetime import datetime

# Read backend URL from frontend/.env
BACKEND_URL = "https://backend-api-testing.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test GET /api/ - should return {"message": "WeHA API"}"""
    print("\n" + "="*60)
    print("TEST 1: GET /api/ (Root endpoint)")
    print("="*60)
    try:
        response = requests.get(f"{BACKEND_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "WeHA API":
                print("✅ PASS: Root endpoint working correctly")
                return True
            else:
                print(f"❌ FAIL: Expected message 'WeHA API', got {data}")
                return False
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred - {str(e)}")
        return False


def test_create_status_check():
    """Test POST /api/status with {"client_name": "test-client"}"""
    print("\n" + "="*60)
    print("TEST 2: POST /api/status (Create status check)")
    print("="*60)
    try:
        payload = {"client_name": "WeHA-Monitor-Client"}
        response = requests.post(f"{BACKEND_URL}/status", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "id" in data and "client_name" in data and "timestamp" in data:
                if data["client_name"] == "WeHA-Monitor-Client":
                    print("✅ PASS: Status check created successfully")
                    return True, data["id"]
                else:
                    print(f"❌ FAIL: client_name mismatch")
                    return False, None
            else:
                print(f"❌ FAIL: Missing required fields in response")
                return False, None
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ FAIL: Exception occurred - {str(e)}")
        return False, None


def test_get_status_checks(expected_id=None):
    """Test GET /api/status - should return list including created entry"""
    print("\n" + "="*60)
    print("TEST 3: GET /api/status (Retrieve status checks)")
    print("="*60)
    try:
        response = requests.get(f"{BACKEND_URL}/status", timeout=10)
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: Found {len(data)} status check(s)")
        
        if response.status_code == 200:
            if isinstance(data, list):
                if expected_id:
                    found = any(item.get("id") == expected_id for item in data)
                    if found:
                        print(f"✅ PASS: Status checks retrieved, found expected ID {expected_id}")
                        return True
                    else:
                        print(f"❌ FAIL: Expected ID {expected_id} not found in list")
                        return False
                else:
                    print("✅ PASS: Status checks retrieved successfully")
                    return True
            else:
                print(f"❌ FAIL: Expected list, got {type(data)}")
                return False
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred - {str(e)}")
        return False


def test_create_audit_request_valid():
    """Test POST /api/audit-requests with valid payload"""
    print("\n" + "="*60)
    print("TEST 4: POST /api/audit-requests (Valid payload)")
    print("="*60)
    try:
        payload = {
            "name": "Sarah Johnson",
            "company": "Global Manufacturing Inc",
            "country": "United States",
            "industry": "Manufacturing",
            "process": "ISO 9001 Quality Management System audit for production facilities",
            "contact_method": "email",
            "email": "sarah.johnson@globalmanufacturing.com"
        }
        response = requests.post(f"{BACKEND_URL}/audit-requests", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "name", "company", "country", "industry", "process", "contact_method", "created_at"]
            if all(field in data for field in required_fields):
                if data["name"] == payload["name"] and data["process"] == payload["process"]:
                    print("✅ PASS: Audit request created successfully")
                    return True, data["id"]
                else:
                    print(f"❌ FAIL: Data mismatch in response")
                    return False, None
            else:
                print(f"❌ FAIL: Missing required fields in response")
                return False, None
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            print(f"Response body: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ FAIL: Exception occurred - {str(e)}")
        return False, None


def test_create_audit_request_empty_name():
    """Test POST /api/audit-requests with empty name - should return 422"""
    print("\n" + "="*60)
    print("TEST 5: POST /api/audit-requests (Empty name - validation)")
    print("="*60)
    try:
        payload = {
            "name": "",
            "company": "Test Company",
            "country": "Canada",
            "industry": "Technology",
            "process": "Security audit for cloud infrastructure",
            "contact_method": "phone",
            "email": "test@example.com"
        }
        response = requests.post(f"{BACKEND_URL}/audit-requests", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASS: Validation correctly rejected empty name")
            return True
        else:
            print(f"❌ FAIL: Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred - {str(e)}")
        return False


def test_create_audit_request_empty_process():
    """Test POST /api/audit-requests with empty process - should return 422"""
    print("\n" + "="*60)
    print("TEST 6: POST /api/audit-requests (Empty process - validation)")
    print("="*60)
    try:
        payload = {
            "name": "John Doe",
            "company": "Test Company",
            "country": "United Kingdom",
            "industry": "Finance",
            "process": "",
            "contact_method": "email",
            "email": "john.doe@testcompany.co.uk"
        }
        response = requests.post(f"{BACKEND_URL}/audit-requests", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASS: Validation correctly rejected empty process")
            return True
        else:
            print(f"❌ FAIL: Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred - {str(e)}")
        return False


def test_get_audit_requests(expected_id=None):
    """Test GET /api/audit-requests - should return list sorted by created_at desc"""
    print("\n" + "="*60)
    print("TEST 7: GET /api/audit-requests (Retrieve audit requests)")
    print("="*60)
    try:
        response = requests.get(f"{BACKEND_URL}/audit-requests", timeout=10)
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: Found {len(data)} audit request(s)")
        
        if response.status_code == 200:
            if isinstance(data, list):
                # Check if sorted by created_at desc
                if len(data) > 1:
                    timestamps = [item.get("created_at") for item in data]
                    is_sorted = all(timestamps[i] >= timestamps[i+1] for i in range(len(timestamps)-1))
                    if not is_sorted:
                        print("⚠️  WARNING: Results may not be sorted by created_at desc")
                
                if expected_id:
                    found = any(item.get("id") == expected_id for item in data)
                    if found:
                        print(f"✅ PASS: Audit requests retrieved, found expected ID {expected_id}")
                        return True
                    else:
                        print(f"❌ FAIL: Expected ID {expected_id} not found in list")
                        return False
                else:
                    print("✅ PASS: Audit requests retrieved successfully")
                    return True
            else:
                print(f"❌ FAIL: Expected list, got {type(data)}")
                return False
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred - {str(e)}")
        return False


def main():
    """Run all backend tests"""
    print("\n" + "="*60)
    print("WeHA Backend API Testing Suite")
    print(f"Backend URL: {BACKEND_URL}")
    print("="*60)
    
    results = {}
    
    # Test 1: Root endpoint
    results["root_endpoint"] = test_root_endpoint()
    
    # Test 2: Create status check
    status_pass, status_id = test_create_status_check()
    results["create_status"] = status_pass
    
    # Test 3: Get status checks
    results["get_status"] = test_get_status_checks(status_id)
    
    # Test 4: Create audit request (valid)
    audit_pass, audit_id = test_create_audit_request_valid()
    results["create_audit_valid"] = audit_pass
    
    # Test 5: Create audit request (empty name)
    results["create_audit_empty_name"] = test_create_audit_request_empty_name()
    
    # Test 6: Create audit request (empty process)
    results["create_audit_empty_process"] = test_create_audit_request_empty_process()
    
    # Test 7: Get audit requests
    results["get_audit_requests"] = test_get_audit_requests(audit_id)
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("="*60)
    
    return passed == total


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
