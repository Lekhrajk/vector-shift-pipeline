// Toolbar — top bar with draggable node chips

import { DraggableNode } from './DraggableNode';
import { Workflow, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { TOOLBAR_NODES, NODE_LABELS } from '../../constants/nodeConfig';
import { useStore } from '../../store/useStore';
import { Tooltip } from '@heroui/react';

export const Toolbar = () => {
    const isSidebarOpen = useStore((s) => s.isSidebarOpen);
    const toggleSidebar = useStore((s) => s.toggleSidebar);

    return (
        <div className="bg-gray-950 border-b border-gray-800 px-5 py-3 flex items-center gap-4 relative z-10">
            <div className="text-sm font-bold text-gray-200 tracking-wider uppercase whitespace-nowrap flex items-center gap-2">
                <Workflow size={18} className="text-indigo-400" />
                Pipeline
            </div>
            <div className="w-px h-8 bg-gray-800 shrink-0" />

            <div className="flex flex-wrap gap-2 flex-1">
                {TOOLBAR_NODES.map((type) => (
                    <DraggableNode key={type} type={type} label={NODE_LABELS[type]} />
                ))}
            </div>

            <div className="flex items-center gap-2 border-l border-gray-800 pl-4 ml-auto">
                <Tooltip
                    content={isSidebarOpen ? "Hide JSON" : "Show JSON"}
                    classNames={{
                        content: "bg-gray-800 text-white text-xs px-2 py-1 rounded-lg border border-gray-700 shadow-xl",
                    }}
                >
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-700 active:scale-95"
                    >
                        {isSidebarOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};
