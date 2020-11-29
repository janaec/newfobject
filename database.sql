DROP DATABASE IF EXIST employee_trackerdb;

CREATE database employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE employee(
id INT NOT NULL auto_increment PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER,
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES role(id)
);

CREATE TABLE role(
id INT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,
FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE department(
    id INTEGER NOT NULL auto_increment PRIMARY KEY,
)