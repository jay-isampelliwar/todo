const asyncHandler = require("express-async-handler");
const TodoTask = require("./../models/todoTaskMode");

const getAll = asyncHandler(async (req, res) => {
  const todoList = await TodoTask.find({ user_id: req.user.id });
  res.json(todoList);
});
const getBusiness = asyncHandler(async (req, res) => {
  const allTodo = await TodoTask.find({ user_id: req.user.id });
  const businessTodoList = allTodo.filter((todo) => {
    return todo.catagory === "business";
  });
  res.json({ businessTodoList });
});
const getPersonal = asyncHandler(async (req, res) => {
  const allTodo = await TodoTask.find({ user_id: req.user.id });
  const businessTodoList = allTodo.filter((todo) => {
    return todo.catagory === "personal";
  });
  res.json({ businessTodoList });
});
const getUrgent = asyncHandler(async (req, res) => {
  const allTodo = await TodoTask.find({ user_id: req.user.id });
  const businessTodoList = allTodo.filter((todo) => {
    return todo.catagory === "urgent";
  });
  res.json({ businessTodoList });
});

// *======================================================================================

const createTodoTaskBusiness = asyncHandler(async (req, res) => {
  const { id, title, catagory, isDone } = req.body;

  const task = new TodoTask({
    id,
    title,
    catagory,
    isDone,
    user_id: req.user.id,
  });

  task.save();
  res.json(task);
});
const createTodoTaskPersonal = asyncHandler(async (req, res) => {
  const { id, title, catagory, isDone } = req.body;
  const task = new TodoTask({
    id,
    title,
    catagory,
    isDone,
    user_id: req.user.id,
  });

  task.save();
  res.json(task);
});
const createTodoTaskUrgent = asyncHandler(async (req, res) => {
  const { id, title, catagory, isDone } = req.body;

  const task = new TodoTask({
    id,
    title,
    catagory,
    isDone,
    user_id: req.user.id,
  });

  task.save();
  res.json(task);
});

// *======================================================================================

const updatedTask = asyncHandler(async (req, res) => {
  const { id, title, catagory, isDone } = req.body;

  const task = await TodoTask.findOne({ id: id });

  console.log(task);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await TodoTask.deleteOne({ id: id });
  const updatedTask = new TodoTask({
    id,
    title,
    catagory,
    isDone,
  });

  updatedTask.save();
  res.json(updatedTask);
});

// *======================================================================================

const deleteTask = asyncHandler(async (req, res) => {
  const task = await TodoTask.findOne({ id: id });

  console.log(task);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  await TodoTask.deleteOne({ id: id });
  res.json(task);
});

// *======================================================================================

async function validTaskID(id) {
  return null;
}

module.exports = {
  getAll,
  getBusiness,
  getPersonal,
  getUrgent,
  createTodoTaskBusiness,
  createTodoTaskPersonal,
  createTodoTaskUrgent,
  updatedTask,
  deleteTask,
};
