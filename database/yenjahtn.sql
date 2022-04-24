-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 24 avr. 2022 à 01:36
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

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`text`, `dateCreate`, `idPost`, `idProfile`, `idCommentaire`) VALUES
('qsdqsdqsdqsdqs', '2022-04-23 11:18:01', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', '4bl5zPFNQbnXh470PSWLl07XOdaTM6'),
('qsdqsd', '2022-04-23 11:19:29', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', '9N76xO47Un8d18F9cB265K65cCJXs6'),
('testiing', '2022-04-23 11:20:39', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', '1Y5a4i9788377U6r99mQM62fvb64tU'),
('qsdqsdqsd', '2022-04-23 11:21:08', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', 'z1JHGf07qoM9J4809ycD8b1fLZhxV6'),
('enter', '2022-04-23 11:22:34', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', 'U0uUeKa5D65611E9CA398dH9M2cBaZ'),
('baligh', '2022-04-23 11:25:19', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', '7095VVQ88I3iHaIkK9l2RdeCe45jiI'),
('baligh', '2022-04-23 11:25:59', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', 'DQk5nv7q7yxj3arw6i77WDRbM713x7'),
('', '2022-04-23 14:47:35', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', '5F70bDnhF1n8ezxAj5sS0CDrUA517D'),
('', '2022-04-23 14:47:48', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', '8Nmuhm3J49L3pr261jmXzlEc3W7Qzz'),
('qsdqsdqs', '2022-04-23 14:48:42', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', '1uOJ7t4u4yj8LSwtupF7WD487Qw9pg'),
('SFSDFSDFSDFDQFSDF', '2022-04-23 14:51:54', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'OaSL91eFfk23mNw2G81are7d8VlK45', 'O2DwF2ivw5SHswj66mRr3V43FW4xZo');

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
  KEY `idPost` (`idPost`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `decision`
--

INSERT INTO `decision` (`decision`, `dateCreation`, `idProfile`, `idPost`) VALUES
('1', '2022-04-23 14:34:38', 'OaSL91eFfk23mNw2G81are7d8VlK45', 'aYnTjIW4755d4d7clxX9W2517G65p4'),
('1', '2022-04-24 01:57:49', 'OaSL91eFfk23mNw2G81are7d8VlK45', '6Ku52cwQB0nTP8p6MbxMJGcf3ftLs7'),
('1', '2022-04-23 16:37:38', 'jmSVP5RBOmx7HrRQ7RZR9Ak4pCN6l7', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2'),
('0', '2022-04-23 17:04:30', 'jmSVP5RBOmx7HrRQ7RZR9Ak4pCN6l7', 'aYnTjIW4755d4d7clxX9W2517G65p4'),
('1', '2022-04-24 01:50:21', 'OaSL91eFfk23mNw2G81are7d8VlK45', 'EefDGP944dAUiiJ3IWBYBE3ccViL1W');

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
  `idTypeSpecifique` int(10) NOT NULL,
  `imagePost` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPost`),
  KEY `fk1` (`idProfile`),
  KEY `idTypeGeneral` (`idTypeGeneral`),
  KEY `idTypeSpecifique` (`idTypeSpecifique`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`text`, `titre`, `dateCreate`, `idProfile`, `idPost`, `objectif`, `idTypeGeneral`, `idTypeSpecifique`, `imagePost`) VALUES
('yeah this is posts', 'this is post', '2022-04-23 10:25:00', 'OaSL91eFfk23mNw2G81are7d8VlK45', 'YOJ5XGoFv39r4Z3uiCh2fEle1AI4m2', 'help', '1', 555, 'photoPost/1650705900278144809_1651120545255814_419555795593275742_n.png'),
('qsdqssdqs', 'atef', '2022-04-20 16:50:38', 'jmSVP5RBOmx7HrRQ7RZR9Ak4pCN6l7', 'EefDGP944dAUiiJ3IWBYBE3ccViL1W', 'help', '0', 0, 'photoPost/1650473737tÃ©lÃ©chargement (1).jpg'),
('', 'sdffsdfs', '2022-04-20 18:40:21', 'jmSVP5RBOmx7HrRQ7RZR9Ak4pCN6l7', 'aYnTjIW4755d4d7clxX9W2517G65p4', 'help', '1', 0, ''),
('this is secondpost', 'second post', '2022-04-23 10:37:32', 'OaSL91eFfk23mNw2G81are7d8VlK45', '6Ku52cwQB0nTP8p6MbxMJGcf3ftLs7', 'help', '2', 888, 'photoPost/1650706652tÃ©lÃ©chargement (1).jpg');

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
  `photo` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`idProfile`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `profile`
--

INSERT INTO `profile` (`username`, `pwd`, `email`, `idProfile`, `dateCreate`, `photo`) VALUES
('zzz', 'qsdqsd', 'sylas@gma.qsdd', '124EkZYKPV261YpQys4M9n4VgVSdRO', '2022-04-06 17:30:02', 'photoProfile/tt53358d3a912mJumCTk.png'),
('qsdq', 'azeaze', 'sylas@gzma.qsd', '28NpAqg9DeFz35ybi50uM4bqNr8ld6', '2022-04-06 17:36:29', 'photoProfile/1nLNfdr0r9N9afZzs71C.png'),
('qsdssss', 'qsdqsd', 'qsdqsd@dqsd.wxcsqd', '3ua419Z4UhC2WZ0C175D64MlhPIuj5', '2022-04-06 16:57:01', 'photoProfile/7uSy8Rh69J6Wz974XcYZ.png'),
('qsdsqd', 'azeaze', 'belighzoughlemiss8@gmail.com', '5QvAC65U581PbYc4pq7LN8EZn4szJd', '2022-04-06 17:29:04', 'photoProfile/GqCYVWckL86b482bEZo2.png'),
('qsdqsd', 'qsdqsdqsd', 'qsdqsdq@qsdqsd.qsdqsq', 'A7hbY08nawSLk3RjpfT0Nq7x1cOiNN', '2022-04-06 17:14:38', NULL),
('qsdsss', 'qsdqsd', 'qsdsd@qsd.cqq', 'CFQm67BwA2VNm3AOT98CrGVK3A9IQi', '2022-04-06 17:07:44', NULL),
('sssssss', 'qsdqsd', 'qsdqsdq@qsdqsd.cqs', 'I38f2Nz8I0r8wHGlckJjd9m7Phe3za', '2022-04-06 17:19:44', 'photoProfile/Zt9319wSD0wCwi8LHuRt.png'),
('sylas', 'azeaze', 'sylas@gma.qsd', 'jmSVP5RBOmx7HrRQ7RZR9Ak4pCN6l7', '2022-04-06 16:32:27', 'photoProfile/kG2b7B2pP9SBjg9AWC5z.png'),
('qsdsqss', 'qsdqsd', 'sylas@gma.qssd', 'M5OQ5wqL05VHea71szhH2Jw1Hw21xE', '2022-04-06 17:02:43', 'photoProfile/f4Hun79i4d00E2EqxLo9.png'),
('sqdsss', 'qsdqsd', 'qsdqsdq@qsdqsd.cqss', 'QtQWlS2r697852lnHqW03L88yhF73b', '2022-04-06 17:19:16', 'photoProfile/Lg7zht1uxtUKYdY5e0cy.png'),
('ssssssssqaz', 'qsdqsd', 'sylas@gma.qsdss', 'RO22wyeM6NasujF5914NM9pNWppCL5', '2022-04-06 17:28:16', 'photoProfile/Q53VLb233RvqZoi7sn58.png'),
('qsdqsds', 'baligh123', 'qsdqsdq@qsdqsd.cqsss', '2kNe5OV87b04Xn8CG1r4QEjUm51Uxe', '2022-04-13 17:28:17', 'photoProfile/88P4UL5xwR74IKfE46Z5.png'),
('qsdqsdqsd', 'qsdqsd', 'qsdqsdqsdq@sdq.qsd', 'hJ4TO28V56975N4nA4U3bBSWI5Q9nN', '2022-04-13 17:30:58', NULL),
('sqqsdqsd', 'qsdqsd', 'qsdqsdsq@qsdqs.cq', 'PrzrfmP1JZN52fMfTg8AJIW5e4zw0K', '2022-04-13 17:40:26', NULL),
('qsdqsdqsdq', 'qsdqsd', 'qsdqsdqsdq@sdq.qsdqs', 'MNv1B30N59J2t3WY5FmHPtmf8Fo1B9', '2022-04-13 17:41:13', NULL),
('qsdqs', 'qsdqsd', 'qsdqsdq@qsdqsd.cqssxx', '0VCBpUYujSXu95C5pLaSt2EEF4zLKK', '2022-04-13 17:41:40', 'photoProfile/U8FWNvD5p2Q73hq6ZtE1.png'),
('jhin', 'azeaze', 'jhin@gmail.com', 'OaSL91eFfk23mNw2G81are7d8VlK45', '2022-04-21 16:36:07', 'photoProfile/xv91707v84A24j2r251W.jpg'),
('read', 'azeaze', 'aze@qsdqsd.com', 'zqK2WdjbmfWN71G4Kqi31djibu1R0F', '2022-04-24 01:31:10', NULL);

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
  KEY `idPost` (`idPost`)
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

--
-- Déchargement des données de la table `typegeneral`
--

INSERT INTO `typegeneral` (`type`, `idTypeGeneral`) VALUES
('informatique', '1'),
('automobile', '2'),
('immobilier', '3'),
('other', '0');

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
  KEY `idTypeGeneral` (`idTypeGeneral`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `typespecifique`
--

INSERT INTO `typespecifique` (`type`, `idTypeSpecifique`, `idTypeGeneral`) VALUES
('avion', '100', '2'),
('souris', '555', '1'),
('clavier', '666', '1'),
('voiture', '888', '2'),
('other', '0', '0');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
