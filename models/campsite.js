const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const campsiteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    elevation: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Currency,
      required: true,
      min: 0,
    },
    comments: [commentSchema], //add comment schema as subdocument. allows all campsites documents to be able to store multiple comments in an array
  },
  {
    timestamps: true, // 2nd argument is for configs. timestamps = created at & updated at properties
  }
);

// Model - returns a constructor function = like classes
const Campsite = mongoose.model("Campsite", campsiteSchema);
//1st argument singular and upper of name of collection which will be 'campsites'. Mongoose will match them. This instantiates documents.

module.exports = Campsite;
