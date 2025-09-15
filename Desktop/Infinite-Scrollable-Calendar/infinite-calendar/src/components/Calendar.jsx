import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { motion } from "framer-motion";

export default function Calendar({ currentDate, journalEntries, onEntryClick }) {
  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 }); 
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">{format(currentDate, "MMMM yyyy")}</h2>

      
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600 mb-2">
        {weekdays.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>


      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, idx) => {
          const isCurrentMonth = format(day, "MM") === format(currentDate, "MM");
          const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

          const dayEntries = journalEntries?.filter(
            entry => format(new Date(entry.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          ) || [];

          return (
            <div
              key={idx}
              onClick={() => dayEntries.length && onEntryClick(dayEntries[0])}
              className={`p-2 rounded-lg flex flex-col items-center justify-center cursor-pointer
                ${isToday ? "bg-blue-500 text-white font-bold" : ""}
                ${isCurrentMonth && !isToday ? "hover:bg-cyan-100 text-black" : ""}
                ${!isCurrentMonth ? "text-gray-300" : ""}`}
            >
              <span>{format(day, "d")}</span>

              {dayEntries.map((entry, i) => (
                <span key={i} className="w-2 h-2 bg-cyan-500 rounded-full mt-1" />
              ))}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
