const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = require("./config/db");

app.use("/user", require("./routes/UserRoutes"));
app.use("/survey", require("./routes/SurveyRoutes"));

app.listen(4000, () => console.log("Server running on port 4000"));
