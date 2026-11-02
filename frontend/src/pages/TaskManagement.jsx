
import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask
} from "../services/api";

function TaskManagement() {
    const [tasks, setTasks] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        assigned_to: "Virtual HR",
        priority: "Medium",
        due_date: ""
    });

    const loadTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTask({
                ...form,
                due_date: form.due_date
                    ? new Date(form.due_date).toISOString()
                    : null
            });

            setForm({
                title: "",
                description: "",
                assigned_to: "Virtual HR",
                priority: "Medium",
                due_date: ""
            });

            await loadTasks();
            alert("Task assigned successfully!");
        } catch (error) {
            alert(error.response?.data?.detail || "Unable to create task");
        }
    };

    const handleStatus = async (id, status) => {
        await updateTaskStatus(id, status);
        await loadTasks();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this task?")) {
            await deleteTask(id);
            await loadTasks();
        }
    };

    return (
        <div>
            <h3>Task Management</h3>
            <p className="text-muted">Assign and monitor HR tasks.</p>

            <div className="content-card mt-4">
                <h5>Assign New Task</h5>

                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mt-1">
                        <div className="col-md-6">
                            <label className="form-label">Task Title</label>
                            <input
                                className="form-control"
                                placeholder="Enter task title"
                                value={form.title}
                                onChange={e => setForm({
                                    ...form,
                                    title: e.target.value
                                })}
                                required
                                minLength={3}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Assigned To</label>
                            <input
                                className="form-control"
                                value={form.assigned_to}
                                onChange={e => setForm({
                                    ...form,
                                    assigned_to: e.target.value
                                })}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Priority</label>
                            <select
                                className="form-select"
                                value={form.priority}
                                onChange={e => setForm({
                                    ...form,
                                    priority: e.target.value
                                })}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Due Date</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={form.due_date}
                                onChange={e => setForm({
                                    ...form,
                                    due_date: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                value={form.description}
                                onChange={e => setForm({
                                    ...form,
                                    description: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary">
                                Assign Task
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="content-card mt-4">
                <h5>All Tasks</h5>

                <div className="table-responsive">
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Task</th>
                                <th>Assigned To</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.assigned_to}</td>
                                    <td>{task.priority}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={task.status}
                                            onChange={e => handleStatus(
                                                task.id,
                                                e.target.value
                                            )}
                                        >
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {tasks.length === 0 && (
                        <p className="text-center text-muted">
                            No tasks found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskManagement;
