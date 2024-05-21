import { Router } from "express";
import {
  getEmployee,
  createEmployee,
  actualizarEmployee,
  borrarEmployee,
  getEmployees
} from "../controller/employees.controller.js";

const router = Router();

router.get("/employees", getEmployee);

router.get("/employees/:id", getEmployees);

router.post("/employees", createEmployee);

router.patch("/employees/:id", actualizarEmployee);

router.delete("/employees/:id", borrarEmployee);

export default router;
