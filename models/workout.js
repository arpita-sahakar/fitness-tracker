const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
        exerciseType: {
            type: String,
            required: [true, "Exercise type is mandatory"],
            enum: ["resistance", "cardio"],
          },
          name: {
            type: String,
            required: [true, "Exercise name is required"],
          },
          duration: {
            type: Number,
            min: [1, "Exercise duration cannot be less than 1"],
            required: [true, "Exercise duration is required"],
          },
          weight: {
            type: Number,
            required: function (){
                return this.exerciseType === "resistance"
            },
          },
          reps:  {
            type: Number,
            required: function (){
                return this.exerciseType === "resistance"
            },
          },
          sets: {
            type: Number,
            required: function (){
                return this.exerciseType === "resistance"
            },
          },
          distance:  {
            type: Number,
            required: function (){
                return this.exerciseType === "cardio"
            },
          },
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;