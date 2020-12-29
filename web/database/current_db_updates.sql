create table live_rounds
(
	id int auto_increment,
	state varchar(40) default null null,
	added datetime default CURRENT_TIMESTAMP null,
	constraint live_rounds_pk
		primary key (id)
);

alter table live_rounds
	add start datetime null after state;

alter table live_rounds
	add asked_questions_ids varchar(500) default "" null after start;