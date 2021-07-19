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
}

module.exports = new DB(connection);
