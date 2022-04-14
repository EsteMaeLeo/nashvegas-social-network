const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (createdAt) => dateFormat(createdAt),
    },
    thoughts: [],
    friends: [],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// UserSchema.virtual("commentCount").get(function () {
//   //return this.comments.length;
//   return this.comments.reduce(
//     (total, comment) => total + comment.replies.length + 1,
//     0
//   );
// });

//create the uaer Model using UserSchema
const User = model("USer", UserSchema);

//export the user mode

module.exports = User;
