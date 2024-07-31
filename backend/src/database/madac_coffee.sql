-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2024 a las 04:19:28
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras`
--

CREATE TABLE `muestras` (
  `codigo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` varchar(200) DEFAULT NULL,
  `densidad_cafe` varchar(200) DEFAULT NULL,
  `proceso_fermentacion` varchar(200) DEFAULT NULL,
  `tipo_tostion` varchar(200) DEFAULT NULL,
  `altura_MSNM` decimal(10,2) NOT NULL,
  `tiempo_fermentacion` varchar(200) DEFAULT NULL,
  `actividad_agua` varchar(200) DEFAULT NULL,
  `tiempo_secado` varchar(200) NOT NULL,
  `presentacion` varchar(200) NOT NULL,
  `fk_lote` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `estado` enum('activo','inactivo') NOT NULL,
  `grafica` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(10101010, '3154051769', 'Admin', 'admin@gmail.com', 'admin', 'admin10', NULL);

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
(30, 'Mallas menores', 1, 'activo');

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
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `fincas`
--
ALTER TABLE `fincas`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `sensoriales`
--
ALTER TABLE `sensoriales`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
