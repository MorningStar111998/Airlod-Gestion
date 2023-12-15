//*******************   Source   ******************//
const db = require("./database");

async function getTotalRows() {
  return new Promise((resolve, reject) => {
    const getTotalRowsQuery = "SELECT COUNT(*) AS totalRows FROM demande";

    db.query(getTotalRowsQuery, (err, totalRowsResult) => {
      if (err) {
        console.error("Error fetching total rows: " + err);
        return reject(err);
      }

      const totalRows = totalRowsResult[0].totalRows;
      resolve(totalRows);
    });
  });
}

async function assignTotalRows() {
  try {
    const totalRows = await getTotalRows();
    return totalRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getWhatsappRows() {
  return new Promise((resolve, reject) => {
    const getWhatsappRowsQuery =
      "SELECT COUNT(*) AS whatsappRows FROM demande WHERE source = 'Whatsapp'";

    db.query(getWhatsappRowsQuery, (err, whatsappRowsResult) => {
      if (err) {
        console.error("Error fetching whatsapp rows: " + err);
        return reject(err);
      }

      const whatsappRows = whatsappRowsResult[0].whatsappRows;
      resolve(whatsappRows);
    });
  });
}

async function assignWhatsappRows() {
  try {
    const whatsappRows = await getWhatsappRows();
    return whatsappRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getMessengerRows() {
  return new Promise((resolve, reject) => {
    const getMessengerRowsQuery =
      "SELECT COUNT(*) AS messengerRows FROM demande WHERE source = 'Messenger'";

    db.query(getMessengerRowsQuery, (err, messengerRowsResult) => {
      if (err) {
        console.error("Error fetching Messenger rows: " + err);
        return reject(err);
      }

      const messengerRows = messengerRowsResult[0].messengerRows;
      resolve(messengerRows);
    });
  });
}

async function assignMessengerRows() {
  try {
    const messengerRows = await getMessengerRows();
    return messengerRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getInstagramRows() {
  return new Promise((resolve, reject) => {
    const getInstagramRowsQuery =
      "SELECT COUNT(*) AS instagramRows FROM demande WHERE source = 'Instagram'";

    db.query(getInstagramRowsQuery, (err, instagramRowsResult) => {
      if (err) {
        console.error("Error fetching Instagram rows: " + err);
        return reject(err);
      }

      const instagramRows = instagramRowsResult[0].instagramRows;
      resolve(instagramRows);
    });
  });
}

async function assignInstagramRows() {
  try {
    const instagramRows = await getInstagramRows();
    return instagramRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getLandingRows() {
  return new Promise((resolve, reject) => {
    const getLandingRowsQuery =
      "SELECT COUNT(*) AS landingRows FROM demande WHERE source = 'Landing'";

    db.query(getLandingRowsQuery, (err, landingRowsResult) => {
      if (err) {
        console.error("Error fetching Landing rows: " + err);
        return reject(err);
      }

      const landingRows = landingRowsResult[0].landingRows;
      resolve(landingRows);
    });
  });
}

async function assignLandingRows() {
  try {
    const landingRows = await getLandingRows();
    return landingRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getSiteRows() {
  return new Promise((resolve, reject) => {
    const getSiteRowsQuery =
      "SELECT COUNT(*) AS siteRows FROM demande WHERE source = 'Site'";

    db.query(getSiteRowsQuery, (err, siteRowsResult) => {
      if (err) {
        console.error("Error fetching Site rows: " + err);
        return reject(err);
      }

      const siteRows = siteRowsResult[0].siteRows;
      resolve(siteRows);
    });
  });
}

async function assignSiteRows() {
  try {
    const siteRows = await getSiteRows();
    return siteRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getBaoRows() {
  return new Promise((resolve, reject) => {
    const getBaoRowsQuery =
      "SELECT COUNT(*) AS baoRows FROM demande WHERE source = 'Bouche à Oreil'";

    db.query(getBaoRowsQuery, (err, baoRowsResult) => {
      if (err) {
        console.error("Error fetching Bouche à Oreil rows: " + err);
        return reject(err);
      }

      const baoRows = baoRowsResult[0].baoRows;
      resolve(baoRows);
    });
  });
}

async function assignBaORows() {
  try {
    const baoRows = await getBaoRows();
    return baoRows;
  } catch (error) {
    console.error("Error:", error);
  }
}


async function getNullSourceRows() {
  return new Promise((resolve, reject) => {
    const getNullSourceRowsQuery =
      "SELECT COUNT(*) AS nullSourceRows FROM demande WHERE source IS NULL";

    db.query(getNullSourceRowsQuery, (err, nullSourceRowsResult) => {
      if (err) {
        console.error("Error fetching NULL source rows: " + err);
        return reject(err);
      }

      const nullSourceRows = nullSourceRowsResult[0].nullSourceRows;
      resolve(nullSourceRows);
    });
  });
}

async function assignNullSourceRows() {
  try {
    const nullSourceRows = await getNullSourceRows();
    return nullSourceRows;
  } catch (error) {
    console.error("Error:", error);
  }
}









//************************Etat Client */


async function getClientInteresseRows() {
  return new Promise((resolve, reject) => {
    const getClientInteresseQuery =
      "SELECT COUNT(*) AS clientInteresseRows FROM demande WHERE etatClient ='Intéressé'";

    db.query(getClientInteresseQuery, (err, clientInteresseRowsResult) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const clientInteresseRows = clientInteresseRowsResult[0].clientInteresseRows;
      resolve(clientInteresseRows);
    });
  });
}

async function assignClientInteresseRows() {
  try {
    const clientInteresseRows = await getClientInteresseRows();
    return clientInteresseRows;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getEnDiscussionRows() {
  return new Promise((resolve, reject) => {
    const getEnDiscussionQuery =
      "SELECT COUNT(*) AS enDiscussionRows FROM demande WHERE etatClient ='En Discussion'";

    db.query(getEnDiscussionQuery, (err, enDiscussionRowsResult) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const enDiscussionRows = enDiscussionRowsResult[0].enDiscussionRows;
      resolve(enDiscussionRows);
    });
  });
}

async function assignEnDiscussionRows() {
  try {
    const enDiscussionRows = await getEnDiscussionRows();
    return enDiscussionRows;
  } catch (error) {
    console.error("Error:", error);
  }
}


async function getAttenteDeLogoRows() {
  return new Promise((resolve, reject) => {
    const getAttenteDeLogoQuery =
      "SELECT COUNT(*) AS attenteDeLogoRows FROM demande WHERE etatClient ='Attente Logo'";

    db.query(getAttenteDeLogoQuery, (err, attenteDeLogoRowsResult) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const attenteDeLogoRows = attenteDeLogoRowsResult[0].attenteDeLogoRows;
      resolve(attenteDeLogoRows);
    });
  });
}

async function assignAttenteDeLogoRows() {
  try {
    const attenteDeLogoRows = await getAttenteDeLogoRows();
    return attenteDeLogoRows;
  } catch (error) {
    console.error("Error:", error);
  }
}


async function getAttenteDeConfirmationRows() {
  return new Promise((resolve, reject) => {
    const getAttenteDeConfirmationQuery =
      "SELECT COUNT(*) AS attenteDeConfirmationRows FROM demande WHERE etatClient ='Attente Confirmation'";

    db.query(getAttenteDeConfirmationQuery, (err, attenteDeConfirmationRowsResult) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const attenteDeConfirmationRows = attenteDeConfirmationRowsResult[0].attenteDeConfirmationRows;
      resolve(attenteDeConfirmationRows);
    });
  });
}

async function assignAttenteDeConfirmationRows() {
  try {
    const attenteDeConfirmationRows = await getAttenteDeConfirmationRows();
    return attenteDeConfirmationRows;
  } catch (error) {
    console.error("Error:", error);
  }
}



async function getPasDeReponseRows() {
  return new Promise((resolve, reject) => {
    const getPasDeReponseQuery =
      "SELECT COUNT(*) AS pasDeReponseRows FROM demande WHERE etatClient ='Pas de Réponse'";

    db.query(getPasDeReponseQuery, (err, pasDeReponseRowsResult) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const pasDeReponseRows = pasDeReponseRowsResult[0].pasDeReponseRows;
      resolve(pasDeReponseRows);
    });
  });
}

async function assignPasDeReponseRows() {
  try {
    const pasDeReponseRows = await getPasDeReponseRows();
    return pasDeReponseRows;
  } catch (error) {
    console.error("Error:", error);
  }
}



async function getNonInteresseRows() {
  return new Promise((resolve, reject) => {
    const getNonInteresseQuery =
      "SELECT COUNT(*) AS nonInteresseRows FROM demande WHERE etatClient ='Non Intéressé'";

    db.query(getNonInteresseQuery, (err, nonInteresseRowsResult) => {
      if (err) {
        console.error("Error fetching NULL etatClient rows: " + err);
        return reject(err);
      }

      const nonInteresseRows = nonInteresseRowsResult[0].nonInteresseRows;
      resolve(nonInteresseRows);
    });
  });
}

async function assignNonInteresseRows() {
  try {
    const nonInteresseRows = await getNonInteresseRows();
    return nonInteresseRows;
  } catch (error) {
    console.error("Error:", error);
  }
}


module.exports = {
  // Export fontions Sources
  assignWhatsappRows,
  assignMessengerRows,
  assignTotalRows,
  assignInstagramRows,
  assignLandingRows,
  assignSiteRows,
  assignBaORows,
  assignNullSourceRows,
  // Export fontions Etat Client
  assignClientInteresseRows,
  assignEnDiscussionRows,
  assignAttenteDeLogoRows,
  assignAttenteDeConfirmationRows,
  assignPasDeReponseRows,
  assignNonInteresseRows,
};


