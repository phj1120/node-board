create user itc801@localhost identified by 'itc801';

create database itc_board default character	set utf8;

grant all privileges on itc_board.* to itc801@localhost;

flush privileges;

ALTER USER itc801@localhost IDENTIFIED WITH mysql_native_password BY 'itc801';

flush privileges;
