-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2024 a las 07:12:21
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
(13, '2024-04-30', 1080934, 8, 1, 'asignado'),
(14, '2024-05-16', 1080934, 8, 1, 'asignado'),
(15, '2024-05-20', 12245, 10, 2, 'terminado'),
(16, '2024-12-20', 12245, 8, 1, 'asignado'),
(17, '2024-05-19', 12234140, 10, 2, 'asignado'),
(18, '2024-05-20', 12234140, 10, 2, 'asignado');

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
(3, '', 13.00, 1080934, 4, 'undefined', 'inactivo'),
(6, '', 12.00, 1080, 1, 'Palmito', 'inactivo'),
(7, '', 1300.00, 1080934638, 10, 'Puerto rico', 'activo'),
(8, '', 1200.00, 12345, 7, 'Vereda', 'inactivo'),
(9, '', 1200.00, 111111, 15, 'Patio bonito', 'activo'),
(10, '', 1500.00, 12345, 6, 'Puerto rico', 'activo'),
(11, '', 120.00, 12345, 4, 'Palmito', 'activo'),
(12, '', 500.00, 12345, 5, 'Hola', 'activo'),
(13, 'El porvenir', 3000.00, 111111, 36, 'Palmito', 'activo');

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
(2, 4000, 3, 1, 'activo'),
(3, 5000, 3, 1, 'activo'),
(4, 4000, 7, 9, 'inactivo'),
(5, 4000, 7, 2, 'inactivo'),
(6, 5300, 9, 6, 'inactivo'),
(21, 200, 7, 8, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras`
--

CREATE TABLE `muestras` (
  `codigo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `quien_recibe` varchar(200) NOT NULL,
  `proceso_fermentacion` varchar(200) NOT NULL,
  `humedad_cafe` decimal(10,2) NOT NULL,
  `altura_MSNM` decimal(10,2) NOT NULL,
  `tipo_secado` varchar(200) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  `fk_lote` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `muestras`
--

INSERT INTO `muestras` (`codigo`, `fecha`, `cantidad`, `quien_recibe`, `proceso_fermentacion`, `humedad_cafe`, `altura_MSNM`, `tipo_secado`, `observaciones`, `fk_lote`, `estado`) VALUES
(8, '2024-05-20', 500.00, 'Mario', 'En tula', 12.00, 1200.00, 'secadero', 'Bajo peso de almendra', 5, 'activo'),
(9, '2024-05-09', 50.00, 'Jose', 'En tula', 12.00, 1200.00, 'En cilo', 'hola', 5, 'activo'),
(10, '2024-05-20', 500.00, 'Laura', '24 horas en baba', 12.00, 1200.00, 'secadero', 'Sobre peso de almendra', 21, 'activo');

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
(1, '2024-04-30', 13, 1, NULL, '20 g', 'inactivo'),
(2, '2024-04-30', 13, 2, NULL, '10 g', 'inactivo'),
(3, '2024-04-30', 13, 3, NULL, '12 g', 'inactivo'),
(4, '2024-04-30', 13, 4, NULL, '1 g', 'inactivo'),
(5, '2024-04-30', 13, 5, NULL, '2 g', 'inactivo'),
(6, '2024-04-30', 13, 6, NULL, '1 g', 'inactivo'),
(7, '2024-04-30', 13, 7, NULL, '4 g', 'inactivo'),
(8, '2024-04-30', 13, 8, NULL, '5 g', 'inactivo'),
(9, '2024-04-30', 13, 9, NULL, '12 g', 'inactivo'),
(10, '2024-04-30', 13, 10, NULL, '11 g', 'inactivo'),
(11, '2024-04-30', 13, 11, NULL, '10 g', 'inactivo'),
(12, '2024-04-30', 13, 12, NULL, '15 g', 'inactivo'),
(13, '2024-04-30', 13, 13, NULL, '10 g', 'inactivo'),
(14, '2024-04-30', 13, 14, NULL, '9 g', 'inactivo'),
(15, '2024-04-30', 13, 15, NULL, '5 g', 'inactivo'),
(16, '2024-04-30', 13, 16, NULL, '12 %', 'inactivo'),
(17, '2024-04-30', 13, 17, NULL, '12 g', 'inactivo'),
(18, '2024-04-30', 13, 18, NULL, '10 %', 'inactivo'),
(19, '2024-04-30', 13, 19, NULL, '5 %', 'inactivo'),
(20, '2024-04-30', 13, 20, NULL, '5 kg', 'inactivo'),
(21, '2024-04-30', 13, 21, NULL, '20 g', 'inactivo'),
(22, '2024-04-30', 13, 22, NULL, '1 g', 'inactivo'),
(23, '2024-04-30', 13, 23, NULL, '2 g', 'inactivo'),
(24, '2024-04-30', 13, 24, NULL, '3 g', 'inactivo'),
(25, '2024-04-30', 13, 25, NULL, '6 g', 'inactivo'),
(26, '2024-04-30', 13, 26, NULL, '6 g', 'inactivo'),
(27, '2024-04-30', 13, 27, NULL, '10 g', 'inactivo'),
(28, '2024-04-30', 13, 28, NULL, '3 g', 'inactivo'),
(29, '2024-04-30', 13, 29, NULL, '1 g', 'inactivo'),
(30, '2024-04-30', 13, 30, NULL, '1 g', 'inactivo'),
(31, '2024-05-08', 15, 1, NULL, '1', 'activo'),
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
(62, '2024-05-20', 18, 1, NULL, '', 'inactivo'),
(63, '2024-05-20', 18, 2, NULL, '', 'inactivo'),
(64, '2024-05-20', 18, 3, NULL, '', 'inactivo'),
(65, '2024-05-20', 18, 4, NULL, '', 'inactivo'),
(66, '2024-05-20', 18, 5, NULL, '', 'inactivo'),
(67, '2024-05-20', 18, 6, NULL, '', 'inactivo'),
(68, '2024-05-20', 18, 7, NULL, '', 'inactivo'),
(69, '2024-05-20', 18, 8, NULL, '', 'inactivo'),
(70, '2024-05-20', 18, 9, NULL, '', 'inactivo'),
(71, '2024-05-20', 18, 10, NULL, '', 'inactivo'),
(72, '2024-05-20', 18, 11, NULL, '', 'inactivo'),
(73, '2024-05-20', 18, 12, NULL, '', 'inactivo'),
(74, '2024-05-20', 18, 13, NULL, '', 'inactivo'),
(75, '2024-05-20', 18, 14, NULL, '', 'inactivo'),
(76, '2024-05-20', 18, 15, NULL, '', 'inactivo'),
(77, '2024-05-20', 18, 16, NULL, '', 'inactivo'),
(78, '2024-05-20', 18, 17, NULL, '', 'inactivo'),
(79, '2024-05-20', 18, 18, NULL, '', 'inactivo'),
(80, '2024-05-20', 18, 19, NULL, '', 'inactivo'),
(81, '2024-05-20', 18, 20, NULL, '', 'inactivo'),
(82, '2024-05-20', 18, 21, NULL, '', 'inactivo'),
(83, '2024-05-20', 18, 22, NULL, '', 'inactivo'),
(84, '2024-05-20', 18, 23, NULL, '', 'inactivo'),
(85, '2024-05-20', 18, 24, NULL, '', 'inactivo'),
(86, '2024-05-20', 18, 25, NULL, '', 'inactivo'),
(87, '2024-05-20', 18, 26, NULL, '', 'inactivo'),
(88, '2024-05-20', 18, 27, NULL, '', 'inactivo'),
(89, '2024-05-20', 18, 28, NULL, '', 'inactivo'),
(90, '2024-05-20', 18, 29, NULL, '', 'inactivo'),
(91, '2024-05-20', 18, 30, NULL, '', 'inactivo'),
(92, '2024-05-20', 18, 31, NULL, '', 'inactivo'),
(93, '2024-05-20', 18, 32, NULL, '', 'inactivo'),
(94, '2024-05-19', 18, 1, NULL, '', 'inactivo'),
(95, '2024-05-19', 18, 2, NULL, '', 'inactivo'),
(96, '2024-05-19', 18, 3, NULL, '', 'inactivo'),
(97, '2024-05-19', 18, 4, NULL, '', 'inactivo'),
(98, '2024-05-19', 18, 5, NULL, '', 'inactivo'),
(99, '2024-05-19', 18, 6, NULL, '', 'inactivo'),
(100, '2024-05-19', 18, 7, NULL, '', 'inactivo'),
(101, '2024-05-19', 18, 8, NULL, '', 'inactivo'),
(102, '2024-05-19', 18, 9, NULL, '', 'inactivo'),
(103, '2024-05-19', 18, 10, NULL, '', 'inactivo'),
(104, '2024-05-19', 18, 11, NULL, '', 'inactivo'),
(105, '2024-05-19', 18, 12, NULL, '', 'inactivo'),
(106, '2024-05-19', 18, 13, NULL, '', 'inactivo'),
(107, '2024-05-19', 18, 14, NULL, '', 'inactivo'),
(108, '2024-05-19', 18, 15, NULL, '', 'inactivo'),
(109, '2024-05-19', 18, 16, NULL, '', 'inactivo'),
(110, '2024-05-19', 18, 17, NULL, '', 'inactivo'),
(111, '2024-05-19', 18, 18, NULL, '', 'inactivo'),
(112, '2024-05-19', 18, 19, NULL, '', 'inactivo'),
(113, '2024-05-19', 18, 20, NULL, '', 'inactivo'),
(114, '2024-05-19', 18, 21, NULL, '', 'inactivo'),
(115, '2024-05-19', 18, 22, NULL, '', 'inactivo'),
(116, '2024-05-19', 18, 23, NULL, '', 'inactivo'),
(117, '2024-05-19', 18, 24, NULL, '', 'inactivo'),
(118, '2024-05-19', 18, 25, NULL, '', 'inactivo'),
(119, '2024-05-19', 18, 26, NULL, '', 'inactivo'),
(120, '2024-05-19', 18, 27, NULL, '', 'inactivo'),
(121, '2024-05-19', 18, 28, NULL, '', 'inactivo'),
(122, '2024-05-19', 18, 29, NULL, '', 'inactivo'),
(123, '2024-05-19', 18, 30, NULL, '', 'inactivo'),
(124, '2024-05-19', 18, 31, NULL, '', 'inactivo'),
(125, '2024-05-19', 18, 32, NULL, '', 'inactivo');

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
(1080, '3154051769', 'Luis Ubaque', 'luis@gmail.com', 'admin', 'luis123', 'inactivo'),
(12230, '31011111', 'Juan', 'juan@gmail.com', '', 'juan123', 'activo'),
(12235, '3102934', 'Lucia', 'lucia@gmail.com', '', 'lucia123', 'activo'),
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
(32, 'Variable prueba', 1, 'activo');

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
(1, 'Aaa', 'activo'),
(2, 'fj-16', 'inactivo'),
(6, 'Borbon', 'activo'),
(7, 'Catimore', 'inactivo'),
(8, 'Castillo', 'activo'),
(9, 'Luis', 'activo'),
(10, 'Hola', 'activo');

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
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `fincas`
--
ALTER TABLE `fincas`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT de la tabla `tipo_analisis`
--
ALTER TABLE `tipo_analisis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `variables`
--
ALTER TABLE `variables`
  MODIFY `v_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `variedades`
--
ALTER TABLE `variedades`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
-- Filtros para la tabla `variables`
--
ALTER TABLE `variables`
  ADD CONSTRAINT `depender` FOREIGN KEY (`fk_tipo_analisis`) REFERENCES `tipo_analisis` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
