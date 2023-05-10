var DataTypes = require("sequelize").DataTypes;
var _department = require("./department");
var _department_employee = require("./department_employee");
var _employee = require("./employee");

function initModels(sequelize) {
  var department = _department(sequelize, DataTypes);
  var department_employee = _department_employee(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);

  department_employee.belongsTo(department, { as: "department", foreignKey: "department_id"});
  department.hasMany(department_employee, { as: "department_employees", foreignKey: "department_id"});
  department_employee.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
  employee.hasMany(department_employee, { as: "department_employees", foreignKey: "employee_id"});

  return {
    department,
    department_employee,
    employee,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
