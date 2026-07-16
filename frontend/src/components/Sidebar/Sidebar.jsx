import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
function Sidebar() {
   const navigate = useNavigate();
  const role =
  localStorage.getItem(
    "role"
  );
 
 const logout = () => {

    localStorage.clear();

    navigate("/");

  };
  return (
    <div className="sidebar">

      <div className="logo">
        🎬 MovieRecs
      </div>

      <nav>

        <Link to="/home">🏠 Home</Link>
        <Link to="/genres">
   🎭 Genres
</Link>
 
 <Link to="/browse">
          🎬 Browse Movies
        </Link>
        <Link to="/recommendations"> ⭐ Recommendations</Link>
<Link to="/smart-recommendation">
  🤖 Smart Recommender
</Link>
        
           <Link to="/my-list">
  ❤️ Liked Movies
</Link>

        <Link to="/history">🕒 History</Link>

        

{/* <Link to="/admin-dashboard">
  Admin Dashboard
</Link> */}
        {/* <Link to="/logout">🚪 Logout</Link> */}
        {
  role === "ADMIN" && (

    <Link
      to="/admin-dashboard"
      className="adminMenu"
    >

      ⚙ Admin Panel

    </Link>

  )
}
<button
          className="logoutBtn"
          onClick={logout}
        >

          🚪 Logout

        </button>

        

      </nav>

    </div>
  );
}

export default Sidebar;