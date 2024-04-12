import { useState } from "react";
import styles from "../styles/Calendar.module.css";

const Calendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const generateDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const esLocale = {
    weekdays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    months: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.dates}>
        {generateDates().map((date) => {
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === date.getDate() &&
            selectedDate.getMonth() === date.getMonth() &&
            selectedDate.getFullYear() === date.getFullYear();
          return (
            <div
              key={date.toISOString()}
              className={`${styles.date} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <span className={styles.day}>
                {date.toLocaleDateString("es-ES", { weekday: "short" })}
              </span>
              <span className={styles.date}>{date.getDate()}</span>
              <span className={styles.month}>
                {date.toLocaleDateString("es-ES", { month: "short" })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
