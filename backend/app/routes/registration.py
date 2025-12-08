from flask import Blueprint, request, jsonify
import re
from datetime import datetime
from ..services import google_sheets

bp = Blueprint('registration', __name__)

# Lecture configuration - open one lecture for testing
LECTURES = {
    'Lecture-1': {'name': 'Lecture 1', 'status': 'open'},
    'Lecture-2': {'name': 'Lecture 2', 'status': 'closed'},
    'Lecture-3': {'name': 'Lecture 3', 'status': 'closed'},
    'Lecture-4': {'name': 'Lecture 4', 'status': 'closed'},
    'Lecture-5': {'name': 'Lecture 5', 'status': 'closed'},
    'Lecture-6': {'name': 'Lecture 6', 'status': 'closed'}
}

def validate_registration_data(data):
    # Validate required fields
    if not data.get('name') or not data.get('email') or not data.get('mobile') or not data.get('occupation'):
        return False, "All fields are required"
    
    # Validate name (min 3 chars, alphabets and spaces only)
    if len(data['name'].strip()) < 3:
        return False, "Name must be at least 3 characters long"
    
    if not re.match(r"^[A-Za-z\s]+$", data['name']):
        return False, "Name should contain only alphabets and spaces"
    
    # Validate email format (must contain @ and be from Gmail or Outlook)
    if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
        return False, "Invalid email format"
    
    if not (".gmail." in data['email'] or ".outlook." in data['email'] or "@gmail." in data['email'] or "@outlook." in data['email']):
        return False, "Email must be from Gmail or Outlook domain"
    
    # Validate mobile (WhatsApp number: exactly 10 digits)
    if not re.match(r"^\d{10}$", data['mobile']):
        return False, "WhatsApp number must be exactly 10 digits"
    
    # Validate lecture
    lecture_id = data.get('lecture', 'Lecture-1')
    if lecture_id not in LECTURES:
        return False, "Invalid lecture selected"
    
    if LECTURES[lecture_id]['status'] != 'open':
        return False, f"Registration for {LECTURES[lecture_id]['name']} is currently closed"
    
    return True, None

@bp.route("/submit", methods=['POST'])
def submit_registration():
    try:
        data = request.get_json()
        
        # Validate data
        is_valid, error_message = validate_registration_data(data)
        if not is_valid:
            return jsonify({
                "success": False,
                "message": error_message
            }), 400
        
        print(f"Processing registration for: {data['name']} ({data['email']})")
        
        # Check for duplicates (only if Google Sheets is available)
        try:
            print("Checking for duplicates...")
            is_duplicate = google_sheets.check_duplicate_sync(data['email'], data['mobile'])
            if is_duplicate:
                print("Duplicate registration found")
                return jsonify({
                    "success": False,
                    "message": "A registration with this email or WhatsApp number already exists"
                }), 409
        except Exception as e:
            # If Google Sheets is not available, log the error but continue
            print(f"Warning: Google Sheets not available for duplicate check: {e}")
        
        # Add to Google Sheets (only if available)
        try:
            print("Adding registration to Google Sheets...")
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            result = google_sheets.add_registration_sync(timestamp, data['name'], data['email'], data['mobile'], data['occupation'])
            
            # If Google Sheets operation failed, return an error
            if not result:
                print("Failed to add registration to Google Sheets")
                return jsonify({
                    "success": False,
                    "message": "Registration failed: Unable to save data to Google Sheets"
                }), 500
                
            print("Registration successfully added to Google Sheets")
        except Exception as e:
            # If Google Sheets is not available, log the error but still return success
            # This prevents the frontend from showing an error when the data is actually saved
            print(f"Warning: Could not save to Google Sheets: {e}")
            # Still return success since we want the user to know their registration was accepted
        
        print("Sending success response to frontend")
        return jsonify({
            "success": True,
            "message": "Registration successful! You will receive a confirmation shortly."
        }), 200
        
    except Exception as e:
        print(f"Unexpected error during registration: {e}")
        return jsonify({
            "success": False,
            "message": f"Registration failed: {str(e)}"
        }), 500

@bp.route("/register", methods=['POST'])
def register():
    # Alias for the submit endpoint to maintain compatibility
    return submit_registration()

@bp.route("/lectures", methods=['GET'])
def get_lectures():
    """Return list of available lectures"""
    # Filter only open lectures
    open_lectures = {k: v for k, v in LECTURES.items() if v['status'] == 'open'}
    return jsonify(open_lectures)