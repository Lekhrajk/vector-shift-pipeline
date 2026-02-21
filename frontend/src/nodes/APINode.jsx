import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Globe } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { HTTP_METHODS } from '../constants/formOptions';
import { NodeInput, NodeSelect, NodeTextarea } from '../components/UI/NodeField';
import { useStore } from '../store/useStore';

export const APINode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.endpoint || '');
    const [method, setMethod] = useState(data?.method || 'GET');
    const [headers, setHeaders] = useState(data?.headers || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        updateNodeField(id, 'endpoint', e.target.value);
    };

    const handleMethodChange = (e) => {
        const val = e.target.value;
        if (val) {
            setMethod(val);
            updateNodeField(id, 'method', val);
        }
    };

    const handleHeaderChange = (e) => {
        setHeaders(e.target.value);
        updateNodeField(id, 'headers', e.target.value);
    };

    return (
        <BaseNode
            id={id}
            type="api"
            title="API Call"
            icon={<Globe size={16} />}
            handles={[
                { type: 'target', position: 'left', id: 'input', label: 'Input' },
                { type: 'source', position: 'right', id: 'response' },
            ]}
        >
            <NodeInput label="URL" value={url} onChange={handleUrlChange} placeholder="https://api.example.com" />
            <NodeSelect label="Method" selectedKeys={[method]} onChange={handleMethodChange}>
                {HTTP_METHODS.map((m) => <SelectItem key={m.key}>{m.label}</SelectItem>)}
            </NodeSelect>
            <NodeTextarea label="Headers" value={headers} onChange={handleHeaderChange} placeholder='{"Authorization": "Bearer ..."}' minRows={2} />
        </BaseNode>
    );
};
