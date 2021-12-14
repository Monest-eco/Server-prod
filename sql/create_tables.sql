--- Creation of user table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL,
  uuid varchar(36) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  birthdate date NOT NULL,
  PRIMARY KEY (id)
);

--- Creation of user_role table
CREATE TABLE IF NOT EXISTS user_role (
  id SERIAL NOT NULL,
  role_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) 
      REFERENCES users (id)
);

--- Creatation of data esp32 for each user table
CREATE TABLE IF NOT EXISTS Esp32Entity (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL,
  data_esp32 float(2) NOT NULL,
  date_esp32 TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) 
      REFERENCES users (id)
);
