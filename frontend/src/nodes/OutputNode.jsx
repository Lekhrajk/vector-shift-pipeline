import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { LogOut } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { OUTPUT_TYPES } from '../constants/formOptions';
import { NodeInput, NodeSelect } from '../components/UI/NodeField';
import { useStore } from '../store/useStore';

export const OutputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.outputName || '');
    const [outputType, setOutputType] = useState(data?.outputType || 'Text');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
        updateNodeField(id, 'outputName', e.target.value);
    };

    const handleTypeChange = (e) => {
        const val = e.target.value;
        if (val) {
            setOutputType(val);
            updateNodeField(id, 'outputType', val);
        }
    };

    return (
        <BaseNode
            id={id}
            type="customOutput"
            title="Output"
            icon={<LogOut size={16} />}
            handles={[{ type: 'target', position: 'left', id: 'value' }]}
        >
            <NodeInput
                label="Name"
                placeholder={id.replace('customOutput-', 'output_')}
                value={currName}
                onChange={handleNameChange}
            />
            <NodeSelect
                label="Type"
                selectedKeys={[outputType]}
                onChange={handleTypeChange}
            >
                {OUTPUT_TYPES.map((t) => (
                    <SelectItem key={t.key}>{t.label}</SelectItem>
                ))}
            </NodeSelect>
        </BaseNode>
    );
};
