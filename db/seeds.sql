INSERT INTO department(department_name) VALUES('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role(title, salary,department_id)
 VALUES('Engineer', 1000000, 2), 

('Sales Lead', 100000, 1), 

('Lawyer', 200000, 4), 

('Accountant', 80000, 3),

('Salesperson', 80000, 1), 

('Lead Engineer', 150000, 2), 

('Account Manager', 120000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Raven', 'Hoge', 1, 2),

VALUES('Winnie', 'Winston', 6, null),

VALUES('Emrys', 'Doe', 2, null),

VALUES('Luna', 'Lominsa', 5, 3),

VALUES('Ferya', 'Isla', 7, null),

VALUES('Nymeria', 'Stark', 4, 5),

VALUES('Harry', 'Potter', 3, null),
