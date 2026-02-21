import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { BrainCircuit } from 'lucide-react';
import { SelectItem } from '@heroui/react';
import { NodeSelect, NodeTextarea } from '../components/UI/NodeField';

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
                <SelectItem key="gpt-4o" value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem key="gpt-4-turbo" value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem key="claude-3-opus" value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem key="claude-3-sonnet" value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                <SelectItem key="gemini-1.5-pro" value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
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
