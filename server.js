
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const chalk = require('chalk');
const figlet = require('figlet');

const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: 'Maddie187!',
    database: 'employee_db'
});

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
            'Update employee roles',
            'Update employee manager',
            'Add employee',
            'Add department',
            'Add roles',
            'Remove employee',
            'Remove department',
            'Remove roles',
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
            case 'Update employee roles':
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
            case 'Add roles':
                addRole();
                break;
            case 'Remove employee':
                removeEmployee();
                break;
            case 'Remove department':
                removeDepartment();
                break;
            case 'Remove roles':
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
    const query = 'SELECT * FROM employee';
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
    const query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

// this function will display all employees by department
const viewEmployeesByDepartment = () => {
    const query = 'SELECT department_name AS department, employee.id, employee.first_name, employee.last_name,' +
     'roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id ORDER BY department_name';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// this function will update an employee's roles
const updateEmployeeRole = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.roles_id = roles.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the employee's id, first name, last name, and roles
        const employees = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
        // this will create an array of objects with the roles's id and title
        const roles = res.map(({ title }) => ({
            name: title
        }));
        // this will prompt the user to select an employee and roles to update
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employees
            },
            {
                name: 'roles',
                type: 'list',
                message: 'What is the employee\'s new roles?',
                choices: roles
            }
        ]).then((answer) => {
            const { employee, roles } = answer;
            // this will update the employee's roles
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
            connection.query(query, [roles, employee], (err, res) => {
                if (err) throw err;
                console.log('Employee roles updated successfully!');
                start();
            });
        });
    }
    );
}

// this function will update an employee's manager
const updateEmployeeManager = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = role_id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the employee's id, first name, last name, and roles
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
    //this query will select all roles from the roles table
    const query = 'SELECT role_id, roles.title FROM roles';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the roles's id and title
        const roles = res.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        // this will prompt the user to enter the employee's first name, last name, and roles
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
                name: 'roles',
                type: 'list',
                message: 'What is the employee\'s roles?',
                choices: roles
            }
        ]).then((answer) => {
            // this will insert the new employee into the employee table
            const query = 'INSERT INTO employee SET ?';
            connection.query(query, {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.roles
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
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: "What is the department's name?",
        },
    ]).then((answer) => {
        // this will insert the new department into the department table
        const query = 'INSERT INTO department SET ?';
        connection.query(query, { department_name: answer.department_name }, (err, res) => {
            if (err) throw err;
            console.log('Department added!');
            start();
        });
    });
};

// this function will add a roles
const addRole = () => {
    const query = 'SELECT role_id, roles.title FROM roles';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // this will create an array of objects with the roles's id and title
        const roles = res.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        // this will prompt the user to enter the roles's title, salary, and department
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the roles\'s title?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the roles\'s salary?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Which department does the roles belong to?',
                choices: roles
            }
        ]).then((answer) => {
            // this will insert the new roles into the roles table
            const query = 'INSERT INTO roles SET ?';
            connection.query(query, {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department
            }, (err, res) => {
                if (err) throw err;
                console.log('roles added!');
                start();
            });
        });
    }
    );
}









