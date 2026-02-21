// Static form options — kept separate from component logic

export const INPUT_TYPES = [
    { key: 'Text', label: 'Text' },
    { key: 'File', label: 'File' },
];

export const OUTPUT_TYPES = [
    { key: 'Text', label: 'Text' },
    { key: 'Image', label: 'Image' },
];

export const HTTP_METHODS = [
    { key: 'GET', label: 'GET' },
    { key: 'POST', label: 'POST' },
    { key: 'PUT', label: 'PUT' },
    { key: 'DELETE', label: 'DELETE' },
];

export const OPERATOR_OPTIONS = [
    { key: 'equals', label: 'Equals' },
    { key: 'not_equals', label: 'Not Equals' },
    { key: 'contains', label: 'Contains' },
    { key: 'greater_than', label: 'Greater Than' },
    { key: 'less_than', label: 'Less Than' },
    { key: 'is_empty', label: 'Is Empty' },
];

export const TRANSFORM_OPTIONS = [
    { key: 'uppercase', label: 'Uppercase' },
    { key: 'lowercase', label: 'Lowercase' },
    { key: 'trim', label: 'Trim' },
    { key: 'json_parse', label: 'JSON Parse' },
    { key: 'base64_encode', label: 'Base64 Encode' },
    { key: 'reverse', label: 'Reverse' },
];

export const TRANSFORM_DESCRIPTIONS = {
    uppercase: 'Convert all text to UPPERCASE',
    lowercase: 'Convert all text to lowercase',
    trim: 'Remove leading/trailing whitespace',
    json_parse: 'Parse text as JSON object',
    base64_encode: 'Encode text to Base64',
    reverse: 'Reverse the text string',
};

export const NOTE_COLORS = [
    { name: 'Default', value: 'rgba(100, 116, 139, 0.5)' },
    { name: 'Blue', value: 'rgba(59, 130, 246, 0.5)' },
    { name: 'Green', value: 'rgba(16, 185, 129, 0.5)' },
    { name: 'Yellow', value: 'rgba(245, 158, 11, 0.5)' },
    { name: 'Red', value: 'rgba(239, 68, 68, 0.5)' },
    { name: 'Purple', value: 'rgba(139, 92, 246, 0.5)' },
];

export const LLM_MODELS = [
    { key: 'gpt-4o', label: 'GPT-4o' },
    { key: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { key: 'claude-3-opus', label: 'Claude 3 Opus' },
    { key: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
    { key: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
];
