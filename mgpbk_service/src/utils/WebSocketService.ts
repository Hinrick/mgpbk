import WebSocket, { Server as WebSocketServer } from "ws";
import * as http from "http";

export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Set<WebSocket>;

  constructor(server: http.Server) {
    this.wss = new WebSocketServer({ noServer: true });
    this.clients = new Set();
    this.setupWebSocketServer(server);
  }

  private setupWebSocketServer(server: http.Server): void {
    server.on("upgrade", (request, socket, head) => {
      if (request.url === "/api/live") {
        this.wss.handleUpgrade(request, socket, head, (ws) => {
          this.wss.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    this.wss.on("connection", (ws: WebSocket) => {
      // Add the new connection to our set of clients
      this.clients.add(ws);

      ws.on("message", (message: string) => {
        console.log("received: %s", message);
        // Process message
      });

      ws.on("close", () => {
        console.log("Client disconnected");
        this.clients.delete(ws); // Remove the connection from our set of clients
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });

      ws.send("Connection established");
    });
  }

  public broadcast(message: string): void {
    this.wss.clients.forEach((client) => {
      // Access 'clients' using the class name
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
