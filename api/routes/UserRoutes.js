import express from "express";
import { userImage } from "../middleware/multer.js";
import {
  deletedUser,
  getUserById,
  loginUser,
  registerUser,
  updatedUser,
  getAllUsers,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/register", userImage.single("userProfile"), registerUser);
router.post("/login", loginUser);
router.post("/user/:id", userImage.single("userProfile"), updatedUser);
router.delete("/user/:id", deletedUser);

export default router;
