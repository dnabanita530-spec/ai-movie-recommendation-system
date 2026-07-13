import { NavLink } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
const username =
  localStorage.getItem("username");
  return (

    <div className="navbar">

      <div className="navLinks">

        <NavLink to="/home">Home</NavLink>

        {/* <NavLink to="/movies">Movies</NavLink> */}

        <NavLink to="/genres">Genres</NavLink>
           <NavLink to="/browse">
          Browse Movies
        </NavLink>

        <NavLink to="/recommendations">Recommendations</NavLink>
        <NavLink to="/user-dashboard">
  👤User Dashboard
</NavLink>

        {/* <NavLink to="/favourites">My List</NavLink> */}

      </div>

      <div className="navRight">

        <input
          type="text"
          placeholder="Search movies, actors..."
        />

        <span className="bell">
          🔔
        </span>

        <div className="profile">

          <h3>
  Welcome {username} !
</h3>

        </div>

      </div>

    </div>

  );
}

export default Navbar;