from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users_data"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    employee_id = db.Column(db.String(345), unique=True)
    employee_name = db.Column(db.Text, nullable=False)
    employee_position = db.Column(db.Text, nullable=False)
    employee_salary = db.Column(db.Text, nullable=False)