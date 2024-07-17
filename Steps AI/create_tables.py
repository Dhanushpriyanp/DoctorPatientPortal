from database import Base, engine
from models import Doctor, Patient, PDF, DoctorPatient

Base.metadata.create_all(bind=engine)
