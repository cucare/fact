create database fact;

create user 'fact_user'@'localhost' identified by 'fact123';

grant all privileges on fact.* to 'fact_user'@'localhost';

