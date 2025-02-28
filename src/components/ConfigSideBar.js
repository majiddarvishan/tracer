import React, { useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tab, Tabs, Form, Button, Alert, Spinner } from 'react-bootstrap';
import JSONEditorWrapper from './ConfigJsonEditorWrapper';

function ConfigSideBar({ onAppDataReceive, ConfigHash, modificationStatus, modificationPath, modificationOp, modificationValue, modificationIndex }) {
    const [activeTab, setActiveTab] = useState('connection');
    const [address, setAddress] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [connectError, setConnectError] = useState(null);
    const [connectIsLoading, setConnectIsLoading] = useState(false);
    const [connectIsDisabled, setConnectIsDisabled] = useState(false);
    const [applyError, setApplyError] = useState(null);
    const [applyIsLoading, setApplyIsLoading] = useState(false);

    // Track previous modification path to determine if the view should expand
    const prevModificationPathRef = useRef();
    const expandView = modificationPath !== prevModificationPathRef.current;
    prevModificationPathRef.current = modificationPath;

    const applyChanges = async () => {
        setApplyIsLoading(true);
        setApplyError(null);
        try {
            const response = await axios.post(
                `${address}/config`,
                {
                    op: modificationOp,
                    path: modificationPath,
                    value: modificationValue,
                    index: modificationIndex,
                    config_hash: ConfigHash
                },
                {
                    headers: { 'X-API-Key': apiKey }
                }
            );
            onAppDataReceive(response.data);
        } catch (ex) {
            const error = ex.response?.data || ex.message;
            setApplyError(error);
        } finally {
            setApplyIsLoading(false);
        }
    };

    const getAppData = async () => {
        setConnectIsLoading(true);
        setConnectError(null);
        try {
            const response = await axios.get(`${address}/config`, {
                headers: { 'X-API-Key': apiKey }
            });
            setConnectIsDisabled(true);
            setActiveTab('modification');
            onAppDataReceive(response.data);
        } catch (ex) {
            const error = ex.response?.data || ex.message;
            setConnectError(error);
        } finally {
            setConnectIsLoading(false);
        }
    };

    return (
        <div className="config-sidebar">
            {/* Bootstrap Tabs for Connection & Modification */}
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                <Tab eventKey="connection" title="Connection">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                disabled={connectIsDisabled}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>API Key</Form.Label>
                            <Form.Control
                                type="password"
                                disabled={connectIsDisabled}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="w-100"
                            disabled={connectIsDisabled}
                            onClick={getAppData}
                        >
                            {connectIsLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Connect"}
                        </Button>
                        {connectError && <Alert variant="danger" className="mt-3">{connectError}</Alert>}
                    </Form>
                </Tab>

                <Tab eventKey="modification" title="Modification">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" readOnly value={modificationStatus} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Affecting Path</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                placeholder="The path that will get modified"
                                value={modificationPath || ''}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Value</Form.Label>
                            <JSONEditorWrapper
                                json={modificationValue}
                                modes={['view']}
                                mainMenuBar={false}
                                navigationBar={false}
                                expandAll={expandView}
                            />
                        </Form.Group>
                        <Button
                            variant="success"
                            className="w-100"
                            disabled={!modificationOp}
                            onClick={applyChanges}
                        >
                            {applyIsLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Apply Changes"}
                        </Button>
                        {applyError && <Alert variant="danger" className="mt-3">{applyError}</Alert>}
                    </Form>
                </Tab>
            </Tabs>
        </div>
    );
}

ConfigSideBar.propTypes = {
    onAppDataReceive: PropTypes.func,
    ConfigHash: PropTypes.string,
    modificationStatus: PropTypes.string,
    modificationPath: PropTypes.string,
    modificationOp: PropTypes.string,
    modificationValue: PropTypes.any,
    modificationIndex: PropTypes.number
};

export default ConfigSideBar;