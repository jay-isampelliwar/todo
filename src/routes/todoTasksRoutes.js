const express = require("express");
const route = express.Router();
const {
  getAll,
  createTodoTask,
  deleteTask,
  updatedTask,
} = require("./../controller/todoTaskController");

const validateToken = require("./../middleware/tokenValidator");

route.use(validateToken);
route.get("/getTasks", getAll);

// *======================================================================================

route.post("/create", createTodoTask);

// *======================================================================================

route.put("/update", updatedTask);

// *======================================================================================

route.delete("/delete", deleteTask);

module.exports = route;
