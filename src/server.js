const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const dbConnect = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/usersRoutes");
const todoTaskRoutes = require("./routes/todoTasksRoutes");
const PORT = process.env.PORT || 3000;
const app = express();
dbConnect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/todo", todoTaskRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
