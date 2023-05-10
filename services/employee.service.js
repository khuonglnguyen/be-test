const { increaseCode } = require("../helpers/formatCode.js");
const sequelize = require("sequelize");
const db = require("../models/index.js");
const { putObject, downSign } = require("./thirdparty/aws/S3.js");
const employees = db.employees;
const fs = require("fs");
const moment = require("moment");

const getAll = async (pageIndex = 1, pageSize = 10) => {
  try {
    return await employees.findAndCountAll({
      offset: pageIndex - 1,
      limit: pageSize,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getById = async (id) => {
  try {
    return await employees.findByPk(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkExists = async (field, value) => {
  try {
    const emp = await employees.findOne({
      where: {
        [field]: value,
      },
    });
    if (emp) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkExistsUpdate = async (id, field, value) => {
  try {
    const emp = await employees.findOne({
      where: {
        [field]: value,
        id: {
          [sequelize.Op.not]: id,
        },
      },
    });
    if (emp) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (data, files) => {
  try {
    let { code } = data;
    if (!code) {
      const lastEmp = await employees.findAll({
        limit: 1,
        order: [["id", "DESC"]],
        raw: true,
      });

      if (lastEmp.length > 0) {
        data.code = increaseCode(lastEmp[0].code, "Emp");
      } else {
        data.code = "00001-Emp";
      }
    }

    const avatarFile = fs.readFileSync(files.avatar.path, "binary");

    const key = `employees/avatars/${data.name}_${moment().format(
      "YYYY-MM-DD_HH-mm-ss"
    )}.${files.avatar.type.split("/")[1]}`;
    await putObject(avatarFile, key);

    data.avatar = key;
    return await employees.create(data);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, data, files) => {
  try {
    if (files.avatar) {
      const avatarFile = fs.readFileSync(files.avatar.path, "binary");
  
      const key = `employees/avatars/${data.name}_${moment().format(
        "YYYY-MM-DD_HH-mm-ss"
      )}.${files.avatar.type.split("/")[1]}`;
      await putObject(avatarFile, key);

      data.avatar = key;
    }

    return await employees.update(data, {
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    return await employees.destroy({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getAll,
  getById,
  update,
  add,
  remove,
  checkExists,
  checkExistsUpdate,
};
