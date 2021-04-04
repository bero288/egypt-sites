const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const siteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    imgUri :{
      type: String,
      required: true,
    },
    userId :{
      type: String,
      required: true,
    },
    userName :{
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Site = mongoose.model("Site", siteSchema);
module.exports = Site;
