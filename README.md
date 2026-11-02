# Salarite – Virtual HR + ATS Platform

A web-based Virtual HR and Applicant Tracking System (ATS) platform that enables employers to assign tasks to Virtual HR, monitor task progress, and schedule candidate interviews through Voice, Video, and Chat modes.

## Overview

**Salarite** is designed to simplify HR task management and interview scheduling through a centralized dashboard.

The platform provides two primary workflows:

- **Employer:** Assigns tasks, monitors task progress, and manages interview schedules.
- **Virtual HR:** Views assigned tasks and updates their progress.

The application automatically refreshes dashboard data to provide updated task and interview information.

## Features

### 1. Employer Dashboard
- View total tasks.
- Monitor Pending, In Progress, and Completed tasks.
- View scheduled interviews.
- Monitor recent task activity.
- Automatically refresh dashboard information.

### 2. Task Management
- Create and assign tasks to Virtual HR.
- Add task descriptions and due dates.
- Set task priorities: Low, Medium, and High.
- View all assigned tasks.
- Update task status.
- Delete tasks.

### 3. Virtual HR Dashboard
- View tasks assigned to Virtual HR.
- Monitor task descriptions and priorities.
- Update task progress.
- Change task status to Pending, In Progress, or Completed.

### 4. Interview Scheduling
- Schedule candidate interviews.
- Store candidate name and email.
- Select interview date and time.
- Choose interview mode:
  - Voice
  - Video
  - Chat
- Add an optional meeting link and notes.
- Cancel scheduled interviews.
- Mark interviews as Completed.
- Track interview statuses: Scheduled, Completed, and Cancelled.

**Note:** Voice, Video, and Chat are currently interview scheduling modes. This version does not implement actual live audio/video calling or a real-time chat session.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, Bootstrap 5 |
| Frontend Tools | Vite, Axios, React Router |
| Icons | Lucide React |
| Backend | Python, FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| API Testing | Postman, FastAPI Swagger UI |

## Project Structure

```text
Salarite/
│
├── backend/
│   ├── routers/
│   │   ├── tasks.py
│   │   └── interviews.py
│   │
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── salarite.db
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── EmployerDashboard.jsx
│   │   │   ├── TaskManagement.jsx
│   │   │   ├── VirtualHRDashboard.jsx
│   │   │   └── InterviewScheduling.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── index.html
│
└── README.md
```

## Installation and Setup

### Prerequisites

Install the following before running the application:

- Python 3.10 or later
- Node.js and npm
- Git
- A code editor such as Visual Studio Code

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Salarite
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger API Documentation:

```text
http://127.0.0.1:8000/docs
```

The SQLite database is initialized automatically when the backend application starts.

### 3. Frontend Setup

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## API Endpoints

### Task Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks/` | Create a task |
| GET | `/tasks/` | Get all tasks |
| GET | `/tasks/{task_id}` | Get task by ID |
| PUT | `/tasks/{task_id}` | Update task details |
| PATCH | `/tasks/{task_id}/status` | Update task status |
| DELETE | `/tasks/{task_id}` | Delete a task |

### Interview Scheduling APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/interviews/` | Schedule an interview |
| GET | `/interviews/` | Get all interviews |
| GET | `/interviews/{interview_id}` | Get interview by ID |
| PUT | `/interviews/{interview_id}` | Update interview details |
| PATCH | `/interviews/{interview_id}/cancel` | Cancel an interview |
| PATCH | `/interviews/{interview_id}/complete` | Mark interview as completed |
| DELETE | `/interviews/{interview_id}` | Delete an interview |

## Task Status Workflow

```text
       Employer
           |
           v
      Create Task
           |
           v
    Assign to Virtual HR
           |
           v
     Virtual HR Dashboard
           |
           v
       Pending
           |
           v
      In Progress
           |
           v
       Completed
           |
           v
    Employer Dashboard
```

## Interview Status Workflow

```text
       Schedule Interview
               |
               v
           Scheduled
           /        \
          v          v
     Completed    Cancelled
```

## Database

Salarite uses SQLite for storing application data.

The main database entities are:

**Task**
- id
- title
- description
- assigned_to
- priority
- status
- due_date
- created_at
- updated_at

**Interview**
- id
- candidate_name
- candidate_email
- interview_date
- interview_mode
- meeting_link
- status
- notes

SQLAlchemy is used for database operations and Pydantic is used for request and response validation.

## Testing

Backend APIs can be tested using:

- FastAPI Swagger UI: `http://127.0.0.1:8000/docs`
- Postman

Frontend functionality can be tested through the React application.

Recommended test cases:

1. Create a task as an employer.
2. Assign the task to Virtual HR.
3. Update the task status from the Virtual HR dashboard.
4. Verify the updated status on the Employer Dashboard.
5. Schedule interviews using Voice, Video, and Chat modes.
6. Mark a scheduled interview as Completed.
7. Cancel another scheduled interview.
8. Verify interview statuses in the application.

## Deployment

The application is designed for deployment using platforms such as:

- Render
- Railway

Deployment configuration and a live demo link will be added after deployment.

## Future Enhancements

- User authentication and role-based access control.
- Resume upload and candidate profile management.
- Real-time notifications.
- WebSocket-based updates.
- Actual Voice and Video interview integration.
- Real-time Chat interview functionality.
- Advanced ATS candidate tracking and reporting.

## Project Information

**Project Name:** Salarite – Virtual HR + ATS Platform

**Project Type:** Internship Assignment

**Backend:** Python – FastAPI

**Frontend:** React

**Database:** SQLite

**Purpose:** To build a mini Virtual HR dashboard with employer task assignment, progress monitoring, and interview scheduling.

## Author

**Developer:** Naman Vijay

**GitHub:** .

---

*Developed as part of the Salarite Virtual HR internship assignment.*