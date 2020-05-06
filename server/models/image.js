const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//création de model
const imageSchema = new Schema({
  filename: { type: String, required: true },
  originalname: {type: String, required: true}
}, {timestamps: true});


const ImageModel = mongoose.model("image", imageSchema);

module.exports = ImageModel;
