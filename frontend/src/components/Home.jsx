import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectToken, clearToken } from "../redux/authSlice";

const Home = ({ isAdmin }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const nationalityOptions = [
    "Select",
    "American",
    "British",
    "Canadian",
    "Indian",
    "Other",
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://localhost:4000/survey/add",
        { name, gender, nationality, email, phone, address, message },
        config
      )
      .then((response) => {
        const responseData = response.data;
        if (responseData.success) {
          alert("Survey submitted successfully");
        } else {
          alert(responseData.message);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error, "error");
        alert("Error submitting survey, please try again later.");
        navigate("/");
      });
  };

  return (
    <main>
      {isAdmin ? (
        <button className="admin-data">
          <Link to="/survey-data">Sell all Survey Data</Link>
        </button>
      ) : null}
      <div className="survey-wrapper">
        <div className="top-container">
          <div className="heading-wrapper">
            <h1>Welcome </h1>
            <p>Please Fill the Survey</p>
          </div>
          <button className="logout" onClick={() => dispatch(clearToken())}>
            Logout
          </button>
        </div>

        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                placeholder="Enter your name here"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
          </div>

          <div>
            <label className="gender-wrapper">
              Gender:
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </label>
          </div>

          <div>
            <label className="nationality-wrapper">
              Nationality:
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
                {nationalityOptions.map((nationality, index) => (
                  <option key={index} value={nationality}>
                    {nationality}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="Enter your email here"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
          </div>

          <div>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number here"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </label>
          </div>

          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                placeholder="Enter your address here"
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </label>
          </div>

          <div>
            <label>
              Message:
              <input
                type="text"
                name="message"
                placeholder="Enter your message here"
                required
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Home;
