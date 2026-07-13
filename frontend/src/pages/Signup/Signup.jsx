import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";
import "./Signup.css";
function Signup() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
});
const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

};

const handleSubmit = async (e) => {

  e.preventDefault();

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    alert("Passwords do not match");
    return;
  }

  try {

    const response =
      await signupUser({

        name: formData.name,

        email: formData.email,

        password: formData.password

      });

    alert(
      response.data.message
    );

    navigate("/login");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Signup Failed"
    );

  }

};
  return (
    <div className="signupPage">

      <div className="signupCard">

        <div className="logoSection">
          <h1>🎬 MovieRecs</h1>
        </div>

        <h2>Create Account</h2>

        <p>
          Join MovieRecs and start your movie
          journey today.
        </p>

        <form onSubmit={handleSubmit}>

         <input
  type="text"
  name="name"
  placeholder="Full Name"
  onChange={handleChange}
/>

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

<input
  type="password"
  name="confirmPassword"
  placeholder="Confirm Password"
  onChange={handleChange}
/>

          <div className="terms">

            <input
              type="checkbox"
            />

            <span>
              I agree to Terms of Service
              and Privacy Policy
            </span>

          </div>

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="googleBtn">
          Continue with Google
        </button>

        <div className="loginText">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Signup;