# DoctorPatientPortal

## Overview
DoctorPatientPortal is a comprehensive web application designed to facilitate interaction between doctors and patients. It provides a user-friendly interface for managing medical documents, patient information, and doctor-patient links, streamlining healthcare management.

## Features
- **User Authentication**: Secure login and signup for doctors and patients.
- **Doctor Dashboard**: Doctors can upload medical documents, view linked patients and can link patients.
- **Patient Dashboard**: Patients can view their linked doctors and available doctors.
- **Responsive Design**: The application is optimized for both desktop and mobile devices.
- **Easy Navigation**: Intuitive navigation bar and sidebar for seamless user experience.

## Prerequisites
- **Frontend:**
  - Node.js (version 14 or later)
  - npm (Node Package Manager)
  
- **Backend:**
  - Python 3.11 or higher
  - PostgreSQL database
  - FastAPI
  - Amazon S3 (create a bucket)
  - Required Python packages listed in `requirements.txt`

## Getting Started

### Backend Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Dhanushpriyanp/DoctorPatientPortal.git
   cd DoctorPatientPortal
   ```

2. **Install Python Dependencies**
   ```sh
   pip install -r requirements.txt
   ```

3. **Set Up Your Environment**
   ```sh
   cd backend
   ```
   - Update the `.env` file in the `backend` directory with your credentials:
     ```
     DATABASE_URL=postgresql://<username>:<password>@localhost/<database_name>
     AWS_ACCESS_KEY_ID=<your_AWS_key>
     AWS_SECRET_ACCESS_KEY=<your_AWS_secret_key>
     BUCKET_NAME=<your_bucket_name>
     ```

5. **Run Database Migrations**
   - Ensure your PostgreSQL database is running.
   - Run the `create_tables.py` script in the backend directory to set up your database tables.

6. **Start the FastAPI Server**
   ```sh
   uvicorn main:app --reload
   ```
   The server will start on `http://127.0.0.1:8000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```sh
   cd ../frontend
   ```

2. **Install npm Dependencies**
   ```sh
   npm install
   ```

3. **Run the React Application**
   ```sh
   npm start
   ```
   The application will run on `http://localhost:3000`.

## Usage

### User Authentication
- **Login**: Navigate to the login page and enter your credentials.
- **Signup**: If you are a new user, sign up to create an account.

### Doctor Dashboard
- Once logged in as a doctor, you will have access to your dashboard.
- Link patients, View linked patients and upload medical documents as needed.

### Patient Dashboard
- Patients can view their linked doctors and available doctors.
- Patients can manage their profiles and linked doctors.

### Navigation
- Use the Sidebar and Navbar for quick navigation between different sections (e.g., Dashboard, Upload PDF, Link Patients).

```
