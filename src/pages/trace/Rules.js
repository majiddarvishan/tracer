import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusCircle, Trash } from "lucide-react";

const Rules = ({ webSocket }) => {
  const [rules, setRules] = useState([]);
  const [messageType, setMessageType] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceClientId, setSourceClientId] = useState("");
  const [destinationClientId, setDestinationClientId] = useState("");
  const [show, setShow] = useState(false);

  // Check if WebSocket is connected
  const isConnected = webSocket && webSocket.readyState === WebSocket.OPEN;

  // Add Rule
  const handleAddRule = () => {
    if (!messageType) return; // Message Type is mandatory

    const newRule = {
      id: rules.length + 1, // Auto-increment ID
      message_type: messageType,
      source_address: sourceAddress,
      destination_address: destinationAddress,
      source_client_id: sourceClientId,
      destination_client_id: destinationClientId,
    };

    // Create JSON structure
    const jsonData = {
      method: "add",
      rule: newRule,
    };

    // Update UI with new rule
    setRules([...rules, newRule]);
    setMessageType("");
    setSourceAddress("");
    setDestinationAddress("");
    setSourceClientId("");
    setDestinationClientId("");
    setShow(false);

    // Send JSON to WebSocket if connected
    if (isConnected) {
      webSocket.send(JSON.stringify(jsonData));
      console.log("Sent to WebSocket:", JSON.stringify(jsonData));
    } else {
      console.warn("WebSocket is not connected.");
    }
  };

  // Delete Rule
  const handleDeleteRule = (id) => {
    // Create JSON for deletion
    const deleteJson = {
      method: "delete",
      rule: {
        id: id,
      },
    };

    // Remove rule from UI
    setRules(rules.filter((rule) => rule.id !== id));

    // Send JSON to WebSocket if connected
    if (isConnected) {
      webSocket.send(JSON.stringify(deleteJson));
      console.log("Sent to WebSocket:", JSON.stringify(deleteJson));
    } else {
      console.warn("WebSocket is not connected.");
    }
  };

  return (
    <div className="card shadow-lg table-card">
      <div className="card-body">
        <Button
          variant="success"
          className="mb-3"
          onClick={() => setShow(true)}
          disabled={!isConnected} // Disable when WebSocket is disconnected
        >
          <PlusCircle className="me-1" /> Add Rule
        </Button>

        <div className="table-responsive">
          <table className="table modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Message Type</th>
                <th>Source Address</th>
                <th>Destination Address</th>
                <th>Source Client ID</th>
                <th>Destination Client ID</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {rules.length > 0 ? (
                rules.map((rule) => (
                  <tr key={rule.id}>
                    <td>{rule.id}</td>
                    <td>
                      <span className={`badge ${rule.message_type === "AO" ? "bg-primary" :
                        rule.message_type === "DR" ? "bg-warning" : "bg-danger"}`}>
                        {rule.message_type}
                      </span>
                    </td>
                    <td>{rule.source_address || "-"}</td>
                    <td>{rule.destination_address || "-"}</td>
                    <td>{rule.source_client_id || "-"}</td>
                    <td>{rule.destination_client_id || "-"}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteRule(rule.id)}
                        disabled={!isConnected} // Disable when WebSocket is disconnected
                      >
                        <Trash size={16} /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No rules added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding Rule */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select className="mb-2" value={messageType} onChange={(e) => setMessageType(e.target.value)} required>
            <option value="">Select Message Type</option>
            <option value="AO">AO</option>
            <option value="DR">DR</option>
            <option value="AT">AT</option>
          </Form.Select>
          <input type="text" className="form-control mb-2" placeholder="Source Address (Optional)" value={sourceAddress} onChange={(e) => setSourceAddress(e.target.value)} />
          <input type="text" className="form-control mb-2" placeholder="Destination Address (Optional)" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} />
          <input type="text" className="form-control mb-2" placeholder="Source Client ID (Optional)" value={sourceClientId} onChange={(e) => setSourceClientId(e.target.value)} />
          <input type="text" className="form-control mb-2" placeholder="Destination Client ID (Optional)" value={destinationClientId} onChange={(e) => setDestinationClientId(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRule} disabled={!isConnected || !messageType}>
            Save Rule
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Rules;
