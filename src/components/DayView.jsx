import React, { useState } from "react";
import {
  format,
  isSameDay,
  parse,
  setHours,
  isWithinInterval,
  addDays,
} from "date-fns";
import events from "../data/events.json";
import "./DayView.css";

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);


function DayView() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getEventsForHour = (hour) => {
    return events.filter((event) => {
      const eventDate = parse(event.date, "yyyy-MM-dd", new Date());
      const start = parse(
        `${event.date} ${event.startTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );
      const end = parse(
        `${event.date} ${event.endTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );
      const slotTime = setHours(eventDate, hour);

      return (
        isSameDay(eventDate, selectedDate) &&
        isWithinInterval(slotTime, { start, end })
      );
    });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const goToPreviousDay = () => {
    setSelectedDate((prev) => addDays(prev, -1));
  };

  const goToNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1));
  };

  return (
    <div className="day-view-container fade-in">
      <div className="day-view-controls">
        <button className="nav-btn" onClick={goToPreviousDay}>
          ←
        </button>
        <h2>{format(selectedDate, "EEEE, MMMM d, yyyy")}</h2>
        <button className="nav-btn" onClick={goToNextDay}>
          →
        </button>
        <button className="today-btn" onClick={goToToday}>
          Today
        </button>
      </div>

      <div className="day-schedule">
        {hours.map((hourLabel, hour) => {
          const eventsAtHour = getEventsForHour(hour);
          return (
            <div className="hour-block" key={hour}>
              <div className="hour-label">{hourLabel}</div>
              <div className="hour-events">
                {eventsAtHour.map((event, idx) => (
                  <div className="event-wrapper" key={idx}>
                    <div
                      className="event"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                    </div>
                    <div className="custom-tooltip">
                      {event.title} (
                      {format(
                        parse(
                          `${event.date} ${event.startTime}`,
                          "yyyy-MM-dd HH:mm",
                          new Date()
                        ),
                        "h:mm a"
                      )}
                      –
                      {format(
                        parse(
                          `${event.date} ${event.endTime}`,
                          "yyyy-MM-dd HH:mm",
                          new Date()
                        ),
                        "h:mm a"
                      )}
                      )
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DayView;
