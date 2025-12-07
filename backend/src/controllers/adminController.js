import {
  createHRorEmployee,
  getAllEmployees,
  getAllHRs,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService.js";

export const createHR = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createHRorEmployee({
      name,
      email,
      password,
      role: "hr",
      companyId: req.companyId,
    });

    res.status(201).json({ message: "HR created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createHRorEmployee({
      name,
      email,
      password,
      role: "employee",
      companyId: req.companyId,
    });

    res.status(201).json({ message: "Employee created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployees = async (req, res) => {
  const employees = await getAllEmployees(req.companyId);
  res.json(employees);
};

export const getHRs = async (req, res) => {
  const hrs = await getAllHRs(req.companyId);
  res.json(hrs);
};

export const updateEmployeeDetails = async (req, res) => {
  const updated = await updateEmployee(req.params.id, req.companyId, req.body);
  res.json(updated);
};

export const deleteEmployeeAccount = async (req, res) => {
  await deleteEmployee(req.params.id, req.companyId);
  res.json({ message: "Employee deleted successfully" });
};
