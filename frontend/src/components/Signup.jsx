import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/user/signup", {
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        const responseData = response.data;
        if (responseData.success) {
          alert("Signup successful, please login.");
          navigate("/login");
        } else {
          alert(responseData.message);
          navigate("/signup");
        }
      })
      .catch((error) => {
        console.error(error, "error");
        alert("Error signing up, please try again later.");
        navigate("/signup");
      });
  };

  return (
    <main>
      <div className="auth-wrapper">
        <div className="img-wrapper">
          <img
            src="https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png"
            alt="signup"
          />
        </div>
        <div className="form-wrapper">
          <h1>Please Sign Up</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="email"
              name="email"
              required
              placeholder="youremail@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              vlaue={email}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="*******"
              min={6}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="********"
              min={6}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <button type="submit">Signup</button>
            <Link to="/login">
              Already have an account ? <span>Login</span>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
