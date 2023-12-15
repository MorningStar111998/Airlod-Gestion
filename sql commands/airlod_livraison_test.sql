-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3325
-- Généré le : ven. 15 déc. 2023 à 15:03
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `airlod_livraison_test`
--

-- --------------------------------------------------------

--
-- Structure de la table `demande`
--

CREATE TABLE `demande` (
  `numDemande` int(11) NOT NULL,
  `nomClient` varchar(255) NOT NULL,
  `numTelephone` varchar(30) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `typeClient` varchar(100) DEFAULT NULL,
  `etapeActuelle` varchar(100) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `numFacture` int(11) DEFAULT NULL,
  `produit` varchar(100) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `remarque` text DEFAULT NULL,
  `etatClient` varchar(100) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `typePaiement` varchar(50) DEFAULT NULL,
  `dateEnregistrement` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `demande`
--

INSERT INTO `demande` (`numDemande`, `nomClient`, `numTelephone`, `email`, `typeClient`, `etapeActuelle`, `source`, `numFacture`, `produit`, `quantite`, `description`, `remarque`, `etatClient`, `ville`, `adresse`, `prix`, `typePaiement`, `dateEnregistrement`) VALUES
(1, 'Client1', '123456789', 'client1@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 'Produit1', 5, 'Description1', 'Remarque1', 'En Discussion', NULL, NULL, NULL, NULL, '2023-12-11 10:59:50'),
(2, 'Client2', '987654321', 'client2@example.com', 'instruit', 'conception', 'instagram', NULL, 'Produit2', 3, 'Description2', 'Remarque2', 'Attente Logo', NULL, NULL, NULL, NULL, '2023-12-11 10:59:50'),
(3, 'Client3', '555555555', 'client3@example.com', 'agressif', 'validation', 'landing', NULL, 'Produit3', 2, 'Description3', 'Remarque3', 'Intéressé', NULL, NULL, NULL, NULL, '2023-12-11 10:59:50'),
(4, 'Client4', '999999999', 'client4@example.com', 'negociateur', 'production', 'messebger', NULL, 'Produit4', 4, 'Description4', 'Remarque4', 'Attente Confirmation', NULL, NULL, NULL, NULL, '2023-12-11 10:59:50'),
(5, 'Client5', '111111111', 'client5@example.com', 'indecis', 'livraison', 'site', NULL, 'Produit5', 1, 'Description5', 'Remarque5', 'Pas de Réponse', NULL, NULL, NULL, NULL, '2023-12-11 10:59:50'),
(6, 'Client6', '454545456', 'client6@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 'Produit1', 4, 'Description1', 'Remarque6', 'En Discussion', 'Marrakech', NULL, NULL, NULL, '2023-12-11 10:59:50'),
(7, 'Client7', '656565658', 'client7@example.com', 'instruit', 'conception', 'instagram', NULL, 'Produit2', 7, 'Description2', 'Remarque7', 'Attente Logo', 'Rabat', NULL, NULL, NULL, '2023-12-11 10:59:50'),
(8, 'Client8', '023456789', 'client8@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 'Produit1', 5, 'Description8', 'Remarque8', 'En Discussion', 'Marrakech', 'test adress', NULL, NULL, '2023-12-11 10:59:50'),
(9, 'Client9', '923456789', 'client9@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 'Produit1', 5, 'Description9', 'Remarque9', 'En Discussion', 'CasaBlanca', 'test_address', 500.00, 'Livraison', '2023-12-11 10:59:50'),
(10, 'test1', 'test', 'test@gmail.com', NULL, 'validation', 'messebger', 120, 'test produit', 2, 'test', 'test', NULL, 'test', 'test', 100.00, 'livraison', '2023-12-11 10:59:50'),
(11, 'Regis TOUGOURI', '0609295204', 'regisprofessionel@gmail.com', NULL, 'decouvre', 'whatsapp', 1515, 'test produit', 2, 'test', 'test\r\n', NULL, 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 555.00, 'livraison', '2023-12-11 10:59:50'),
(12, 'Regis TOUGOURI', '0609295204', 'regisprofessionel@gmail.com', NULL, 'validation', 'landing', 14, 'test produit', 2, '123', '123', NULL, 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 3.00, 'virement', '2023-12-11 11:00:20'),
(13, 'Regis TOUGOURI', '0609295204', 'regisprofessionel@gmail.com', NULL, 'validation', 'site', 2, 'test produit', 2, 'ffzfz', 'zfzf', NULL, 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 2.00, 'virement', '2023-12-11 11:06:19'),
(14, 'Regis TOUGOURI', '0609295204', 'regisprofessionel@gmail.com', NULL, 'validation', 'site', 2, 'test produit', 2, 'ffzfz', 'zfzf', 'Non Intéressé', 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 2.00, 'virement', '2023-12-11 11:06:51'),
(15, 'Reses', '0609295204', 'regisprofessionel@gmail.com', NULL, 'conception', 'messebger', 2, 'test produit', 2, 'rhr', 'rr', 'Non Intéressé', 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 2.00, 'livraison', '2023-12-11 11:18:18'),
(16, 'tjfj', '123545', 'regisprofessionel@gmail.com', NULL, 'conception', 'instagram', 2, 'test produit', 2, 'tjtjtj', 'tjtj', 'Non Intéressé', 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 2.00, 'virement', '2023-12-11 11:19:35'),
(17, 'Regis TOUGOURI', '0609295204', 'regisprofessionel@gmail.com', NULL, 'decouvre', 'instagram', 3, 'test produit', 1, 'test', 'test', NULL, 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 2.00, 'virement', '2023-12-11 15:59:43'),
(18, 'Regis TOUGOURI', '0609295204', 'regisprofessionel@gmail.com', NULL, 'validation', 'messenger', 2, 'test produit', 2, 'test', 'test', NULL, 'Marrakech', 'Marrakech-Djourmarjane,Résidence Djourmarjane, Immeuble RH-9', 2.00, 'virement', '2023-12-11 16:04:41'),
(19, '', '', '', NULL, NULL, NULL, 0, '', 0, '', '', 'Attente Confirmation', '', '', 0.00, NULL, '2023-12-11 16:06:16'),
(20, '', '', '', NULL, NULL, NULL, 0, '', 0, '', '', 'Attente Confirmation', '', '', 0.00, NULL, '2023-12-11 16:07:12'),
(21, '', '', '', NULL, NULL, NULL, 0, '', 0, '', '', 'Attente Confirmation', '', '', 0.00, NULL, '2023-12-11 16:07:35'),
(22, '', '', '', NULL, NULL, NULL, 0, '', 0, '', '', NULL, '', '', 0.00, NULL, '2023-12-11 16:08:11'),
(23, '', '', '', NULL, NULL, NULL, 0, '', 0, '', '', NULL, '', '', 0.00, NULL, '2023-12-11 16:10:08'),
(24, '', '', '', 'instruit', NULL, NULL, 0, '', 0, '', '', 'Intéressé', '', '', 0.00, NULL, '2023-12-11 16:24:58'),
(25, 'test26', '01234568', 'test26@gmail.com', 'Pressé', 'Découvre ses besoins', 'Whatsapp', 55, 'test26', 2, 'test26', 'test26', 'Design Validé', 'Casablanca', 'test26', 2.00, 'virement', '2023-12-13 08:58:57'),
(26, 'test26', '86468468', 'test26@gmail.com', 'Indecis', 'Conception', 'Messenger', 3, 'test26 g', 2, 'test26', 'test26', 'Attente Logo', 'Berkane', 'test26', 2.00, 'virement', '2023-12-13 09:27:24'),
(27, 'test27', '1384844', 'test27@gmail.com', 'Pressé', 'Découvre ses besoins', 'Messenger', 2, 'test27 produit', 2, 'test27', 'test27', 'Design en Cours', 'Béni Mellal', 'test27 Immeuble RH-9', 2.00, 'livraison', '2023-12-14 15:42:58'),
(28, 'test28', '868468', 'test28@gmail.com', 'Pressé', 'Conception', 'Whatsapp', 22222, 'test28 prod', 3, 'test28', 'test28', 'Attente Confirmation', 'Berkane', 'test28', 3.00, 'livraison', '2023-12-15 09:14:08');

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

CREATE TABLE `facture` (
  `numFacture` int(11) NOT NULL,
  `nomClient` varchar(255) NOT NULL,
  `numTelephone` int(11) DEFAULT NULL,
  `produit` varchar(255) NOT NULL,
  `quantite` int(11) NOT NULL,
  `dateEnregistrement` timestamp NOT NULL DEFAULT current_timestamp(),
  `prix` decimal(10,2) DEFAULT NULL,
  `typePaiement` varchar(50) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `facture`
--

INSERT INTO `facture` (`numFacture`, `nomClient`, `numTelephone`, `produit`, `quantite`, `dateEnregistrement`, `prix`, `typePaiement`, `adresse`) VALUES
(1, 'test28', 552424524, 'test28', 2, '2023-12-15 09:27:40', 2.00, 'livraison', 'test28 adress'),
(2, 'facture2', 18161, 'test2 pro', 2, '2023-12-15 10:20:26', 2.00, 'virement', 'facture2 adress');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `demande`
--
ALTER TABLE `demande`
  ADD PRIMARY KEY (`numDemande`);

--
-- Index pour la table `facture`
--
ALTER TABLE `facture`
  ADD PRIMARY KEY (`numFacture`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `demande`
--
ALTER TABLE `demande`
  MODIFY `numDemande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `facture`
--
ALTER TABLE `facture`
  MODIFY `numFacture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
