import React, { useState } from "react";
import { MessageSquare, ListChecks } from "lucide-react";
import Rules from "./Rules"; // Import Rules Component
import Messages from "./Messages"; // Import Messages Component
import "../assets/css/Trace.css";

const Trace = () => {
  const [webSocketAddress, setWebSocketAddress] = useState("");

  const handleInputChange = (e) => {
    setWebSocketAddress(e.target.value);
  };

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
            />
            <button className="btn btn-primary btn-lg">Connect</button>
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
