
import { useEffect, useState } from "react";
import { getTasks, updateTaskStatus } from "../services/api";

function VirtualHRDashboard() {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        try {
            const response = await getTasks();

            setTasks(
                response.data.filter(
                    task => task.assigned_to === "Virtual HR"
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadTasks();

        const interval = setInterval(loadTasks, 5000);

        return () => clearInterval(interval);
    }, []);

    const changeStatus = async (id, status) => {
        await updateTaskStatus(id, status);
        await loadTasks();
    };

    return (
        <div>
            <h3>Virtual HR Workspace</h3>
            <p className="text-muted">
                View your assigned tasks and update progress.
            </p>

            <div className="row g-3 mt-3">
                {tasks.map(task => (
                    <div className="col-md-6" key={task.id}>
                        <div className="content-card">
                            <h5>{task.title}</h5>

                            <p className="text-muted">
                                {task.description}
                            </p>

                            <p>
                                Priority: <strong>{task.priority}</strong>
                            </p>

                            <label className="form-label">
                                Update Progress
                            </label>

                            <select
                                className="form-select"
                                value={task.status}
                                onChange={e => changeStatus(
                                    task.id,
                                    e.target.value
                                )}
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="content-card mt-3">
                    No tasks assigned to Virtual HR.
                </div>
            )}
        </div>
    );
}

export default VirtualHRDashboard;
