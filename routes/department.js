var express = require("express");
var router = express.Router();
const {
  getAll,
  getById,
  update,
  add,
  remove,
  checkName,
  checkCode,
  checkNameUpdate,
  addEmployee,
  deleteEmployee,
} = require("../services/department.service");
const empService = require("../services/employee.service");

router.get("/", async (req, res, next) => {
  const { pageIndex, pageSize } = req.fields;
  const result = await getAll(pageIndex, pageSize);
  if (result) {
    res.status(200).json({
      success: true,
      data: {
        list: result.rows,
        total: result.count,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await getById(id);
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name } = req.fields;
  if (!name) {
    res.status(422).json({
      success: false,
      message: "Department name is required!",
    });
    return;
  }

  const checkNameRes = await checkName(req.fields.name);
  if (checkNameRes) {
    res.status(409).json({
      success: false,
      message: "Department name already exists!",
    });
    return;
  }

  const checkCodeRes = await checkCode(req.fields.code);
  if (checkCodeRes) {
    res.status(409).json({
      success: false,
      message: "Department code already exists!",
    });
    return;
  }

  const result = await add(req.fields);
  if (result) {
    res.status(201).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.post("/:idd/employee/:ide", async (req, res, next) => {
  const { idd, ide } = req.params;
  const dep = await getById(idd);
  if (!dep) {
    res.status(404).json({
      success: false,
      message: "Department Not found!",
    });
    return;
  }

  const emp = await empService.getById(ide);
  if (!emp) {
    res.status(404).json({
      success: false,
      message: "Employee Not found!",
    });
    return;
  }

  const result = await addEmployee(idd, ide);
  if (result) {
    res.status(201).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.delete("/:idd/employee/:ide", async (req, res, next) => {
  const { idd, ide } = req.params;
  const dep = await getById(idd);
  if (!dep) {
    res.status(404).json({
      success: false,
      message: "Department Not found!",
    });
    return;
  }

  const emp = await empService.getById(ide);
  if (!emp) {
    res.status(404).json({
      success: false,
      message: "Employee Not found!",
    });
    return;
  }

  const result = await deleteEmployee(idd, ide);
  if (result) {
    res.status(201).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const dep = await getById(id);
  if (!dep) {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
    return;
  }

  if (!req.fields.name) {
    res.status(422).json({
      success: false,
      message: "Department name is required!",
    });
    return;
  }

  const checkNameRes = await checkNameUpdate(id, req.fields.name);
  if (checkNameRes) {
    res.status(409).json({
      success: false,
      message: "Department name already exists!",
    });
    return;
  }

  const result = await update(id, req.fields);
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const dep = await getById(id);
  if (!dep) {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
    return;
  }

  const result = await remove(id);
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
});

module.exports = router;
