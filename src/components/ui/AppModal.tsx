import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const AppModal = React.memo(({ isOpen, onClose, children, title }: AppModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const prevActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      prevActiveElement.current = document.activeElement as HTMLElement;
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as any;
      const firstElement = focusableElements ? (focusableElements[0] as HTMLElement) : null;
      if (firstElement) {
        firstElement.focus();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        } else if (focusableElements && event.key === 'Tab' && focusableElements.length > 0) {
          const first = focusableElements[0];
          const last = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              event.preventDefault();
            }
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (prevActiveElement.current) {
          prevActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gray-900 rounded-lg shadow-xl p-6 max-w-md w-full border border-gray-700"
            ref={modalRef}
            role="document"
          >
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white" id="modal-title">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-gray-300" aria-labelledby="modal-title">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
AppModal.displayName = 'AppModal';

export default AppModal;
