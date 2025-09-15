import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { useInView } from "react-intersection-observer";
import Calendar from "./Calendar";
import JournalModal from "./JournalModal";
import Loader from "./Loader";
import { journalData } from "./JournalData";

export default function InfiniteCalendar() {
  const [months, setMonths] = useState([new Date()]);
  const [loadingTop, setLoadingTop] = useState(false);
  const [loadingBottom, setLoadingBottom] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { ref: topRef, inView: topVisible } = useInView();
  const { ref: bottomRef, inView: bottomVisible } = useInView();

  // Load previous month when top sentinel is visible
  useEffect(() => {
    if (topVisible && !loadingTop) {
      setLoadingTop(true);
      setTimeout(() => {
        setMonths(prev => [subMonths(prev[0], 1), ...prev]);
        setLoadingTop(false);
      }, 300);
    }
  }, [topVisible, loadingTop]);

  // Load next month when bottom sentinel is visible
  useEffect(() => {
    if (bottomVisible && !loadingBottom) {
      setLoadingBottom(true);
      setTimeout(() => {
        setMonths(prev => [...prev, addMonths(prev[prev.length - 1], 1)]);
        setLoadingBottom(false);
      }, 300);
    }
  }, [bottomVisible, loadingBottom]);

  return (
    <div className="overflow-y-auto h-screen p-4 space-y-8">
      <div ref={topRef} className="h-1" />
      {loadingTop && <Loader />}

      {months.map((date, idx) => (
        <Calendar
          key={idx}
          currentDate={date}
          journalEntries={journalData}
          onEntryClick={setSelectedEntry}
        />
      ))}

      {loadingBottom && <Loader />}
      <div ref={bottomRef} className="h-1" />

      <JournalModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        journalEntries={journalData}
      />
    </div>
  );
}
