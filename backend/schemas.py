from pydantic import BaseModel
from typing import List, Optional

class DoctorBase(BaseModel):
    name: str
    email: str
    specialty: str

class DoctorCreate(DoctorBase):
    password: str

class Doctor(DoctorBase):
    id: int

    class Config:
        orm_mode = True

class PatientBase(BaseModel):
    name: str
    email: str

class PatientCreate(PatientBase):
    password: str

class Patient(PatientBase):
    id: int

    class Config:
        orm_mode = True

class PDFBase(BaseModel):
    doctor_id: int
    file_path: str
    upload_date: str

class PDFCreate(PDFBase):
    pass

class PDF(PDFBase):
    id: int

    class Config:
        orm_mode = True

class DoctorPatientBase(BaseModel):
    doctor_id: int
    patient_id: int

class DoctorPatientCreate(DoctorPatientBase):
    pass

class DoctorPatient(DoctorPatientBase):
    pass
