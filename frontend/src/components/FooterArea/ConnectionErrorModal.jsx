import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { XCircle } from 'lucide-react';

export const ConnectionErrorModal = ({ isOpen, onOpenChange, error }) => {
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
                            <XCircle size={22} className="text-red-500" />
                            <span className="text-lg font-bold text-gray-200">
                                Connection Error
                            </span>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-sm text-gray-400 leading-relaxed">{error}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Make sure the backend is running at localhost:8000
                            </p>
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
