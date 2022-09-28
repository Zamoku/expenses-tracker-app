CREATE TABLE IF NOT EXISTS Users (
    id serial primary key, 
    names text not null,
    email VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS Categories(
   id serial primary key,
   category VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Expenses(
   id serial primary key,
   user_id INT,
   category_id INT,
   amount float,
   date timestamp,
   FOREIGN KEY(user_id) REFERENCES Users(id),
   FOREIGN KEY(category_id) REFERENCES Categories(id)
);

-- INSERT INTO Categories(category) VALUES ('Communication'),('Food'),('Toiletries'),('Travel');

