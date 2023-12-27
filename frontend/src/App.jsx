import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { selectToken } from "./redux/authSlice";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import SingleSurvey from "./components/SingleSurvey";
import AllSurveyData from "./components/AllSurveyData";

const App = () => {
  const token = useSelector(selectToken);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const checkIsAdmin = () => {
      axios
        .get(`http://localhost:4000/user/isAdmin/${token}`)
        .then((response) => {
          const data = response.data;
          setIsAdmin(data.success);
        })
        .catch((error) => {
          console.error("Error in checking user", error);
          setIsAdmin(false);
        });
    };
    checkIsAdmin();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={token ? <Home isAdmin={isAdmin} /> : <Login />}
        />
        <Route
          path="/survey-data"
          element={isAdmin ? <AllSurveyData /> : <Home />}
        />
        <Route
          path="/survey-data/:surveyId"
          element={isAdmin ? <SingleSurvey /> : <Home />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
