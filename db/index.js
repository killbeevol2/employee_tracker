const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  viewAllDepartments() {
    return this.connection.query("SELECT * FROM tracker.department");
  }
  viewAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id"
    );
  }
  viewAllEmployees() {
    return this.connection.query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, concat(manager.first_name," ",manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;'
    );
  }
  addDepartment(name) {
    return this.connection.query(
      `INSERT INTO department (name) VALUES ("${name}")`
    );
  }
  addRole(role) {
    return this.connection.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${role.title}", ${role.salary}, ${role.department})`
    );
  }
  addEmployee(employee) {
    return this.connection.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.fName}", "${employee.lName}", ${employee.role}, ${employee.manager})`
    );
  }
  updateEmployeeRole(employee) {
    return this.connection.query(
      `UPDATE employee
       SET role_id = ${employee.role}
       WHERE id = ${employee.id};`
    );
  }
}
module.exports = new DB(connection);
