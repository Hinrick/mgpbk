import firestore from "../config/firestoreInit";
import { Team } from "../models/Team";

export const addTeam = async (teamData: Team): Promise<string> => {
  const dataWithTimestamps = {
    ...teamData,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
  const teamRef = await firestore.collection("Teams").add(dataWithTimestamps);
  return teamRef.id;
};

export const getTeamsByLeague = async (id: string): Promise<Team[]> => {
  const snapshot = await firestore
    .collection("Teams")
    .where("leagueIds", "array-contains", id)
    .get();

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().name,
        createdAt: new Date(doc.data().createdAt._seconds * 1000),
        updatedAt: new Date(doc.data().updatedAt._seconds * 1000),
      } as Team)
  );
};

export const getTeamDetails = async (id: string): Promise<Team> => {
  const doc = await firestore.collection("Teams").doc(id).get();

  if (!doc.exists) {
    throw new Error("Team not found");
  } else {
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
      updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
      gameEvents: doc.data()?.gameEvents,
    } as Team;
  }
};

export const updateTeamDetails = async (
  id: string,
  teamData: Partial<Team>
): Promise<void> => {
  const team = await firestore.collection("Teams").doc(id).get();
  if (!team.exists) {
    throw new Error("Team not found");
  } else {
    const dataWithTimestamps = {
      ...teamData,
      updatedAt: new Date(),
    };
    await firestore.collection("Teams").doc(id).update(dataWithTimestamps);
  }
};

export const deleteTeam = async (id: string): Promise<void> => {
  const team = await firestore.collection("Teams").doc(id).get();
  if (!team.exists) {
    throw new Error("Team not found");
  } else {
    await firestore.collection("Teams").doc(id).update({
      isActive: false,
      updatedAt: new Date(),
    });
  }
};
