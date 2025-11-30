import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/foodDelivery?serverSelectionTimeoutMS=10000").then(() => console.log("DB Connected"))
}