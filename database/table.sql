CREATE TABLE `url_information` (
    `id` int NOT NULL AUTO_INCREMENT,
    `url` varchar(255) NOT NULL,
    `shortcode` varchar(255) NOT NULL,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `accessCount` int NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
