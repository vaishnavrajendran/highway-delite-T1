import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    }
  },
  { timestamps: true, expires: 3600 }
);

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;