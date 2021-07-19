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
}

module.exports = new DB(connection);
