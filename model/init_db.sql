DROP TABLE IF EXISTS events; 
DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS files;



CREATE TABLE users (
userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
email VARCHAR(150) NOT NULL,
age INT,
gender VARCHAR(100),
location VARCHAR(100),
occupation VARCHAR(100),
languages VARCHAR(200),
interests VARCHAR(400),
about VARCHAR(400),
avatarURL VARCHAR(100));

CREATE TABLE events (
`eventid` INT NOT NULL AUTO_INCREMENT,    
`userId` INT,
ticketmasterid VARCHAR(100) NOT NULL,
eventname VARCHAR(200),
eventdate VARCHAR(100),
starttime VARCHAR(100),
imageurl VARCHAR(200),
eventlocation VARCHAR(100),
venue VARCHAR(100),
currency VARCHAR(100),
startingprice VARCHAR(100),
ticketurl VARCHAR(200),
genre  VARCHAR(100),
subgenre VARCHAR(100),
host VARCHAR(100),
eventtype VARCHAR(100),
socialmedia VARCHAR(100),
eventdetail VARCHAR(100) DEFAULT "No",
PRIMARY KEY (`eventid`)
);


INSERT INTO users (username, password, email, age, gender, location, occupation, languages, interests, about, avatarURL) VALUES 
('Bob', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'bob@email.com', 35, 'male', 'Barcelona, Spain', 'Chef', 'spanish', 'hiking', 'I am Bob, a professional chef. After an event together I would treat you to my delicious paella', 'https://i.pravatar.cc/150?img=68'),
('Hannah', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'hannah@email.com', 30, 'female', 'Paris, France', 'Software engineer', 'french', 'snowboarding', 'I am Hannah', 'https://i.pravatar.cc/150?img=34'),
('Lucy', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'lucy@email.com', 23, 'female', 'Barcelona, Spain', 'Acrobat', 'spanish', 'painting', 'I am Lucy', 'https://i.pravatar.cc/150?img=16'),
('Juan Jose', "$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W", 'juany@email.com', 87, 'male', 'Barcelona, Spain', 'Retired', 'english', 'snowboarding', 'I am Juan Jose', 'https://i.pravatar.cc/150?img=63');




CREATE TABLE messages (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
senderId INT NOT NULL,
receiverId INT NOT NULL,
text VARCHAR(250) NOT NULL,
dateTime DATETIME DEFAULT CURRENT_TIMESTAMP);


INSERT INTO events (userid,ticketmasterid, eventname, eventdate, starttime, imageurl, eventlocation, venue , currency, startingprice, ticketurl, genre, subgenre, host, eventtype, socialmedia, eventdetail) VALUES 
(1, "G5diZ94NPjotW", "Shania Twain: Queen Of Me Tour", "2023-07-11", "19:30:00", "https://s1.ticketm.net/dam/a/1d1/47cc9b10-4904-4dec-b1d6-539e44a521d1_1825531_RETINA_PORTRAIT_3_2.jpg", "New York, USA", "Madison Square Garden" , "USD", 65.95, "https://www.ticketmaster.com/shania-twain-queen-of-me-tour-new-york-new-york-07-11-2023/event/3B005D58E5711A7D", "Country", "Country", null, "Music", null, "yes");


CREATE TABLE files (
id INT NOT NULL AUTO_INCREMENT, 
filename VARCHAR(100) NOT NULL,
uploadedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);