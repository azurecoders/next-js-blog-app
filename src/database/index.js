import mongoose from "mongoose";

const connectToDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Successfuly"))
    .catch(() => console.log("Connection to MongoDB Failed"));
};

export default connectToDB;
