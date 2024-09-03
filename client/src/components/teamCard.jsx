import { deleteTeamsRequest } from "../api/teams.api";

function TeamsCard({ team }) {
  const handleDelete = async (id) => {
    try {
      const response = await deleteTeamsRequest(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>{team.nombre}</h2>
      <p>{team.ciudad}</p>
      <p>{team.fechaFundacion}</p>
      <button>edit</button>
      <button onClick={() => handleDelete(team.id)}>delete</button>
    </div>
  );
}

export default TeamsCard;
