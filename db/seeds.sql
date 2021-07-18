USE tracker;

INSERT INTO department
(name)
VALUES
("Cyber Security"),
("Marketing"),
("Engineering");

INSERT INTO role
(title, salary, department_id)
VALUES
("Manager", 9999, 1),
("Security Analyst", 200, 1),
("Marketing Manager", 9998, 2),
("Marketing Supervisor", 7000, 2),
("Engineering Manager", 5000, 3),
("Engineer", 3000, 3);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Kayla", "McIntire", 1, NULL),
("James", "Makavoy", 2, 1),
("Bob", "Ross", 3, NULL),
("Rick", "James", 4, 3),
("Sasha", "Fierce", 5, NULL),
("Thomas", "Smith", 6, 5);


