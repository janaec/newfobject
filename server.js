var mysql = require("mysql");
const inquirer = require('inquirer');
const { start } = require("repl");


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
            choices: ["View All", "View All By Department", "Add Employee", "Update Employee", "Exit"]
        }).then(function (answer) {
            if (answer.action === "View All") {
                viewAll();
            }
            else if(answer.action === "Add Employee") {
                viewByDept();
            }
            else if(answer.action === "Update Employee") {
                update();
            }
            else{
                connection.end();
            }


        });

    }        

    function viewAll() {
        connection.query("SELECT * FROM employees")
    }