import axios from "axios";

export const getTeamsRequest = async() =>
  await axios.get("http://localhost:4000/team");

export const createTeamsRequest = async (teams) =>
  await axios.post("http://localhost:4000/team", teams);

export const deleteTeamsRequest = async (id) =>
  await axios.delete(`http://localhost:4000/team/${id}`)