const { increaseCode } = require("../helpers/formatCode.js");
const sequelize = require("sequelize");
const db = require("../models/index.js");
const departments = db.departments;
const department_employee = db.department_employee;

const getAll = async (pageIndex = 1, pageSize = 10) => {
  try {
    return await departments.findAndCountAll({
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
    return await departments.findByPk(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkName = async (name) => {
  try {
    const dep = await departments.findOne({
      where: {
        name,
      },
    });
    if (dep) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkNameUpdate = async (id, name) => {
  try {
    const dep = await departments.findOne({
      where: {
        name,
        id: {
          [sequelize.Op.not]: id,
        },
      },
    });
    if (dep) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkCode = async (code) => {
  try {
    const dep = await departments.findOne({
      where: {
        code,
      },
    });
    if (dep) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (data) => {
  try {
    let { code } = data;
    if (!code) {
      const lastDep = await departments.findAll({
        limit: 1,
        order: [["id", "DESC"]],
        raw: true,
      });

      if (lastDep.length > 0) {
        data.code = increaseCode(lastDep[0].code, "Dep");
      } else {
        data.code = "00001-Dep";
      }
    }

    return await departments.create(data);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addEmployee = async (idd, ide) => {
  try {
    return await department_employee.upsert({
      employee_id: ide,
      department_id: idd,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteEmployee = async (idd, ide) => {
  try {
    return await department_employee.destroy({
      where: { employee_id: ide, department_id: idd },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, data) => {
  try {
    return await departments.update(data, {
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    return await departments.destroy({
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
  checkName,
  checkCode,
  checkNameUpdate,
  addEmployee,
  deleteEmployee,
};
