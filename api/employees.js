import express from "express";
const router = express.Router();
export default router;

import {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await getEmployee(id);
  if (!employee) {
    return res.status(404).send("Employee with specified id does not exist");
  }
  res.json(employee);
});

router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request must have a body");
  }
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Request body must have: name, birthday, salary");
  }
  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).json(employee);
});

router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request must have body");
  }
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Request body must have: name, birthday, salary");
  }
  const employeeToUpdate = await getEmployee(req.params.id);
  if (!employeeToUpdate) {
    return res.status(404).send("Employee with that id not found");
  }
  const employee = await updateEmployee({
    id: req.params.id,
    name,
    birthday,
    salary,
  });
  res.json(employee);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;
  const employeeToDelete = await getEmployee(id);
  if (!employeeToDelete)
    return res.status(404).send("No employee found with that id");
  const deleted = await deleteEmployee(id);
  res.sendStatus(204);
});
