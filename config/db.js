import colors from "colors";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to data base` .bgYellow.white)
  } catch (error) {
    console.log(error);
  }
};

export default connectDB