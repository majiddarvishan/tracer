import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Button, ButtonGroup, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import MonacoEditor from '@monaco-editor/react';
import { JsonViewer } from '@textea/json-viewer';

function JSONEditorWrapper({ json, schema, onChange, onError, style, onEditable, expandAll, modes = ['form', 'code'] }) {
  const [activeView, setActiveView] = useState(modes.includes('form') ? "form" : "code");
  const [editorValue, setEditorValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(expandAll);
  const jsonContainerRef = useRef(null);

  useEffect(() => {
    // Update editor value when json prop changes
    setEditorValue(JSON.stringify(json, null, 2));
  }, [json]);

  useEffect(() => {
    setIsExpanded(expandAll);
  }, [expandAll]);

  // Handle editor content changes
  const handleEditorChange = (value) => {
    setEditorValue(value);

    try {
      if (value) {
        const parsedJson = JSON.parse(value);
        onChange(parsedJson);
      }
    } catch (error) {
      if (onError) {
        onError("Invalid JSON: " + error.message);
      }
    }
  };

  // Handle search in the JSON viewer
  const handleSearch = () => {
    if (!searchTerm || !jsonContainerRef.current) return;

    const container = jsonContainerRef.current;
    const elements = container.querySelectorAll(`[data-key*="${searchTerm}"], [data-value*="${searchTerm}"]`);

    if (elements.length > 0) {
      // Highlight the first match
      elements.forEach(el => {
        el.style.backgroundColor = '#ffff00';
        el.style.color = '#000000';
      });

      // Scroll to the first match
      elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Clear search highlighting
  const clearSearch = () => {
    setSearchTerm("");
    if (jsonContainerRef.current) {
      const highlightedElements = jsonContainerRef.current.querySelectorAll('[style*="background-color"]');
      highlightedElements.forEach(el => {
        el.style.backgroundColor = '';
        el.style.color = '';
      });
    }
  };

  // JsonViewer component theme and display settings
  const jsonViewerConfig = {
    editable: onEditable,
    defaultInspectDepth: isExpanded ? 99 : 1,
    displayDataTypes: false,
    displayObjectSize: true,
    theme: {
      scheme: 'default',
      base00: '#f8f9fa',
      backgroundColor: '#f8f9fa',
      borderColor: '#e9ecef'
    }
  };

  // Render the appropriate view based on activeView
  const renderView = () => {
    if (activeView === 'form') {
      return (
        <div
          ref={jsonContainerRef}
          style={{
            padding: "10px",
            background: "#f8f9fa",
            borderRadius: "0 0 5px 5px",
            maxHeight: style?.height ? style.height - 150 : "600px",
            overflow: "auto",
            border: "1px solid #dee2e6"
          }}
        >
          <JsonViewer value={json} {...jsonViewerConfig} />
        </div>
      );
    }

    return (
      <div style={{ height: style?.height ? style.height - 80 : "400px", border: "1px solid #ddd", borderRadius: "5px" }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="json"
          value={editorValue}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            formatOnPaste: true,
            formatOnType: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            folding: true,
            lineNumbers: 'on',
            tabSize: 2,
            wordWrap: 'on'
          }}
        />
      </div>
    );
  };

  return (
    <div style={style || {}}>
      {/* Navigation Bar */}
      <div className="mb-3 d-flex justify-content-between align-items-center p-2 bg-light border border-bottom-0 rounded-top">
        <div className="d-flex align-items-center">
          <ButtonGroup className="me-2">
            <Button
              variant="outline-secondary"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse All" : "Expand All"}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                try {
                  const formatted = JSON.stringify(json, null, 2);
                  setEditorValue(formatted);
                  // Apply formatting to the JsonViewer
                  setIsExpanded(true);
                } catch (error) {
                  if (onError) onError("Format error: " + error.message);
                }
              }}
              title="Format JSON"
            >
              Format
            </Button>
          </ButtonGroup>

          {/* View Dropdown */}
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="outline-secondary" id="view-dropdown">
              {activeView === 'form' ? 'Form View' : 'Code View'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {modes.includes('form') && (
                <Dropdown.Item
                  active={activeView === 'form'}
                  onClick={() => setActiveView('form')}
                >
                  Form View
                </Dropdown.Item>
              )}
              {modes.includes('code') && (
                <Dropdown.Item
                  active={activeView === 'code'}
                  onClick={() => setActiveView('code')}
                >
                  Code View
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <InputGroup style={{ width: '40%' }}>
          <FormControl
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="outline-secondary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outline-secondary" onClick={clearSearch}>
            Clear
          </Button>
        </InputGroup>
      </div>

      {/* Content View */}
      {renderView()}
    </div>
  );
}

JSONEditorWrapper.propTypes = {
  json: PropTypes.any,
  schema: PropTypes.object,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.object,
  onEditable: PropTypes.func,
  expandAll: PropTypes.bool,
  modes: PropTypes.arrayOf(PropTypes.string)
};

// Default props
JSONEditorWrapper.defaultProps = {
  json: {},
  onChange: () => {},
  onError: () => {},
  onEditable: () => false,
  expandAll: false,
  modes: ['form', 'code']
};

export default JSONEditorWrapper;