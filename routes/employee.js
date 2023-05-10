var express = require("express");
var router = express.Router();
const {
  getAll,
  getById,
  update,
  add,
  remove,
  checkExists,
  checkExistsUpdate,
} = require("../services/employee.service");

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
  const { name, phone, email, sex } = req.fields;
  const { avatar } = req.files;
  if (!name || !phone || !email || !sex || !avatar) {
    res.status(422).json({
      success: false,
      message: "name, phone, email, sex, avatar is required!",
    });
    return;
  }

  const checkNameRes = await checkExists("name", req.fields.name);
  if (checkNameRes) {
    res.status(409).json({
      success: false,
      message: "Name already exists!",
    });
    return;
  }

  const checkCodeRes = await checkExists("code", req.fields.code);
  if (checkCodeRes) {
    res.status(409).json({
      success: false,
      message: "Code already exists!",
    });
    return;
  }

  const checkPhoneRes = await checkExists("phone", req.fields.phone);
  if (checkPhoneRes) {
    res.status(409).json({
      success: false,
      message: "Phone already exists!",
    });
    return;
  }

  const checkEmailRes = await checkExists("email", req.fields.email);
  if (checkEmailRes) {
    res.status(409).json({
      success: false,
      message: "Email already exists!",
    });
    return;
  }

  const result = await add(req.fields, req.files);
  if (result) {
    res.status(201).json({
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

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const emp = await getById(id);
  if (!emp) {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
    return;
  }

  const checkNameRes = await checkExistsUpdate(id, "name", req.fields.name);
  if (checkNameRes) {
    res.status(409).json({
      success: false,
      message: "Name already exists!",
    });
    return;
  }

  const checkCodeRes = await checkExistsUpdate(id, "code", req.fields.code);
  if (checkCodeRes) {
    res.status(409).json({
      success: false,
      message: "Code already exists!",
    });
    return;
  }

  const checkPhoneRes = await checkExistsUpdate(id, "phone", req.fields.phone);
  if (checkPhoneRes) {
    res.status(409).json({
      success: false,
      message: "Phone already exists!",
    });
    return;
  }

  const checkEmailRes = await checkExistsUpdate(id, "email", req.fields.email);
  if (checkEmailRes) {
    res.status(409).json({
      success: false,
      message: "Email already exists!",
    });
    return;
  }

  const result = await update(id, req.fields, req.files);
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
  const emp = await getById(id);
  if (!emp) {
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
