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
    required: "Must enter a duration time",
  },
  weight: {
    type: Number,
    required: "Must include weight of set",
  },
  reps: {
    type: Number,
    required: "Must include amount of reps completed",
  },
  sets: {
    type: Number,
    required: "Must include amount of sets completed",
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
