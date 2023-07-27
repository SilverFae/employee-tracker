const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const chalk = require('chalk');
const figlet = require('figlet');

// this will create the connection to the databaseq
const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: 'Maddie187!',
    database: 'employee_db'
});

// this will connect to the database
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
            'Add employee',
            'Add department',
            'Add roles',
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
            case 'Add employee':
                addEmployee();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add roles':
                addRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
};

// this function will display all employees
const viewEmployees = () => {
    // this query will select all employees from the employee table
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// this function will display all departments
const viewDepartments = () => {
    // this query will select all departments from the department table
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
    // this query will select all roles from the roles table
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
    // this query will select all employees from the employee table and join with roles and department tables
    const query = 'SELECT department_name AS department, employee.id, employee.first_name, employee.last_name,' +
     'roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id ORDER BY department_name';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}


// This function will add an employee
const addEmployee = () => {
    // This query will select all roles from the roles table
    const query = 'SELECT id, title FROM roles'; // Changed 'roles_id' to 'id'
    connection.query(query, (err, res) => {
        if (err) throw err;
        // This will create an array of objects with the roles' id and title
        const roles = res.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        // This will prompt the user to enter the employee's first name, last name, and roles
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: 'last_name',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'roles',
                type: 'list',
                message: "What is the employee's role?",
                choices: roles
            }
        ]).then((answer) => {
            // This will insert the new employee into the employee table
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
    });
};

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
    // this query will select all roles from the roles table
    const query = 'SELECT id, title FROM roles';
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









