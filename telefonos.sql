-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.8-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para personas
CREATE DATABASE IF NOT EXISTS `personas` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `personas`;

-- Volcando estructura para tabla personas.telefonos
CREATE TABLE IF NOT EXISTS `telefonos` (
  `id_telefono` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(20) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `documento` int(11) NOT NULL,
  PRIMARY KEY (`id_telefono`),
  KEY `telefonos_FK` (`documento`),
  CONSTRAINT `telefonos_FK` FOREIGN KEY (`documento`) REFERENCES `personas2` (`documento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla personas.telefonos: ~16 rows (aproximadamente)
/*!40000 ALTER TABLE `telefonos` DISABLE KEYS */;
INSERT INTO `telefonos` (`id_telefono`, `numero`, `id_tipo`, `documento`) VALUES
	(1, '3515212001', 1, 64355200),
	(2, '3512161228', 1, 64355200),
	(3, '3515951633', 1, 64355200),
	(4, '3513343212', 1, 10201706),
	(5, '3512221144', 1, 10201706),
	(6, '3421335421', 1, 10309437),
	(7, '2311446676', 1, 10309437),
	(8, '1234565433', 1, 10309437),
	(9, '3512344543', 1, 10309437),
	(10, '3519090221', 1, 10405920),
	(14, '1234567891', 1, 10397469),
	(15, '1234567111', 1, 10397469),
	(16, '23232111', 1, 10397469),
	(17, '99900111', 1, 10397469),
	(18, '351520111', 1, 10309437),
	(19, '3517780111', 1, 64355200),
	(20, '35155522121', 2, 10309437),
	(21, '35188811173', 2, 10309437),
	(22, '23166644410', 3, 10309437),
	(23, '29133328930', 3, 10309437),
	(24, '31321323440', 4, 10309437);
/*!40000 ALTER TABLE `telefonos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
