import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { StickyNote } from 'lucide-react';
import { NOTE_COLORS } from '../constants/formOptions';
import { NodeTextarea } from '../components/UI/NodeField';

export const NoteNode = ({ id, data }) => {
    const [note, setNote] = useState(data?.note || '');
    const [color, setColor] = useState(data?.color || NOTE_COLORS[0].value);

    return (
        <BaseNode
            id={id}
            type="note"
            title="Note"
            icon={<StickyNote size={16} />}
            handles={[
                { type: 'target', position: 'left', id: 'annotate', label: 'Attach' }
            ]}
            style={{ borderTopColor: color }}
        >
            <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2 items-center mb-1">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest flex-1">Color</span>
                    <div className="flex gap-1">
                        {NOTE_COLORS.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => setColor(c.value)}
                                title={c.name}
                                className={`w-3.5 h-3.5 rounded-full shrink-0 p-0 cursor-pointer transition-all duration-150 border-[1.5px] ${color === c.value ? 'border-gray-200 scale-110' : 'border-transparent hover:scale-110'
                                    }`}
                                style={{ background: c.value }}
                            />
                        ))}
                    </div>
                </div>
                <NodeTextarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add your notes here..."
                    minRows={4}
                />
            </div>
        </BaseNode>
    );
};
