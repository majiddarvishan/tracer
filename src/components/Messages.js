import React from "react";

const Messages = ({ messages }) => {
  return (
    <div className="card shadow-lg table-card">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table modern-table">
            <thead>
              <tr>
                <th>Rule ID</th>
                <th>Creation Time</th>
                <th>Source Msg Type</th>
                <th>Destination Msg Type</th>
                <th>Unique ID</th>
                <th>Msg ID</th>
                <th>Event</th>
                <th>Origin Client ID</th>
                <th>Dest Client ID</th>
                <th>Src Addr</th>
                <th>Dest Addr</th>
                <th>Error No</th>
                <th>Error Desc</th>
                <th>Try Count</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <tr key={index}>
                    <td>{msg.rule_id}</td>
                    <td>{msg.creation_time}</td>
                    <td>{msg.source_msg_type}</td>
                    <td>{msg.destination_msg_type}</td>
                    <td>{msg.unique_id}</td>
                    <td>{msg.msg_id}</td>
                    <td>{msg.event}</td>
                    <td>{msg.origin_client_id}</td>
                    <td>{msg.dest_client_id}</td>
                    <td>{msg.src_addr}</td>
                    <td>{msg.dest_addr}</td>
                    <td>{msg.error_no}</td>
                    <td>{msg.error_desc}</td>
                    <td>{msg.try_count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center text-muted">
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
