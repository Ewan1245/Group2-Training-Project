INSERT INTO `USERS` VALUES
('test1@test', 'test', 'person1', 'password'),
('test2@test', 'test', 'person2', 'password'),
('test3@test', 'test', 'person3', 'password');

INSERT INTO `RECIPE` VALUES
('Carbonara'),
('Pizza'),
('Curry');

INSERT INTO `USERS_SAVED_RECIPES` VALUES
('test1@test', 'Carbonara'),
('test1@test', 'Pizza'),
('test2@test', 'Curry'),
('test3@test', 'Curry'),
('test3@test', 'Pizza');