import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PlusCircle, Trash, MessageSquare, ListChecks } from "lucide-react";
import "../assets/css/Trace.css";

const Trace = () => {
  const [rules, setRules] = useState([
    { id: 1, rule: "Rule 1" },
    { id: 2, rule: "Rule 2" },
    { id: 3, rule: "Rule 3" },
  ]);

  const [messages] = useState([
    { id: 1, message: "Message 1" },
    { id: 2, message: "Message 2" },
    { id: 3, message: "Message 3" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const [webSocketAddress, setWebSocketAddress] = useState("");

  const handleInputChange = (e) => {
    setWebSocketAddress(e.target.value);
  };

  const handleAddRule = () => {
    if (!inputValue.trim()) return;
    const newRule = {
      id: rules.length + 1,
      rule: inputValue,
    };
    setRules([...rules, newRule]);
    setInputValue("");
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

                {/* Modern Styled Table */}
                <div className="table-responsive">
                  <table className="table modern-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Rule</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rules.length > 0 ? (
                        rules.map((rule) => (
                          <tr key={rule.id}>
                            <td>{rule.id}</td>
                            <td>{rule.rule}</td>
                            <td className="text-center">
                              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                                <Trash size={16} /> Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-muted">
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

          {/* Messages Tab (Styled Identically) */}
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
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter rule"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddRule}>
              Save Rule
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Trace;
