from fastapi import FastAPI,Depends,HTTPException,status,File,UploadFile,Body,Request
from sqlalchemy.orm import Session
import models, schemas, crud, database, utils
from database import engine
from fastapi.middleware.cors import CORSMiddleware
import boto3
import os
from typing import Optional, List
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)

BUCKET_NAME = os.getenv("BUCKET_NAME")


@app.post("/doctors/", response_model=schemas.Doctor)
async def create_doctor(
    doctor: schemas.DoctorCreate, db: Session = Depends(database.get_db)
):
    db_doctor = crud.get_doctor_by_email(db, email=doctor.email)
    if db_doctor:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_doctor(db=db, doctor=doctor)


@app.post("/patients/", response_model=schemas.Patient)
async def create_patient(
    patient: schemas.PatientCreate, db: Session = Depends(database.get_db)
):
    db_patient = crud.get_patient_by_email(db, email=patient.email)
    if db_patient:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_patient(db=db, patient=patient)


from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str
    userType: str


@app.post("/login/")
async def login(login_request: LoginRequest, db: Session = Depends(database.get_db)):
    if login_request.userType == "doctor":
        user = crud.get_doctor_by_email(db, email=login_request.email)
    elif login_request.userType == "patient":
        user = crud.get_patient_by_email(db, email=login_request.email)
    else:
        raise HTTPException(status_code=400, detail="Invalid user type")

    if not user or not utils.verify_password(
        login_request.password, user.hashed_password
    ):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "userType": login_request.userType,
        "user_id": user.id,
    }


@app.post("/pdfs/")
async def upload_pdf(
    doctor_id: Optional[int] = Body(..., embed=True),
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
):
    file_path = f"doctors/{doctor_id}/{file.filename}"
    print(file.file, BUCKET_NAME, file_path, 12345)
    s3_client.upload_fileobj(file.file, BUCKET_NAME, file_path)
    pdf_data = schemas.PDFCreate(
        doctor_id=doctor_id,
        file_path=f"s3://{BUCKET_NAME}/{file_path}",
        upload_date=datetime.utcnow().isoformat(),
    )
    return crud.create_pdf(db=db, pdf=pdf_data)


@app.post("/link/", response_model=schemas.DoctorPatient)
async def link_doctor_patient(
    doctor_patient: schemas.DoctorPatientCreate, db: Session = Depends(database.get_db)
):
    return crud.link_doctor_patient(db=db, doctor_patient=doctor_patient)


@app.get("/doctor/{doctor_id}/unlinked_patients/")
def get_unlinked_patients(doctor_id: int, db: Session = Depends(database.get_db)):
    subquery = (
        db.query(models.DoctorPatient.patient_id)
        .filter(models.DoctorPatient.doctor_id == doctor_id)
        .subquery()
    )
    patients = db.query(models.Patient).filter(~models.Patient.id.in_(subquery)).all()
    return patients


@app.get("/doctor/{doctor_id}/patients/")
def get_doctor_patients(doctor_id: int, db: Session = Depends(database.get_db)):
    doctor_patients = (
        db.query(models.Patient)
        .join(models.DoctorPatient)
        .filter(models.DoctorPatient.doctor_id == doctor_id)
        .all()
    )
    return doctor_patients


@app.get("/patient/{patient_id}/doctors/")
def get_patient_doctors(patient_id: int, db: Session = Depends(database.get_db)):
    patient_doctors = (
        db.query(models.Doctor)
        .join(models.DoctorPatient)
        .filter(models.DoctorPatient.patient_id == patient_id)
        .all()
    )
    return patient_doctors


@app.get("/get-doctors/")
def get_all_doctors(db: Session = Depends(database.get_db)):
    doctors = db.query(models.Doctor).all()
    return doctors
