
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ClipboardList,
    CalendarDays,
    Users
} from "lucide-react";

function Sidebar() {
    return (
        <div className="sidebar">
            <h4 className="brand">Salarite</h4>

            <p className="sidebar-label">WORKSPACE</p>

            <NavLink to="/" end className="nav-item">
                <LayoutDashboard size={19} />
                Dashboard
            </NavLink>

            <NavLink to="/tasks" className="nav-item">
                <ClipboardList size={19} />
                Task Management
            </NavLink>

            <NavLink to="/interviews" className="nav-item">
                <CalendarDays size={19} />
                Interviews
            </NavLink>

            <NavLink to="/virtual-hr" className="nav-item">
                <Users size={19} />
                Virtual HR
            </NavLink>
        </div>
    );
}

export default Sidebar;
