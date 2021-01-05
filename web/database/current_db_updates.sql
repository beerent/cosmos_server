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

create table cosmos_live_answers
(
	id int auto_increment primary key,
	session_id int not null,
	user_id int not null,
	answer_id int not null,
	added datetime default CURRENT_TIMESTAMP not null,
	constraint cosmos_live_answers_answers_id_fk
		foreign key (answer_id) references answers (id),
	constraint cosmos_live_answers_cosmos_live_sessions_id_fk
		foreign key (session_id) references cosmos_live_sessions (id),
	constraint cosmos_live_answers_users_id_fk
		foreign key (user_id) references users (id)
);

create unique index cosmos_live_answers_id_uindex
	on cosmos_live_answers (id);

insert into config (`key`, value) values ("live_mode_question_timer_length", "15");
insert into config (`key`, value) values ("live_mode_round_timer_length", "30");
insert into config (`key`, value) values ("live_mode_pre_game_lobby_length", "3600");
insert into config (`key`, value) values ("live_mode_post_game_lobby_length", "3600");
insert into config (`key`, value) values ("admin_auth_key", "73nFm0OcvChiyENbq4V96nE6gm5qQMkHZ");
INSERT INTO config (`key`, value) VALUES ('live_mode_ping_threshold', '5')	

create table cosmos_live_ping
(
	id int auto_increment primary key,
	session_id int not null,
	user_id int not null,
	ping datetime not null,
	added datetime not null
);

create unique index cosmos_live_ping_id_uindex
	on cosmos_live_ping (id);

alter table cosmos_live_ping
	add constraint cosmos_live_ping_cosmos_live_sessions_id_fk
		foreign key (session_id) references cosmos_live_sessions (id);

alter table cosmos_live_ping
	add constraint cosmos_live_ping_users_id_fk
		foreign key (user_id) references users (id);

alter table cosmos_live_ping
	add constraint cosmos_live_ping_pk
		unique (session_id, user_id);

create table cosmos_live_chat
(
	id int auto_increment primary key,
	session_id int not null,
	user_id int not null,
	message varchar(300) not null,
	added datetime not null,
	constraint cosmos_live_chat_cosmos_live_sessions_id_fk
		foreign key (session_id) references cosmos_live_sessions (id),
	constraint cosmos_live_chat_users_id_fk
		foreign key (user_id) references users (id)
);