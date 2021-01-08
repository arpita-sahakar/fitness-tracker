const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
        type: {
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
                return this.type === "resistance"
            },
          },
          reps:  {
            type: Number,
            required: function (){
                return this.type === "resistance"
            },
          },
          sets: {
            type: Number,
            required: function (){
                return this.type === "resistance"
            },
          },
          distance:  {
            type: Number,
            required: function (){
                return this.type === "cardio"
            },
          },
    }
  ],
  totDuration : Number
});

WorkoutSchema.methods.setTotalDuration = function() {
  console.log("inside set duration");
  console.log(this);

  return this.totDuration;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;