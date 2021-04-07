const db = require("../models");

module.exports = function(app) {
  // get all workout history
  // & add total duration field, ascending order
  app.get("/api/workouts", function(req, res) {
    db.Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" }}
      },
      { $sort: { day: 1 } }
    ]).then(dbWorkouts => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    });
  });

  app.get("/api/workouts/range", function(req, res) {
  // group workout by day, if there is more than one workout in the same day so to combine the exercise for that day
  db.Workout.aggregate([
    // group by day Date and push exercise array into one   e.g [[""],[""],["",""]]
    {
      $group: {
        _id: {
          month: { $month: "$day" },
          day: { $dayOfMonth: "$day" },
          year: { $year: "$day" }
        },
        WorkoutCount: { $sum: 1 },
        exercises: { "$push": "$exercises" },
      }
    },
    // unnest the exercise array   e.g from [[""],["",""]] => ["","",""]
    {
      $addFields: {
        exercises: {
          $reduce: {
            input: "$exercises",
            initialValue: [],
            in: { $concatArrays: ["$$value","$$this"] }
          }
        },
      }
    },
    // structure the response format
    {
      $project : {
        _id: 0,
        // day: { $concat: [ { $substr: ["$_id.year",0,-1] } ,"-", { $substr: ["$_id.month",0,-1] }, "-", { $substr: ["$_id.day",0,-1] }] },
        day: { $dateFromParts: { 'year' : "$_id.year", 'month' : "$_id.month", 'day': "$_id.day" } },
        exercises: 1,
        totalDuration: { $sum: "$exercises.duration" }
      }
    },
    { $sort: { day: 1 } }
  ]).limit(7)

    .then(dbWorkouts => {
      res.json(dbWorkouts);
    });
  });



  // create new workout request
  app.post("/api/workouts", function(req, res) {
    db.Workout.create(req).then(newWorkout => {
        console.log(newWorkout);
        res.json(newWorkout);
      })
      .catch(message => {
        console.log(message);
      });
  });

  // update existing workout, adding new exercise
  app.put("/api/workouts/:id", function(req, res) {
    db.Workout.findByIdAndUpdate(req.params.id,
      { $push: { exercises: req.body } }
    ).then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(( message ) => {
      console.log(message);
    });
  });

};
