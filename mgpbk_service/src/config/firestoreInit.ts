import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore({
  projectId: "mgp-basketball-db-stage",
  keyFilename: "../cred.json",
});

export default firestore;
