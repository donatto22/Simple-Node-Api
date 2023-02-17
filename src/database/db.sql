drop database if exists NodeDatabase;
create database NodeDatabase charset utf8;
use NodeDatabase;

# Usuarios por defecto que pueden ver los libros
create table if not exists users (
    id int primary key not null auto_increment,
    username varchar(20) not null,
    email varchar(50) not null,
    `password` blob not null
);

# Procedimiento almacenado para el login
# Traerá el usuario completo usando email y password
Delimiter $$
create procedure login(email2 varchar(50), password2 varchar(50))
	begin # Password no debe estar en el jwt
		select id, username, email from users where email = email2 and aes_decrypt(`password`, "secret_key") = password2;
    end $$

# Procedimiento almacenado para registrar usuarios
Delimiter $$
create procedure register(username2 varchar(20), email2 varchar(50), password2 varchar(50))
	begin # Password no debe estar en el jwt
		insert into users(username, email, `password`) values (username2, email2, aes_encrypt(password2, "secret_key"));
    end $$

# Registrando usuario de Prueba
call register("Axurtel", "axu@gmail.com", "axu123");
call register("Valnov", "val_2@hotmail.com", "secure_password");

# Probando login
call login("axu@gmail.com", "axu123")

# Tabla con los libros, no puede acceder sin login
create table if not exists books (
    id int primary key not null,
    `name` varchar(50) not null
);

insert into books(id, name) values 
(1, "Mi perdición"),
(2, "Resident Evil"),
(3, "Aprendiendo a Invertir")