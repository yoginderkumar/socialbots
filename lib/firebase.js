const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const { creds } = require("./creds");

initializeApp({
  credential: cert(creds),
});

const dbRef = getFirestore();

module.exports = {
  dbRef,
};
