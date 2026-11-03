
import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    ClipboardList,
    CalendarDays,
    Users,
    X
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
    const getNavClass = ({ isActive }) =>
        isActive ? "nav-item active" : "nav-item";

    return (
        <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

            <div className="sidebar-header">
                <h4 className="brand">Salarite</h4>

                <button
                    className="sidebar-close-btn"
                    onClick={onClose}
                    aria-label="Close navigation menu"
                >
                    <X size={23} />
                </button>
            </div>

            <p className="sidebar-label">WORKSPACE</p>

            <NavLink
                to="/"
                end
                className={getNavClass}
                onClick={onClose}
            >
                <LayoutDashboard size={19} />
                Dashboard
            </NavLink>

            <NavLink
                to="/tasks"
                className={getNavClass}
                onClick={onClose}
            >
                <ClipboardList size={19} />
                Task Management
            </NavLink>

            <NavLink
                to="/interviews"
                className={getNavClass}
                onClick={onClose}
            >
                <CalendarDays size={19} />
                Interviews
            </NavLink>

            <NavLink
                to="/virtual-hr"
                className={getNavClass}
                onClick={onClose}
            >
                <Users size={19} />
                Virtual HR
            </NavLink>

        </div>
    );
}

export default Sidebar;
