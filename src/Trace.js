import React, { useState } from 'react';

const Trace = () => {
  const [rules, setRules] = useState([
    { id: 1, rule: 'Rule 1' },
    { id: 2, rule: 'Rule 2' },
    { id: 3, rule: 'Rule 3' },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddRule = () => {
    const newRule = {
      id: rules.length + 1,
      rule: inputValue,
    };
    setRules([...rules, newRule]);
    setInputValue(''); // Clear the input field
  };

  return (
    <div className="mt-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">User Information</h2>

          <div className="mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter rule"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

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
              <button className="btn btn-primary btn-lg mb-3" onClick={handleAddRule}>
                <i className="bi bi-plus-circle me-1"></i>Add Rule
              </button>
              <table className="table table-bordered mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id}>
                      <td>{rule.id}</td>
                      <td>{rule.rule}</td>
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
    </div>
  );
};

export default Trace;
