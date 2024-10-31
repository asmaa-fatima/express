// const express = require("express");
// const app = express();

// app.use(express.static("public"))

// app.set("view engine", "ejs");
// // app.use(logger)

// // app.get("/", (req, res) => {
// //   console.log("here");

// //   res.render("index", { test: "Here" });
// // });

// const userRouter = require("./routes/users");
// app.use("/users", userRouter);

// // function logger(req, res, next) {
// //   console.log(req.originalUrl);
// //   next();
// // }

// app.listen(3000);

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(3000);
