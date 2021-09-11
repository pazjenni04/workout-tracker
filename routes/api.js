const router = require("express").Router();
const Workout = require("../models/workout");

//creates new workout
//prefixed in server.js so only need to add the second part of the path Ex: in server.js already have /api so second path name here would concatonate /api/workouts
// router.get("/excercise", ({ body }, res) => {
//   Workout.create(body)
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

router.get("/workouts", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//post a new workout
// router.post("/workouts", (req, res) => {
//   var newWorkout = new Workout({
//     name: req.body.name,
//     type: req.body.type,
//     duration: req.body.duration,
//     weight: req.body.weight,
//     reps: req.body.reps,
//     sets: req.body.sets
//   })
// })

//because passing through URL - updating workout
router.put("/workouts/:id", ({ params }, res) => {
  Workout.findByIdAndUpdate({ _id: mongojs.ObjectId(params.id) });
});

module.exports = router;
