import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { LogIn } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { INPUT_TYPES } from '../constants/formOptions';
import { NodeInput, NodeSelect } from '../components/UI/NodeField';
import { useStore } from '../store/useStore';

export const InputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.inputName || '');
    const [inputType, setInputType] = useState(data?.inputType || 'Text');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
        updateNodeField(id, 'inputName', e.target.value);
    };

    const handleTypeChange = (e) => {
        const val = e.target.value;
        if (val) {
            setInputType(val);
            updateNodeField(id, 'inputType', val);
        }
    };

    return (
        <BaseNode
            id={id}
            type="customInput"
            title="Input"
            icon={<LogIn size={16} />}
            handles={[{ type: 'source', position: 'right', id: 'value' }]}
        >
            <NodeInput
                label="Name"
                placeholder={id.replace('customInput-', 'input_')}
                value={currName}
                onChange={handleNameChange}
            />
            <NodeSelect
                label="Type"
                selectedKeys={[inputType]}
                onChange={handleTypeChange}
            >
                {INPUT_TYPES.map((t) => (
                    <SelectItem key={t.key}>{t.label}</SelectItem>
                ))}
            </NodeSelect>
        </BaseNode>
    );
};
