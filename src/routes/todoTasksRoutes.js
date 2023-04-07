const express = require("express");
const route = express.Router();
const {
  getAll,
  getBusiness,
  getPersonal,
  getUrgent,
  createTodoTaskBusiness,
  createTodoTaskPersonal,
  createTodoTaskUrgent,
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

route.post("/business", createTodoTaskBusiness);
route.post("/personal", createTodoTaskPersonal);
route.post("/urgent", createTodoTaskUrgent);

// *======================================================================================

route.put("/update", updatedTask);

// *======================================================================================

route.delete("/delete", deleteTask);

module.exports = route;
