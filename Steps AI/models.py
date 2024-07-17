from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base

class Doctor(Base):
    __tablename__ = 'doctors'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    specialty = Column(String)
    patients = relationship("DoctorPatient", back_populates="doctor")  # Added here

class Patient(Base):
    __tablename__ = 'patients'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    doctors = relationship("DoctorPatient", back_populates="patient")  # Added here

class PDF(Base):
    __tablename__ = 'pdfs'

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    file_path = Column(String)
    upload_date = Column(DateTime)

class DoctorPatient(Base):
    __tablename__ = 'doctor_patient'

    doctor_id = Column(Integer, ForeignKey('doctors.id'), primary_key=True)
    patient_id = Column(Integer, ForeignKey('patients.id'), primary_key=True)
    doctor = relationship("Doctor", back_populates="patients")
    patient = relationship("Patient", back_populates="doctors")
