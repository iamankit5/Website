# College Registration Web App

This is a full-stack web application for college registration built with React (Frontend) and Python Flask (Backend). Registration data is stored in Google Sheets.

## Project Structure

```
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── ...
│   └── ...
├── backend/               # Python Flask backend
│   ├── app/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Service integrations (Google Sheets)
│   │   └── main.py        # Main application entry point
│   ├── requirements.txt   # Python dependencies
│   └── ...
├── plan.json             # Project specification
└── gen-lang-client-...json # Google Sheets API credentials
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Google Sheets API credentials (already provided)

### Quick Start (Recommended)

Double-click on `start_together.bat` to launch both applications with instructions.

### Manual Start

#### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The frontend will be available at `http://localhost:3000`

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up Google Sheets:
   - Create a Google Sheet with the following columns:
     1. Timestamp
     2. Name
     3. Email
     4. Mobile Number
     5. Occupation
   - Rename the sheet tab to "College Registration"
   - Update the `.env` file with your Google Sheet ID:
     ```
     SPREADSHEET_ID=your_actual_spreadsheet_id_here
     ```
   - Share the Google Sheet with the service account email:
     `ankit-931@gen-lang-client-0375562876.iam.gserviceaccount.com`

5. Start the backend server:
   ```
   python -m app.main
   ```

6. The backend API will be available at `http://localhost:8000`

## Testing

### Backend Testing

Run the Google Sheets integration test:
```
cd backend
python test_sheets.py
```

### Frontend Testing

Run the form validation tests:
```
cd frontend
npm test
```

## Features Implemented

- ✅ Modern glassmorphism UI design with animated background
- ✅ Responsive registration form with advanced validation
- ✅ Form validation (name, email, mobile, occupation)
- ✅ Duplicate registration prevention
- ✅ Google Sheets integration for data storage
- ✅ Success page with WhatsApp group link
- ✅ Advanced animations and transitions
- ✅ CORS protection
- ✅ Input sanitization
- ✅ Detailed error handling

## API Endpoints

- `GET /` - Health check endpoint
- `POST /api/submit` - Submit registration data

## Security Measures

- CORS enabled only for frontend origin
- Input validation and sanitization
- HTTPS required for production deployment
- Google Sheets API authentication via service account

## Deployment

### Frontend
Can be deployed to:
- Vercel
- Netlify
- Any static hosting service

### Backend
Can be deployed to:
- Render
- Railway
- AWS Lambda
- Any cloud provider supporting Python

## Customization

To customize the application:

1. Update the WhatsApp link in `frontend/src/components/SuccessPage.jsx`
2. Modify form fields in `plan.json` and update components accordingly
3. Change UI colors in the CSS files
4. Add new validation rules in both frontend and backend

## Troubleshooting

### Common Issues

1. **"An error occurred. Please try again."**
   - Make sure the backend server is running
   - Check that the SPREADSHEET_ID in `.env` is correct
   - Verify the Google Sheet is shared with the service account

2. **Form validation not working**
   - Check browser console for JavaScript errors
   - Ensure all required fields are filled correctly

3. **Animations not working**
   - Make sure you're using a modern browser
   - Check browser developer tools for CSS errors

### Testing the Connection

1. Run the backend test script:
   ```
   cd backend
   python test_sheets.py
   ```

2. Check the frontend console for API request logs