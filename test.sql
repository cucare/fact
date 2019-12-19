use fact;

drop table if exists user;

create table user(
	usr_id				int	auto_increment	not null primary key,
	usr_name			varchar(60) not null,
	usr_passwd			varchar(60) not null,
	usr_flag_archive	tinyint not null default 0 -- флаг удаленного пользователя
	);
	
insert into user(usr_name, usr_passwd) values('qwerty', 'k3h5');
insert into user(usr_name, usr_passwd, usr_flag_archive) values('asdfgh', '9879s7f', 1);
insert into user(usr_name, usr_passwd) values('zxcvbn', '12hgj');

-- ----------------------------------------------------------------

drop table if exists email;

-- отдельная таблица для возможности нескольких email
create table email(
	eml_id				int	auto_increment	not null primary key,
	eml_usr_id			int not null, -- id пользователя
	eml_name			varchar(60) not null,
	eml_flag_primary	tinyint not null default 1, -- флаг основного email
	eml_flag_confirmed	tinyint not null default 0 -- флаг подтвержденного email
);
	
insert into email(eml_usr_id, eml_name) values(1, 'ok@gmail.com');
insert into email(eml_usr_id, eml_name, eml_flag_confirmed) values(2, 'ya@yandex.com', 1);
insert into email(eml_usr_id, eml_name, eml_flag_confirmed) values(3, 'me@mail.ru', 1);
