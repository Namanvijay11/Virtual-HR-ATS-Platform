
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import EmployerDashboard from "./pages/EmployerDashboard";
import TaskManagement from "./pages/TaskManagement";
import VirtualHRDashboard from "./pages/VirtualHRDashboard";
import InterviewScheduling from "./pages/InterviewScheduling";

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">

                <Sidebar />

                <div className="main-section">
                    <Navbar />

                    <div className="page-content">
                        <Routes>
                            <Route
                                path="/"
                                element={<EmployerDashboard />}
                            />

                            <Route
                                path="/tasks"
                                element={<TaskManagement />}
                            />

                            <Route
                                path="/virtual-hr"
                                element={<VirtualHRDashboard />}
                            />

                            <Route
                                path="/interviews"
                                element={<InterviewScheduling />}
                            />
                        </Routes>
                    </div>
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
