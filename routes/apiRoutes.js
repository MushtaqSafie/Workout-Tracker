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

  app.post("/api/workouts", function(req, res) {
    db.Workout.create(req.body).then(dbNewWorkout => {
      console.log(dbNewWorkout);
      res.josn(dbNewWorkout);
    })
    .catch(({ message }) => {
      console.log(message);
    });
  
  });

  app.put("/api/workouts", function(req, res) {
    db.Workout.create(req.body).then(dbNewWorkout => {
      console.log(dbNewWorkout);
      res.josn(dbNewWorkout);
    })
    .catch(({ message }) => {
      console.log(message);
    });
  
  });
  // app.put("/api/images/:id", function(req, res) {
  //   db.Image.updateOne(
  //     { _id: req.params.id },
  //     { rating: req.body.rating }
  //   ).then(function(dbImage) {
  //     res.json(dbImage);
  //   });
  // });
};
