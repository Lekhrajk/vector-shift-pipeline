// Zustand store for pipeline state management

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';
import { validatePipeline } from '../utils/validation';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    isSidebarOpen: false,

    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    getNodeID: (type) => {
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },

    addNode: (node) => {
        set({
            nodes: [...get().nodes, node],
        });
    },

    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((n) => n.id !== nodeId),
            edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        });
    },

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    setEdges: (newEdgesOrUpdater) => {
        if (typeof newEdgesOrUpdater === 'function') {
            set({ edges: newEdgesOrUpdater(get().edges) });
        } else {
            set({ edges: newEdgesOrUpdater });
        }
    },

    onConnect: (connection) => {
        set({
            edges: addEdge(
                {
                    ...connection,
                    type: 'deletable',
                    animated: true,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 16,
                        height: 16,
                        color: '#6366f1',
                    },
                    style: {
                        stroke: '#6366f1',
                        strokeWidth: 2,
                    },
                },
                get().edges
            ),
        });
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, [fieldName]: fieldValue };
                }
                return node;
            }),
        });
    },

    highlightNode: (nodeId) => {
        set({
            nodes: get().nodes.map((node) => ({
                ...node,
                selected: node.id === nodeId
            }))
        });
    },

    // UI Helpers for Validation & Export
    getValidation: () => {
        const { nodes, edges } = get();
        return validatePipeline(nodes, edges);
    },

    exportPipeline: () => {
        const state = get();
        const pipelineData = {
            nodes: state.nodes,
            edges: state.edges,
            nodeIDs: state.nodeIDs
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pipelineData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "pipeline.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    },

    importPipeline: (fileContent) => {
        try {
            const data = JSON.parse(fileContent);
            if (data.nodes && data.edges) {
                set({
                    nodes: data.nodes,
                    edges: data.edges,
                    nodeIDs: data.nodeIDs || {}
                });
                return true;
            }
        } catch (e) {
            console.error("Failed to parse pipeline JSON", e);
        }
        return false;
    }
}));
