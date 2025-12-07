import os
import json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from typing import List
import socket

# Set a default timeout for HTTP requests
socket.setdefaulttimeout(30)  # 30 seconds timeout

# Load credentials from the JSON file
# Use absolute path to ensure the file is found
# The credentials file is in the backend directory
# Get the backend directory (two levels up from this file)
current_dir = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.dirname(current_dir)
backend_dir = os.path.dirname(app_dir)
CREDENTIALS_FILE = os.path.join(backend_dir, "gen-lang-client-0375562876-7def404615c7.json")
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# Load the credentials
try:
    with open(CREDENTIALS_FILE, 'r') as f:
        credentials_info = json.load(f)
    # Set up credentials
    creds = Credentials.from_service_account_info(credentials_info, scopes=SCOPES)
    print("✅ Google Sheets credentials loaded successfully")
except FileNotFoundError:
    print(f"❌ Credentials file not found at: {CREDENTIALS_FILE}")
    creds = None
except json.JSONDecodeError as e:
    print(f"❌ Invalid JSON in credentials file: {e}")
    creds = None
except Exception as e:
    print(f"❌ Error loading credentials: {e}")
    creds = None

# Spreadsheet ID (you'll need to set this)
# Load from environment variable
SPREADSHEET_ID = os.getenv("SPREADSHEET_ID", "YOUR_SPREADSHEET_ID_HERE")

def get_service():
    """Initialize the Google Sheets API service"""
    if creds is None:
        raise Exception("Google Sheets credentials not available")
    service = build('sheets', 'v4', credentials=creds)
    return service

def get_first_sheet_range():
    """Get the range for the first sheet tab"""
    try:
        service = get_service()
        sheet = service.spreadsheets()
        
        # Get sheet metadata
        metadata = sheet.get(spreadsheetId=SPREADSHEET_ID).execute()
        sheets = metadata.get('sheets', [])
        
        if sheets:
            first_sheet_name = sheets[0].get('properties', {}).get('title', 'Sheet1')
            # URL encode spaces in sheet name
            encoded_sheet_name = first_sheet_name.replace(' ', '%20')
            return f"{encoded_sheet_name}!A:E"
        else:
            return "Sheet1!A:E"
    except Exception as e:
        print(f"Error getting sheet range: {e}")
        return "Sheet1!A:E"

def check_duplicate_sync(email: str, mobile: str) -> bool:
    """Check if a registration with the same email or mobile already exists"""
    try:
        service = get_service()
        sheet = service.spreadsheets()
        
        # Get the range for the first sheet
        RANGE_NAME = get_first_sheet_range()
        print(f"Using range: {RANGE_NAME}")
        
        # Get all data from the sheet
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
        values = result.get('values', [])
        
        # Check if email or mobile already exists (skip header row)
        for row in values[1:]:  # Skip header row
            if len(row) >= 4 and (row[2] == email or row[3] == mobile):
                return True
        
        return False
    except HttpError as err:
        print(f"An error occurred: {err}")
        return False
    except Exception as e:
        print(f"Error checking duplicates: {e}")
        return False

def add_registration_sync(timestamp: str, name: str, email: str, mobile: str, occupation: str):
    """Add a new registration to the Google Sheet"""
    try:
        service = get_service()
        sheet = service.spreadsheets()
        
        # Get the range for the first sheet
        RANGE_NAME = get_first_sheet_range()
        print(f"Using range: {RANGE_NAME}")
        
        # Prepare the data to insert
        values = [[timestamp, name, email, mobile, occupation]]
        body = {'values': values}
        
        # Append the data to the sheet
        result = sheet.values().append(
            spreadsheetId=SPREADSHEET_ID,
            range=RANGE_NAME,
            valueInputOption="RAW",
            body=body
        ).execute()
        
        print(f"Registration added successfully: {result.get('updates').get('updatedCells')} cells updated.")
        return True
    except HttpError as err:
        print(f"An error occurred: {err}")
        return False
    except Exception as e:
        print(f"Error adding registration: {e}")
        return False

# Test function (optional)
if __name__ == "__main__":
    # This is just for testing purposes
    try:
        # Test adding a registration
        result = add_registration_sync("2023-12-07 10:30:00", "John Doe", "john@example.com", "1234567890", "Student")
        print(f"Test registration result: {result}")
        
        # Test checking for duplicates
        is_duplicate = check_duplicate_sync("john@example.com", "1234567890")
        print(f"Is duplicate: {is_duplicate}")
    except Exception as e:
        print(f"Test failed: {e}")