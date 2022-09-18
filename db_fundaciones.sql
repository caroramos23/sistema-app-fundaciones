-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-09-2022 a las 15:28:36
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_fundaciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_fundacion`
--

CREATE TABLE `tbl_fundacion` (
  `cveFundacion` smallint(6) NOT NULL,
  `nombreFundacion` varchar(150) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipoFundacion` int(11) NOT NULL,
  `fechaFundacion` datetime NOT NULL,
  `cveRegistro` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_fundacion`
--

INSERT INTO `tbl_fundacion` (`cveFundacion`, `nombreFundacion`, `descripcion`, `tipoFundacion`, `fechaFundacion`, `cveRegistro`) VALUES
(6, 'fundacion1 admin2', 'fundacion1', 3, '2022-09-29 00:00:00', 18),
(7, 'fundacion2 admin2', 'fundacion2', 4, '2020-06-09 05:00:00', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo`
--

CREATE TABLE `tbl_tipo` (
  `cveTipo` smallint(6) NOT NULL,
  `tipoFundacion` varchar(100) NOT NULL,
  `estatus` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tipo`
--

INSERT INTO `tbl_tipo` (`cveTipo`, `tipoFundacion`, `estatus`) VALUES
(1, 'Benéficas', 1),
(2, 'Culturales', 1),
(3, 'Laborales', 1),
(4, 'Religiosas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `cveUsuario` smallint(6) NOT NULL,
  `nombre` varchar(350) NOT NULL,
  `apellidos` varchar(450) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`cveUsuario`, `nombre`, `apellidos`, `username`, `password`) VALUES
(5, 'carolina', 'ramos', 'admin', 'U2FsdGVkX18JYOEC4IGgITPyNns7vMv+2MQ8ccrtiRo='),
(18, 'admin', 'admin', 'admin2', 'U2FsdGVkX1+AgFQz1v69FS1mz9Xl05qVTCCV4fJv2DQ=');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_fundacion`
--
ALTER TABLE `tbl_fundacion`
  ADD PRIMARY KEY (`cveFundacion`),
  ADD KEY `tbl_fundacion_ibfk_1` (`cveRegistro`);

--
-- Indices de la tabla `tbl_tipo`
--
ALTER TABLE `tbl_tipo`
  ADD PRIMARY KEY (`cveTipo`);

--
-- Indices de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`cveUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_fundacion`
--
ALTER TABLE `tbl_fundacion`
  MODIFY `cveFundacion` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tbl_tipo`
--
ALTER TABLE `tbl_tipo`
  MODIFY `cveTipo` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `cveUsuario` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_fundacion`
--
ALTER TABLE `tbl_fundacion`
  ADD CONSTRAINT `tbl_fundacion_ibfk_1` FOREIGN KEY (`cveRegistro`) REFERENCES `tbl_usuario` (`cveUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
