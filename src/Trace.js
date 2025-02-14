import React, { useState } from 'react';

const Trace = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Alice Johnson', age: 28 },
    { id: 2, name: 'Bob Smith', age: 34 },
    { id: 3, name: 'Charlie Brown', age: 22 },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = () => {
    const newUser = {
      id: data.length + 1,
      name: inputValue,
      age: Math.floor(Math.random() * 30) + 20,
    };
    setData([...data, newUser]);
    setInputValue('');
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
              placeholder="Enter name"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary btn-lg mt-3" onClick={handleAddUser}>
              <i className="bi bi-plus-circle me-1"></i>Add User
            </button>
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
              <table className="table table-bordered mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Rule</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Rule 1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Rule 2</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Rule 3</td>
                  </tr>
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
