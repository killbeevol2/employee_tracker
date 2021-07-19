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
        "Exit",
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
          console.log("Thank you!");
          return process.exit(0);
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
  inquirer
    .prompt({
      type: "input",
      name: "depName",
      message: "What department would you like to add?",
      validate: (depNameInput) => {
        if (depNameInput) {
          return true;
        } else {
          console.log("Please enter a department name!");
          return false;
        }
      },
    })
    .then((department) => {
      db.addDepartment(department.depName).then((data) => {
        console.log("Successfully added department!");
        start();
      });
    });
};

const addRole = async () => {
  // prompt user for role info
  const departments = await db.viewAllDepartments();
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter role name: ",
        validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter a role name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter salary: ",
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log("Please enter salary!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "department",
        message: "Please select the department for your role: ",
        choices: departments.map((department) => department.name),
      },
    ])
    .then((store) => {
      const i = departments.findIndex((dep) => dep.name === store.department);
      const id = departments[i].id;
      store.department = id;
      db.addRole(store).then(() => {
        console.log("Successfully added role!");
        start();
      });
    });
};

const addEmployee = async () => {
  // prompt user for employee info
  const managers = await db.viewAllEmployees();
  const roles = await db.viewAllRoles();
  inquirer
    .prompt([
      {
        type: "input",
        name: "fName",
        message: "Please enter your employee's first name: ",
        validate: (fNameInput) => {
          if (fNameInput) {
            return true;
          } else {
            console.log("Please enter employee's first name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lName",
        message: "Please enter your employee's last name: ",
        validate: (lNameInput) => {
          if (lNameInput) {
            return true;
          } else {
            console.log("Please enter employee's last name!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "role",
        message: "Please pick employee's role: ",
        choices: roles.map((role) => role.title),
      },
      {
        type: "list",
        name: "manager",
        message: "Please pick your manager: ",
        choices: [
          ...managers
            .filter((manager) => manager.manager === null)
            .map((manager) => {
              return manager.first_name + " " + manager.last_name;
            }),
          "NULL",
        ],
      },
    ])
    .then((employee) => {
      if (employee.manager !== "NULL") {
        const i = roles.findIndex((role) => role.title === employee.role);
        const rId = roles[i].id;
        employee.role = rId;

        const j = managers.findIndex(
          (manager) =>
            manager.first_name === employee.manager.split(" ")[0] &&
            manager.last_name === employee.manager.split(" ")[1]
        );
        const mId = managers[j].id;
        employee.manager = mId;
      }
      db.addEmployee(employee).then(() => {
        console.log("Successfully added an employee!");
        start();
      });
    });
};

const updateEmployee = () => {
  // prompt user to update employee
};

start();
