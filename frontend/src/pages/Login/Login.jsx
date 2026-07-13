import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await loginUser(formData);

  localStorage.setItem(
  "token",
  response.data.access_token
);

localStorage.setItem(
  "role",
  response.data.role
);

localStorage.setItem(
  "username",
  response.data.username
);

alert(
  "Login Successful"
);

if (
  response.data.role?.toUpperCase() === "ADMIN"
) {

  navigate(
    "/admin-dashboard"
  );

} else {

  navigate(
    "/home"
  );

}

    } catch (error) {

      alert(
        "Invalid Email or Password"
      );

    }

  };
const token =
  localStorage.getItem("token");

const role =
  localStorage.getItem("role");

if (token) {

  return role?.toUpperCase() === "ADMIN"

    ? <Navigate to="/admin-dashboard" />

    : <Navigate to="/home" />;

}
  return (
    <div className="loginPage">

      <div className="loginCard">

        <h1>🎬 MovieRecs</h1>

        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <div className="signupText">

          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;