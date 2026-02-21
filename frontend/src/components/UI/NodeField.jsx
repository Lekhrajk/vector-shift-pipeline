import { forwardRef } from 'react';
import { Input, Select, Textarea } from '@heroui/react';
import { INPUT_CLASS_NAMES, SELECT_CLASS_NAMES, TEXTAREA_CLASS_NAMES } from '../../constants/nodeConfig';

export const NodeField = ({ label, children }) => (
    <div className="flex flex-col gap-1 w-full">
        {label && <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{label}</span>}
        {children}
    </div>
);

export const NodeInput = forwardRef(({ label, ...props }, ref) => (
    <NodeField label={label}>
        <Input ref={ref} size="sm" variant="bordered" classNames={INPUT_CLASS_NAMES} {...props} />
    </NodeField>
));

export const NodeSelect = forwardRef(({ label, children, ...props }, ref) => (
    <NodeField label={label}>
        <Select ref={ref} size="sm" variant="bordered" labelPlacement="outside" classNames={SELECT_CLASS_NAMES} {...props}>
            {children}
        </Select>
    </NodeField>
));

export const NodeTextarea = forwardRef(({ label, ...props }, ref) => (
    <NodeField label={label}>
        <Textarea ref={ref} size="sm" variant="bordered" classNames={TEXTAREA_CLASS_NAMES} {...props} />
    </NodeField>
));
