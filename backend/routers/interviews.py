
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Interview
from schemas import InterviewCreate, InterviewUpdate, InterviewResponse

router = APIRouter(
    prefix="/interviews",
    tags=["Interview Scheduling"]
)


# 1. Schedule Interview
@router.post("/", response_model=InterviewResponse, status_code=201)
def schedule_interview(
    interview_data: InterviewCreate,
    db: Session = Depends(get_db)
):

    new_interview = Interview(
        candidate_name=interview_data.candidate_name,
        candidate_email=interview_data.candidate_email,
        interview_date=interview_data.interview_date,
        interview_mode=interview_data.interview_mode,
        meeting_link=interview_data.meeting_link,
        notes=interview_data.notes
    )

    db.add(new_interview)
    db.commit()
    db.refresh(new_interview)

    return new_interview


# 2. Get All Interviews
@router.get("/", response_model=list[InterviewResponse])
def get_all_interviews(db: Session = Depends(get_db)):

    return db.query(Interview).order_by(
        Interview.interview_date.asc()
    ).all()


# 3. Get Interview By ID
@router.get("/{interview_id}", response_model=InterviewResponse)
def get_interview(interview_id: int, db: Session = Depends(get_db)):

    interview = db.query(Interview).filter(
        Interview.id == interview_id
    ).first()

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    return interview


# 4. Update Interview
@router.put("/{interview_id}", response_model=InterviewResponse)
def update_interview(
    interview_id: int,
    interview_data: InterviewUpdate,
    db: Session = Depends(get_db)
):

    interview = db.query(Interview).filter(
        Interview.id == interview_id
    ).first()

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    update_data = interview_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(interview, key, value)

    db.commit()
    db.refresh(interview)

    return interview


# 5. Cancel Interview
@router.patch("/{interview_id}/cancel", response_model=InterviewResponse)
def cancel_interview(
    interview_id: int,
    db: Session = Depends(get_db)
):

    interview = db.query(Interview).filter(
        Interview.id == interview_id
    ).first()

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    interview.status = "Cancelled"

    db.commit()
    db.refresh(interview)

    return interview


# 6. Delete Interview
@router.delete("/{interview_id}")
def delete_interview(
    interview_id: int,
    db: Session = Depends(get_db)
):

    interview = db.query(Interview).filter(
        Interview.id == interview_id
    ).first()

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    db.delete(interview)
    db.commit()

    return {
        "message": "Interview deleted successfully",
        "interview_id": interview_id
    }


@router.patch("/{interview_id}/complete", response_model=InterviewResponse)
def complete_interview(
    interview_id: int,
    db: Session = Depends(get_db)
):
    interview = db.query(Interview).filter(
        Interview.id == interview_id
    ).first()

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    if interview.status != "Scheduled":
        raise HTTPException(
            status_code=400,
            detail="Only scheduled interviews can be completed"
        )

    interview.status = "Completed"

    db.commit()
    db.refresh(interview)

    return interview
