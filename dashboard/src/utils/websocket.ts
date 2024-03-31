let socket: WebSocket | null = null;

export const initWebSocket = (url: string) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket is connected.");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
    // Implement additional logic to handle incoming messages
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket is closed.");
    socket = null;
  };
};

export const sendMessage = (message: string) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error("WebSocket is not connected.");
  }
};

export const receiveMessage = (callback: (message: any) => void) => {
  if (socket) {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      callback(message);
    };
  } else {
    console.error("WebSocket is not connected.");
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
