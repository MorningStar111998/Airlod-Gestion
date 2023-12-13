//Source
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


module.exports = {
  assignWhatsappRows,
  assignMessengerRows,
  assignTotalRows,
  assignInstagramRows,
  assignLandingRows,
  assignSiteRows,
  assignBaORows,
  assignNullSourceRows,
  // Export other functions...
};
