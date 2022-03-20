-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 18 mars 2022 à 22:19
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `yenjahtn`
--

-- --------------------------------------------------------

--
-- Structure de la table `atypespecifique`
--

DROP TABLE IF EXISTS `atypespecifique`;
CREATE TABLE IF NOT EXISTS `atypespecifique` (
  `idTypeSpecifique` varchar(20) NOT NULL,
  `idPost` varchar(30) NOT NULL,
  PRIMARY KEY (`idTypeSpecifique`,`idPost`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `text` text NOT NULL,
  `dateCreate` datetime NOT NULL,
  `idPost` varchar(30) NOT NULL,
  `idProfile` varchar(30) NOT NULL,
  `idCommentaire` varchar(30) NOT NULL,
  PRIMARY KEY (`idCommentaire`),
  KEY `fk1` (`idProfile`),
  KEY `fk2` (`idPost`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `text` text NOT NULL,
  `email` varchar(60) NOT NULL,
  `dateCreate` datetime NOT NULL,
  `idContact` varchar(30) NOT NULL,
  PRIMARY KEY (`idContact`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `decision`
--

DROP TABLE IF EXISTS `decision`;
CREATE TABLE IF NOT EXISTS `decision` (
  `decision` varchar(20) NOT NULL,
  `dateCreation` datetime NOT NULL,
  `idProfile` varchar(30) NOT NULL,
  `idPost` varchar(30) NOT NULL,
  PRIMARY KEY (`idProfile`,`idPost`),
  KEY `fg1` (`idPost`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `imagepost`
--

DROP TABLE IF EXISTS `imagepost`;
CREATE TABLE IF NOT EXISTS `imagepost` (
  `image` varchar(60) NOT NULL,
  `idPost` varchar(30) NOT NULL,
  KEY `fk1` (`idPost`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `text` text NOT NULL,
  `titre` varchar(100) NOT NULL,
  `dateCreate` datetime NOT NULL,
  `idProfile` varchar(30) NOT NULL,
  `idPost` varchar(30) NOT NULL,
  `objectif` varchar(20) NOT NULL,
  `idTypeGeneral` varchar(20) NOT NULL,
  PRIMARY KEY (`idPost`),
  KEY `fk1` (`idProfile`),
  KEY `fk2` (`idTypeGeneral`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `username` varchar(20) NOT NULL,
  `pwd` varchar(40) NOT NULL,
  `email` varchar(70) NOT NULL,
  `idProfile` varchar(30) NOT NULL,
  `dateCreate` datetime NOT NULL,
  `photo` varchar(60) NOT NULL,
  PRIMARY KEY (`idProfile`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rate`
--

DROP TABLE IF EXISTS `rate`;
CREATE TABLE IF NOT EXISTS `rate` (
  `rate` varchar(20) NOT NULL,
  `dateCreate` datetime NOT NULL,
  `idProfile` varchar(30) NOT NULL,
  `idPost` varchar(30) NOT NULL,
  PRIMARY KEY (`idProfile`,`idPost`),
  KEY `fg1` (`idPost`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `typegeneral`
--

DROP TABLE IF EXISTS `typegeneral`;
CREATE TABLE IF NOT EXISTS `typegeneral` (
  `type` varchar(40) NOT NULL,
  `idTypeGeneral` varchar(20) NOT NULL,
  PRIMARY KEY (`idTypeGeneral`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `typespecifique`
--

DROP TABLE IF EXISTS `typespecifique`;
CREATE TABLE IF NOT EXISTS `typespecifique` (
  `type` varchar(40) NOT NULL,
  `idTypeSpecifique` varchar(20) NOT NULL,
  `idTypeGeneral` varchar(20) NOT NULL,
  PRIMARY KEY (`idTypeSpecifique`),
  KEY `fk1` (`idTypeGeneral`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
