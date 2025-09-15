import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";

export default function JournalModal({ entry, onClose, journalEntries }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bind = useDrag(({ down, movement: [mx] }) => {
    if (!down) {
      if (mx < -50) handleNext();
      if (mx > 50) handlePrev();
    }
  });

  useEffect(() => {
    if (!entry) return;
    const index = journalEntries.findIndex(e => e === entry);
    setCurrentIndex(index !== -1 ? index : 0);
  }, [entry, journalEntries]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < journalEntries.length - 1) setCurrentIndex(currentIndex + 1);
  };

  if (!entry) return null;

  const currentEntry = journalEntries[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          {...bind()}
          className="bg-white rounded-2xl p-4 max-w-md w-full mx-2 relative"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={currentEntry.imgUrl}
            alt=""
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          <h3 className="font-semibold text-lg mb-1">{currentEntry.date}</h3>
          <p className="text-gray-600 text-sm mb-2">{currentEntry.description}</p>
          <div className="flex gap-2 flex-wrap text-xs text-white">
            {currentEntry.categories.map((c, i) => (
              <span key={i} className="bg-cyan-500 px-2 py-1 rounded-full">{c}</span>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-3 py-1 rounded ${currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"}`}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === journalEntries.length - 1}
              className={`px-3 py-1 rounded ${currentIndex === journalEntries.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"}`}
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


