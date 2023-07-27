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

// this function will display all employees
const viewEmployees = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department_name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// this function will display all departments
const viewDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

// this function will display all roles
const viewRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

// this function will display all employees by department
const viewEmployeesByDepartment = () => {
    const query = 'SELECT department.name AS department, employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department.name';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

// this function will update an employee's role
const updateEmployeeRole = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the employee's id, first name, last name, and role
        const employees = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
        // this will create an array of objects with the role's id and title
        const roles = res.map(({ title }) => ({
            name: title
        }));
        // this will prompt the user to select an employee and role to update
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employees
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is the employee\'s new role?',
                choices: roles
            }
        ]).then((answer) => {
            const { employee, role } = answer;
            // this will update the employee's role
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
            connection.query(query, [role, employee], (err, res) => {
                if (err) throw err;
                console.log('Employee role updated successfully!');
                start();
            });
        });
    }
    );
}

// this function will update an employee's manager
const updateEmployeeManager = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the employee's id, first name, last name, and role
        const employees = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
        // this will prompt the user to select an employee and manager to update
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employees
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Who is the employee\'s new manager?',
                choices: employees
            }
        ]).then((answer) => {
            const { employee, manager } = answer;
            // this will update the employee's manager
            const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
            connection.query(query, [manager, employee], (err, res) => {
                if (err) throw err;
                console.log('Employee manager updated successfully!');
                start();
            });
        });
    }
    );
}

// this function will add an employee
const addEmployee = () => {
    //this query will select all roles from the role table
    const query = 'SELECT role.id, role.title FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the role's id and title
        const roles = res.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        // this will prompt the user to enter the employee's first name, last name, and role
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employee\'s first name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employee\'s last name?'
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is the employee\'s role?',
                choices: roles
            }
        ]).then((answer) => {
            // this will insert the new employee into the employee table
            const query = 'INSERT INTO employee SET ?';
            connection.query(query, {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role
            }, (err, res) => {
                if (err) throw err;
                console.log('Employee added!');
                start();
            });
        });
    }
    );
}

// this function will add a department
const addDepartment = () => {
    const query = 'SELECT department.id, department.name FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will prompt the user to enter the department's name
        inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the department\'s name?'
            }
        ]).then((answer) => {
            // this will insert the new department into the department table
            const query = 'INSERT INTO department SET ?';
            connection.query(query, {
                name: answer.name
            }, (err, res) => {
                if (err) throw err;
                console.log('Department added!');
                start();
            });
        });
    }
    );
}

// this function will add a role
const addRole = () => {
    const query = 'SELECT role.id, role.title FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the role's id and title
        const roles = res.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        // this will prompt the user to enter the role's title, salary, and department
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the role\'s title?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the role\'s salary?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: roles
            }
        ]).then((answer) => {
            // this will insert the new role into the role table
            const query = 'INSERT INTO role SET ?';
            connection.query(query, {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department
            }, (err, res) => {
                if (err) throw err;
                console.log('Role added!');
                start();
            });
        });
    }
    );
}









