const inquirer = require("inquirer");
const db = require("./db/index");
require("console.table");

const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then((res) => {
      switch (res.choice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
        default:
          console.log("Function broke!");
          throw Error("Option not available!");
      }
    });
};

const viewAllDepartments = () => {
  // call db query for viewAllDepartments
  db.viewAllDepartments().then((departments) => {
    console.table(departments);
    start();
  });
};

const viewAllRoles = () => {
  // call db query for viewAllRoles
  db.viewAllRoles().then((roles) => {
    console.table(roles);
    start();
  });
};

const viewAllEmployees = () => {
  // call db query for viewAllEmployees
  db.viewAllEmployees().then((employees) => {
    console.table(employees);
    start();
  });
};

const addDepartment = () => {
  // prompt user for department info
};

const addRole = () => {
  // prompt user for role info
};

start();
