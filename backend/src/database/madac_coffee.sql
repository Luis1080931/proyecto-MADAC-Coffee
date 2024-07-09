-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2024 a las 01:58:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `madac_coffee`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis`
--

CREATE TABLE `analisis` (
  `codigo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `fk_analista` int(11) DEFAULT NULL,
  `fk_muestra` int(11) DEFAULT NULL,
  `fk_tipo_analisis` int(11) DEFAULT NULL,
  `estado` enum('asignado','calificado','terminado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `analisis`
--

INSERT INTO `analisis` (`codigo`, `fecha`, `fk_analista`, `fk_muestra`, `fk_tipo_analisis`, `estado`) VALUES
(13, '2024-06-06', 1080934, 8, 1, 'asignado'),
(14, '2024-06-24', 1111, 9, 2, 'asignado'),
(15, '2024-05-26', 1111, 9, 1, 'terminado'),
(16, '2024-12-20', 12245, 8, 1, 'terminado'),
(17, '2024-06-24', 12234140, 10, 1, 'terminado'),
(18, '2024-05-20', 12234140, 10, 2, 'calificado'),
(19, '2024-05-31', 1111, 11, 1, 'asignado'),
(20, '2024-06-18', 12234140, 10, 1, 'terminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fincas`
--

CREATE TABLE `fincas` (
  `codigo` int(11) NOT NULL,
  `nombre_finca` varchar(200) NOT NULL,
  `dimension_mt2` decimal(10,2) NOT NULL,
  `fk_caficultor` int(11) DEFAULT NULL,
  `municipio` int(11) NOT NULL,
  `vereda` varchar(200) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fincas`
--

INSERT INTO `fincas` (`codigo`, `nombre_finca`, `dimension_mt2`, `fk_caficultor`, `municipio`, `vereda`, `estado`) VALUES
(3, 'El porvenir pa', 13.00, 12345, 16, 'Guayabal', 'activo'),
(6, '', 12.00, 1080, 1, 'Palmito', 'inactivo'),
(7, 'La bonita\r\n', 1300.00, 1080934638, 10, 'Puerto rico', 'activo'),
(8, '', 1200.00, 12345, 7, 'Vereda', 'inactivo'),
(9, 'Las margaritas', 1200.00, 111111, 15, 'Patio bonito', 'activo'),
(10, '', 1500.00, 12345, 6, 'Puerto rico', 'activo'),
(11, '', 120.00, 12345, 4, 'Palmito', 'activo'),
(12, '', 500.00, 12345, 5, 'Hola', 'activo'),
(13, 'El porvenir', 3000.00, 111111, 36, 'Palmito', 'activo'),
(14, 'La laguna', 1500.00, 111111, 18, 'gigante vereda', 'activo'),
(15, 'Lucass', 12.00, 12235, 10, 'ver', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotes`
--

CREATE TABLE `lotes` (
  `codigo` int(11) NOT NULL,
  `numero_arboles` int(11) NOT NULL,
  `fk_finca` int(11) DEFAULT NULL,
  `fk_variedad` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lotes`
--

INSERT INTO `lotes` (`codigo`, `numero_arboles`, `fk_finca`, `fk_variedad`, `estado`) VALUES
(2, 8000, 11, 1, 'activo'),
(3, 5000, 3, 1, 'activo'),
(4, 4000, 7, 9, 'inactivo'),
(5, 4000, 7, 11, 'inactivo'),
(6, 5300, 9, 1, 'inactivo'),
(21, 200, 7, 8, 'activo'),
(22, 5000, 12, 8, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras`
--

CREATE TABLE `muestras` (
  `codigo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tipo_molienda` varchar(200) NOT NULL,
  `densidad_cafe` varchar(200) NOT NULL,
  `proceso_fermentacion` varchar(200) NOT NULL,
  `tipo_tostion` varchar(200) NOT NULL,
  `altura_MSNM` decimal(10,2) NOT NULL,
  `tiempo_fermentacion` varchar(200) NOT NULL,
  `actividad_agua` varchar(200) NOT NULL,
  `tiempo_secado` varchar(200) NOT NULL,
  `presentacion` varchar(200) NOT NULL,
  `fk_lote` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `muestras`
--

INSERT INTO `muestras` (`codigo`, `fecha`, `tipo_molienda`, `densidad_cafe`, `proceso_fermentacion`, `tipo_tostion`, `altura_MSNM`, `tiempo_fermentacion`, `actividad_agua`, `tiempo_secado`, `presentacion`, `fk_lote`, `estado`) VALUES
(8, '2024-06-06', 'Aristobulo', 'Mario', 'En tula', 'negro', 1200.00, 'secadero', 'No especifica', '15 horas', 'C.P.S', 21, 'activo'),
(9, '2024-05-09', '50.00', 'Jose', 'En tula', '12.00', 1200.00, 'En cilo', 'hola', '', '', 5, 'activo'),
(10, '2024-05-20', '500.00', 'Laura', '24 horas en baba', '12.00', 1200.00, 'secadero', 'Sobre peso de almendra', '', '', 21, 'activo'),
(11, '2024-05-26', '1000.00', 'Daniela', 'En babita', '1.00', 2000.00, 'Cilo', 'Bofffff', '', '', 3, 'activo'),
(13, '2024-06-06', 'Rosa Medina', '1 %', '24 horas en baba', '500', 2000.00, '17 horas', 'humedad', '10 horas', 'C.P.S', 3, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `id_municipio` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`id_municipio`, `nombre`) VALUES
(1, 'Aipe'),
(2, 'Algeciras'),
(3, 'Baraya'),
(4, 'Campoalegre'),
(5, 'Hobo'),
(6, 'Iquira'),
(7, 'Neiva'),
(8, 'Palermo'),
(9, 'Rivera'),
(10, 'Santa Maria '),
(11, 'Tello'),
(12, 'Teruel'),
(13, 'Villavieja'),
(14, 'Yaguara'),
(15, 'Agrado'),
(16, 'Altamira '),
(17, 'Garzon '),
(18, 'Gigante '),
(19, 'Guadalupe'),
(20, 'Pital'),
(21, 'Suaza'),
(22, 'Tarqui'),
(23, 'La Argentina '),
(24, 'La Plata '),
(25, 'Nataga'),
(26, 'Paicol'),
(27, 'Tesalia'),
(28, 'Acevedo '),
(29, 'Elias'),
(30, 'Isnos '),
(31, 'Oporapa '),
(32, 'Palestina '),
(33, 'Pitalito '),
(34, 'Saladoblanco'),
(35, 'San Agustin '),
(36, 'Timana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `codigo` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `fk_analisis` int(11) DEFAULT NULL,
  `fk_variables` int(11) DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `valor` varchar(50) DEFAULT NULL,
  `estado` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`codigo`, `fecha`, `fk_analisis`, `fk_variables`, `observaciones`, `valor`, `estado`) VALUES
(1, '2024-10-20', 13, 1, NULL, '50g', 'activo'),
(2, '2024-04-30', 13, 2, NULL, '10 g', 'activo'),
(3, '2024-04-30', 13, 3, NULL, '12 g', 'activo'),
(4, '2024-04-30', 13, 4, NULL, '1 g', 'activo'),
(5, '2024-04-30', 13, 5, NULL, '2 g', 'activo'),
(6, '2024-04-30', 13, 6, NULL, '1 g', 'activo'),
(7, '2024-04-30', 13, 7, NULL, '4 g', 'activo'),
(8, '2024-04-30', 13, 8, NULL, '5 g', 'activo'),
(9, '2024-04-30', 13, 9, NULL, '12 g', 'activo'),
(10, '2024-04-30', 13, 10, NULL, '11 g', 'activo'),
(11, '2024-04-30', 13, 11, NULL, '10 g', 'activo'),
(12, '2024-04-30', 13, 12, NULL, '15 g', 'activo'),
(13, '2024-04-30', 13, 13, NULL, '10 g', 'activo'),
(14, '2024-04-30', 13, 14, NULL, '9 g', 'activo'),
(15, '2024-04-30', 13, 15, NULL, '5 g', 'activo'),
(16, '2024-04-30', 13, 16, NULL, '12 %', 'activo'),
(17, '2024-04-30', 13, 17, NULL, '12 g', 'activo'),
(18, '2024-04-30', 13, 18, NULL, '10 %', 'activo'),
(19, '2024-04-30', 13, 19, NULL, '5 %', 'activo'),
(20, '2024-04-30', 13, 20, NULL, '5 kg', 'activo'),
(21, '2024-04-30', 13, 21, NULL, '20 g', 'activo'),
(22, '2024-04-30', 13, 22, NULL, '1 g', 'activo'),
(23, '2024-04-30', 13, 23, NULL, '2 g', 'activo'),
(24, '2024-04-30', 13, 24, NULL, '3 g', 'activo'),
(25, '2024-04-30', 13, 25, NULL, '6 g', 'activo'),
(26, '2024-04-30', 13, 26, NULL, '6 g', 'activo'),
(27, '2024-04-30', 13, 27, NULL, '10 g', 'activo'),
(28, '2024-04-30', 13, 28, NULL, '3 g', 'activo'),
(29, '2024-04-30', 13, 29, NULL, '1 g', 'activo'),
(30, '2024-04-30', 13, 30, NULL, '1 g', 'activo'),
(31, '2024-05-08', 15, 1, NULL, '1', 'inactivo'),
(32, '2024-05-08', 15, 2, NULL, '1', 'inactivo'),
(33, '2024-05-08', 15, 3, NULL, '1', 'inactivo'),
(34, '2024-05-08', 15, 4, NULL, '1', 'inactivo'),
(35, '2024-05-08', 15, 5, NULL, 'q', 'inactivo'),
(36, '2024-05-08', 15, 6, NULL, '1', 'inactivo'),
(37, '2024-05-08', 15, 7, NULL, '1', 'inactivo'),
(38, '2024-05-08', 15, 8, NULL, '1', 'inactivo'),
(39, '2024-05-08', 15, 9, NULL, '1', 'inactivo'),
(40, '2024-05-08', 15, 10, NULL, '1', 'inactivo'),
(41, '2024-05-08', 15, 11, NULL, '1', 'inactivo'),
(42, '2024-05-08', 15, 12, NULL, '1', 'inactivo'),
(43, '2024-05-08', 15, 13, NULL, '1', 'inactivo'),
(44, '2024-05-08', 15, 14, NULL, '1', 'inactivo'),
(45, '2024-05-08', 15, 15, NULL, '1', 'inactivo'),
(46, '2024-05-08', 15, 16, NULL, '1', 'inactivo'),
(47, '2024-05-08', 15, 17, NULL, '1', 'inactivo'),
(48, '2024-05-08', 15, 18, NULL, '1', 'inactivo'),
(49, '2024-05-08', 15, 19, NULL, '1', 'inactivo'),
(50, '2024-05-08', 15, 20, NULL, 'q', 'inactivo'),
(51, '2024-05-08', 15, 21, NULL, '1', 'inactivo'),
(52, '2024-05-08', 15, 22, NULL, 'q', 'inactivo'),
(53, '2024-05-08', 15, 23, NULL, '1', 'inactivo'),
(54, '2024-05-08', 15, 24, NULL, 'q', 'inactivo'),
(55, '2024-05-08', 15, 25, NULL, '1', 'inactivo'),
(56, '2024-05-08', 15, 26, NULL, '1', 'inactivo'),
(57, '2024-05-08', 15, 27, NULL, '1', 'inactivo'),
(58, '2024-05-08', 15, 28, NULL, '1', 'inactivo'),
(59, '2024-05-08', 15, 29, NULL, '2', 'inactivo'),
(60, '2024-05-08', 15, 30, NULL, '1', 'inactivo'),
(61, '2024-05-08', 15, 31, NULL, '1', 'inactivo'),
(126, '2024-06-06', 16, 1, NULL, '1', 'inactivo'),
(127, '2024-06-06', 16, 2, NULL, '2', 'inactivo'),
(128, '2024-06-06', 16, 3, NULL, '3', 'inactivo'),
(129, '2024-06-06', 16, 4, NULL, '4', 'inactivo'),
(130, '2024-06-06', 16, 5, NULL, '5', 'inactivo'),
(131, '2024-06-06', 16, 6, NULL, '6', 'inactivo'),
(132, '2024-06-06', 16, 7, NULL, '7', 'inactivo'),
(133, '2024-06-06', 16, 8, NULL, '8', 'inactivo'),
(134, '2024-06-06', 16, 9, NULL, '9', 'inactivo'),
(135, '2024-06-06', 16, 10, NULL, '10', 'inactivo'),
(136, '2024-06-06', 16, 11, NULL, '11', 'inactivo'),
(137, '2024-06-06', 16, 12, NULL, '12', 'inactivo'),
(138, '2024-06-06', 16, 13, NULL, '13', 'inactivo'),
(139, '2024-06-06', 16, 14, NULL, '14', 'inactivo'),
(140, '2024-06-06', 16, 15, NULL, '15', 'inactivo'),
(141, '2024-06-06', 16, 16, NULL, '16', 'inactivo'),
(142, '2024-06-06', 16, 17, NULL, '17', 'inactivo'),
(143, '2024-06-06', 16, 18, NULL, '18', 'inactivo'),
(144, '2024-06-06', 16, 19, NULL, '19', 'inactivo'),
(145, '2024-06-06', 16, 20, NULL, '20', 'inactivo'),
(146, '2024-06-06', 16, 21, NULL, '21', 'inactivo'),
(147, '2024-06-06', 16, 22, NULL, '22', 'inactivo'),
(148, '2024-06-06', 16, 23, NULL, '23', 'inactivo'),
(149, '2024-06-06', 16, 24, NULL, '24', 'inactivo'),
(150, '2024-06-06', 16, 25, NULL, '25', 'inactivo'),
(151, '2024-06-06', 16, 26, NULL, '26', 'inactivo'),
(152, '2024-06-06', 16, 27, NULL, '27', 'inactivo'),
(153, '2024-06-06', 16, 28, NULL, '28', 'inactivo'),
(154, '2024-06-06', 16, 29, NULL, '29', 'inactivo'),
(155, '2024-06-06', 16, 30, NULL, '30', 'inactivo'),
(156, '2024-06-06', 16, 31, NULL, '31', 'inactivo'),
(157, '2024-06-06', 16, 32, NULL, '32', 'inactivo'),
(158, '2024-06-06', 16, 33, NULL, '33', 'inactivo'),
(159, '2024-06-18', 20, 1, NULL, '1', 'inactivo'),
(160, '2024-06-18', 20, 2, NULL, '2', 'inactivo'),
(161, '2024-06-18', 20, 3, NULL, '3', 'inactivo'),
(162, '2024-06-18', 20, 4, NULL, '4', 'inactivo'),
(163, '2024-06-18', 20, 5, NULL, '5', 'inactivo'),
(164, '2024-06-18', 20, 6, NULL, '6', 'inactivo'),
(165, '2024-06-18', 20, 7, NULL, '7', 'inactivo'),
(166, '2024-06-18', 20, 8, NULL, '8', 'inactivo'),
(167, '2024-06-18', 20, 9, NULL, '', 'inactivo'),
(168, '2024-06-18', 20, 10, NULL, '', 'inactivo'),
(169, '2024-06-18', 20, 11, NULL, '', 'inactivo'),
(170, '2024-06-18', 20, 12, NULL, '', 'inactivo'),
(171, '2024-06-18', 20, 13, NULL, '', 'inactivo'),
(172, '2024-06-18', 20, 14, NULL, '', 'inactivo'),
(173, '2024-06-18', 20, 15, NULL, '', 'inactivo'),
(174, '2024-06-18', 20, 16, NULL, '', 'inactivo'),
(175, '2024-06-18', 20, 17, NULL, '', 'inactivo'),
(176, '2024-06-18', 20, 18, NULL, '', 'inactivo'),
(177, '2024-06-18', 20, 19, NULL, '', 'inactivo'),
(178, '2024-06-18', 20, 20, NULL, '', 'inactivo'),
(179, '2024-06-18', 20, 21, NULL, '', 'inactivo'),
(180, '2024-06-18', 20, 22, NULL, '', 'inactivo'),
(181, '2024-06-18', 20, 23, NULL, '', 'inactivo'),
(182, '2024-06-18', 20, 24, NULL, '', 'inactivo'),
(183, '2024-06-18', 20, 25, NULL, '', 'inactivo'),
(184, '2024-06-18', 20, 26, NULL, '', 'inactivo'),
(185, '2024-06-18', 20, 27, NULL, '', 'inactivo'),
(186, '2024-06-18', 20, 28, NULL, '', 'inactivo'),
(187, '2024-06-18', 20, 29, NULL, '', 'inactivo'),
(188, '2024-06-18', 20, 30, NULL, '', 'inactivo'),
(189, '2024-06-18', 20, 31, NULL, '', 'inactivo'),
(190, '2024-06-18', 20, 32, NULL, '', 'inactivo'),
(191, '2024-06-18', 20, 33, NULL, '', 'inactivo'),
(192, '2024-06-24', 15, 1, NULL, '10', 'inactivo'),
(193, '2024-06-24', 15, 2, NULL, '10', 'inactivo'),
(194, '2024-06-24', 15, 3, NULL, '10', 'inactivo'),
(195, '2024-06-24', 15, 4, NULL, '10', 'inactivo'),
(196, '2024-06-24', 15, 5, NULL, '10', 'inactivo'),
(197, '2024-06-24', 15, 6, NULL, '10', 'inactivo'),
(198, '2024-06-24', 15, 7, NULL, '10', 'inactivo'),
(199, '2024-06-24', 15, 8, NULL, '10', 'inactivo'),
(200, '2024-06-24', 15, 9, NULL, '10', 'inactivo'),
(201, '2024-06-24', 15, 10, NULL, '10', 'inactivo'),
(202, '2024-06-24', 15, 11, NULL, '10', 'inactivo'),
(203, '2024-06-24', 15, 12, NULL, '10', 'inactivo'),
(204, '2024-06-24', 15, 13, NULL, '10', 'inactivo'),
(205, '2024-06-24', 15, 14, NULL, '10', 'inactivo'),
(206, '2024-06-24', 15, 15, NULL, '10', 'inactivo'),
(207, '2024-06-24', 15, 16, NULL, '10', 'inactivo'),
(208, '2024-06-24', 15, 17, NULL, '10', 'inactivo'),
(209, '2024-06-24', 15, 18, NULL, '10', 'inactivo'),
(210, '2024-06-24', 15, 19, NULL, '10', 'inactivo'),
(211, '2024-06-24', 15, 20, NULL, '10', 'inactivo'),
(212, '2024-06-24', 15, 21, NULL, '10', 'inactivo'),
(213, '2024-06-24', 15, 22, NULL, '10', 'inactivo'),
(214, '2024-06-24', 15, 23, NULL, '10', 'inactivo'),
(215, '2024-06-24', 15, 24, NULL, '10', 'inactivo'),
(216, '2024-06-24', 15, 25, NULL, '10', 'inactivo'),
(217, '2024-06-24', 15, 26, NULL, '10', 'inactivo'),
(218, '2024-06-24', 15, 27, NULL, '10', 'inactivo'),
(219, '2024-06-24', 15, 28, NULL, '10', 'inactivo'),
(220, '2024-06-24', 15, 29, NULL, '10', 'inactivo'),
(221, '2024-06-24', 15, 30, NULL, '10', 'inactivo'),
(222, '2024-06-24', 15, 31, NULL, '10', 'inactivo'),
(223, '2024-06-24', 15, 32, NULL, '10', 'inactivo'),
(224, '2024-06-24', 15, 33, NULL, '10', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensoriales`
--

CREATE TABLE `sensoriales` (
  `codigo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `aroma` varchar(50) DEFAULT NULL,
  `sabor` varchar(50) DEFAULT NULL,
  `postgusto` varchar(50) DEFAULT NULL,
  `acidez` varchar(50) DEFAULT NULL,
  `cuerpo` varchar(50) DEFAULT NULL,
  `uniformidad` varchar(50) DEFAULT NULL,
  `balance` varchar(50) DEFAULT NULL,
  `taza_limpia` varchar(50) DEFAULT NULL,
  `dulzura` varchar(50) DEFAULT NULL,
  `general` varchar(50) DEFAULT NULL,
  `punteo` varchar(50) DEFAULT NULL,
  `taza_defecto` varchar(50) DEFAULT NULL,
  `intensidad_defecto` varchar(50) DEFAULT NULL,
  `sub_defecto` varchar(50) DEFAULT NULL,
  `punteo_final` varchar(50) DEFAULT NULL,
  `notas` varchar(400) DEFAULT NULL,
  `fk_analisis` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensoriales`
--

INSERT INTO `sensoriales` (`codigo`, `fecha`, `aroma`, `sabor`, `postgusto`, `acidez`, `cuerpo`, `uniformidad`, `balance`, `taza_limpia`, `dulzura`, `general`, `punteo`, `taza_defecto`, `intensidad_defecto`, `sub_defecto`, `punteo_final`, `notas`, `fk_analisis`, `estado`) VALUES
(4, '2024-06-03', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '100', '2', '10', '20', '80', 'Buen aroma, analisis full', 18, 'inactivo'),
(5, '2024-06-04', '9', '7.25', '7.5', '6.25', '8.25', '8', '9.25', '4', '6', '9.25', '73', '1', '10', '10', '63', 'El cafe presenta una deficiencia de cloro', 18, 'inactivo'),
(6, '2024-06-10', '9', '7', '8.25', '7.25', '7', '2', '9.5', '6', '2', '6.75', '63', '2', '5', '10', '53', 'Hola probando', 18, 'inactivo'),
(7, '2024-06-20', '8.5', '8.25', '6.5', '7.5', '6.25', '2', '7.5', '6', '2', '9', '61', '1', '10', '10', '51', 'hhhhhh', 18, 'inactivo'),
(8, '2024-06-27', '10', '8.5', '7.25', '8', '7.25', '6', '6.5', '6', '4', '7.5', '69', '1', '20', '20', '49', 'aaaa', 18, 'inactivo'),
(9, '2024-06-11', '10', '7.5', '8.25', '6.5', '9.25', '4', '6.25', '6', '2', '7.75', '65', '1', '7', '7', '58', 'Probando', 18, 'inactivo'),
(10, '0000-00-00', '8.5', '8.5', '9.25', '6.5', '8.5', '4', '6.5', '2', '4', '7.5', '62', '1', '5', '5', '57', 'Actualizando la prueba, analisis 17', 17, 'inactivo'),
(11, '2024-06-24', '9', '7.25', '8.25', '7.25', '9.25', '4', '8.25', '4', '8', '8.75', '72', '5', '2', '10', '62', 'Defisis de potasio', 14, 'inactivo'),
(12, '0000-00-00', '8.5', '7', '7.5', '6.25', '9.25', '71', '8.25', '8', '10', '6.5', '140', '1', '5', '5', '135', 'Prueba socia\n', 18, 'activo'),
(13, '0000-00-00', '8', '7', '7.5', '6.25', '9.25', '193', '8.25', '8', '10', '6.5', '262', '1', '5', '5', '257', 'sapa sapa2', 18, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_analisis`
--

CREATE TABLE `tipo_analisis` (
  `id` int(11) NOT NULL,
  `tipo_analisis` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_analisis`
--

INSERT INTO `tipo_analisis` (`id`, `tipo_analisis`) VALUES
(1, 'Fisico'),
(2, 'Sensorial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `identificacion` int(11) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `correo_electronico` varchar(200) NOT NULL,
  `tipo_usuario` enum('admin','catador','caficultor') DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`identificacion`, `telefono`, `nombre`, `correo_electronico`, `tipo_usuario`, `password`, `estado`) VALUES
(1080, '3154051769', 'Luis Perdomo', 'luis@gmail.com', 'admin', 'luis123', 'activo'),
(1111, '3333333', 'User prueba', 'user@gmail.com', 'catador', 'user123', 'activo'),
(12230, '31011111', 'Juan', 'juan@gmail.com', '', 'juan123', 'inactivo'),
(12235, '3102934', 'Lucia', 'lucia@gmail.com', 'caficultor', 'lucia123', 'activo'),
(12239, '3101985', 'Juan Carlos Diaz', 'juan@gmail.com', 'catador', 'juan123', 'activo'),
(12245, '310', 'Joel', 'joel@gmail.com', 'catador', 'joel123', 'activo'),
(12345, '3102345', 'Rosa Medina', 'rosa@gmail.com', 'caficultor', 'rosa123', 'activo'),
(111111, '333333', 'Rosaura Rojas', 'rosaura@gmail.com', 'caficultor', 'rosaura123', 'activo'),
(1080934, '3119547883', 'Aristobulo', 'aristobulo@gmail.com', 'catador', 'ari123', 'activo'),
(12234140, '3112804664', 'Mario Lopez', 'mario@gmail.com', 'catador', 'mario123', 'activo'),
(1080934638, '3119547883', 'Aristobulo', 'aristobulo@gmail.com', 'catador', 'aristobulo123', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variables`
--

CREATE TABLE `variables` (
  `v_codigo` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `fk_tipo_analisis` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variables`
--

INSERT INTO `variables` (`v_codigo`, `nombre`, `fk_tipo_analisis`, `estado`) VALUES
(1, 'Peso CPS', 1, 'activo'),
(2, 'Peso cisco', 1, 'activo'),
(3, 'Peso total de la almendra', 1, 'activo'),
(4, 'Peso defectos totales', 1, 'activo'),
(5, 'Peso de almendra sana', 1, 'activo'),
(6, 'Negro total o parcial', 1, 'activo'),
(7, 'Vinagre', 1, 'activo'),
(8, 'Veteado', 1, 'activo'),
(9, 'Sobresecado', 1, 'activo'),
(10, 'Picado por insectos', 1, 'activo'),
(11, 'Inmaduro o paloteado', 1, 'activo'),
(12, 'Flojo', 1, 'activo'),
(13, 'Malla 18', 1, 'activo'),
(14, 'Malla 17', 1, 'activo'),
(15, 'Malla 16', 1, 'activo'),
(16, 'Humedad', 1, 'activo'),
(17, 'Merma por trilla', 1, 'activo'),
(18, 'Porcentaje de almendra sana', 1, 'activo'),
(19, 'Porcentaje de defectos totales', 1, 'activo'),
(20, 'Factor de rendimiento (kg C.P.S)', 1, 'activo'),
(21, 'Cardenillo', 1, 'activo'),
(22, 'Cristalizado', 1, 'activo'),
(23, 'Ámbar o mantequillo', 1, 'activo'),
(24, 'Mordido o cortado', 1, 'activo'),
(25, 'Averanado o arrugado', 1, 'activo'),
(26, 'Aplastado', 1, 'activo'),
(27, 'Decolorado o reposado', 1, 'activo'),
(28, 'Malla 15', 1, 'activo'),
(29, 'Malla 14', 1, 'activo'),
(30, 'Mallas menores', 1, 'activo'),
(31, 'Prueba', 1, 'activo'),
(32, 'Variable pruebas 2', 1, 'activo'),
(33, 'variable prueba 3', 2, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variedades`
--

CREATE TABLE `variedades` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variedades`
--

INSERT INTO `variedades` (`codigo`, `nombre`, `estado`) VALUES
(1, 'Papayo', 'activo'),
(2, 'fj-16', 'inactivo'),
(6, 'Borbon', 'activo'),
(7, 'Catimore', 'inactivo'),
(8, 'Castillo', 'activo'),
(9, 'Luis', 'activo'),
(10, 'Hola', 'activo'),
(11, 'Supremo rey', 'activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `analisis`
--
ALTER TABLE `analisis`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `hacer` (`fk_muestra`),
  ADD KEY `corresponder` (`fk_tipo_analisis`),
  ADD KEY `existir` (`fk_analista`);

--
-- Indices de la tabla `fincas`
--
ALTER TABLE `fincas`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `pertenecer` (`fk_caficultor`),
  ADD KEY `partir` (`municipio`);

--
-- Indices de la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `estar` (`fk_finca`),
  ADD KEY `tener` (`fk_variedad`);

--
-- Indices de la tabla `muestras`
--
ALTER TABLE `muestras`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `ser` (`fk_lote`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `arrojar` (`fk_analisis`),
  ADD KEY `poseer` (`fk_variables`);

--
-- Indices de la tabla `sensoriales`
--
ALTER TABLE `sensoriales`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `tiene` (`fk_analisis`);

--
-- Indices de la tabla `tipo_analisis`
--
ALTER TABLE `tipo_analisis`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`identificacion`);

--
-- Indices de la tabla `variables`
--
ALTER TABLE `variables`
  ADD PRIMARY KEY (`v_codigo`),
  ADD KEY `depender` (`fk_tipo_analisis`);

--
-- Indices de la tabla `variedades`
--
ALTER TABLE `variedades`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `analisis`
--
ALTER TABLE `analisis`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `fincas`
--
ALTER TABLE `fincas`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT de la tabla `sensoriales`
--
ALTER TABLE `sensoriales`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tipo_analisis`
--
ALTER TABLE `tipo_analisis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `variables`
--
ALTER TABLE `variables`
  MODIFY `v_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `variedades`
--
ALTER TABLE `variedades`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `analisis`
--
ALTER TABLE `analisis`
  ADD CONSTRAINT `corresponder` FOREIGN KEY (`fk_tipo_analisis`) REFERENCES `tipo_analisis` (`id`),
  ADD CONSTRAINT `existir` FOREIGN KEY (`fk_analista`) REFERENCES `usuarios` (`identificacion`),
  ADD CONSTRAINT `hacer` FOREIGN KEY (`fk_muestra`) REFERENCES `muestras` (`codigo`);

--
-- Filtros para la tabla `fincas`
--
ALTER TABLE `fincas`
  ADD CONSTRAINT `partir` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`id_municipio`),
  ADD CONSTRAINT `pertenecer` FOREIGN KEY (`fk_caficultor`) REFERENCES `usuarios` (`identificacion`);

--
-- Filtros para la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD CONSTRAINT `estar` FOREIGN KEY (`fk_finca`) REFERENCES `fincas` (`codigo`),
  ADD CONSTRAINT `tener` FOREIGN KEY (`fk_variedad`) REFERENCES `variedades` (`codigo`);

--
-- Filtros para la tabla `muestras`
--
ALTER TABLE `muestras`
  ADD CONSTRAINT `ser` FOREIGN KEY (`fk_lote`) REFERENCES `lotes` (`codigo`);

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `arrojar` FOREIGN KEY (`fk_analisis`) REFERENCES `analisis` (`codigo`),
  ADD CONSTRAINT `poseer` FOREIGN KEY (`fk_variables`) REFERENCES `variables` (`v_codigo`);

--
-- Filtros para la tabla `sensoriales`
--
ALTER TABLE `sensoriales`
  ADD CONSTRAINT `tiene` FOREIGN KEY (`fk_analisis`) REFERENCES `analisis` (`codigo`);

--
-- Filtros para la tabla `variables`
--
ALTER TABLE `variables`
  ADD CONSTRAINT `depender` FOREIGN KEY (`fk_tipo_analisis`) REFERENCES `tipo_analisis` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
