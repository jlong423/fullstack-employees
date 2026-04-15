import express from "express";
import employeeRouter from "#api/employees";
const app = express();
export default app;

app.use(express.json());

// TODO: route /employees to employees router

app.use("/employees", employeeRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! something went wrong :(");
});
