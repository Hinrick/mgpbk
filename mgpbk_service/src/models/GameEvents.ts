// Assuming a TypeScript environment

interface GameEvent {
  id?: string;
  gameId: string;
  playerId: string;
  eventType: string;
  details: any;
  timestamp: Date;
}

const validateGameEventDetails = (event: GameEvent): boolean => {
  switch (event.eventType) {
    case "TWO_POINTS_ATTEMPT":
    case "THREE_POINTS_ATTEMPT":
      return typeof event.details.success === "boolean";
    case "REBOUND":
      return ["offensive", "defensive"].includes(event.details.type);
    case "ASSIST":
    case "STEAL":
    case "BLOCK":
    case "TURNOVER":
      // These events do not require details, so they're always valid
      return true;
    case "FOUL":
      return ["personal", "technical", "flagrant"].includes(event.details.type);
    default:
      // Unknown event type
      return false;
  }
};

export const recordGameEvent = async (event: GameEvent): Promise<void> => {
  // Validate the basic structure
  if (
    !event.gameId ||
    !event.playerId ||
    !event.eventType ||
    !event.timestamp
  ) {
    throw new Error("Missing required fields for game event.");
  }

  // Validate the details based on the event type
  if (!validateGameEventDetails(event)) {
    throw new Error("Invalid details for the given event type.");
  }

  // If validation passes, proceed to process and record the event
  // This is where you'd interact with your database
  console.log("Event is valid and would be processed here.");
};
