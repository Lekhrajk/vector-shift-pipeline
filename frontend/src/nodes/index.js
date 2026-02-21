// Barrel export for all node types + ReactFlow nodeTypes registry

import { InputNode } from './InputNode';
import { LLMNode } from './LLMNode';
import { OutputNode } from './OutputNode';
import { TextNode } from './TextNode';
import { APINode } from './APINode';
import { TimerNode } from './TimerNode';
import { ConditionalNode } from './ConditionalNode';
import { TransformNode } from './TransformNode';
import { NoteNode } from './NoteNode';

// ReactFlow node type registry — used by Canvas
export const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    api: APINode,
    timer: TimerNode,
    conditional: ConditionalNode,
    transform: TransformNode,
    note: NoteNode,
};

export {
    InputNode,
    LLMNode,
    OutputNode,
    TextNode,
    APINode,
    TimerNode,
    ConditionalNode,
    TransformNode,
    NoteNode,
};
