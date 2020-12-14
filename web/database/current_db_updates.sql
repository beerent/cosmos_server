create table messages
(
	id int auto_increment,
	message varchar(300) not null,
	start datetime not null,
	expire datetime not null,
	constraint messages_pk
		primary key (id)
);

