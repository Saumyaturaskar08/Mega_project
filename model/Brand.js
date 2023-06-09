import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    unique: true
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}],
},
{
    timestamps:true
});

export const Brand = mongoose.model("Brand",brandSchema);

export default Brand;