import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    userProfile: { type: String, required: null },
    phone: { type: String, required: null },
    purchaseHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }

  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model("Users", userSchema);

export default Users;