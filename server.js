const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// -----------------------------------------------------------------------------
// api routes

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find().sort({day:-1}).limit(7)
    //   .populate("exercise")
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    //   .populate("exercise")
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts/:id", (req, res) => {
  console.log(req.params.id);
  db.Workout.findOne({ _id: req.params.id })
    //   .populate("exercise")
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workoutsById/:id", (req, res) => {
  console.log(req.params.id);
  db.Workout.findById(req.params.id)
    //   .populate("exercise")
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});
// -------------------------------------------------------------------------------------
app.post("/api/workouts", (req, res) => {
  req.body.totDuration = 0;
  db.Workout.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//----------------------------------------------------------------------------------------
// app.delete("/api/delWorkOut/",(req,res)=>{
//   const itemToBeDeleted = req.body.day;
//   db.Workout.deleteOne({day :itemToBeDeleted })
//   .then(data=>{
//     res.json(data);
//   })
//   .catch(err =>{
//     res.json(err);
//   });
// })

// app.delete("/api/workouts",(req,res)=>{
//   db.Workout.deleteMany({day:{$gte:req.body.day}})
//   .then(data=>{
//     res.json(data);
//   })
//   .catch(err =>{
//     res.json(err);
//   });
// })

app.delete("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//---------------------------------------------------------------------------------------

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  // db.students.update({name: "Steve"}, {$push: {"hobbies":"Extreme Basketweaving"}})
  // const workoutObj = new Workout(req.body);
  // workoutObj.setTotalDuration();

  // db.Workout.create(workoutObj)
  db.Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  ).then((data) => {
    res.json(data);
  });
});
//__________________________________________________________________________________________
//html routes

const path = require("path");
const { Workout } = require("./models");

app.get("/exercise", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

//______________________________________________________________________________________________

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
