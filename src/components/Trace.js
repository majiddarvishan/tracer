import React, { useState, useEffect } from "react";
import { MessageSquare, ListChecks } from "lucide-react";
import Rules from "./Rules";
import Messages from "./Messages";
import "../assets/css/Trace.css";

const Trace = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [webSocketAddress, setWebSocketAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleInputChange = (e) => {
    setWebSocketAddress(e.target.value);
  };

  const handleConnect = () => {
    if (!webSocketAddress.trim()) {
      alert("Please enter a WebSocket address.");
      return;
    }

    const ws = new WebSocket(webSocketAddress);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.send("Hello from client");
      setIsConnected(true); // Set connection status to true
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false); // Set connection status to false
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false); // Set connection status to false
    };

    setWebSocket(ws);
  };

  const handleDisconnect = () => {
    if (webSocket) {
      webSocket.close();
      setIsConnected(false); // Set connection status to false
    }
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
              onChange={handleInputChange}
              disabled={isConnected}
            />
            <button
              className="btn btn-primary btn-lg"
              onClick={isConnected ? handleDisconnect : handleConnect}
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
            <Rules />
          </div>

          {/* Messages Tab */}
          <div className="tab-pane fade" id="messages">
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trace;
