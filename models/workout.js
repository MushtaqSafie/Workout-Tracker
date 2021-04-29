const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// {
//   day: new Date().setDate(new Date().getDate()-10),
//   exercises: [
//     {
//       type: "resistance",
//       name: "Bicep Curl",
//       duration: 20,
//       weight: 100,
//       reps: 10,
//       sets: 4
//     }
//   ]
// },

const workoutSchema = new Schema({
  day: { type: Date, default: Date.now },
  exercises: [
    {
      type: { type: String, required: true },
      name: { type: String, required: true },
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;