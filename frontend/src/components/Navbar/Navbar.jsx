import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const username =
    localStorage.getItem("username");

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="navbar">
       <div className="navLeft">

        <div
            className="logo"
            onClick={() => navigate("/home")}
        >
            🎬 MovieRecs
        </div>

    </div>

      <div className="searchBox">

        <input
          type="text"
          placeholder="🔍 Search movies..."
        />

      </div>

      <div className="navRight">

        <span className="bell">

          🔔

        </span>

        <div
          className="profile"
          onClick={() => setOpen(!open)}
        >

          👤 Welcome, {username} ▼

          {

            open && (

              <div className="dropdown">

                <div
                  onClick={() =>
                    navigate("/profile")
                  }
                >

                  👤 Profile

                </div>

                <div
                  onClick={() =>
                    navigate("/user-dashboard")
                  }
                >

                  📊 Dashboard

                </div>

                <div>

                  ⚙ Settings

                </div>

                <div
                  className="logout"
                  onClick={logout}
                >

                  🚪 Logout

                </div>

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default Navbar;