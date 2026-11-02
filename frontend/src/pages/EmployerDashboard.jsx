
import { useEffect, useState, useCallback } from "react";
import { getTasks, getInterviews } from "../services/api";

function EmployerDashboard() {
    const [tasks, setTasks] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadData = useCallback(async () => {
        try {
            setError("");

            const [taskRes, interviewRes] = await Promise.all([
                getTasks(),
                getInterviews()
            ]);

            setTasks(taskRes.data);
            setInterviews(interviewRes.data);
        } catch (err) {
            console.error("Dashboard error:", err);
            setError(
                "Unable to load dashboard data. Please check your backend connection."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();

        const interval = setInterval(loadData, 5000);

        return () => clearInterval(interval);
    }, [loadData]);

    const pending = tasks.filter(
        task => task.status === "Pending"
    ).length;

    const progress = tasks.filter(
        task => task.status === "In Progress"
    ).length;

    const completed = tasks.filter(
        task => task.status === "Completed"
    ).length;

    const scheduledInterviews = interviews.filter(
        interview => interview.status === "Scheduled"
    ).length;

    const stats = [
        { title: "Total Tasks", value: tasks.length },
        { title: "Pending Tasks", value: pending },
        { title: "In Progress", value: progress },
        { title: "Completed", value: completed },
        { title: "Interviews", value: scheduledInterviews }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case "Completed":
                return "bg-success";
            case "In Progress":
                return "bg-warning text-dark";
            case "Pending":
                return "bg-secondary";
            default:
                return "bg-primary";
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                    <h3 className="mb-2">Employer Dashboard</h3>
                    <p className="text-muted">
                        Monitor your Virtual HR activities.
                    </p>
                </div>

                <button
                    className="btn btn-outline-primary mb-3"
                    onClick={loadData}
                    disabled={loading}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh
                </button>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                    <button
                        className="btn btn-sm btn-outline-danger ms-3"
                        onClick={loadData}
                    >
                        Retry
                    </button>
                </div>
            )}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                    <p className="text-muted mt-2">
                        Loading dashboard...
                    </p>
                </div>
            ) : (
                <>
                    <div className="row g-3 mt-2">
                        {stats.map((item) => (
                            <div
                                className="col-md-4 col-lg"
                                key={item.title}
                            >
                                <div className="stat-card">
                                    <p>{item.title}</p>
                                    <h2>{item.value}</h2>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="content-card mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>Recent Tasks</h5>
                            <span className="text-muted small">
                                {tasks.length} Total Tasks
                            </span>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover mt-3 align-middle">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Assigned To</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tasks.slice(0, 10).map(task => (
                                        <tr key={task.id}>
                                            <td>
                                                <strong>{task.title}</strong>
                                            </td>

                                            <td>{task.assigned_to}</td>

                                            <td>
                                                <span className={
                                                    task.priority === "High"
                                                        ? "badge bg-danger"
                                                        : task.priority === "Low"
                                                        ? "badge bg-info text-dark"
                                                        : "badge bg-secondary"
                                                }>
                                                    {task.priority}
                                                </span>
                                            </td>

                                            <td>
                                                <span className={`badge ${getStatusClass(task.status)}`}>
                                                    {task.status}
                                                </span>
                                            </td>

                                            <td>
                                                {task.due_date
                                                    ? new Date(task.due_date).toLocaleDateString()
                                                    : "Not specified"}
                                            </td>
                                        </tr>
                                    ))}

                                    {tasks.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center text-muted py-4"
                                            >
                                                No tasks available. Assign your first task!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="content-card mt-4">
                        <h5>Interview Overview</h5>

                        <div className="d-flex justify-content-between flex-wrap gap-3 mt-3">
                            <div>
                                <h3>{interviews.length}</h3>
                                <span className="text-muted">
                                    Total Interviews
                                </span>
                            </div>

                            <div>
                                <h3 className="text-success">
                                    {scheduledInterviews}
                                </h3>
                                <span className="text-muted">
                                    Scheduled Interviews
                                </span>
                            </div>

                            <div>
                                <h3 className="text-secondary">
                                    {interviews.filter(
                                        item => item.status === "Cancelled"
                                    ).length}
                                </h3>
                                <span className="text-muted">
                                    Cancelled Interviews
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default EmployerDashboard;
