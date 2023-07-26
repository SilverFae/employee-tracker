DROP DATABASE IF EXISTS  employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- Create tables for employee, role, and department
CREATE TABLE employee (
    -- setting id as primary key and auto incrementing
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- setting first_name as not null
    first_name VARCHAR(30) NOT NULL,
    -- setting last_name as not null
    last_name VARCHAR(30) NOT NULL,
    -- setting role_id as not null
    role_id INT NOT NULL,
    -- setting manager_id as null
    manager_id INT NULL,
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
);

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
);
