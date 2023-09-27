CREATE DATABASE goodfoodhunting;

-- remember to connect to the database before creating tables
-- \c goodfoodhunting

CREATE TABLE dishes (
  id SERIAL PRIMARY KEY,
  title TEXT,
  image_url TEXT,
  user_id INTEGER NOT NULL
);

ALTER TABLE dishes ADD COLUMN user_id INTEGER;

-- check that tableshave been created
-- \dt

-- seeding some initial records

INSERT INTO dishes (title, image_url)
VALUES ('cake', 'https://dulwichbakery.com.au/wp-content/uploads/2021/09/dulwich-chocolate-cake-w-hearts.jpg');

INSERT INTO dishes (title, image_url)
VALUES ('pasta', 'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Pasta-alla-vodka-f1d2e1c.jpg');

INSERT INTO dishes (title, image_url)
VALUES ('cake', 'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Pasta-alla-vodka-f1d2e1c.jpg');


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT,
  password_digest TEXT
);
