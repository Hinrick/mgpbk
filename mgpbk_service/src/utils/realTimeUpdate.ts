import firestore from "../config/firestoreInit";
import { WebSocketService } from "./WebSocketService";

export const listenForDatabaseChanges = (
  webSocketService: WebSocketService
) => {
  firestore.collection("GameEvents").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const newData = JSON.stringify(change.doc.data());
        webSocketService.broadcast(newData);
      }
    });
  });
};
