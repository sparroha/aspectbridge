-- Up
CREATE TABLE User(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

INSERT INTO User (name, email) values ('Josh', 'relaypoint7@gmail.com');
INSERT INTO User (name, email) values ('Keith', 'anthymngalaris@gmail.com');

-- Down
DROP TABLE User