from fastapi import FastAPI
from database import engine, Base
from routers import tasks
from routers import interviews
from fastapi.middleware.cors import CORSMiddleware
import models


app = FastAPI(
    title="Salarite Virtual HR API",
    description="Virtual HR and ATS Task Management System",
    version="1.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(tasks.router)
app.include_router(interviews.router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://salarite-frontend-u1yr.onrender.com/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Salarite Virtual HR API",
        "status": "Running"
    }


@app.get("/health")
def health_check():
    return {"status": "Healthy"}