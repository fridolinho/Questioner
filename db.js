const pool = require('./connect.js');
  
const deleteTables = () => {
 const users = 'DROP TABLE users IF EXISTS';
 const meetups = 'DROP TABLE meetups IF EXISTS';
 const questions = 'DROP TABLE questions IF EXISTS';
 const rsvp = 'DROP TABLE rsvp IF EXISTS';


 const dropQueries = `${users}; ${questions}; ${rsvp}; ${meetups};`;

 pool.query(dropQueries)
   .then((res) => {
     console.log(res);
     pool.end();
   })
   .catch((err) => {
     console.log(err);
     pool.end();
   });
 pool.on('remove', () => {
   console.log('client removed');
   process.exit(0);
 });
};

const createTables = () => {
 const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       firstname VARCHAR(50) NOT NULL,
       lastname VARCHAR(50) NOT NULL,
       othername VARCHAR(50) NOT NULL,
       email VARCHAR(100) NULL,
       phone VARCHAR(15) NOT NULL,
       username VARCHAR(50) NOT NULL,
       password TEXT NOT NULL,
       registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       isadmin BOOLEAN NOT NULL DEFAULT false
     )`;

 const meetups = `CREATE TABLE IF NOT EXISTS
     meetups(
       id SERIAL PRIMARY KEY,
       createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       location VARCHAR(100) NOT NULL,
       images TEXT NULL,
       topic VARCHAR(50) NOT NULL,
       happeningon VARCHAR(255),
       tags TEXT NULL
     )`;

 const questions = `CREATE TABLE IF NOT EXISTS
     questions(
       id SERIAL PRIMARY KEY,
       createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       createdBy INT NOT NULL REFERENCES users(id),
       meetup INT NOT NULL REFERENCES meetups(id),
       title VARCHAR(100) NOT NULL,
       body TEXT NULL,
       upvotes INT NOT NULL DEFAULT 0,
       downvotes INT NOT NULL DEFAULT 0
     )`;

 const rsvp = `CREATE TABLE IF NOT EXISTS
     rsvp(
       id SERIAL PRIMARY KEY,
       meetup INT NOT NULL REFERENCES meetups(id),
       topic VARCHAR(255) NOT NULL,
       createdby INT NOT NULL REFERENCES users(id),
       response VARCHAR(15) NOT NULL
     )`;

 const createQueries = `${users}; ${meetups}; ${questions}; ${rsvp};`;

 pool.query(createQueries)
   .then((res) => {
     console.log(res);
     pool.end();
   })
   .catch((err) => {
     console.log(err);
     pool.end();
   });

 pool.on('remove', () => {
   console.log('client removed');
   process.exit(0);
 });
};

module.exports = {
 deleteTables,
 createTables,
 pool
};

require('make-runnable');