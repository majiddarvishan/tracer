import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusCircle, Trash } from "lucide-react";

const Rules = () => {
  const [rules, setRules] = useState([]);
  const [messageType, setMessageType] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceClientId, setSourceClientId] = useState("");
  const [destinationClientId, setDestinationClientId] = useState("");
  const [show, setShow] = useState(false);

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
    <div className="card shadow-lg table-card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Rules List</h5>
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

      {/* Add Rule Modal */}
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
  );
};

export default Rules;
