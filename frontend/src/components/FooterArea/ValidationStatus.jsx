import { useStore } from '../../store/useStore';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ValidationStatus = () => {
    const nodes = useStore((state) => state.nodes);
    const { errors, warnings } = useStore((state) => state.getValidation());
    const highlightNode = useStore((state) => state.highlightNode);

    if (nodes.length === 0) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800/50 bg-gray-900/30">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pipeline Empty</span>
            </div>
        );
    }

    const hasErrors = errors.length > 0;
    const hasWarnings = warnings.length > 0;
    const isReady = !hasErrors && !hasWarnings;

    return (
        <div className="flex items-center gap-2">
            {isReady && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-emerald-500/10 border-emerald-500/20">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-500">Pipeline Ready</span>
                </div>
            )}

            {/* Errors Popover */}
            {hasErrors && (
                <Popover placement="top-start" backdrop="blur" classNames={{ content: "bg-gray-900/95 border border-red-900/50 shadow-2xl rounded-xl w-72 p-0 overflow-hidden" }}>
                    <PopoverTrigger>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors border bg-red-500/10 border-red-500/20 hover:bg-red-500/20">
                            <AlertCircle size={16} className="text-red-500" />
                            <span className="text-xs font-semibold text-red-500">
                                {errors.length} {errors.length === 1 ? 'Error' : 'Errors'}
                            </span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex flex-col w-full max-h-[300px] overflow-y-auto">
                            <div className="px-3 py-2 border-b border-red-900/50 bg-red-950/30 flex items-center justify-between sticky top-0 z-10 w-full">
                                <span className="text-xs font-semibold text-red-400">Errors</span>
                            </div>
                            <div className="flex flex-col p-1.5 w-full">
                                {errors.map(err => (
                                    <button key={err.id} onClick={() => highlightNode(err.nodeId)} className="w-full flex items-start gap-2 p-2 hover:bg-gray-800/50 rounded-md transition-colors text-left group">
                                        <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                                        <span className="text-xs text-gray-300 group-hover:text-gray-100">{err.message}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )}

            {/* Warnings Popover */}
            {hasWarnings && (
                <Popover placement="top-start" backdrop="blur" classNames={{ content: "bg-gray-900/95 border border-yellow-900/50 shadow-2xl rounded-xl w-72 p-0 overflow-hidden" }}>
                    <PopoverTrigger>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors border bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20">
                            <AlertTriangle size={16} className="text-yellow-500" />
                            <span className="text-xs font-semibold text-yellow-500">
                                {warnings.length} {warnings.length === 1 ? 'Warning' : 'Warnings'}
                            </span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex flex-col w-full max-h-[300px] overflow-y-auto">
                            <div className="px-3 py-2 border-b border-yellow-900/50 bg-yellow-950/30 flex items-center justify-between sticky top-0 z-10 w-full">
                                <span className="text-xs font-semibold text-yellow-500">Warnings</span>
                            </div>
                            <div className="flex flex-col p-1.5 w-full">
                                {warnings.map(warn => (
                                    <button key={warn.id} onClick={() => highlightNode(warn.nodeId)} className="w-full flex items-start gap-2 p-2 hover:bg-gray-800/50 rounded-md transition-colors text-left group">
                                        <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                                        <span className="text-xs text-gray-300 group-hover:text-gray-100">{warn.message}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
};
