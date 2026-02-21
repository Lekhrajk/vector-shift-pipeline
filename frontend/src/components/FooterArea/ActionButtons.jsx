import { useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Upload, Download, PanelRightOpen, PanelRightClose } from 'lucide-react';

export const ActionButtons = ({ onImportError }) => {
    const fileInputRef = useRef(null);
    const nodes = useStore((state) => state.nodes);
    const { errors } = useStore((state) => state.getValidation());
    const exportPipeline = useStore((state) => state.exportPipeline);
    const importPipeline = useStore((state) => state.importPipeline);
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const toggleSidebar = useStore((state) => state.toggleSidebar);

    const handleImport = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            if (content) {
                const success = importPipeline(content);
                if (!success) {
                    onImportError("Failed to parse the imported JSON file. Please ensure it is a valid VectorShift pipeline export.");
                }
            }
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex-1 flex justify-end items-center gap-2">
            <button
                onClick={toggleSidebar}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all h-[36px] ${isSidebarOpen ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-transparent hover:border-gray-700'}`}
            >
                {isSidebarOpen ? <PanelRightClose size={14} /> : <PanelRightOpen size={14} />} JSON Preview
            </button>
            <div className="w-px h-4 bg-gray-800 mx-1"></div>
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-transparent hover:border-gray-700 rounded-lg text-xs font-semibold transition-all h-[36px]"
            >
                <Upload size={14} /> Import
            </button>
            <button
                onClick={exportPipeline}
                disabled={errors.length > 0 || nodes.length === 0}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all h-[36px] ${errors.length > 0 || nodes.length === 0 ? 'bg-transparent text-gray-600 border border-transparent cursor-not-allowed' : 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-transparent hover:border-gray-700'}`}
            >
                <Download size={14} /> Export
            </button>
            <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        </div>
    );
};
