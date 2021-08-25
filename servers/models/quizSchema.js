const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  created: { type: Date, default: Date.now },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  questions: [{ prompt: String, answers: [String], correct: Number }],
});

quizSchema.statics.create = async function (
  _id,
  title,
  description,
  questions
) {
  // Creating new quiz
  const _quiz = new this({
    title,
    creator: _id,
    description,
    questions,
  });

  return _quiz.save();
};

module.exports = mongoose.model("Quiz", quizSchema);
