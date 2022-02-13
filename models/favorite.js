const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //ref to user document
      ref: "User",
    },
    campsites: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
//1st argument singular and upper of name of collection which will be 'campsites'. Mongoose will match them. This instantiates documents.

module.exports = Campsite;
