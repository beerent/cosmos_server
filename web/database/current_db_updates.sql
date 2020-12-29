create table cosmos_live_sessions
(
	id int auto_increment,
	state varchar(40) default null null,
	added datetime default CURRENT_TIMESTAMP null,
	constraint live_rounds_pk
		primary key (id)
);

alter table cosmos_live_sessions
	add start datetime null after state;

alter table cosmos_live_sessions
	add asked_questions_ids varchar(500) default "" null after start;