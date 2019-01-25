const connectionString = "postgres://postgres:123@localhost:5432/postgres";
CREATE TABLE meetup(
id int not null,
createdOn text not null,
location int not null,
images text,
topic text not null,
happeningOn text not null
tags text not null
);