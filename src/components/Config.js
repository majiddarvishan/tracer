import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ConfigSideBar from './ConfigSideBar';
import Editor from './ConfigEditor';

function Config() {
  const [appData, setAppData] = useState({
    config: null,
    schema: null,
    config_hash: null,
    modifiable_paths: {
      insertable: [],
      removable: [],
      replaceable: [],
    },
  });

  const [modification, setModification] = useState({
    status: 'No change',
    op: null,
    path: null,
    value: null,
    index: null,
  });

  const handleEditorChange = (updated_config) => {
    if (JSON.stringify(appData.config) === JSON.stringify(updated_config)) {
      setModification({ status: 'No change', op: null, path: null, value: null, index: null });
      return;
    }
    setModification({ status: 'Modified', op: 'replace', path: '/', value: updated_config, index: null });
  };

  const setModificationStatus = (status) => {
    setModification({ status, op: null, path: null, value: null, index: null });
  };

  const [expandEditor, setExpandEditor] = useState(true);

  const handleAppDataReceive = (newAppData) => {
    setModificationStatus('No change');
    setAppData(newAppData);
    setExpandEditor(false);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* Left Panel (SideBar) */}
        <div className="col-md-3">
          <ConfigSideBar
            onAppDataReceive={handleAppDataReceive}
            ConfigHash={appData.config_hash}
            modificationStatus={modification.status}
            modificationPath={modification.path}
            modificationOp={modification.op}
            modificationValue={modification.value}
            modificationIndex={modification.index}
          />
        </div>

        {/* Right Panel (Editor) */}
        <div className="col-md-9">
          <Editor
            schema={appData.schema}
            config={appData.config}
            onEditorChange={handleEditorChange}
            onEditorError={(error) => setModificationStatus(error)}
            replaceablePaths={appData.modifiable_paths.replaceable}
            expandAll={expandEditor}
          />
        </div>
      </div>
    </div>
  );
}

export default Config;
