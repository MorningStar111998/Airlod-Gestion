-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3325
-- Généré le : dim. 10 déc. 2023 à 14:13
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
  `montant` decimal(10,2) DEFAULT NULL,
  `produit` varchar(100) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `remarque` text DEFAULT NULL,
  `etatClient` varchar(100) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `typePaiement` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `demande`
--

INSERT INTO `demande` (`numDemande`, `nomClient`, `numTelephone`, `email`, `typeClient`, `etapeActuelle`, `source`, `numFacture`, `montant`, `produit`, `quantite`, `description`, `remarque`, `etatClient`, `ville`, `adresse`, `prix`, `typePaiement`) VALUES
(1, 'Client1', '123456789', 'client1@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 100.00, 'Produit1', 5, 'Description1', 'Remarque1', 'discussion', NULL, NULL, NULL, NULL),
(2, 'Client2', '987654321', 'client2@example.com', 'instruit', 'conception', 'instagram', NULL, 150.00, 'Produit2', 3, 'Description2', 'Remarque2', 'attente-logo', NULL, NULL, NULL, NULL),
(3, 'Client3', '555555555', 'client3@example.com', 'agressif', 'validation', 'landing', NULL, 200.00, 'Produit3', 2, 'Description3', 'Remarque3', 'non-interesse', NULL, NULL, NULL, NULL),
(4, 'Client4', '999999999', 'client4@example.com', 'negociateur', 'production', 'messebger', NULL, 120.00, 'Produit4', 4, 'Description4', 'Remarque4', 'attente-confirmation', NULL, NULL, NULL, NULL),
(5, 'Client5', '111111111', 'client5@example.com', 'indecis', 'livraison', 'site', NULL, 180.00, 'Produit5', 1, 'Description5', 'Remarque5', 'non-reponse', NULL, NULL, NULL, NULL),
(6, 'Client6', '454545456', 'client6@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 800.00, 'Produit1', 4, 'Description1', 'Remarque6', 'discussion', 'Marrakech', NULL, NULL, NULL),
(7, 'Client7', '656565658', 'client7@example.com', 'instruit', 'conception', 'instagram', NULL, 2050.00, 'Produit2', 7, 'Description2', 'Remarque7', 'attente-logo', 'Rabat', NULL, NULL, NULL),
(8, 'Client8', '023456789', 'client8@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 1500.00, 'Produit1', 5, 'Description8', 'Remarque8', 'discussion', 'Marrakech', 'test adress', NULL, NULL),
(9, 'Client9', '923456789', 'client9@example.com', 'presse', 'decouvre', 'whatsapp', NULL, 100.00, 'Produit1', 5, 'Description9', 'Remarque9', 'discussion', 'CasaBlanca', 'test_address', 500.00, 'Livraison'),
(10, 'test1', 'test', 'test@gmail.com', NULL, 'validation', 'messebger', 120, NULL, 'test produit', 2, 'test', 'test', NULL, 'test', 'test', 100.00, 'livraison');

-- --------------------------------------------------------

--
-- Structure de la table `identification`
--

CREATE TABLE `identification` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `identification`
--

INSERT INTO `identification` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`) VALUES
(1, 'tougouri', 'regis', 'registougouri@gmail.com', 'azerty');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `demande`
--
ALTER TABLE `demande`
  ADD PRIMARY KEY (`numDemande`);

--
-- Index pour la table `identification`
--
ALTER TABLE `identification`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `demande`
--
ALTER TABLE `demande`
  MODIFY `numDemande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `identification`
--
ALTER TABLE `identification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
