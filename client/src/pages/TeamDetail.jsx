import AvatarGenerator from "../components/avatars/AvatarGenerator"
import SideMenuBar from "../components/navigationBar/SideMenuBar"
import NewTeamMemberModal from "../components/teams/NewTeamMemberModal"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

const TeamDetail = () => {
    const navigate = useNavigate()
    const {teamName} = useParams()
    const {teams} = useSelector((state) => state.teams)

    const currentTeam = teams.find((team) => team.name == teamName)


    return (
        <div className="d-flex">
        <SideMenuBar />
       <div className="flex-grow-1 px-4 mt-5">
        <div className="mt-3  mb-5 text-primary" onClick={() => navigate("/teams")} style={{cursor: "pointer"}}>
        <i className="bi bi-arrow-left"></i>
        <span className="ms-2 fw-medium">Back to Teams</span>
        </div>

        <div>
            <h2 className="text-secondary-emphasis pt-1 pb-2">{currentTeam.name}</h2>
            <p className="text-black text-opacity-25 fw-bold my-3">MEMBERS</p>
        </div>
        <div>
            {currentTeam.members.map((member, index) => <AvatarGenerator people={[currentTeam.members[index]]} num={3} size={32}/>)}
        </div>
        <button className="btn btn-primary btn-sm my-5" data-bs-target="#addNewMember" data-bs-toggle="modal">
            <i className="bi bi-plus"></i>
            <span className="ms-1 fw-medium">Member</span>
        </button>

        <NewTeamMemberModal team={currentTeam}/>
       </div>
       </div>
    )
}

export default TeamDetail