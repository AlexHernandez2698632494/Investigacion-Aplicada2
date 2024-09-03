import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>API REST</h1>
      <ul>
      <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/equipo">equipo</Link>
        </li>
        <li>
          <Link to="/new">Create teams</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
