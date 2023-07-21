// var mongoose = require('mongoose');
// order controller
// // import Order from "../model/Order.js";
// // // Create a new order
// // export const createOrder = async (req, res) => {
// //     try {
// //       const {
// //         user,
// //         orderItems,
// //         shippingAddress,
// //         orderNumber,
// //         paymentMethod,
// //         deliverAt,
// //       } = req.body;
  
// //       // Create the order
// //       const order = await Order.create({
// //         user,
// //         orderItems,
// //         shippingAddress,
// //         orderNumber,
// //         paymentMethod,
// //         deliverAt,
// //       });
  
// //       res.status(201).json({ success: true, message: 'Order created successfully', order });
// //     } catch (error) {
// //       console.error(error);
// //       res.status(400).json({ success: false, message: 'Unable to create order' });
// //     }
// //   };



// //   // find the user 
// //   // get the payload(custommer,orderitem,shippingaddress,totalprice)chek it if order is not empty
// //   // save into db ordertable 
// //   // update the orderquantity and "make a quantity"
// //   //payment webhook
// //   // update the user order 
  
// //   import express from 'express';
// //   import bodyParser from 'body-parser';
// //   // import Order from '../model/Order.js';
// //   // import db from 'your-database-library'; // Replace 'your-database-library' with the actual database library
  
// //    export const app = express();
  
// //   // Set up middleware to parse JSON payloads
// //   app.use(bodyParser.json());
  
// //   // Define a route to handle the webhook requests
// //   app.post('/webhook', async (req, res) => {
// //     try {
// //       const payload = req.body;
  
// //       // Extract the relevant information from the payload
// //       const { customer, order_items: orderItems, shipping_address: shippingAddress, total_price: totalPrice, order_number: orderNumber } = payload;
  
// //       // Save the information to the database and update the product quantity
// //       await saveToDatabase(customer, orderItems, shippingAddress, totalPrice, orderNumber);
// //       await updateProductQuantity(orderItems);
  
// //       // Send a response to the webhook request
// //       res.status(200).send('Webhook received successfully');
// //     } catch (error) {
// //       console.error('Failed to process webhook:', error);
// //       res.status(500).send('An error occurred while processing the webhook');
// //     }
// //   });
  
// //   // Function to save the information to the database
// //   async function saveToDatabase(customer, orderItems, shippingAddress, totalPrice, orderNumber) {
// //     try {
// //       // Assuming you have a "orders" collection/table in your database
// //       const orderData = {
// //         customer: customer,
// //         orderItems: orderItems,
// //         shippingAddress: shippingAddress,
// //         totalPrice: totalPrice,
// //         orderNumber: orderNumber,
// //       };
  
// //       // Insert the orderData object into the "orders" collection/table
// //       await db.orders.insert(orderData);
// //       console.log('Order saved to the database');
// //     } catch (error) {
// //       console.error('Failed to save order to the database:', error);
// //       throw error;
// //     }
// //   }
  
// //   // Function to update the product quantity
// //   async function updateProductQuantity(orderItems) {
// //     try {
// //       for (const item of orderItems) {
// //         const productId = item.product_id;
// //         const quantity = item.quantity;
  
// //         // Fetch the product from the database based on the productId
// //         const product = await db.products.findOne({ _id: productId });
  
// //         if (product) {
// //           // Update the product quantity
// //           product.quantity -= quantity;
  
// //           // Save the updated product to the database
// //           await db.products.update({ _id: productId }, product);
// //         }
// //       }
  
// //       console.log('Product quantities updated');
// //     } catch (error) {
// //       console.error('Failed to update product quantities:', error);
// //       throw error;
// //     }
// //   }
  
// //   // Start the server
// //   app.listen(3000, () => {
// //     console.log('Server started on port 3000');
// //   });
// import Order from "../model/Order.js";
//   import User from "../model/User.js"; 
  
//   // Assuming you have a User model
  
//   // Create a new order
//   export const createOrder = async (req, res) => {
//     try {
//       const {
//         user,
//         orderItems,
//         shippingAddress,
//         orderNumber,
//         paymentMethod,
//         deliverAt,
//       } = req.body;
  
//       // Find the user
//       const User = await User.findById(req.useAuthId); // Assuming you are using MongoDB and have a findById method
  
//       // if (!foundUser) {
//       //   return res.status(404).json({ success: false, message: 'User not found' });
//       // }
  
//       // Check if order is empty
//       if (orderItems?.length <= 0) {
//         // return res.status(400).json({ success: false, message: 'Order is empty' });
//         throw new Error("No order Items")
//       }
  
//       // Calculate the total price and update the order quantity
//       let totalPrice = 0;
  
//       const updatedOrderItems = orderItems.map((item) => {
//         const { productId, quantity } = item;
//         totalPrice += quantity * item.price;
  
//         return {
//           productId,
//           quantity,
//         };
//       });
  
//       // Create the order
//       const order = await Order.create({
//         user:user?._id, //optional changing 
//         orderItems: updatedOrderItems,
//         shippingAddress,
//         orderNumber,
//         paymentMethod,
//         deliverAt,
//         totalPrice,
//       });
  
//       // Update the user's order list
//       foundUser.orders.push(order._id);
//       await foundUser.save();
  
//       // Perform additional operations based on the payment status from the webhook
//       const { paymentStatus } = req.body;
  
//       if (paymentStatus === 'succeeded') {
//         // Payment succeeded, update the order status accordingly
//         order.paymentStatus = paymentStatus;
//         order.paymentDate = new Date();
//         await order.save();
//       } else {
//         // Payment failed or pending, handle accordingly
//         // You can update the order status or take appropriate actions
//       }
  
//       res.status(201).json({ success: true, message: 'Order created successfully', order });
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ success: false, message: 'Unable to create order' });
//     }
//   };