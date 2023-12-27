const Survey = require("../models/Survey");

module.exports.addSurveyData = async (req, res) => {
  const user = req.user;
  const { name, gender, nationality, email, phone, address, message } =
    req.body;
  if (name && gender && nationality && email && phone && address && message) {
    try {
      await Survey.create({
        user: user._id,
        name,
        gender,
        nationality,
        email,
        phone,
        address,
        message,
      });
      return res.json({
        success: true,
        message: "Survey submitted successfully.",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Internal server error at adding a survey data.",
      });
    }
  }
  return res.json({ success: false, message: "All information is required." });
};

module.exports.getAllSurveyData = async (req, res) => {
  try {
    const allSurveys = await Survey.find({});
    return res.json(allSurveys);
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error at finding all surveys data.",
    });
  }
};

module.exports.getSingleSurveyData = async (req, res) => {
  const { surveyId } = req.params;
  try {
    const surveyData = await Survey.findById(surveyId);
    if (!surveyData) {
      return res
        .status(404)
        .json({ success: false, message: "Survey data not found." });
    }
    return res.json({ success: true, surveyData });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error at finding a survey data.",
    });
  }
};
