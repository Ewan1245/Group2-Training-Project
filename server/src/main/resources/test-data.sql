INSERT INTO `USERS` VALUES
('test1@test', 'test', 'person1', '$2a$10$TA3i2RKaSeK/GRSTLqebqehWCpL89YgzG6A4QnBi0Ttwda5pvdyT.', 0),
('test2@test', 'test', 'person2', '$2a$10$TA3i2RKaSeK/GRSTLqebqehWCpL89YgzG6A4QnBi0Ttwda5pvdyT.', 1),
('test3@test', 'test', 'person3', '$2a$10$TA3i2RKaSeK/GRSTLqebqehWCpL89YgzG6A4QnBi0Ttwda5pvdyT.', 0),
('test1@test1', 'test', 'person1', '$2a$10$TA3i2RKaSeK/GRSTLqebqehWCpL89YgzG6A4QnBi0Ttwda5pvdyT.', 0),
('test2@test2', 'test', 'person2', '$2a$10$TA3i2RKaSeK/GRSTLqebqehWCpL89YgzG6A4QnBi0Ttwda5pvdyT.', 1),
('test3@test3', 'test', 'person3', '$2a$10$TA3i2RKaSeK/GRSTLqebqehWCpL89YgzG6A4QnBi0Ttwda5pvdyT.', 0);

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