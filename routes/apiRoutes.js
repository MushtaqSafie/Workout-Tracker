const db = require("../models");

module.exports = function(app) {
  app.get("/api/workouts", function(req, res) {
    db.Workout.find({}).then(function(dbWorkouts) {
      res.json(dbWorkouts);
    });
  });

  app.get("/api/workouts/range", function(req, res) {
    db.Workout.find({}).then(function(dbWorkouts) {
      res.json(dbWorkouts);
    });
  });

  // create new workout request
  app.post("/api/workouts", function(req, res) {
    db.Workout.create(req).then(newWorkout => {
        console.log(newWorkout);
        res.json(newWorkout);
      })
      .catch(result => {
        console.log(result);
      });
  });

  // update existing workout, adding new exercise
  app.put("/api/workouts/:id", function(req, res) {
    db.Workout.update(
      { _id: req.params.id },
      { exercises: req.body }
    ).then(function(dbWorkouts) {
      res.json(dbWorkouts);
    })
    .catch(({ message }) => {
      console.log(message);
    });
  
  });

};
