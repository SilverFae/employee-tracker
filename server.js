const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

connection.connect((err) => {
    if (err) throw err;
    console.log(chalk.blue(figlet.textSync('Employee Tracker')));
    console.log(chalk.blue('Welcome to the Employee Tracker!'));
    console.log(chalk.blue('--------------------------------'));
    start();
});
// our prompt to start the app
const start = () => {
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'View all employees by department',
            'Update employee role',
            'Update employee manager',
            'Add employee',
            'Add department',
            'Add role',
            'Remove employee',
            'Remove department',
            'Remove role',
            'View department budget',
            'Exit'
        ]
    }).then((answer) => {
        // this switch statement will call the appropriate function based on the user's choice
        const { choice } = answer;
        switch (choice) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees by department':
                viewEmployeesByDepartment();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                updateEmployeeManager();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Remove employee':
                removeEmployee();
                break;
            case 'Remove department':
                removeDepartment();
                break;
            case 'Remove role':
                removeRole();
                break;
            case 'View department budget':
                viewDepartmentBudget();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
};

