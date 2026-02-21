import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Globe } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { HTTP_METHODS } from '../constants/formOptions';
import { NodeInput, NodeSelect, NodeTextarea } from '../components/UI/NodeField';

export const APINode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || '');
    const [method, setMethod] = useState(data?.method || 'GET');
    const [headers, setHeaders] = useState(data?.headers || '');

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
            <NodeInput label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com" />
            <NodeSelect label="Method" selectedKeys={[method]} onChange={(e) => setMethod(e.target.value)}>
                {HTTP_METHODS.map((m) => <SelectItem key={m.key}>{m.label}</SelectItem>)}
            </NodeSelect>
            <NodeTextarea label="Headers" value={headers} onChange={(e) => setHeaders(e.target.value)} placeholder='{"Authorization": "Bearer ..."}' minRows={2} />
        </BaseNode>
    );
};
