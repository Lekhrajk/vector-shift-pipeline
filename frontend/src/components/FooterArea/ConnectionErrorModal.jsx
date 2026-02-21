import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { XCircle } from 'lucide-react';

export const ConnectionErrorModal = ({ isOpen, onOpenChange, error }) => {
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
                            <XCircle size={22} className="text-red-500" />
                            <span className="text-lg font-bold text-gray-200">
                                Connection Error
                            </span>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4 text-center items-center">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-2">
                                    <XCircle size={24} className="text-red-500" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-200 font-medium">
                                        Unable to reach the validation server
                                    </p>
                                    <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4">
                                        <p className="text-sm text-red-400 font-mono break-all leading-relaxed">
                                            {error || "Failed to fetch"}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Please ensure the backend is running at <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-400">localhost:8000</code>
                                    </p>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="justify-center">
                            <Button
                                variant="flat"
                                onPress={onClose}
                                className="bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold px-8"
                            >
                                Got it
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
