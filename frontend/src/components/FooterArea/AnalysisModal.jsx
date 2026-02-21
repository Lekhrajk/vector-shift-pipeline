import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const AnalysisModal = ({ isOpen, onOpenChange, result }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="md"
            placement="center"
            classNames={{
                base: 'bg-gray-950 border border-gray-800 shadow-2xl rounded-2xl',
                header: 'border-b border-gray-900 px-6 py-4',
                body: 'px-6 py-6',
                footer: 'border-t border-gray-900 px-6 py-4',
                closeButton: 'top-4 right-4 hover:bg-gray-800 active:bg-gray-700 transition-colors text-gray-500 hover:text-gray-300',
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded-lg ${result?.is_dag && result?.is_connected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {result?.is_dag && result?.is_connected ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                            </div>
                            <span className="text-lg font-bold text-gray-200">
                                Pipeline Analysis
                            </span>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1 p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50 hover:bg-gray-900 transition-colors group">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Nodes</span>
                                        <div className="flex items-end justify-between">
                                            <span className="text-2xl font-black text-white">{result?.num_nodes || 0}</span>
                                            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <svg size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50 hover:bg-gray-900 transition-colors group">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Edges</span>
                                        <div className="flex items-end justify-between">
                                            <span className="text-2xl font-black text-white">{result?.num_edges || 0}</span>
                                            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <svg size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M5 12h14" /><path d="m13 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex items-center justify-between p-4 rounded-2xl border ${result?.is_dag
                                    ? 'bg-emerald-500/5 border-emerald-500/20'
                                    : 'bg-red-500/5 border-red-500/20'
                                    }`}>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">DAG Integrity</span>
                                        <p className={`text-sm font-bold ${result?.is_dag ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {result?.is_dag ? 'Topology Valid' : 'Cyclic Dependency Detected'}
                                        </p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${result?.is_dag ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                                        {result?.is_dag ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                                    </div>
                                </div>

                                <div className={`flex items-center justify-between p-4 rounded-2xl border ${result?.is_connected
                                    ? 'bg-indigo-500/5 border-indigo-500/20'
                                    : 'bg-amber-500/5 border-amber-500/20'
                                    }`}>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Connectivity</span>
                                        <p className={`text-sm font-bold ${result?.is_connected ? 'text-indigo-400' : 'text-amber-400'}`}>
                                            {result?.is_connected ? 'Full Connectivity' : 'Isolated Nodes Detected'}
                                        </p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${result?.is_connected ? 'bg-indigo-500/20 text-indigo-500' : 'bg-amber-500/20 text-amber-500'}`}>
                                        {result?.is_connected ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="justify-center pt-2">
                            <Button
                                variant="flat"
                                onPress={onClose}
                                className="bg-gray-800 text-gray-300 hover:bg-gray-700 font-bold px-10 rounded-xl"
                            >
                                Done
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
