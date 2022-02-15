const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //ref to user document coming in as req.user._id
      ref: "User",
    },
    campsites: [
      {
        type: String, //req.params.campsiteId
        ref: "Campsite",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
//1st argument singular and upper of name of collection which will be 'favorites'. Mongoose will match them. This instantiates documents.

module.exports = Favorite;
