import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";

import {
  initWebSocket,
  receiveMessage,
  closeWebSocket,
} from "../../utils/websocket";

const ExamplePage: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState<any>(null);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:5500/api/live");

    // Connection opened
    socket.addEventListener("open", (event) => {
      console.log("Connected to WS Server");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      // setMessages((prevMessages: string[]) => [...prevMessages, event.data]);
    });

    // Connection closed
    socket.addEventListener("close", (event) => {
      console.log("Disconnected from WS Server");
    });

    // Error handling
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error: ", event);
    });

    // Update the state with the new WebSocket
    setWs(socket);

    // Clean up on unmount
    return () => {
      if (socket.readyState === 1) {
        // <-- This is important
        socket.close();
      }
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <img src={"/img/logo.png"} />
    </Container>
  );
};

export default ExamplePage;
