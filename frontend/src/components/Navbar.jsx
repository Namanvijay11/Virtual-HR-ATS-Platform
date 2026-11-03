
import { Menu } from "lucide-react";

function Navbar({ onMenuClick }) {
    return (
        <div className="topbar">

            <div className="navbar-left">
                <button
                    className="mobile-menu-btn"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                >
                    <Menu size={24} />
                </button>

                <div>
                    <h5 className="mb-0">HR Management</h5>

                    <small className="text-muted">
                        Virtual HR + ATS Platform
                    </small>
                </div>
            </div>

            <div className="profile">
                <div className="avatar">A</div>

                <div className="profile-info">
                    <strong>Admin</strong>

                    <small className="d-block text-muted">
                        Employer
                    </small>
                </div>
            </div>

        </div>
    );
}

export default Navbar;
