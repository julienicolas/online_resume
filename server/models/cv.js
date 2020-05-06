const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExperienceSchema = require('./experience');

//création de model
const cvSchema = new Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'user'},
  title: {type: String, required: true},
  picture: {data: Buffer, contentType: String, default: ''},
  experiences: [ExperienceSchema]
}, {timestamps: true});

const CvModel = mongoose.model("cv", cvSchema);

module.exports =CvModel;