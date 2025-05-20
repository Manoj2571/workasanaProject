import { useSelector } from "react-redux"
import AvatarGenerator from "../components/avatars/AvatarGenerator"
import SideMenuBar from "../components/navigationBar/SideMenuBar"
import NewTeamModal from "../components/teams/NewTeamModal"
import { useNavigate } from "react-router-dom"



const TeamManagement = () => {

    const navigate = useNavigate()

    const {teams, teamsStatus} = useSelector((state) => state.teams)

    return (
        <div className="d-flex">
            <SideMenuBar />
            <div className="flex-grow-1 px-4 mt-5">
                <div className="d-flex align-items-center">
                <h2 className="mt-2">Teams</h2>
                <button className="ms-auto btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addNewTeam">
                <i className="bi bi-plus"></i>
                <span className="fw-medium ms-2">New Team</span>
                </button>
                </div>

                <NewTeamModal />

                {teamsStatus == "loading" && <div className="text-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>}

                <div className="row my-3">
                    {teamsStatus == "success" && teams.map((team) => <div className="col-md-4 mb-3" key={team._id} onClick={() => navigate(`/teams/${team.name}`)}>
                        <div className="card bg-light  border-0">
                            <div className="card-body m-1">
                                <h5 className="card-title mb-3 fw-bold text-light-emphasis">{team.name}</h5>
                                <AvatarGenerator people={team.members} num={3} size={32}/>
                            </div>
                        </div>
                    </div>)}
                    
                    
                </div>
                
            </div>
        </div>
    )
}

export default TeamManagement