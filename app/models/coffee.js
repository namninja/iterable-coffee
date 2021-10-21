const mongoose = require("mongoose");

const coffeeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: {
    type: Number,
    default: 1
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

coffeeSchema.pre("find", function(next) {
  this.populate("user");
  next();
});

coffeeSchema.pre("findOne", function(next) {
  this.populate("user");
  next();
});

module.exports = mongoose.model("Coffee", coffeeSchema);
