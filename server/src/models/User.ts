import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 4,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Users = mongoose.model("User", UserSchema);
export default Users;