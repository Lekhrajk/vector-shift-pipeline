import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Timer } from 'lucide-react';
import { NodeInput } from '../components/UI/NodeField';
import { useStore } from '../store/useStore';

export const TimerNode = ({ id, data }) => {
    const [duration, setDuration] = useState(data?.duration || '1');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
        updateNodeField(id, 'duration', e.target.value);
    };

    return (
        <BaseNode
            id={id}
            type="timer"
            title="Timer"
            icon={<Timer size={16} />}
            handles={[
                { type: 'target', position: 'left', id: 'trigger', label: 'Trigger' },
                { type: 'source', position: 'right', id: 'output' },
            ]}
        >
            <NodeInput
                label="Delay (seconds)"
                type="number"
                min="0"
                step="0.1"
                value={duration}
                onChange={handleDurationChange}
                placeholder="1.0"
            />
            <span className="text-[11px] text-gray-500">
                Pauses execution for the specified duration
            </span>
        </BaseNode>
    );
};
