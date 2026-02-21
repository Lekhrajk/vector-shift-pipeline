// Utility functions

// Regex to match {{ variableName }} in text
export const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

// Text node sizing constants
export const TEXT_NODE = {
    MIN_WIDTH: 220,
    MAX_WIDTH: 500,
    MIN_HEIGHT: 100,
    LINE_HEIGHT: 18,
    CHAR_WIDTH: 7.2,
    PADDING: 60,
};

// Create initial data payload for a new node
export const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
});

// API base URL
export const API_BASE_URL = 'http://localhost:8000';
