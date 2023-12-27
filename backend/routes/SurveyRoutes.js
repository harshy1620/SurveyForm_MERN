const {
  addSurveyData,
  getAllSurveyData,
  getSingleSurveyData,
} = require("../controllers/SurveyControllers");
const { authenticateUser } = require("../middleware/authenticateUser");

const router = require("express").Router();

router.post("/add", authenticateUser, addSurveyData);
router.get("/getdata", getAllSurveyData);
router.get("/getdata/:surveyId", getSingleSurveyData);

module.exports = router;
