DROP DATABASE IF EXIST employee_trackerdb;

CREATE database employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE employee(
id INT NOT NULL auto_increment PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER

);

CREATE TABLE roles(
id INT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER
);

CREATE TABLE department(
id INTEGER NOT NULL auto_increment PRIMARY KEY,
name VARCHAR(30)
);

select * from department;
select * from roles;
select * from employee;