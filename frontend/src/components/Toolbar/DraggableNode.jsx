// DraggableNode — toolbar chip that initiates drag-and-drop

import { NODE_ICONS, NODE_ACCENTS } from '../../constants/nodeConfig';
import { Type } from 'lucide-react';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    const Icon = NODE_ICONS[type] || Type;
    const accent = NODE_ACCENTS[type] || NODE_ACCENTS.note;

    return (
        <div
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-800/60 border border-gray-700/50 rounded-lg cursor-grab select-none transition-all duration-200 ease-out hover:bg-gray-700/60 hover:border-gray-600 hover:-translate-y-px hover:shadow-lg active:cursor-grabbing active:translate-y-0"
            data-type={type}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            draggable
        >
            <div className={`flex items-center justify-center w-[22px] h-[22px] rounded-md shrink-0 ${accent.bgChip} ${accent.text}`}>
                <Icon size={14} />
            </div>
            <span className="text-xs font-medium text-gray-300 tracking-wide">
                {label}
            </span>
        </div>
    );
};
