from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    db_doctor = models.Doctor(
        name=doctor.name,
        email=doctor.email,
        hashed_password=get_password_hash(doctor.password),
        specialty=doctor.specialty,
    )
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def get_doctor_by_email(db: Session, email: str):
    return db.query(models.Doctor).filter(models.Doctor.email == email).first()


def create_patient(db: Session, patient: schemas.PatientCreate):
    db_patient = models.Patient(
        name=patient.name,
        email=patient.email,
        hashed_password=get_password_hash(patient.password),
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def get_patient_by_email(db: Session, email: str):
    return db.query(models.Patient).filter(models.Patient.email == email).first()


def create_pdf(db: Session, pdf: schemas.PDFCreate):
    db_pdf = models.PDF(
        doctor_id=pdf.doctor_id,
        file_path=pdf.file_path,
        upload_date=pdf.upload_date,
    )
    db.add(db_pdf)
    db.commit()
    db.refresh(db_pdf)
    return db_pdf


def link_doctor_patient(db: Session, doctor_patient: schemas.DoctorPatientCreate):
    db_doctor_patient = models.DoctorPatient(
        doctor_id=doctor_patient.doctor_id,
        patient_id=doctor_patient.patient_id
    )
    db.add(db_doctor_patient)
    db.commit()
    db.refresh(db_doctor_patient)
    return db_doctor_patient