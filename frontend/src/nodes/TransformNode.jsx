import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Shuffle } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { TRANSFORM_OPTIONS, TRANSFORM_DESCRIPTIONS } from '../constants/formOptions';
import { NodeSelect } from '../components/UI/NodeField';
import { useStore } from '../store/useStore';

export const TransformNode = ({ id, data }) => {
    const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleTransformChange = (e) => {
        const val = e.target.value;
        if (val) {
            setTransformType(val);
            updateNodeField(id, 'transformType', val);
        }
    };

    return (
        <BaseNode
            id={id}
            type="transform"
            title="Transform"
            icon={<Shuffle size={16} />}
            handles={[
                { type: 'target', position: 'left', id: 'input', label: 'Input' },
                { type: 'source', position: 'right', id: 'output' },
            ]}
        >
            <NodeSelect label="Transform" selectedKeys={[transformType]} onChange={handleTransformChange}>
                {TRANSFORM_OPTIONS.map((t) => <SelectItem key={t.key}>{t.label}</SelectItem>)}
            </NodeSelect>
            <span className="text-[11px] text-[var(--vs-text-muted)] leading-snug">
                {TRANSFORM_DESCRIPTIONS[transformType]}
            </span>
        </BaseNode>
    );
};
