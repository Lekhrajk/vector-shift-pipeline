import { useState } from 'react';
import { Button, useDisclosure } from '@heroui/react';
import { Send, Loader2 } from 'lucide-react';
import { useStore } from './store/useStore';
import { API_BASE_URL } from './utils/helpers';
import { AnalysisModal } from './components/FooterArea/AnalysisModal';
import { ConnectionErrorModal } from './components/FooterArea/ConnectionErrorModal';

export const SubmitButton = () => {
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

    return (
        <>
            <Button
                size="md"
                onPress={handleSubmit}
                isDisabled={nodes.length === 0}
                isLoading={loading}
                spinner={<Loader2 size={16} className="animate-spin text-white" />}
                endContent={!loading && <Send size={14} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide px-8 py-3 rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Submitting...' : 'Submit'}
            </Button>

            <AnalysisModal
                isOpen={resultModal.isOpen}
                onOpenChange={resultModal.onOpenChange}
                result={result}
            />
            <ConnectionErrorModal
                isOpen={errorModal.isOpen}
                onOpenChange={errorModal.onOpenChange}
                error={error}
            />
        </>
    );
};
