from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

from typing import Literal

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    description: Optional[str] = None
    assigned_to: str
    priority: str = "Medium"
    due_date: Optional[datetime] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    assigned_to: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None


class TaskStatusUpdate(BaseModel):
    status: str


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    assigned_to: str
    priority: str
    status: str
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True



class InterviewCreate(BaseModel):
    candidate_name: str = Field(..., min_length=3)
    candidate_email: str
    interview_date: datetime

    interview_mode: Literal["Voice", "Video", "Chat"]

    meeting_link: Optional[str] = None
    notes: Optional[str] = None


class InterviewUpdate(BaseModel):
    candidate_name: Optional[str] = None
    candidate_email: Optional[str] = None
    interview_date: Optional[datetime] = None

    interview_mode: Optional[Literal["Voice", "Video", "Chat"]] = None

    meeting_link: Optional[str] = None
    notes: Optional[str] = None


class InterviewResponse(BaseModel):
    id: int
    candidate_name: str
    candidate_email: str
    interview_date: datetime
    interview_mode: str
    meeting_link: Optional[str]
    status: str
    notes: Optional[str]

    class Config:
        from_attributes = True
