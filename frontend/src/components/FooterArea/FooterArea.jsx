// Submit — sends pipeline to backend for DAG validation

import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { API_BASE_URL } from '../../utils/helpers';
import { Button, useDisclosure } from '@heroui/react';
import { Send, Loader2 } from 'lucide-react';

import { ValidationStatus } from './ValidationStatus';
import { ActionButtons } from './ActionButtons';
import { AnalysisModal } from './AnalysisModal';
import { ConnectionErrorModal } from './ConnectionErrorModal';

export const FooterArea = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const resultModal = useDisclosure();
    const errorModal = useDisclosure();

    const nodes = useStore((state) => state.nodes);

    const handleSubmit = async () => {
        const nodes = useStore.getState().nodes;
        const edges = useStore.getState().edges;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
            resultModal.onOpen();
        } catch (err) {
            setError(err.message || 'Failed to connect to backend');
            errorModal.onOpen();
        } finally {
            setLoading(false);
        }
    };

    const handleImportError = (msg) => {
        setError(msg);
        errorModal.onOpen();
    };

    return (
        <>
            {/* Submit Area - Sleek Footer Bar */}
            <div className="bg-gray-950/90 backdrop-blur-md border-t border-gray-800 px-6 py-2 flex items-center justify-between w-full z-50">
                {/* Left: Validation Status */}
                <div className="flex items-center gap-4 flex-1">
                    <ValidationStatus />
                </div>

                {/* Center: Run Button */}
                <div className="flex-none flex justify-center">
                    <Button
                        size="md"
                        onPress={handleSubmit}
                        isDisabled={nodes.length === 0}
                        isLoading={loading}
                        spinner={<Loader2 size={16} className="animate-spin text-white" />}
                        endContent={!loading && <Send size={14} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide px-8 py-3 rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Analyzing...' : 'Run Pipeline'}
                    </Button>
                </div>

                {/* Right: Import/Export buttons */}
                <ActionButtons onImportError={handleImportError} />
            </div>

            <AnalysisModal isOpen={resultModal.isOpen} onOpenChange={resultModal.onOpenChange} result={result} />
            <ConnectionErrorModal isOpen={errorModal.isOpen} onOpenChange={errorModal.onOpenChange} error={error} />
        </>
    );
};
