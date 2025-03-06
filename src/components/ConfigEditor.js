import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Card } from 'react-bootstrap';
import JSONEditorWrapper from './ConfigJsonEditorWrapper';

function Editor({ config, schema, replaceablePaths, onEditorChange, onEditorError, expandAll }) {
    const [activeTab, setActiveTab] = useState('editor');
    const schemaTabRef = useRef(null);

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

    // Use effect to hide the navbar in the schema tab
    useEffect(() => {
        // Function to hide the navbar
        const hideSchemaNavbar = () => {
            if (schemaTabRef.current) {
                // Find the navbar in the schema tab
                const navbar = schemaTabRef.current.querySelector('.mb-3.d-flex.justify-content-between.align-items-center.p-2');
                if (navbar) {
                    navbar.style.display = 'none';
                }

                // Adjust the editor height to fill space
                const editorDiv = schemaTabRef.current.querySelector('.monaco-editor');
                if (editorDiv) {
                    editorDiv.style.height = '100%';
                }
            }
        };

        // Add a small delay to ensure DOM is updated
        if (activeTab === 'schema') {
            setTimeout(hideSchemaNavbar, 50);
        }
    }, [activeTab]);

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
                    <div ref={schemaTabRef}>
                        <JSONEditorWrapper
                            json={schema}
                            modes={['code']}
                            onEditable={() => false}
                            style={{ height: 850 }}
                        />
                    </div>
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