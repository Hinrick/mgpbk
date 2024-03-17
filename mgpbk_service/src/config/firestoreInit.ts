import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore({
  projectId: "mgp-basketball-db-stage",
  keyFilename: "../../mgpbk/mgpbk_service/key.json",
});

export default firestore;
