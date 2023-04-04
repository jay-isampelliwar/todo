const business = "/business";
const personal = "/personal";
const urgent = "/urgent";

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
  updateTodoTaskBusiness,
  updateTodoTaskPersonal,
  updateTodoTaskUrgent,
  deleteTodoTaskBusiness,
  deleteTodoTaskPersonal,
  deleteTodoTaskUrgent,
} = require("./../controller/todoTaskController");

route.get("/getTasks", getAll);
route.get("/business", getBusiness);
route.get("/personal", getPersonal);
route.get("/urgent", getUrgent);

// *======================================================================================

route.post("/business", createTodoTaskBusiness);
route.post("/personal", createTodoTaskPersonal);
route.post("/urgent", createTodoTaskUrgent);

// *======================================================================================

route.put("/business", updateTodoTaskBusiness);
route.put("/personal", updateTodoTaskPersonal);
route.put("/urgent", updateTodoTaskUrgent);

// *======================================================================================

route.delete("/business", deleteTodoTaskBusiness);
route.delete("/personal", deleteTodoTaskPersonal);
route.delete("/urgent", deleteTodoTaskUrgent);

module.exports = route;
