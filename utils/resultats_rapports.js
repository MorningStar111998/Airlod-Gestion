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

module.exports = {
  // Export fontions Sources
  assignSourcesRows,
  // Export fontions Etat Client
  assignEtatClientRows,
};
