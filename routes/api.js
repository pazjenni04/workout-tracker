const router = require("express").Router();
const Workout = require("../models/workout");

//creates new workout
//prefixed in server.js so only need to add the second part of the path Ex: in server.js already have /api so second path name here would concatonate /api/workouts
router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

//gets all workouts
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//gets the last workout
router.get("/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$excercises.duration" },
      },
    },
  ])
    //will sort by descending order
    .sort({ _id: -1 })
    //limits to the last workout
    .limit(1)
    .then((lastWorkout) => {
      console.log(lastWorkout);
      res.json(lastWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//displays last 7 workouts
router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    //will sort by descending order
    .sort({ _id: -1 })
    //limits to the last 7 workouts
    .limit(7)
    .then((lastSeven) => {
      console.log(lastSeven);
      res.json(lastSeven);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//updates one workout in the system
router.put("/workouts/:id", (req, res) => {
  Workout.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: {
          type: req.body.type,
          name: req.body.name,
          distance: req.body.distance,
          duration: req.body.duration,
          weight: req.body.weight,
          sets: req.body.sets,
          reps: req.body.reps,
        },
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

module.exports = router;
