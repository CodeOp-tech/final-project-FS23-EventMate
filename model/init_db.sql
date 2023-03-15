DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS files;


CREATE TABLE users (
userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
email VARCHAR(150) NOT NULL,
age INT,
gender ENUM('male', 'female', 'non-binary'),
location VARCHAR(100),
occupation VARCHAR(100),
languages ENUM('english', 'spanish', 'german', 'italian', 'french'),
interests ENUM('reading', 'biking', 'hiking', 'painting', 'snowboarding'),
about VARCHAR(400),
avatarURL VARCHAR(150));

CREATE TABLE files (
id INT NOT NULL AUTO_INCREMENT, 
filename VARCHAR(100) NOT NULL,
uploadedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);

INSERT INTO users (username, password, email, age, gender, location, occupation, languages, interests, about, avatarURL) VALUES 
('Bob', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'bob@email.com', 35, 'male', 'Barcelona', 'Chef', 'spanish', 'hiking', 'I am Bob, a professional chef. After an event together I would treat you to my delicious paella', 'avaurl1'),
('Hannah', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'hannah@email.com', 30, 'female', 'Paris', 'Software engineer', 'french', 'snowboarding', 'I am Hannah', 'avaurl2'),
('Lucy', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'lucy@email.com', 23, 'female', 'Barcelona', 'Acrobat', 'spanish', 'painting', 'I am Lucy', 'avaurl4'),
('Juan Jose', "$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W", 'juany@email.com', 87, 'male', 'Barcelona', 'Retired', 'english', 'snowboarding', 'I am Juan Jose', 'https://i.pravatar.cc/150?img=63')


