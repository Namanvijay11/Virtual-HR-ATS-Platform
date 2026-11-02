from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base


class Task(Base):

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(150), nullable=False)

    description = Column(Text)

    assigned_to = Column(String(100), nullable=False)

    priority = Column(String(20), default="Medium")

    status = Column(String(30), default="Pending")

    due_date = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


class Interview(Base):

    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    candidate_name = Column(String(100), nullable=False)

    candidate_email = Column(String(150), nullable=False)

    interview_date = Column(DateTime, nullable=False)

    interview_mode = Column(String(20), nullable=False)

    meeting_link = Column(String(255), nullable=True)

    status = Column(String(30), default="Scheduled")

    notes = Column(Text, nullable=True)