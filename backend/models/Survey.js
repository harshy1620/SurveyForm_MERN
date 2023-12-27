const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  gender: String,
  nationality: String,
  email: String,
  phone: Number,
  address: String,
  message: String,
});

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
