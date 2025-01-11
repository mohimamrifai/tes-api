import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";
import { validatorInput } from "../middleware/validatorInput";

const router = Router();

router.get("/", getAllUsers);
router.post("/", validatorInput, createUser);
router.get("/:id", getUserById);
router.put("/:id", validatorInput, updateUser);
router.delete("/:id", deleteUser);

export default router;
