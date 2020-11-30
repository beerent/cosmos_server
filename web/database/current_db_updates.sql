create table config
(
	id int auto_increment,
	`key` varchar(50) not null,
	value varchar(50) not null,
	constraint config_pk
		primary key (id)
);

create unique index config_key_uindex
	on config (`key`);

insert into config (`key`, `value`) values ("challenge_mode_timer_length", "10");