import { Task } from "../model/task.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
// • POST API to create a new task
// • GET API to fetch all tasks
// • PUT API to update task status
// • DELETE API to delete a task

export const createTask = async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;
  console.log("body data", title, description, priority, dueDate, status);

  if (!title || !dueDate) {
    throw new ApiError(400, "All fields are required");
  }

  const isTaskDuplicate = await Task.findOne({
    title,
    description,
    priority,
    dueDate,
    status,
  });
  if (isTaskDuplicate) {
    throw new ApiError(500, "Can not create duplicate tasks");
  }

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    status,
  });

  if (!task) {
    throw new ApiError(500, "Failed to create a task / try again later");
  }

  return res.status(201).json(new ApiResponse(201, "Task created", task));
};

export const getAllTask = async (req, res) => {
  const allTask = await Task.find({});

  if (!allTask) {
    throw new ApiError(500, "Failed to fetch all tasks / try again later");
  }

  return res.status(200).json(new ApiResponse(200, "Success", allTask));
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, status } = req.body;
  console.log("body data", title, description, priority, dueDate, status);

  if (!id) {
    throw new ApiError(400, "id is required");
  }
  if (!title || !dueDate) {
    throw new ApiError(400, "All fields are required");
  }

  const task = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
      priority,
      dueDate,
      status,
    },
    { new: true }
  );

  if (!task) {
    throw new ApiError(500, "Failed to update a task / try again later");
  }

  return res.status(200).json(new ApiResponse(200, "Task updated", task));
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "id is required");
  }

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new ApiError(500, "Failed to delete the task");
  }

  return res.status(200).json(200, "Task deleted", task);
};
