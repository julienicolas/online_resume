const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//création de model
const experienceSchema = new Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'cv'},
  title: {type: String, required: true},
}, {timestamps: true});

const ExperienceModel = mongoose.model("experience", experienceSchema);

module.exports = ExperienceModel;