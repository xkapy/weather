CREATE DATABASE `weather`;

USE `weather`;

CREATE TABLE `users` (
	`id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(300) NOT NULL,
    `email` VARCHAR(300) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `city` VARCHAR(300) NOT NULL,
    `is_dark` BOOLEAN NOT NULL DEFAULT true,
    PRIMARY KEY(`id`)
);