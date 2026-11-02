
function Navbar() {
    return (
        <div className="topbar">
            <div>
                <h5 className="mb-0">HR Management</h5>
                <small className="text-muted">
                    Virtual HR + ATS Platform
                </small>
            </div>

            <div className="profile">
                <div className="avatar">A</div>
                <div>
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
