import { Link } from "react-router-dom"



const SideMenuBar = () => {

    //dashboard project team report settings

    return (
                <div className="bg-body-secondary col-auto col-md-2 sidebar">
                    <div className="mt-4 mb-5 text-center">
                    <Link className="text-decoration-none d-none d-sm-inline " to="/dashboard">
                        <h1 className="fs-2 d-none d-sm-inline fw-medium" style={{color: "#712cf9"}}>workasana</h1>
                    </Link>
                    </div>
                    <ul className="nav flex-column  ms-4">
                        <li className="nav-item text-secondary mt-1 mb-2 py-sm-0">
                            <Link to="/dashboard" className="nav-link text-secondary" aria-current="page">
                                <i className="bi bi-columns-gap"></i>
                                <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item text-secondary my-2  py-sm-0">
                            <Link to="/projects" className="nav-link text-secondary" aria-current="page">
                                <i className="bi bi-grid-3x3-gap"></i>
                                <span className="ms-2 d-none d-sm-inline">Project</span>
                            </Link>
                        </li>
                        <li className="nav-item text-secondary my-2  py-sm-0">
                            <Link to="/teams" className="nav-link text-secondary" aria-current="page">
                                <i className="bi bi-people"></i>
                                <span className="ms-2 d-none d-sm-inline">Team</span>
                            </Link>
                        </li>
                        <li className="nav-item text-secondary my-2  py-sm-0">
                            <Link to="/tasks" className="nav-link text-secondary" aria-current="page">
                            <   i className="bi bi-stack"></i>
                                <span className="ms-2 d-none d-sm-inline">Task</span>
                            </Link>
                        </li>
                        <li className="nav-item text-secondary my-2  py-sm-0">
                            <Link to="/reports" className="nav-link text-secondary" aria-current="page">
                                <i className="bi bi-bar-chart-line"></i>
                                <span className="ms-2 d-none d-sm-inline fw-normal">Reports</span>
                            </Link>
                        </li>
                        <li className="nav-item text-secondary  my-2  py-sm-0">
                            <Link to="/settings" className="nav-link text-secondary" aria-current="page">
                                <i className="bi bi-gear"></i>
                                <span className="ms-2 d-none d-sm-inline">Setting</span>
                            </Link>
                        </li>
                    </ul>
                </div>
        
    )

}

export default SideMenuBar