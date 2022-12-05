CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 100 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL
);

ALTER TABLE boards ADD COLUMN user_id INTEGER;