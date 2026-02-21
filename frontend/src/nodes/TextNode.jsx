import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Type } from 'lucide-react';
import { useStore } from '../store/useStore';
import { VARIABLE_REGEX, TEXT_NODE } from '../utils/helpers';
import { NodeTextarea } from '../components/UI/NodeField';

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const textareaRef = useRef(null);
    const updateNodeField = useStore((state) => state.updateNodeField);

    const variables = useMemo(() => {
        const vars = [];
        let match;
        const regex = new RegExp(VARIABLE_REGEX);
        while ((match = regex.exec(currText)) !== null) {
            if (!vars.includes(match[1])) vars.push(match[1]);
        }
        return vars;
    }, [currText]);

    useEffect(() => {
        updateNodeField(id, 'variables', variables);
    }, [id, variables, updateNodeField]);

    const dimensions = useMemo(() => {
        const lines = currText.split('\n');
        const longestLine = Math.max(...lines.map((l) => l.length));
        const calcWidth = Math.min(
            TEXT_NODE.MAX_WIDTH,
            Math.max(TEXT_NODE.MIN_WIDTH, longestLine * TEXT_NODE.CHAR_WIDTH + TEXT_NODE.PADDING)
        );
        const calcHeight = Math.max(TEXT_NODE.MIN_HEIGHT, lines.length * TEXT_NODE.LINE_HEIGHT + 80);
        return { width: calcWidth, height: calcHeight };
    }, [currText]);

    const handleTextChange = useCallback((e) => {
        setCurrText(e.target.value);
        updateNodeField(id, 'text', e.target.value);
    }, [id, updateNodeField]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [currText]);

    return (
        <div className="relative">
            {variables.map((varName, index) => (
                <div key={varName}>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id={`${id}-${varName}`}
                        style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
                    />
                    <span
                        className="vs-handle-label vs-handle-label-left text-amber-500 text-[10px] font-semibold"
                        style={{
                            top: `${((index + 1) / (variables.length + 1)) * 100}%`,
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {varName}
                    </span>
                </div>
            ))}

            <BaseNode
                id={id}
                type="text"
                title="Text"
                icon={<Type size={16} />}
                handles={[{ type: 'source', position: 'right', id: 'output' }]}
                style={{ width: dimensions.width }}
            >
                <NodeTextarea
                    ref={textareaRef}
                    label="Text"
                    value={currText}
                    onChange={handleTextChange}
                    placeholder="Type text here... use {{ variable }} for inputs"
                    minRows={3}
                    maxRows={8}
                />
                {variables.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                        {variables.map((v) => (
                            <span
                                key={v}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/[0.12] text-amber-500 font-semibold border border-amber-500/20"
                            >
                                {v}
                            </span>
                        ))}
                    </div>
                )}
            </BaseNode>
        </div>
    );
};
