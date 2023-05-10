const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('department_employee', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'department',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'department_employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "department_id_idx",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
      {
        name: "employee_id_idx",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
