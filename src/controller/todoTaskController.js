const asyncHandler = require("express-async-handler");
const TodoTask = require("./../models/todoTaskMode");

const getAll = asyncHandler(async (req, res) => {
  const todoList = await TodoTask.find({ user_id: req.user.id });
  // console.log(todoList);
  res.json({
    status: true,
    name: req.user.name,
    data: todoList,
  });
});

const getBusiness = asyncHandler(async (req, res) => {
  const allTodo = await TodoTask.find({ user_id: req.user.id });
  const businessTodoList = allTodo.filter((todo) => {
    return todo.category === "business";
  });
  res.json({
    status: true,
    data: businessTodoList,
  });
});

const getPersonal = asyncHandler(async (req, res) => {
  const allTodo = await TodoTask.find({ user_id: req.user.id });
  const personalTodoList = allTodo.filter((todo) => {
    return todo.category === "personal";
  });
  res.json({
    status: true,
    data: personalTodoList,
  });
});

const getUrgent = asyncHandler(async (req, res) => {
  const allTodo = await TodoTask.find({ user_id: req.user.id });
  const urgentTodoList = allTodo.filter((todo) => {
    return todo.category === "urgent";
  });
  res.json({ status: true, data: urgentTodoList });
});

// *======================================================================================

const createTodoTask = asyncHandler(async (req, res) => {
  const { id, title, category, isDone } = req.body;
  // console.log(req.user);
  const task = new TodoTask({
    id,
    title,
    category,
    isDone,
    user_id: req.user.id,
  });

  task.save();
  res.status(201).json({
    status: true,
    message: "Task is created",
  });
});

// *======================================================================================

const updatedTask = asyncHandler(async (req, res) => {
  const { id, title, category, isDone } = req.body;

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
    category,
    isDone,
    user_id: req.user.id,
  });

  updatedTask.save();
  res.json({
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
  res.json({
    status: true,
    message: "Deleted",
  });
});

// *======================================================================================

module.exports = {
  getAll,
  getBusiness,
  getPersonal,
  getUrgent,
  createTodoTask,
  updatedTask,
  deleteTask,
};
