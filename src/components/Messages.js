import React, { useState } from "react";

const Messages = () => {
  const [messages] = useState([
    { id: 1, message: "Message 1" },
    { id: 2, message: "Message 2" },
    { id: 3, message: "Message 3" },
  ]);

  return (
    <div className="card shadow-lg table-card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">Messages</h5>
      </div>
      <div className="card-body">
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
  );
};

export default Messages;
