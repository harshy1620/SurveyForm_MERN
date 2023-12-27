import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { clearToken } from "../redux/authSlice";

const SingleSurvey = () => {
  const { surveyId } = useParams();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchSurvey = () => {
      axios
        .get(`http://localhost:4000/survey/getdata/${surveyId}`)
        .then((response) => {
          const surveyData = response.data;
          setData(surveyData.surveyData);
        })
        .catch((error) => {
          console.error("Error fetching survey data:", error);
        });
    };
    handleFetchSurvey();
  }, [surveyId]);

  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="single-survey-data-wrapper">
          <div>
            <h5>SurveyId : </h5>
            <p>{surveyId}</p>
          </div>
          <div>
            <h5>Email Address : </h5>
            <p>{data?.email}</p>
          </div>
          <div>
            <h5>Name : </h5>
            <p>{data?.name}</p>
          </div>
          <div>
            <h5>Nationality : </h5>
            <p>{data?.nationality}</p>
          </div>
          <div>
            <h5>Gender : </h5>
            <p>{data?.gender}</p>
          </div>
          <div>
            <h5>Phone Number : </h5>
            <p>{data?.phone}</p>
          </div>
          <div>
            <h5>Address : </h5>
            <p>{data?.address}</p>
          </div>
          <div>
            <h5>Message : </h5>
            <p>{data?.message}</p>
          </div>
        </div>
        <div className="single-button-container">
          <button>
            <Link to="/survey-data">Back</Link>
          </button>
          <button onClick={() => dispatch(clearToken())}>Logout</button>
        </div>
      </div>
    </main>
  );
};

export default SingleSurvey;
