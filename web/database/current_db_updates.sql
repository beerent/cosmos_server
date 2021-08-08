create table alerts
(
	id int,
	`key` varchar(20) not null,
	title varchar(100) not null,
	alert varchar(1000) not null
);

create unique index alerts_id_uindex
	on alerts (id);

create unique index alerts_key_uindex
	on alerts (`key`);

alter table alerts
	add constraint alerts_pk
		primary key (id);

alter table alerts modify id int auto_increment;

