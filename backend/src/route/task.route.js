import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controller/task.controller.js";

const router = Router();

router.post("/task", asyncHandler(createTask));
router.get("/task", asyncHandler(getAllTask));
router.put("/task", asyncHandler(updateTask));
router.delete("/task", asyncHandler(deleteTask));

export default taskRouter;
