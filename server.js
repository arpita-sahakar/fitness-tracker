const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});


// -----------------------------------------------------------------------------

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    //   .populate("exercise")
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts/:id", (req, res) => {
    db.Workout.findOne({_id:req.params.id})
    //   .populate("exercise")
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workoutsById/:id", (req, res) => {
    db.Workout.findById({_id:req.params.id})
    //   .populate("exercise")
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });
// -------------------------------------------------------------------------------------
  app.post("/api/workouts",(req,res) =>{
    db.Workout.create(req.body)
    .then(data =>{
      res.json(data);
    })
    .catch(err =>{
      res.json(err);
    });
  });

//----------------------------------------------------------------------------------------
  app.delete("/api/delWorkOut/",(req,res)=>{
    const itemToBeDeleted = req.body.day;
    db.Workout.deleteOne({day :itemToBeDeleted })
    .then(data=>{
      res.json(data);
    })
    .catch(err =>{
      res.json(err);
    });
  })


  app.delete("/api/workouts",(req,res)=>{
    db.Workout.deleteMany({day:{$gte:req.body.day}})
    .then(data=>{
      res.json(data);
    })
    .catch(err =>{
      res.json(err);
    });
  })


  app.delete("/api/workoutsById/:id",(req,res)=>{
    db.Workout.findByIdAndDelete(req.params.id)
    .then(data=>{
      res.json(data);
    })
    .catch(err =>{
      res.json(err);
    });
  })


//---------------------------------------------------------------------------------------

app.put("api/workouts/:id",(req,res)=>{
  db.Workout.findOneAndUpdate({_id:req.params.id},req.body)
  .then(data=>{
    res.json(data);
  })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
