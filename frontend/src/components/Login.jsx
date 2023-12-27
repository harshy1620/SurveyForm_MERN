import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(e);

    axios
      .post("http://localhost:4000/user/login", { email, password })
      .then((response) => {
        const responseData = response.data;
        if (responseData.success) {
          const token = responseData.token;
          dispatch(setToken(token));
          alert("Login successful.");
          navigate("/");
        } else {
          alert(responseData.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error, "error");
        alert("Error loggin in, please try again later.");
        navigate("/login");
      });
  };

  return (
    <main>
      <div className="auth-wrapper">
        <div className="img-wrapper">
          <img
            src="https://png.pngtree.com/png-clipart/20230504/original/pngtree-free-vector-login-concept-illustration-png-image_9140539.png"
            alt="signup"
          />
        </div>
        <div className="form-wrapper">
          <h1>Please Login</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="email"
              name="email"
              required
              placeholder="youremail@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
            <button type="submit">Signup</button>
            <Link to="/signup">
              Don't have an account ? <span>Signup</span>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
