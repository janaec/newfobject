USE employeetrackerdb;

INSERT INTO department (name)
VALUE ("Information Technology"),
("Finance"),
("Sales"),
("Legal");

INSERT INTO roles (title, salary, department_id)
VALUE ("Finance Manager",250000, 2),
("Finance Supervior",150000, 2 ),
("Infastructure Manager", 250000, 1),
("Infastructure Supervisor", 200000, 1),
("Software Engineer", 180000, 1),
("Sales Supervisor", 100000, 3),
("Sales Manager", 80000,3),
("Salesperson", 65000,3),
("Lawyer",250000,4),
("paralegal", 90000,4),
("Law Clerk", 50000,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUE("Janae","Clark","Finance Manager",1),
("Lauren", "Weeks","Finance Supervisor",2)