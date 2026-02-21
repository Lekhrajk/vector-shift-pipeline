import { useRef, useState, useEffect } from 'react';
import { Copy, Download, Upload, Check, AlertCircle, X, GripVertical } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Tooltip } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

export const JsonPreview = () => {
    const isSidebarOpen = useStore((s) => s.isSidebarOpen);
    const exportPipeline = useStore((s) => s.exportPipeline);
    const importPipeline = useStore((s) => s.importPipeline);
    // Destructure directly from the state getter result
    const { errors } = useStore((s) => s.getValidation());

    const nodes = useStore((s) => s.nodes);
    const edges = useStore((s) => s.edges);

    const [copied, setCopied] = useState(false);
    const [importError, setImportError] = useState(null);
    const fileInputRef = useRef(null);

    // Resizing state
    const [width, setWidth] = useState(450);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

    // Handle Resize logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;
            // Calculate new width: viewport width - mouse X position
            // Clamp between 300px and 800px or 90vw
            const newWidth = document.documentElement.clientWidth - e.clientX;
            setWidth(Math.max(300, Math.min(newWidth, Math.min(800, document.documentElement.clientWidth * 0.9))));
        };

        const handleMouseUp = () => setIsResizing(false);

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            // Prevent text selection while dragging
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.userSelect = '';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
        };
    }, [isResizing]);

    const pipelineData = { nodes, edges };
    const jsonStr = JSON.stringify(pipelineData, null, 2);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jsonStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImport = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = importPipeline(ev.target?.result);
            if (!result) setImportError('Invalid JSON format for VectorShift Pipeline');
            else setImportError(null);
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    // Syntax highlight JSON manually (simplified)
    const highlighted = jsonStr
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
                let cls = 'text-blue-300'; // number
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) cls = 'text-indigo-300 font-medium'; // key
                    else cls = 'text-emerald-400'; // string
                } else if (/true|false/.test(match)) cls = 'text-yellow-400';
                else if (/null/.test(match)) cls = 'text-gray-500';
                return `<span class="${cls}">${match}</span>`;
            }
        );

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <motion.div
                    ref={sidebarRef}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-15 bottom-0 z-[200] max-w-[90vw] bg-gray-950 border-l border-t border-gray-800 flex flex-col shadow-2xl"
                    style={{ width: `${width}px` }}
                >
                    {/* Resizer Handle */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-indigo-500/50 active:bg-indigo-500 z-50 transition-colors group flex items-center justify-center -ml-[1px]"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setIsResizing(true);
                        }}
                    >
                        <div className="w-1 h-8 rounded-full bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
                    </div>
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/90 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-200">JSON Preview</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded-md text-xs font-medium transition-colors"
                            >
                                <Upload size={12} /> Import
                            </button>
                            <button
                                onClick={exportPipeline}
                                disabled={errors?.length > 0}
                                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${errors?.length > 0 ? 'bg-gray-800 text-gray-600 border border-gray-800 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700'}`}
                            >
                                <Download size={12} /> Export
                            </button>
                            <div className="w-px h-4 bg-gray-700 mx-0.5"></div>
                            <Tooltip content="Copy JSON" classNames={{ content: "bg-gray-800 text-white text-xs px-2 py-1 rounded-lg border border-gray-700 shadow-xl" }}>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                                >
                                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                </button>
                            </Tooltip>
                            <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
                        </div>
                    </div>

                    {importError && (
                        <div className="mx-4 mt-3 flex items-center gap-2 bg-red-900/30 border border-red-800/50 text-red-400 text-xs px-3 py-2 rounded-lg shrink-0">
                            <AlertCircle size={12} />
                            {importError}
                        </div>
                    )}

                    {/* JSON content */}
                    <div className="flex-1 overflow-auto outline-none bg-[#0d1117]" tabIndex={-1}>
                        <pre
                            className="p-4 text-xs leading-relaxed font-mono text-gray-300 m-0"
                            dangerouslySetInnerHTML={{ __html: highlighted }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
