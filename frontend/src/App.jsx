
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import EmployerDashboard from "./pages/EmployerDashboard";
import TaskManagement from "./pages/TaskManagement";
import VirtualHRDashboard from "./pages/VirtualHRDashboard";
import InterviewScheduling from "./pages/InterviewScheduling";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <BrowserRouter>
            <div className="app-layout">

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={closeSidebar}
                />

                {sidebarOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={closeSidebar}
                    />
                )}

                <div className="main-section">
                    <Navbar
                        onMenuClick={() =>
                            setSidebarOpen(!sidebarOpen)
                        }
                    />

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
