create table live_rounds
(
	id int auto_increment,
	state varchar(40) default null null,
	added datetime default CURRENT_TIMESTAMP null,
	constraint live_rounds_pk
		primary key (id)
);