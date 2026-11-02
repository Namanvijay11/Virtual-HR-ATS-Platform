
import { useEffect, useState } from "react";
import {
    getInterviews,
    createInterview,
    cancelInterview,
    completeInterview
} from "../services/api";

function InterviewScheduling() {
    const [interviews, setInterviews] = useState([]);

    
const handleComplete = async (id) => {
    if (!window.confirm("Mark this interview as completed?")) {
        return;
    }

    try {
        await completeInterview(id);
        await loadInterviews();

        alert("Interview marked as completed!");
    } catch (error) {
        console.error("Error completing interview:", error);

        alert(
            error.response?.data?.detail ||
            "Failed to complete interview"
        );
    }
};


    const [form, setForm] = useState({
        candidate_name: "",
        candidate_email: "",
        interview_date: "",
        interview_mode: "Video",
        meeting_link: "",
        notes: ""
    });

    const loadInterviews = async () => {
        const response = await getInterviews();
        setInterviews(response.data);
    };

    useEffect(() => {
        loadInterviews();

        const interval = setInterval(loadInterviews, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createInterview({
                ...form,
                interview_date: new Date(
                    form.interview_date
                ).toISOString()
            });

            setForm({
                candidate_name: "",
                candidate_email: "",
                interview_date: "",
                interview_mode: "Video",
                meeting_link: "",
                notes: ""
            });

            await loadInterviews();
            alert("Interview scheduled successfully!");
        } catch (error) {
            alert(error.response?.data?.detail || "Scheduling failed");
        }
    };

    const handleCancel = async (id) => {
        if (window.confirm("Cancel this interview?")) {
            await cancelInterview(id);
            await loadInterviews();
        }
    };

    return (
        <div>
            <h3>Interview Scheduling</h3>
            <p className="text-muted">
                Schedule candidate interviews.
            </p>

            <div className="content-card mt-4">
                <h5>Schedule New Interview</h5>

                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mt-1">
                        <div className="col-md-6">
                            <label className="form-label">
                                Candidate Name
                            </label>
                            <input
                                className="form-control"
                                required
                                value={form.candidate_name}
                                onChange={e => setForm({
                                    ...form,
                                    candidate_name: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Candidate Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                value={form.candidate_email}
                                onChange={e => setForm({
                                    ...form,
                                    candidate_email: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Interview Date
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                required
                                value={form.interview_date}
                                onChange={e => setForm({
                                    ...form,
                                    interview_date: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Interview Mode
                            </label>
                            <select
                                className="form-select"
                                value={form.interview_mode}
                                onChange={e => setForm({
                                    ...form,
                                    interview_mode: e.target.value
                                })}
                            >
                                <option>Voice</option>
                                <option>Video</option>
                                <option>Chat</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label className="form-label">
                                Meeting Link (Optional)
                            </label>
                            <input
                                className="form-control"
                                value={form.meeting_link}
                                onChange={e => setForm({
                                    ...form,
                                    meeting_link: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Notes</label>
                            <textarea
                                className="form-control"
                                value={form.notes}
                                onChange={e => setForm({
                                    ...form,
                                    notes: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary">
                                Schedule Interview
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="content-card mt-4">
                <h5>Scheduled Interviews</h5>

                <div className="table-responsive">
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Date</th>
                                <th>Mode</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {interviews.map(item => (
                                <tr key={item.id}>
                                    <td>{item.candidate_name}</td>
                                    <td>
                                        {new Date(
                                            item.interview_date
                                        ).toLocaleString()}
                                    </td>
                                    <td>{item.interview_mode}</td>
                                    <td>{item.status}</td>
                                    
<td>
    {item.status === "Scheduled" && (
        <div className="d-flex gap-2">
            <button
                className="btn btn-sm btn-success"
                onClick={() => handleComplete(item.id)}
            >
                Complete
            </button>

            <button
                className="btn btn-sm btn-danger"
                onClick={() => handleCancel(item.id)}
            >
                Cancel
            </button>
        </div>
    )}

    {item.status === "Completed" && (
        <span className="badge bg-success">
            Completed
        </span>
    )}

    {item.status === "Cancelled" && (
        <span className="badge bg-danger">
            Cancelled
        </span>
    )}
</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InterviewScheduling;
