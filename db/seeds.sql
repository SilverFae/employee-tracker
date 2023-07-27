INSERT INTO department(department_name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id) VALUES
    ('Engineer', 1000000, 2),
    ('Sales Lead', 100000, 1),
    ('Lawyer', 200000, 4),
    ('Accountant', 80000, 3),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Account Manager', 120000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Raven', 'Hoge', 1, NULL), -- Raven doesn't have a manager, so manager_id is NULL
    ('Winnie', 'Winston', 6, 1), -- Winnie is managed by Raven, so manager_id is 1
    ('Emrys', 'Doe', 2, NULL), -- Emrys doesn't have a manager, so manager_id is NULL
    ('Luna', 'Lominsa', 5, 3), -- Luna is managed by Emrys, so manager_id is 3
    ('Ferya', 'Isla', 7, NULL), -- Ferya doesn't have a manager, so manager_id is NULL
    ('Nymeria', 'Stark', 4, 5), -- Nymeria is managed by Ferya, so manager_id is 5
    ('Harry', 'Potter', 3, NULL); -- Harry doesn't have a manager, so manager_id is NULL