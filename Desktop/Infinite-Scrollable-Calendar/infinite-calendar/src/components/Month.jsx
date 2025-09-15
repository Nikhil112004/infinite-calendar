import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

function Month({ month, year }) {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white">
      {/* Month Title */}
      <h2 className="text-lg font-bold mb-2 text-center">
        {format(start, "MMMM yyyy")}
      </h2>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-sm font-semibold text-gray-500">
            {d}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className="p-2 border rounded-lg hover:bg-blue-100 cursor-pointer"
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Month;
