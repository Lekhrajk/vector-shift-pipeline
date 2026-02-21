import { AlertCircle } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';

export const NodeValidationIcon = ({ errors, warnings }) => {
    if (errors.length === 0 && warnings.length === 0) return null;

    return (
        <div className="ml-auto">
            <Popover placement="top" backdrop="transparent" classNames={{ content: "bg-gray-900/95 border border-gray-800 shadow-2xl rounded-xl w-64 p-3" }}>
                <PopoverTrigger>
                    <button className={`vs-icon-btn flex items-center justify-center w-6 h-6 rounded-full border-none cursor-pointer transition-colors ${errors.length > 0 ? "text-red-400 hover:bg-red-400/10" : "text-yellow-500 hover:bg-yellow-500/10"}`}>
                        <AlertCircle size={16} />
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-xs font-semibold text-gray-200 px-1">Validation Status</span>
                        <div className="flex flex-col gap-1.5 mt-1">
                            {errors.map(err => (
                                <div key={err.id} className="flex gap-2 text-xs text-red-400 items-start bg-red-950/30 p-2 rounded-md border border-red-900/50">
                                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                    <span>{err.message}</span>
                                </div>
                            ))}
                            {warnings.map(warn => (
                                <div key={warn.id} className="flex gap-2 text-xs text-yellow-500 items-start bg-yellow-950/30 p-2 rounded-md border border-yellow-900/50">
                                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                    <span>{warn.message}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
