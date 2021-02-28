create table cosmos_live_rounds
(
	id int auto_increment,
	session_id int not null,
	round int not null,
	questions varchar(100) null,
	added datetime null,
	constraint cosmos_live_rounds_pk
		primary key (id),
	constraint cosmos_live_rounds_cosmos_live_sessions_id_fk
		foreign key (session_id) references cosmos_live_sessions (id)
);

alter table cosmos_live_sessions drop column asked_questions_ids;

insert into devices (device_hash) value ("DEFAULT_HASH");

alter table users add device_id int default 1 null after id;

alter table users
	add constraint users_devices_id_fk
		foreign key (device_id) references devices (id);

		alter table users drop key user_access_unique;

alter table users
	add constraint user_access_unique
		unique (device_id, username, access_level);

alter table devices
	add added datetime not null;

alter table users modify device_id int default 1 not null;

alter table devices change device_hash device_uuid_hash varchar(40) not null;