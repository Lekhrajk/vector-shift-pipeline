// validation.js - Centralized logic for pipeline validation

export const validatePipeline = (nodes, edges) => {
    const errors = [];
    const warnings = [];

    // Helper to add an error
    const addError = (nodeId, message) => {
        errors.push({ id: crypto.randomUUID(), type: 'error', nodeId, message });
    };

    // Helper to add a warning
    const addWarning = (nodeId, message) => {
        warnings.push({ id: crypto.randomUUID(), type: 'warning', nodeId, message });
    };

    if (nodes.length === 0) {
        return { errors, warnings };
    }

    nodes.forEach(node => {
        const nodeId = node.id;

        // 1. Check for isolated nodes (no edges connected)
        const isConnected = edges.some(edge => edge.source === nodeId || edge.target === nodeId);
        if (!isConnected && node.type !== 'note') {
            addWarning(nodeId, 'Node is isolated (not connected to any other node).');
        }

        // 2. Node-specific validation rules
        switch (node.type) {
            case 'customInput':
                if (!node.data?.inputName?.trim()) {
                    addError(nodeId, 'Input Name cannot be empty.');
                }
                break;
            case 'customOutput':
                if (!node.data?.outputName?.trim()) {
                    addError(nodeId, 'Output Name cannot be empty.');
                }
                break;
            case 'text':
                if (!node.data?.text?.trim()) {
                    addWarning(nodeId, 'Text content is empty.');
                }
                break;
            case 'llm':
                if (!node.data?.systemPrompt?.trim()) {
                    addWarning(nodeId, 'System Prompt is recommended.');
                }
                break;
            case 'api':
                if (!node.data?.endpoint?.trim()) {
                    addError(nodeId, 'API Endpoint URL is required.');
                }
                break;
            // Add more specific rules as needed
        }
    });

    return { errors, warnings };
};
