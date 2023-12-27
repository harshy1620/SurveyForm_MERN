import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { clearToken } from "../redux/authSlice";

const AllSurveyData = () => {
  const [surveyData, setSurveyData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchSurveys = () => {
      axios
        .get("http://localhost:4000/survey/getdata")
        .then((response) => {
          const surveyData = response.data;
          setSurveyData(surveyData);
        })
        .catch((error) => {
          console.error("Error fetching survey data:", error);
        });
    };
    handleFetchSurveys();
  }, []);

  return (
    <div className="survey-data-wrapper">
      <button className="admin-logout" onClick={() => dispatch(clearToken())}>
        Logout
      </button>
      <button className="admin-logout">
        <Link to="/" style={{ color: "white" }}>
          Home
        </Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>SurveyId</th>
            <th>Email</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Nationality</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Message</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {surveyData &&
            surveyData.map((survey) => (
              <tr key={`survey-data-${survey._id}`}>
                <td>{survey._id}</td>
                <td>{survey.email}</td>
                <td>{survey.name}</td>
                <td>{survey.gender}</td>
                <td>{survey.nationality}</td>
                <td>{survey.phone}</td>
                <td>{survey.address}</td>
                <td>{survey.message}</td>
                <td>
                  <Link to={`/survey-data/${survey._id}`}>View Data</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSurveyData;
