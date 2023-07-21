import mongoose, { Mongoose } from "mongoose";
const Schema = Mongoose.Schema;
const couponSchema = new mongoose.Schema(
  {
    code: {
        type: String,
        required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    discount: {
      type: Number,
      required: true,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    
    }
  },
  {
    timestamps: true
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
