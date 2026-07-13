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

        <Link to="/explore">🔍 Explore</Link>

        <Link to="/movies">🎬 Movies</Link>

        <Link to="/tvshows">📺 TV Shows</Link>

        {/* <Link to="/favorites">❤️ My List</Link> */}
           <Link to="/my-list">
  ❤️ Liked Movies
</Link>

        <Link to="/history">🕒 History</Link>

        {/* <Link to="/liked">👍 Liked</Link> */}
        

        {/* <Link to="/settings">⚙️ Settings</Link> */}
        {/* <Link to="/admin-movies">
  🎬 Movies
</Link> */}
{/* <Link to="/admin-users">
  👥 Users
</Link> */}
{/* <Link to="/admin-reviews">
  ⭐ Reviews
</Link>
<Link to="/admin-analytics">
  📈 Analytics
</Link> */}
     {/* <Link to="/dashboard">
  Dashboard
</Link> */}
<Link to="/smart-recommendation">
  🤖 Smart Recommender
</Link>
{/* <Link to="/user-dashboard">
  👤 User Dashboard
</Link> */}
<li>
  {/* <Link
    to="/recommendation-performance"
  >
    📊 Performance
  </Link> */}
</li>
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