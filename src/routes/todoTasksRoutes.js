const express = require("express");
const route = express.Router();
const {
  getAll,
  getBusiness,
  getPersonal,
  getUrgent,
  createTodoTask,
  deleteTask,
  updatedTask,
} = require("./../controller/todoTaskController");

const validateToken = require("./../middleware/tokenValidator");

route.use(validateToken);
route.get("/getTasks", getAll);
route.get("/business", getBusiness);
route.get("/personal", getPersonal);
route.get("/urgent", getUrgent);

// *======================================================================================

route.post("/create", createTodoTask);

// *======================================================================================

route.put("/update", updatedTask);

// *======================================================================================

route.delete("/delete", deleteTask);

module.exports = route;
