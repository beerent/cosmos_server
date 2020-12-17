rename table cosmos.blogs to release_notes;
alter table cosmos.release_notes change author version text not null;
alter table cosmos.release_notes change blog notes text not null;
update release_notes set enabled = 0;