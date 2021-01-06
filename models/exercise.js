const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
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
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
