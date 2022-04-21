const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/date-format");

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
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  //   return this.friends.reduce(
  //     (total, user) => total + user.friends.length + 1,
  //     0
  //   );
  return this.friends.length;
});

//create the uaer Model using UserSchema
const User = model("USer", UserSchema);

//export the user mode

module.exports = User;
