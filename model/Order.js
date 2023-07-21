// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
// // Generate random numbers for orders

// const randomTxt = Math.random().toString(36).substring(7).toLocaleLowerCase()
// const randomNumbers = Math.floor(1000 + Math.random() * 90000)

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     // orderItems: [
//     //   {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'OrderItem',
//     //     required: true,
//     //   },
//     // ],
//     orderItems: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     shippingAddress: {
//       type: String,
//       required: true,
//     },
//     orderNumber: {
//       type: String,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//     //   enum: ['Pending', 'Paid', 'Failed'],
//     //   default: 'Pending',
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//     currency: {
//         type: String,
//        // required: true,
//       },
//       status: {
//         type: String,
//         enum: ['Pending', 'Paid'],
//         default: 'Pending',
//     },
//     deliverAt: {
//       type: Date,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model('Order', orderSchema);

// export default Order;
import mongoose from "mongoose"
const Schema = mongoose.Schema;

// Generate random numbers for orders

const randomTxt = Math.random().toString(36).substring(7).toLocaleLowerCase()
const randomNumbers = Math.floor(1000 + Math.random() * 90000)
const OrderSchema = new Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [{
        type: Object,
        required: true,
    }, ],
    shippingAddress: {
        type: Object,
        required: true,
    },
    totalPrice: {
        type: Number,
        default:0.0,
    },
    orderNumber: {
        type: String,
        default:randomTxt + randomNumbers,
    },
    paymentStatus: {
        type: String,
        default:"Not Paid",
    },
    paymentMethod: {
        type: String,
        default:"Not Specified",
    },
    currency: {
        type: String,
        default:"Not Specified",
    },
    status: {
        type: String,
        default:"pending",
        enum:['pending','processing','shipped','delivered']

    },
    deliveredAt: {
        type: Date

    },
    

}, {
    timestamps: true

});

// Virtuals

// complete schema to Model
const Order = mongoose.model('Order', OrderSchema);
export default Order;