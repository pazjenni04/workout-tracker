const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter the name of your workout",
  },
  type: {
    type: String,
    enum: ["resistance, cardio"],
  },
  duration: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  sets: {
    type: Number,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
