import { useEffect, useState } from "react";
import { getTeamsRequest } from "../api/teams.api";
import TeamsCard from "../components/teamCard";

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    async function loadTeams() {
      const response = await getTeamsRequest();
      setTeams(response.data);
      //   console.log(response.data)
    }
    loadTeams();
  });

  function renderMain() {
    if(teams.length ===0) return <h1>No hay Equipos registrados</h1> 
    return teams.map((team) => <TeamsCard team={team} key={team.id} />);
  }
  return (
    <div>
      <h1>Equipo</h1>
      {renderMain()}
    </div>
  );
}

export default TeamsPage;
