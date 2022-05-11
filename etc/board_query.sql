SELECT * FROM itc_board.users;

SELECT * FROM itc_board.boards;

SELECT * FROM itc_board.boards where bno = 5;

update boards set viewCnt=0; 

delete from boards where bno >0;

insert into boards (title, body, writer, writeTime, createdAt, updatedAt) values ( '제목', '내용', 'phj', now() ,now(), now());
insert into boards(title, body, writeTime, writer, viewCnt, createdAt, updatedAt) 
(select title, body, writeTime, writer, viewCnt, createdAt, updatedAt from boards);