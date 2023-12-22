//*******************   Source   ******************//
const db = require("./database");

async function getSourcesRows() {
  return new Promise((resolve, reject) => {
    const colName = "source";
    const getSourcesRowsQuery = `SELECT 
  COUNT(*) AS totalRows,
  SUM(${colName} = 'Whatsapp') AS whatsappRows,
  SUM(${colName} = 'Messenger') AS messengerRows,
  SUM(${colName} = 'Instagram') AS instagramRows,
  SUM(${colName} = 'Landing') AS landingRows,
  SUM(${colName} = 'Site') AS siteRows,
  SUM(${colName} = 'Bouche à Oreil') AS baORows,
  SUM(${colName} IS NULL) AS nullSourcesRows
FROM demande;
`;

    db.query(getSourcesRowsQuery, (err, totalRowsResult) => {
      if (err) {
        console.error("Error fetching total rows: " + err);
        return reject(err);
      }

      const {
        totalRows,
        whatsappRows,
        messengerRows,
        instagramRows,
        landingRows,
        siteRows,
        baORows,
        nullSourcesRows,
      } = totalRowsResult[0];

      const sourcesRows = {
        totalRows,
        whatsappRows,
        messengerRows,
        instagramRows,
        landingRows,
        siteRows,
        baORows,
        nullSourcesRows,
      };
      // const totalRows = totalRowsResult[0].totalRows;
      resolve(sourcesRows);
    });
  });
}

async function assignSourcesRows() {
  try {
    const sourcesRows = await getSourcesRows();
    return sourcesRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

//************************Etat Client */

async function getEtatClientRows() {
  return new Promise((resolve, reject) => {
    const colName = "etatClient";
    const getTotalRowsQuery = `SELECT 
  COUNT(*) AS totalRows,
  SUM(${colName} = 'Intéressé') AS interesseRows,
  SUM(${colName} = 'En Discussion') AS enDiscussionRows,
  SUM(${colName} = 'Attente Logo') AS attenteDeLogoRows,
  SUM(${colName} = 'Attente Confirmation') AS attenteDeConfirmationRows,
  SUM(${colName} = 'Pas de Réponse') AS pasDeReponseRows,
  SUM(${colName} = 'Non Intéressé') AS nonInteresseRows
FROM demande;
`;
    db.query(getTotalRowsQuery, (err, totalRowsResult) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const {
        totalRows,
        interesseRows,
        enDiscussionRows,
        attenteDeLogoRows,
        attenteDeConfirmationRows,
        pasDeReponseRows,
        nonInteresseRows,
      } = totalRowsResult[0];

      const etatClientRows = {
        totalRows,
        interesseRows,
        enDiscussionRows,
        attenteDeLogoRows,
        attenteDeConfirmationRows,
        pasDeReponseRows,
        nonInteresseRows,
      };

      resolve(etatClientRows);
    });
  });
}

async function assignEtatClientRows() {
  try {
    const etatClientRows = await getEtatClientRows();
    return etatClientRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

//*****************Demandes du Jour */
async function getNumDemandesRows() {
  return new Promise((resolve, reject) => {
    const getNumbDemandesQuery = `SELECT 
  SUM(DATE(dateEnregistrement) = CURDATE()) AS demandesAuj,
  SUM(YEAR(dateEnregistrement) = YEAR(CURDATE()) AND MONTH(dateEnregistrement) = MONTH(CURDATE())) AS demandesThisMonth,
  SUM(YEAR(dateEnregistrement) = YEAR(CURDATE())) AS demandesThisYear
FROM demande;
`;

    db.query(getNumbDemandesQuery, (err, numbDemandes) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const numbDemandesAuj = numbDemandes[0];

      resolve(numbDemandesAuj);
    });
  });
}

async function assignNumDemandesRows() {
  try {
    const numbDemandesAuj = await getNumDemandesRows();
    return numbDemandesAuj;
  } catch (error) {
    console.error("Error:", error);
  }
}
//*****************Factures du Jour */
async function getNumFacturesRows() {
  return new Promise((resolve, reject) => {
    const getNumbFacturesQuery = `SELECT 
  SUM(DATE(dateEnregistrement) = CURDATE()) AS facturesAuj,
  SUM(YEAR(dateEnregistrement) = YEAR(CURDATE()) AND MONTH(dateEnregistrement) = MONTH(CURDATE())) AS facturesThisMonth,
  SUM(YEAR(dateEnregistrement) = YEAR(CURDATE())) AS facturesThisYear
FROM facture;
`;
    
    db.query(getNumbFacturesQuery, (err, numbFactures) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const numbFacturesAuj = numbFactures[0];

      resolve(numbFacturesAuj);
    });
  });
}

async function assignNumFacturesRows() {
  try {
    const numbFacturesAuj = await getNumFacturesRows();
    return numbFacturesAuj;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getMaxNumDemande() {
  return new Promise((resolve, reject) => {
    const getMaxNumDemandeQuery =
      "SELECT MAX(numDemande) AS maxNumDemande FROM demande";
    db.query(getMaxNumDemandeQuery, (err, maxNumDemandeDB) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const maxNumDemande = maxNumDemandeDB[0].maxNumDemande;

      resolve(maxNumDemande);
    });
  });
}

async function maxNumDemande() {
  try {
    const maxNumDemande = await getMaxNumDemande();
    return maxNumDemande;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getMaxNumFacture() {
  return new Promise((resolve, reject) => {
    const getMaxNumFactureQuery =
      "SELECT MAX(numFacture) AS maxNumFacture FROM facture";
    db.query(getMaxNumFactureQuery, (err, maxNumFactureDB) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const maxNumFacture = maxNumFactureDB[0].maxNumFacture;

      resolve(maxNumFacture);
    });
  });
}

async function maxNumFacture() {
  try {
    const maxNumFacture = await getMaxNumFacture();
    return maxNumFacture;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getNumEnvoyes() {
  return new Promise((resolve, reject) => {
    const getNumEnvoyesQuery = `SELECT 
  SUM(DATE(dateEnregistrement) = CURDATE() AND etatClient = 'Envoyé') AS envoyesAuj,
  SUM((YEAR(dateEnregistrement) = YEAR(CURDATE()) AND MONTH(dateEnregistrement) = MONTH(CURDATE())) AND etatClient = 'Envoyé') AS envoyesThisMonth,
  SUM(YEAR(dateEnregistrement) = YEAR(CURDATE()) AND etatClient = 'Envoyé') AS envoyesThisYear
FROM demande;

`;
    
    db.query(getNumEnvoyesQuery, (err, numEnvoyesDB) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const numEnvoyes = numEnvoyesDB[0];

      resolve(numEnvoyes);
    });
  });
}

async function numEnvoyesRows() {
  try {
    const numEnvoyes = await getNumEnvoyes();
    return numEnvoyes;
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  // Export fontions Sources
  assignSourcesRows,
  // Export fontions Etat Client
  assignEtatClientRows,
  assignNumDemandesRows,
  assignNumFacturesRows,
  maxNumDemande,
  maxNumFacture,
  numEnvoyesRows,
};
