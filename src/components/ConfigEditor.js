import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Card } from 'react-bootstrap';
import JSONEditorWrapper from './ConfigJsonEditorWrapper';

function Editor({ config, schema, replaceablePaths, onEditorChange, onEditorError, expandAll }) {
    const [activeTab, setActiveTab] = useState('editor');

    function isNodeEditable(node) {
        // If editor is in code mode, in that case everything is editable
        if (Object.keys(node).length === 0) return true;

        // A node path is editable if it is a child of a replaceablePaths
        if (node.path) {
            const path = '/' + node.path.join('/');
            if (replaceablePaths.some((i) => path.startsWith(i))) {
                return { field: false, value: true };
            }
        }

        return false;
    }

    return (
        <Card className="p-3">
            {/* Bootstrap Tabs for Editor & Schema */}
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                <Tab eventKey="editor" title="Editor">
                    <JSONEditorWrapper
                        json={config}
                        onChange={onEditorChange}
                        onError={onEditorError}
                        onEditable={isNodeEditable}
                        style={{ height: 850 }}
                        expandAll={expandAll}
                        modes={['form', 'code']}
                    />
                </Tab>

                <Tab eventKey="schema" title="Schema">
                    <JSONEditorWrapper
                        json={schema}
                        modes={['code']}
                        onEditable={() => false}
                        style={{ height: 850 }}
                    />
                </Tab>
            </Tabs>
        </Card>
    );
}

Editor.propTypes = {
    schema: PropTypes.object,
    config: PropTypes.object,
    onEditorChange: PropTypes.func,
    onEditorError: PropTypes.func,
    replaceablePaths: PropTypes.arrayOf(PropTypes.string),
    expandAll: PropTypes.bool,
};

Editor.defaultProps = {
    schema: null,
    config: {},
    onEditorChange: () => {},
    onEditorError: () => {},
    replaceablePaths: [],
    expandAll: false,
};

export default Editor;