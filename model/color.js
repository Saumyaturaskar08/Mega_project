import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
},
{
    timestamps:true
});

export const color = mongoose.model("Color", colorSchema);

export default color;