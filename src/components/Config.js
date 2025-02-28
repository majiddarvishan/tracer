import React from 'react';
import '../assets/css/Config.css';

const Config = () => {
  return (
    <div className="config-container">
      {/* Left Panel - Inputs & Submit Button */}
      <div className="config-left">
        <h4>Quick Settings</h4>
        <input type="text" className="form-control mb-3" placeholder="Enter Value 1" />
        <input type="text" className="form-control mb-3" placeholder="Enter Value 2" />
        <button className="btn btn-primary w-100">Submit</button>
      </div>

      {/* Right Panel - Full Form */}
      <div className="config-right">
        <h4>Advanced Configuration</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Setting 1</label>
            <input type="text" className="form-control" placeholder="Enter Setting 1" />
          </div>
          <div className="mb-3">
            <label className="form-label">Setting 2</label>
            <input type="text" className="form-control" placeholder="Enter Setting 2" />
          </div>
          <div className="mb-3">
            <label className="form-label">Setting 3</label>
            <input type="text" className="form-control" placeholder="Enter Setting 3" />
          </div>
          <button type="submit" className="btn btn-success">Save Configuration</button>
        </form>
      </div>
    </div>
  );
};

export default Config;
