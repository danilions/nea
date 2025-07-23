// src/components/actor/ActorModal.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

// ממשק מורחב עבור פרופיל השחקן/גורם
export interface ActorProfile {
  id: string;
  name: string;
  imageUrls: string[]; // רשימת תמונות עבור קרוסלה
  category?: string; // קטגוריה (לדוגמה: "אדם", "ארגון", "אירוע")
  overview: string;
  evidence: string; // יכול להכיל HTML
  network: React.ReactNode; // קומפוננטת רשת (לדוגמה, גרף)
  sources: string; // יכול להכיל HTML
  birthDate?: string; // תאריך לידה/הקמה
  location?: string; // מיקום קשור
  links?: { label: string; url: string }[]; // קישורים רלוונטיים
}

interface ActorModalProps {
  open: boolean;
  onClose: () => void;
  actor?: ActorProfile; // אופציונלי, לטיפול במצבי טעינה/שגיאה
  isLoading?: boolean; // מצב טעינה
  error?: string; // הודעת שגיאה
}

export const ActorModal: React.FC<ActorModalProps> = ({ open, onClose, actor, isLoading, error }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // ניהול פוקוס לנגישות: לכידת פוקוס בתוך המודאל
  useEffect(() => {
    if (open) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements ? (focusableElements[0] as HTMLElement) : null;
      if (firstElement) {
        firstElement.focus();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        } else if (event.key === 'Tab' && focusableElements && focusableElements.length > 0) {
          const first = focusableElements[0] as HTMLElement;
          const last = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === first) {
              last.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === last) {
              first.focus();
              event.preventDefault();
            }
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onClose]);

  // קרוסלה פשוטה לתמונות
  const nextImage = useCallback(() => {
    if (actor?.imageUrls && actor.imageUrls.length > 1) {
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % actor.imageUrls.length);
    }
  }, [actor?.imageUrls]);

  const prevImage = useCallback(() => {
    if (actor?.imageUrls && actor.imageUrls.length > 1) {
      setCurrentImageIndex((prevIndex: number) => (prevIndex - 1 + actor.imageUrls.length) % actor.imageUrls.length);
    }
  }, [actor?.imageUrls]);

  // איפוס אינדקס התמונה כשמודאל נפתח או שחקן משתנה
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [actor]);


  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          className="fixed z-50 inset-0 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="actor-modal-title"
        >
          {/* שכבת רקע כהה */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70"
            aria-hidden="true"
          />

          {/* גוף המודאל */}
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl mx-auto p-6 border border-blue-700/50"
              role="document"
            >
              {/* כפתור סגירה */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="סגור חלון"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* כותרת המודאל */}
              <Dialog.Title
                id="actor-modal-title"
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 pb-2 border-b border-blue-800/50"
              >
                {actor?.name || 'טוען...'}
              </Dialog.Title>

              {/* מצבי טעינה/שגיאה */}
              {isLoading && (
                <div className="text-center py-8 text-blue-300">
                  <p>טוען נתונים...</p>
                  {/* ניתן להוסיף ספינר טעינה כאן */}
                </div>
              )}
              {error && (
                <div className="text-center py-8 text-red-400">
                  <p>שגיאה בטעינת נתונים: {error}</p>
                </div>
              )}

              {/* תוכן המודאל - מוצג רק אם אין טעינה ואין שגיאה ויש שחקן */}
              {!isLoading && !error && actor && (
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                  <Tab.List className="flex space-x-2 md:space-x-4 border-b border-gray-700 mb-6">
                    {['סקירה', 'עדויות', 'רשת', 'מקורות'].map((tabTitle, index) => (
                      <Tab
                        key={tabTitle}
                        className={({ selected }: { selected: boolean }) =>
                          `px-4 py-2 rounded-t-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            selected
                              ? 'bg-blue-700 text-white shadow-md'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                          }`
                        }
                        aria-controls={`tab-panel-${index}`}
                        id={`tab-${index}`}
                      >
                        {tabTitle}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="min-h-[200px]">
                    {/* כרטיסיית סקירה */}
                    <Tab.Panel id="tab-panel-0" aria-labelledby="tab-0">
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col md:flex-row gap-6 text-gray-300"
                      >
                        <div className="w-full md:w-1/2">
                          {/* קרוסלת תמונות */}
                          {actor.imageUrls && actor.imageUrls.length > 0 && (
                            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg border border-gray-700">
                              <AnimatePresence mode="wait">
                                <motion.img
                                  key={currentImageIndex} // מפתח לטריגר אנימציית מעבר
                                  src={actor.imageUrls[currentImageIndex]}
                                  alt={`${actor.name} תמונה ${currentImageIndex + 1}`}
                                  className="object-cover w-full h-full"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </AnimatePresence>
                              {actor.imageUrls.length > 1 && (
                                <>
                                  <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                                    aria-label="תמונה קודמת"
                                  >
                                    &#8592;
                                  </button>
                                  <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                                    aria-label="תמונה הבאה"
                                  >
                                    &#8594;
                                  </button>
                                </>
                              )}
                              {actor.imageUrls.length > 1 && (
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                  {actor.imageUrls.map((_: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className={`block w-2 h-2 rounded-full ${currentImageIndex === idx ? 'bg-white' : 'bg-gray-400'}`}
                                      aria-label={`עבור לתמונה ${idx + 1}`}
                                    ></span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                          <p className="text-base leading-relaxed whitespace-pre-line">{actor.overview}</p>
                          {actor.category && <p><strong className="text-blue-300">קטגוריה:</strong> {actor.category}</p>}
                          {actor.birthDate && <p><strong className="text-blue-300">תאריך:</strong> {actor.birthDate}</p>}
                          {actor.location && <p><strong className="text-blue-300">מיקום:</strong> {actor.location}</p>}
                          {actor.links && actor.links.length > 0 && (
                            <div>
                              <strong className="text-blue-300">קישורים:</strong>
                              <ul className="list-disc list-inside mt-1">
                                {actor.links.map((link, idx) => (
                                  <li key={idx}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200">
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </Tab.Panel>

                    {/* כרטיסיית עדויות */}
                    <Tab.Panel id="tab-panel-1" aria-labelledby="tab-1">
                      <motion.div
                        key="evidence"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="prose prose-invert max-w-none text-gray-300" // prose-invert עבור טקסט כהה
                        dangerouslySetInnerHTML={{ __html: actor.evidence }}
                      />
                    </Tab.Panel>

                    {/* כרטיסיית רשת */}
                    <Tab.Panel id="tab-panel-2" aria-labelledby="tab-2">
                      <motion.div
                        key="network"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-300"
                      >
                        {actor.network || <p className="italic">נתוני רשת אינם זמינים.</p>}
                      </motion.div>
                    </Tab.Panel>

                    {/* כרטיסיית מקורות */}
                    <Tab.Panel id="tab-panel-3" aria-labelledby="tab-3">
                      <motion.div
                        key="sources"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="prose prose-invert max-w-none text-gray-300"
                        dangerouslySetInnerHTML={{ __html: actor.sources }}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              )}
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
