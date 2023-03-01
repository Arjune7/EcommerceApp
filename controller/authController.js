import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name || !email || !password || !phone || !address) return res.send({ message: "All fields are required to proceed" });

    //check user
    const existingUser = await userModel.findOne({ email: email });

    //existing user
    if (existingUser) return res.status(200).send({ message: "Already Registered , please login" , success : false });

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();

    res.status(201).send({ message: "User Register Successfull", user , success : true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({ message: "Invalid email or Password" });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "email not register" });
    }

    const match = await comparePassword(password, user.password);

    if (!match) return res.status(200).send({ message: "Invalid Password" });

    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).send({ message: "login successful", user: { name: user.name, email: user.email, phone: user.phone, address: user.address } , token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in login", error });
  }
};


export const testController = async(req,res)=>{
    try{
        res.send('protected route')
    }
    catch(err){
        console.log(err)
    }
}