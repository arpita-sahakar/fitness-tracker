// api routes
let db = require("../models");

function routes(app) {
    // fetch last 7days workout data
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
      .sort({ day: -1 })
      .limit(7)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // get all workout data
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // get workout data by id
  app.get("/api/workouts/:id", (req, res) => {
    console.log(req.params.id);
    db.Workout.findOne({ _id: req.params.id })
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // create workout
  app.post("/api/workouts", (req, res) => {
    console.log(req.body);
    db.Workout.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // delete workout by id
  app.delete("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndDelete(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // update workout by id
  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    db.Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    ).then((data) => {
      res.json(data);
    });
  });
}

//export api-routes
module.exports = routes;