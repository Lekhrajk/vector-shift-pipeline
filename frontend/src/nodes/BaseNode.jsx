// BaseNode — reusable node card with header, body, handles, and delete button

import { useCallback, Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import { NODE_ACCENTS } from '../constants/nodeConfig';
import { useStore } from '../store/useStore';
import { X } from 'lucide-react';
import { NodeValidationIcon } from '../components/UI/NodeValidationIcon';

const positionMap = {
    left: Position.Left,
    right: Position.Right,
    top: Position.Top,
    bottom: Position.Bottom,
};

export const BaseNode = ({
    id,
    type,
    title,
    icon,
    children,
    handles = [],
    style = {},
}) => {
    const accent = NODE_ACCENTS[type] || {};
    const deleteNode = useStore((state) => state.deleteNode);

    // Validate this specific node
    const { errors, warnings } = useStore((s) => s.getValidation());
    const nodeErrors = errors.filter(e => e.nodeId === id);
    const nodeWarnings = warnings.filter(w => w.nodeId === id);

    const handleDelete = useCallback(
        (e) => {
            e.stopPropagation();
            deleteNode(id);
        },
        [id, deleteNode]
    );

    return (
        <div
            className="group relative bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-visible min-w-[240px] max-w-[320px] transition-all duration-200 hover:border-gray-700 hover:shadow-2xl hover:shadow-black/30"
            data-type={type}
            style={{ borderTopColor: 'var(--node-accent)', borderTopWidth: '2px', ...style }}
        >
            {/* Delete button — appears on hover */}
            <button
                onClick={handleDelete}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-150 z-10 cursor-pointer shadow-lg"
            >
                <X size={10} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-gray-800">
                {icon && (
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${accent.bg || ''} ${accent.text || ''}`}>
                        {icon}
                    </div>
                )}
                <span className="text-xs font-bold text-gray-200 tracking-wide uppercase">
                    {title}
                </span>

                <NodeValidationIcon errors={nodeErrors} warnings={nodeWarnings} />
            </div>

            {/* Body */}
            <div className="px-3.5 py-4 flex flex-col gap-3.5 w-full">
                {children}
            </div>

            {/* Handles */}
            {handles.map((handle) => {
                const samePositionHandles = handles.filter(
                    (h) => h.position === handle.position && h.type === handle.type
                );
                const posIndex = samePositionHandles.indexOf(handle);
                const total = samePositionHandles.length;
                const offset = ((posIndex + 1) / (total + 1)) * 100;

                const isVertical = handle.position === 'left' || handle.position === 'right';
                const positionStyle = total > 1
                    ? isVertical
                        ? { top: `${offset}%` }
                        : { left: `${offset}%` }
                    : {};

                return (
                    <Fragment key={handle.id}>
                        <Handle
                            type={handle.type}
                            position={positionMap[handle.position]}
                            id={`${id}-${handle.id}`}
                            className="!w-3 !h-3 !rounded-full !bg-gray-500 !border-2 !border-gray-800 hover:!bg-indigo-500 hover:!scale-125 !transition-all"
                            style={positionStyle}
                        />
                        {handle.label && (
                            <span
                                className={`vs-handle-label vs-handle-label-${handle.position}`}
                                style={isVertical ? { top: `${offset}%`, transform: 'translateY(-140%)' } : {}}
                            >
                                {handle.label}
                            </span>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};
