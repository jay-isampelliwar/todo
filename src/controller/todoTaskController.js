const asyncHandler = require("express-async-handler");
const TodoTask = require("./../models/todoTaskMode");

const getAll = asyncHandler(async (req, res) => {});
const getBusiness = asyncHandler(async (req, res) => {});
const getPersonal = asyncHandler(async (req, res) => {});
const getUrgent = asyncHandler(async (req, res) => {});

// *======================================================================================

const createTodoTaskBusiness = asyncHandler(async (req, res) => {
  const { title, startDate, endDate, startTime, endTime, isDone } = req.body;
  console.log(title);
  console.log(startDate);
  console.log(endDate);
  console.log(startTime);
  console.log(endTime);
  console.log(isDone);

  const task = new TodoTask({
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    isDone,
  });

  task.save();
  res.json(task);
});
const createTodoTaskPersonal = asyncHandler(async (req, res) => {});
const createTodoTaskUrgent = asyncHandler(async (req, res) => {});

// *======================================================================================

const updateTodoTaskBusiness = asyncHandler(async (req, res) => {});
const updateTodoTaskPersonal = asyncHandler(async (req, res) => {});
const updateTodoTaskUrgent = asyncHandler(async (req, res) => {});

// *======================================================================================

const deleteTodoTaskBusiness = asyncHandler(async (req, res) => {});
const deleteTodoTaskPersonal = asyncHandler(async (req, res) => {});
const deleteTodoTaskUrgent = asyncHandler(async (req, res) => {});

// *======================================================================================

module.exports = {
  getAll,
  getBusiness,
  getPersonal,
  getUrgent,
  createTodoTaskBusiness,
  createTodoTaskPersonal,
  createTodoTaskUrgent,
  updateTodoTaskBusiness,
  updateTodoTaskPersonal,
  updateTodoTaskUrgent,
  deleteTodoTaskBusiness,
  deleteTodoTaskPersonal,
  deleteTodoTaskUrgent,
};
