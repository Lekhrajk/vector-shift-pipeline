// Node type configuration — single source of truth for icons, colors, and labels

import {
    LogIn,
    BrainCircuit,
    LogOut,
    Type,
    Globe,
    Timer,
    GitBranch,
    Shuffle,
    StickyNote,
} from 'lucide-react';

// Node type keys
export const NODE_TYPES = {
    INPUT: 'customInput',
    LLM: 'llm',
    OUTPUT: 'customOutput',
    TEXT: 'text',
    API: 'api',
    TIMER: 'timer',
    CONDITIONAL: 'conditional',
    TRANSFORM: 'transform',
    NOTE: 'note',
};

// Lucide icon per node type
export const NODE_ICONS = {
    [NODE_TYPES.INPUT]: LogIn,
    [NODE_TYPES.LLM]: BrainCircuit,
    [NODE_TYPES.OUTPUT]: LogOut,
    [NODE_TYPES.TEXT]: Type,
    [NODE_TYPES.API]: Globe,
    [NODE_TYPES.TIMER]: Timer,
    [NODE_TYPES.CONDITIONAL]: GitBranch,
    [NODE_TYPES.TRANSFORM]: Shuffle,
    [NODE_TYPES.NOTE]: StickyNote,
};

// Tailwind accent classes per node type
export const NODE_ACCENTS = {
    [NODE_TYPES.INPUT]: { bg: 'bg-emerald-500/15', bgChip: 'bg-emerald-500/20', text: 'text-emerald-500' },
    [NODE_TYPES.LLM]: { bg: 'bg-violet-500/15', bgChip: 'bg-violet-500/20', text: 'text-violet-500' },
    [NODE_TYPES.OUTPUT]: { bg: 'bg-blue-500/15', bgChip: 'bg-blue-500/20', text: 'text-blue-500' },
    [NODE_TYPES.TEXT]: { bg: 'bg-amber-500/15', bgChip: 'bg-amber-500/20', text: 'text-amber-500' },
    [NODE_TYPES.API]: { bg: 'bg-pink-500/15', bgChip: 'bg-pink-500/20', text: 'text-pink-500' },
    [NODE_TYPES.TIMER]: { bg: 'bg-sky-500/15', bgChip: 'bg-sky-500/20', text: 'text-sky-500' },
    [NODE_TYPES.CONDITIONAL]: { bg: 'bg-orange-500/15', bgChip: 'bg-orange-500/20', text: 'text-orange-500' },
    [NODE_TYPES.TRANSFORM]: { bg: 'bg-purple-500/15', bgChip: 'bg-purple-500/20', text: 'text-purple-500' },
    [NODE_TYPES.NOTE]: { bg: 'bg-slate-400/15', bgChip: 'bg-slate-400/20', text: 'text-slate-400' },
};

// Display labels for toolbar
export const NODE_LABELS = {
    [NODE_TYPES.INPUT]: 'Input',
    [NODE_TYPES.LLM]: 'LLM',
    [NODE_TYPES.OUTPUT]: 'Output',
    [NODE_TYPES.TEXT]: 'Text',
    [NODE_TYPES.API]: 'API',
    [NODE_TYPES.TIMER]: 'Timer',
    [NODE_TYPES.CONDITIONAL]: 'Conditional',
    [NODE_TYPES.TRANSFORM]: 'Transform',
    [NODE_TYPES.NOTE]: 'Note',
};

// Ordered list of node types for toolbar rendering
export const TOOLBAR_NODES = [
    NODE_TYPES.INPUT,
    NODE_TYPES.LLM,
    NODE_TYPES.OUTPUT,
    NODE_TYPES.TEXT,
    NODE_TYPES.API,
    NODE_TYPES.TIMER,
    NODE_TYPES.CONDITIONAL,
    NODE_TYPES.TRANSFORM,
    NODE_TYPES.NOTE,
];

// Shared HeroUI classNames for form inputs inside nodes
export const INPUT_CLASS_NAMES = {
    label: 'text-[10px] font-semibold text-gray-400 uppercase tracking-widest',
    input: 'text-xs !text-gray-200 placeholder:text-gray-500',
    inputWrapper: [
        'bg-gray-800/80 border border-gray-700/60 rounded-lg',
        'hover:border-gray-600 group-data-[focus=true]:border-indigo-500/60',
        'min-h-[36px] h-9 w-full',
    ].join(' '),
    innerWrapper: 'w-full',
    mainWrapper: 'w-full',
    base: 'w-full',
};

export const SELECT_CLASS_NAMES = {
    label: 'text-[10px] font-semibold text-gray-400 uppercase tracking-widest',
    trigger: [
        'bg-gray-800/80 border border-gray-700/60 rounded-lg',
        'hover:border-gray-600 data-[open=true]:border-indigo-500/60',
        'min-h-[36px] h-9 w-full',
    ].join(' '),
    value: 'text-xs !text-gray-200',
    popoverContent: 'bg-gray-800 border border-gray-700 rounded-lg shadow-xl shadow-black/40',
    listbox: 'p-1',
    base: 'w-full',
    mainWrapper: 'w-full',
    innerWrapper: 'w-full',
};

export const TEXTAREA_CLASS_NAMES = {
    label: 'text-[10px] font-semibold text-gray-400 uppercase tracking-widest',
    input: 'text-xs !text-gray-200 placeholder:text-gray-500 min-h-[72px]',
    inputWrapper: [
        'bg-gray-800/80 border border-gray-700/60 rounded-lg',
        'hover:border-gray-600 group-data-[focus=true]:border-indigo-500/60',
        'w-full !h-auto',
    ].join(' '),
    innerWrapper: 'w-full',
    base: 'w-full',
};
