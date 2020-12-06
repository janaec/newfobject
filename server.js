var mysql = require("mysql");
const inquirer = require('inquirer');



var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "April121990!",
    database: "employeetrackerdb"
});

// Establish connection with the DB
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //   run the start function after the3 connection to prompt user
    start();
});
function start() {
    inquirer
        .prompt({
            name: "firstprompt",
            type: "list",
            message: "Where would you like to start?",
            choices: ["View All", "View All By Department","View All Employees", "Add Employee", "Update Employee", "Exit"]
        }).then(function (answer) {
            // console.log(answer.firstprompt);
            if (answer.firstprompt === "View All") {
                viewAll();
            }
            else if (answer.firstprompt === "View All Employees") {
                // console.log("Maybe it works")
                viewAllEmployees();
            }
            else if (answer.firstprompt === "View All By Department") {
                viewByDept();
            }
            else if (answer.firstprompt === "Add Employee") {
                addEmployee();
            }
            else if (answer.firstprompt === "Update Employee") {
                update();
            }
            else {
                connection.end();
            }


        });

}
function viewAllEmployees() {
    connection.query("SELECT * FROM employeetrackerdb.employee;",function(err,res){
        if (err)throw err
        console.table(res)
        // console.log("It works!");
    });
}
function viewAll() {
    connection.query("SELECT employee.id,employee.first_name, employee.last_name, role.title,role.salary, department.name, CONCAT(e.first_name,' ',e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function viewByDept() {
    inquirer
        .prompt([
            {
                name: "dept",
                type: "list",
                message: "Which department would you like to view?",
                choices: ["Information Technology", "Finance", "Sales", "Legal", "Main Menu", "Exit"]
            },
        ])
        .then(function (answer) {
            if (answer.dept === "Information Technology") {
                ITDept();
            }
            else if (answer.dept === "Finance") {
                FinanceDept();
            }
            else if (answer.dept === "Sales") {
                SalesDept();
            }
            else if (answer.dept === "Legal") {
                legalDept();
            }
            else if (answer.dept === "Main Menu") {
                start();
            } else {
                connection.end();
            }
        })
}
function ITDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Information Technology';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
function FinanceDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Finance';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
function SalesDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Sales';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
function legalDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Legal';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the Employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the Employee's last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the Employee's role/position?",
                choices: roleChoices()
            },
            {
                name: "manager",
                type: "list",
                message: "What is the name of the Employee's manager?",
                choices: employeeChoices()
            }
        ])
        .then(function (answer) {
            var roleId = roleArray.indexOf(answer.role) + 1;
            
            var employeeName = employeeArray.indexOf(answer.manager);
            var i = employeeName;
            var employeeId = employeeIdArray[i];
            
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId,
                    manager_id: employeeId
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your Employee was added successfully!");
                    // return to main menu
                    menu();
                }
            );
        });
}

function update() {
    var employeeIdArray = [];
    var employeeArray = [];
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "selectEmployee",
                    type: "list",
                    message: "Please select Employee from list",
                    choices:
                        function () {
                            for (var i = 0; i < res.length; i++) {
                                employeeArray.push(res[i].first_name + " " + res[i].last_name);
                                employeeIdArray.push(res[i].id);
                            }
                            return employeeArray;
                        }
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the Employee's new role/position ?",
                    choices: roleChoices()
                }
            ])
            .then(function (answer) {
                var roleId = roleArray.indexOf(answer.role) + 1;
                
                var employeeName = employeeArray.indexOf(answer.selectEmployee);
                var i = employeeName;
                var employeeId = employeeIdArray[i];
                
                connection.query("UPDATE employee SET ? WHERE ?", 
                    [
                        {
                            role_id: roleId
                        },
                        {
                            id: employeeId
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("Your Employee was updated!");
                        menu();
                    }
                );
            })
    });
}
                                    
function removeEmployee() {
    var employeeIdArray = [];
    var employeeArray = [];
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "selectEmployee",
                    type: "list",
                    message: "Please select Employee.",
                    choices:
                        function () {
                            for (var i = 0; i < res.length; i++) {
                                employeeArray.push(res[i].first_name + " " + res[i].last_name);
                                employeeIdArray.push(res[i].id);
                            }
                            return employeeArray;
                        }
                }
            ])
            .then(function (answer) {
                var employeeName = employeeArray.indexOf(answer.selectEmployee);
                var i = employeeName;
                var employeeId = employeeIdArray[i];
               
                connection.query("DELETE FROM employee WHERE ?",
                    {
                        id: employeeId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your Employee was removed successfully!");
                        menu();
                    })
            })
    });
}

var roleArray = [];
function roleChoices() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}

var employeeArray = [];
var employeeIdArray = [];
function employeeChoices() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            employeeArray.push(res[i].first_name + " " + res[i].last_name);
            employeeIdArray.push(res[i].id);
        }
    })
    return employeeArray;
}

    