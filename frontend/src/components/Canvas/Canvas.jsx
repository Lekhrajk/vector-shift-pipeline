// Canvas — ReactFlow pipeline canvas with drag-and-drop

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../../store/useStore';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from '../../nodes';
import { getInitNodeData } from '../../utils/helpers';
import { EmptyState } from './EmptyState';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

const defaultEdgeOptions = {
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 },
};

export const Canvas = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useStore(selector, shallow);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData('application/reactflow')) {
                const appData = JSON.parse(
                    event.dataTransfer.getData('application/reactflow')
                );
                const type = appData?.nodeType;

                if (typeof type === 'undefined' || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                addNode(newNode);
            }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} className="flex-1 relative overflow-hidden">
            {nodes.length === 0 && <EmptyState />}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType="smoothstep"
                connectionLineStyle={{ stroke: '#6366f1', strokeWidth: 2 }}
                defaultEdgeOptions={defaultEdgeOptions}
                deleteKeyCode={['Backspace', 'Delete']}
            >
                <Background color="#1e293b" gap={gridSize} size={1} />
                <Controls className="!bg-gray-800 !border-gray-700 !rounded-lg !shadow-xl [&>button]:!bg-gray-800 [&>button]:!border-gray-700 [&>button]:!text-gray-400 [&>button:hover]:!bg-gray-700" />
                <MiniMap
                    nodeColor={() => 'rgba(99, 102, 241, 0.6)'}
                    maskColor="rgba(3, 7, 18, 0.85)"
                    className="!bg-gray-900 !border !border-gray-800 !rounded-lg !shadow-xl"
                />
            </ReactFlow>
        </div>
    );
};
