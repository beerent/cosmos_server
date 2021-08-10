alter table users
	add uid varchar(50) default 'N/A' not null after id;

alter table users drop key user_access_unique;

alter table users
	add constraint users_unique_key
		unique (uid, username, access_level);