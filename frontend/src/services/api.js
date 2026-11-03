
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json"
    }
});

// Task APIs
export const getTasks = () => API.get("/tasks/");

export const createTask = (data) => API.post("/tasks/", data);

export const updateTask = (id, data) =>
    API.put(`/tasks/${id}`, data);

export const updateTaskStatus = (id, status) =>
    API.patch(`/tasks/${id}/status`, { status });

export const deleteTask = (id) =>
    API.delete(`/tasks/${id}`);

// Interview APIs

// Interview APIs
export const getInterviews = () => API.get("/interviews/");

export const createInterview = (data) =>
    API.post("/interviews/", data);

export const cancelInterview = (id) =>
    API.patch(`/interviews/${id}/cancel`);

export const completeInterview = (id) =>
    API.patch(`/interviews/${id}/complete`);


export default API;
