create table health
(
	id int auto_increment,
	health_string varchar(200) not null,
	constraint health_pk
		primary key (id)
);

insert into health (health_string) values ('gaga X ari');