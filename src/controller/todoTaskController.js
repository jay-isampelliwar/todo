const asyncHandler = require("express-async-handler");
const TodoTask = require("./../models/todoTaskMode");

const getAll = asyncHandler(async (req, res) => {
  const todoList = await TodoTask.find({ user_id: req.user.id });
  // console.log(todoList);
  return res.json({
    status: true,
    data: todoList,
  });
});

// *======================================================================================

const createTodoTask = asyncHandler(async (req, res) => {
  const { id, title, isDone } = req.body;
  // console.log(req.user);
  const task = new TodoTask({
    id,
    title,
    isDone,
    user_id: req.user.id,
  });

  task.save();
  return res.status(201).json({
    status: true,
    message: "Task is created",
  });
});

// *======================================================================================

const updatedTask = asyncHandler(async (req, res) => {
  const { id, title, isDone } = req.body;

  const task = await TodoTask.findOne({ id: id });

  // console.log(task);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update task");
  }

  await TodoTask.deleteOne({ id: id });
  const updatedTask = new TodoTask({
    id,
    title,
    isDone,
    user_id: req.user.id,
  });

  updatedTask.save();
  return res.json({
    status: true,
    message: "Updated",
  });
});

// *======================================================================================

const deleteTask = asyncHandler(async (req, res) => {
  const task = await TodoTask.findOne({ id: req.body.id });

  // console.log(task);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete task");
  }

  await TodoTask.deleteOne({ id: req.body.id });
  return res.json({
    status: true,
    message: "Deleted",
  });
});

// *======================================================================================

module.exports = {
  getAll,
  createTodoTask,
  updatedTask,
  deleteTask,
};
