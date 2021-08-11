create table request_log
(
	id int,
	user_id int null,
	request_endpoint varchar(100) null,
	request_parameters varchar(300) null,
	added datetime default now() not null,
	constraint request_log_users_id_fk
		foreign key (user_id) references users (id)
);

create unique index request_log_id_uindex
	on request_log (id);

alter table request_log
	add constraint request_log_pk
		primary key (id);

alter table request_log modify id int auto_increment;

alter table users drop key email_UNIQUE;