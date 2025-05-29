import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullname, address, phone } = req.body;
    const imageProfile = req.file ? req.file.path : null;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ messsage: "User already Exist" });
    }

    const newUser = new Users({
      username,
      email,
      password,
      fullname,
      address,
      phone,
      userProfile: imageProfile,
    });

    await newUser.save();

    res
      .status(201)
      .json({ messsage: "User Registration Successfuly", newUser });
  } catch (error) {
    res.status(500).json({ messsage: "User Registration Failed", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ messsage: "Email and Password id Required!" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({ messsage: "User not Found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ messsage: "Invalid Password", email, password });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ messsage: "Login Success", token });
  } catch (error) {
    res.status(500).json({ messsage: "Login Failed", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to Get All Users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ messsage: "User not Found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ messsage: "Get User by Id Failed", error });
  }
};

export const updatedUser = async (req, res) => {
  try {
    const { fullname, username, address, phone } = req.body;
    const userProfile = req.file ? req.file.path : undefined;

    const updateData = { fullname, username, address, phone };

    if (userProfile) updateData.userProfile = userProfile;

    const updateUser = await Users.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updateUser)
      return res.status(404).json({ messsage: "User not Found" });

    res.json({ messsage: "Update Successfuly", updateUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to Updated User", error });
  }
};

export const deletedUser = async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    if (!deleteUser) return res.status(404).json({ message: "User not Found" });

    res.json({ message: "Deleting User Succes", deleteUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to Deleted Account", error });
  }
};
