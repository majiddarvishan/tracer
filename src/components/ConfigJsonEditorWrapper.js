import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'jsoneditor/dist/jsoneditor.css';
import JSONEditor from 'jsoneditor';

function JSONEditorWrapper({ json, schema, modes, mainMenuBar, statusBar, navigationBar, onEditable, onError, onChange, style, expandAll }) {
    const element = useRef(null);
    const jsoneditor = useRef(null);
    const onEditableRef = useRef();
    const onErrorRef = useRef();
    const onChangeRef = useRef();

    useEffect(() => {
        onEditableRef.current = onEditable;
        onErrorRef.current = onError;
        onChangeRef.current = onChange;
    }, [onEditable, onError, onChange]);

    useEffect(() => {
        if (jsoneditor.current) return;

        const handleChange = () => {
            let json;
            let error;

            try {
                json = jsoneditor.current.get();
                if (!jsoneditor.current.validateSchema(json))
                    error = 'Schema error';
            } catch (ex) {
                error = 'Bad JSON';
            }

            if (error)
                onErrorRef.current(error);
            else
                onChangeRef.current(json);
        };

        const handleEditable = (node) => onEditableRef.current(node);

        const options = {
            // mode: modes[0] || 'form', // Default mode set explicitly
            enableSort: false,
            enableTransform: false,
            indentation: 4,
            modes,
            mainMenuBar,
            statusBar,
            navigationBar,
            onChange: handleChange,
            onEditable: handleEditable
        };

        jsoneditor.current = new JSONEditor(element.current, options);
    }, [modes, mainMenuBar, statusBar, navigationBar]);

    useEffect(() => {
        if (jsoneditor.current) {
            jsoneditor.current.setSchema(schema);
        }
    }, [schema]);

    useEffect(() => {
        if (jsoneditor.current) {
            jsoneditor.current.update(json);
            if (expandAll && jsoneditor.current.getMode() !== 'code') {
                jsoneditor.current.expandAll();
            }
        }
    }, [json, expandAll]);

    return <div style={style} ref={element} />;
}

JSONEditorWrapper.defaultProps = {
    mainMenuBar: true,
    statusBar: true,
    navigationBar: true,
    schema: {},
    style: {},
    expandAll: false
};

JSONEditorWrapper.propTypes = {
    json: PropTypes.any,
    schema: PropTypes.object,
    modes: PropTypes.arrayOf(PropTypes.string),
    mainMenuBar: PropTypes.bool,
    statusBar: PropTypes.bool,
    navigationBar: PropTypes.bool,
    onError: PropTypes.func,
    onChange: PropTypes.func,
    onEditable: PropTypes.func,
    style: PropTypes.object,
    expandAll: PropTypes.bool
};

export default JSONEditorWrapper;
