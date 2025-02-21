import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusCircle, Trash, MessageSquare, ListChecks } from "lucide-react";
import "../assets/css/Trace.css";

const Trace = () => {
  const [rules, setRules] = useState([]); // No predefined values
  const [messages] = useState([
    { id: 1, message: "Message 1" },
    { id: 2, message: "Message 2" },
    { id: 3, message: "Message 3" },
  ]);

  const [messageType, setMessageType] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceClientId, setSourceClientId] = useState("");
  const [destinationClientId, setDestinationClientId] = useState("");
  const [show, setShow] = useState(false);
  const [webSocketAddress, setWebSocketAddress] = useState("");

  const handleInputChange = (e) => {
    setWebSocketAddress(e.target.value);
  };

  const handleAddRule = () => {
    if (!messageType) return;

    const newRule = {
      id: rules.length + 1,
      messageType,
      sourceAddress,
      destinationAddress,
      sourceClientId,
      destinationClientId,
    };

    setRules([...rules, newRule]);
    setMessageType("");
    setSourceAddress("");
    setDestinationAddress("");
    setSourceClientId("");
    setDestinationClientId("");
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDeleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
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
            <div className="card shadow-lg table-card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><ListChecks className="me-2" /> Rules List</h5>
              </div>
              <div className="card-body">
                <Button variant="success" className="mb-3" onClick={handleShow}>
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
                              <span className={`badge ${rule.messageType === "AO" ? "bg-primary" :
                                rule.messageType === "DR" ? "bg-warning" : "bg-danger"}`}>
                                {rule.messageType}
                              </span>
                            </td>
                            <td>{rule.sourceAddress || "-"}</td>
                            <td>{rule.destinationAddress || "-"}</td>
                            <td>{rule.sourceClientId || "-"}</td>
                            <td>{rule.destinationClientId || "-"}</td>
                            <td className="text-center">
                              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRule(rule.id)}>
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
            </div>
          </div>

          {/* Messages Tab (Restored) */}
          <div className="tab-pane fade" id="messages">
            <div className="card shadow-lg table-card">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0"><MessageSquare className="me-2" /> Messages</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table modern-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((msg) => (
                        <tr key={msg.id}>
                          <td>{msg.id}</td>
                          <td>{msg.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Adding Rule */}
        <Modal show={show} onHide={handleClose} centered>
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
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleAddRule} disabled={!messageType}>Save Rule</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Trace;
