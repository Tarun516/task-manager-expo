import express from "express";
import {
  getTasks,
  createTask,
  markCompleted,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", markCompleted);
router.delete("/:id", deleteTask); // 👈 this line is crucial

export default router;
