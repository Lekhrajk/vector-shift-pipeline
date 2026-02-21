import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { GitBranch } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { OPERATOR_OPTIONS } from '../constants/formOptions';
import { NodeInput, NodeSelect } from '../components/UI/NodeField';
import { useStore } from '../store/useStore';

export const ConditionalNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || '');
    const [operator, setOperator] = useState(data?.operator || 'equals');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleOperatorChange = (e) => {
        const val = e.target.value;
        if (val) {
            setOperator(val);
            updateNodeField(id, 'operator', val);
        }
    };

    const handleValueChange = (e) => {
        setCondition(e.target.value);
        updateNodeField(id, 'condition', e.target.value);
    };

    return (
        <BaseNode
            id={id}
            type="conditional"
            title="Conditional"
            icon={<GitBranch size={16} />}
            handles={[
                { type: 'target', position: 'left', id: 'input', label: 'Input' },
                { type: 'source', position: 'right', id: 'true', label: 'True' },
                { type: 'source', position: 'right', id: 'false', label: 'False' },
            ]}
        >
            <NodeSelect label="Operator" selectedKeys={[operator]} onChange={handleOperatorChange}>
                {OPERATOR_OPTIONS.map((op) => <SelectItem key={op.key}>{op.label}</SelectItem>)}
            </NodeSelect>
            <NodeInput label="Value" value={condition} onChange={handleValueChange} placeholder="Comparison value" />
        </BaseNode>
    );
};
