import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controller/task.controller.js";

const taskRouter = Router();

taskRouter.post("/task", asyncHandler(createTask));
taskRouter.get("/task", asyncHandler(getAllTask));
taskRouter.put("/task/:id", asyncHandler(updateTask));
taskRouter.delete("/task/:id", asyncHandler(deleteTask));

export default taskRouter;
