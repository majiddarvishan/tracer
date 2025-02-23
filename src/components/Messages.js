import React from "react";

const Messages = ({ messages }) => {
  return (
    <div className="card shadow-lg table-card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">Messages</h5>
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
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.id}</td>
                    <td>{msg.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-muted">
                    No messages received.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Messages;
