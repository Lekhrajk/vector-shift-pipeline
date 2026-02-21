import { useState } from 'react';
import { useDisclosure } from '@heroui/react';
import { ValidationStatus } from './ValidationStatus';
import { ActionButtons } from './ActionButtons';
import { SubmitButton } from '../../submit';
import { ConnectionErrorModal } from './ConnectionErrorModal';

export const FooterArea = () => {
    const [error, setError] = useState(null);
    const errorModal = useDisclosure();

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

                {/* Center: Submit Button */}
                <div className="flex-none flex justify-center">
                    <SubmitButton />
                </div>

                {/* Right: Import/Export buttons */}
                <ActionButtons onImportError={handleImportError} />
            </div>

            <ConnectionErrorModal
                isOpen={errorModal.isOpen}
                onOpenChange={errorModal.onOpenChange}
                error={error}
            />
        </>
    );
};
