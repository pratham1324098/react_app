import express from "express";
import { searchUsersByName,getAllUsers,removeuser,createUser } from "../controller/dataController.js";
import userAuth from "../middleware/authMiddleware.js"
const router = express.Router();


router.get("/search",searchUsersByName);
router.get("/all",getAllUsers)
router.delete("/remove/:id", removeuser);
router.post("/create-user",createUser);
export default router;