import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { BrainCircuit } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { NodeSelect, NodeTextarea } from '../components/UI/NodeField';
import { LLM_MODELS } from '../constants/formOptions';

export const LLMNode = ({ id, data }) => {
    const [model, setModel] = useState(data?.model || 'gpt-4o');
    const [systemPrompt, setSystemPrompt] = useState(data?.systemPrompt || '');

    return (
        <BaseNode
            id={id}
            type="llm"
            title="LLM"
            icon={<BrainCircuit size={16} />}
            handles={[
                { type: 'target', position: 'left', id: 'system', label: 'System' },
                { type: 'target', position: 'left', id: 'prompt', label: 'Prompt' },
                { type: 'source', position: 'right', id: 'response' },
            ]}
        >
            <NodeSelect
                label="Model"
                selectedKeys={[model]}
                onChange={(e) => setModel(e.target.value)}
                className="w-full"
            >
                {LLM_MODELS.map((opt) => (
                    <SelectItem key={opt.key} value={opt.key}>
                        {opt.label}
                    </SelectItem>
                ))}
            </NodeSelect>

            <NodeTextarea
                label="System Prompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter system instructions..."
                minRows={2}
                maxRows={5}
            />
        </BaseNode>
    );
};
