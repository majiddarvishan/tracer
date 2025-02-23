import React, { useState, useEffect } from "react";
import { MessageSquare, ListChecks } from "lucide-react";
import Rules from "./Rules";
import Messages from "./Messages";
import "../assets/css/Trace.css";

const Trace = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [webSocketAddress, setWebSocketAddress] = useState("ws://127.0.0.1:8765"); // Default address
  const [messages, setMessages] = useState([]); // Store received messages
  const [isConnected, setIsConnected] = useState(false); // Track WebSocket state

  // Handle WebSocket connection
  const handleConnect = () => {
    if (isConnected) {
      // If already connected, disconnect
      webSocket.close();
      return;
    }

    const ws = new WebSocket(webSocketAddress);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, message: event.data },
      ]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWebSocket(ws);
  };

  useEffect(() => {
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [webSocket]);

  return (
    <div className="trace-container">
      <div className="mt-4">
        {/* WebSocket Address Input */}
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex align-items-center">
            <input
              type="text"
              className="form-control form-control-lg me-2"
              placeholder="Enter WebSocket address"
              value={webSocketAddress}
              onChange={(e) => setWebSocketAddress(e.target.value)}
              disabled={isConnected} // Disable input when connected
              style={{ color: isConnected ? "#6c757d" : "#000" }} // Change text color
            />
            <button
              className={`btn btn-lg ${isConnected ? "btn-danger" : "btn-primary"}`}
              onClick={handleConnect}
            >
              {isConnected ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#rules">
              <ListChecks className="me-1" /> Rules
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#messages">
              <MessageSquare className="me-1" /> Messages
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-3">
          {/* Rules Tab */}
          <div className="tab-pane fade show active" id="rules">
            <Rules webSocket={webSocket} />
          </div>

          {/* Messages Tab */}
          <div className="tab-pane fade" id="messages">
            <Messages messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trace;
    