create table student
(
   id integer identity not null,
   name varchar(255) not null,
   physics integer,
   chemistry integer,
   mathematics integer,
   primary key(id)
);