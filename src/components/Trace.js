import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../assets/css/Trace.css'; 

const Trace = () => {
  const [rules, setRules] = useState([
    { id: 1, rule: 'Rule 1' },
    { id: 2, rule: 'Rule 2' },
    { id: 3, rule: 'Rule 3' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [webSocketAddress, setWebSocketAddress] = useState('');

  const handleInputChange = (e) => {
    setWebSocketAddress(e.target.value);
  };

  const handleAddRule = () => {
    const newRule = {
      id: rules.length + 1,
      rule: inputValue,
    };
    setRules([...rules, newRule]);
    setInputValue('');
    setShow(false); // Close the modal
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDeleteRule = (id) => {
    const updatedRules = rules.filter((rule) => rule.id !== id);
    setRules(updatedRules);
  };

  const handleConnect = () => {
    // Placeholder for WebSocket connection logic
    console.log('Connecting to WebSocket address:', webSocketAddress);
  };

  return (
    <div className="trace-container">
      <div className="mt-3">
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex align-items-center">
            <input
              type="text"
              className="form-control form-control-lg me-2"
              placeholder="Enter WebSocket address"
              value={webSocketAddress}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary btn-lg" onClick={handleConnect}>
              Connect
            </button>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="rules-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#rules"
                  type="button"
                  role="tab"
                  aria-controls="rules"
                  aria-selected="true"
                >
                  Rules
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="messages-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#messages"
                  type="button"
                  role="tab"
                  aria-controls="messages"
                  aria-selected="false"
                >
                  Messages
                </button>
              </li>
            </ul>
            <div className="tab-content mt-3" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="rules"
                role="tabpanel"
                aria-labelledby="rules-tab"
              >
                <Button variant="primary" className="mb-3" onClick={handleShow}>
                  <i className="bi bi-plus-circle me-1"></i>Add Rule
                </Button>
                <table className="table table-bordered mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Rule</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules.map((rule) => (
                      <tr key={rule.id}>
                        <td>{rule.id}</td>
                        <td>{rule.rule}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteRule(rule.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="tab-pane fade"
                id="messages"
                role="tabpanel"
                aria-labelledby="messages-tab"
              >
                <table className="table table-bordered mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Message 1</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Message 2</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Message 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Adding Rule */}
        <Modal show={show} onHide={handleClose}>
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
