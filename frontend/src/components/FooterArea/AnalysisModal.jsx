import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const AnalysisModal = ({ isOpen, onOpenChange, result }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            classNames={{
                base: 'bg-gray-900 border border-gray-800',
                header: 'border-b border-gray-800',
                body: 'py-4',
                footer: 'border-t border-gray-800',
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex items-center gap-2.5">
                            <CheckCircle2 size={22} className="text-emerald-500" />
                            <span className="text-lg font-bold text-gray-200">
                                Pipeline Analysis
                            </span>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-800">
                                    <span className="text-sm font-medium text-gray-400">Nodes</span>
                                    <span className="text-xl font-bold text-gray-200">{result?.num_nodes}</span>
                                </div>
                                <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-800">
                                    <span className="text-sm font-medium text-gray-400">Edges</span>
                                    <span className="text-xl font-bold text-gray-200">{result?.num_edges}</span>
                                </div>
                                <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-800">
                                    <span className="text-sm font-medium text-gray-400">DAG Status</span>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${result?.is_dag
                                        ? 'bg-emerald-500/15 text-emerald-400'
                                        : 'bg-red-500/15 text-red-400'
                                        }`}>
                                        {result?.is_dag ? (
                                            <><CheckCircle2 size={14} /> Valid DAG</>
                                        ) : (
                                            <><XCircle size={14} /> Contains Cycle</>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="bordered"
                                onPress={onClose}
                                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                fullWidth
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
