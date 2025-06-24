import React, { useState } from "react";
import {
  startOfWeek,
  addDays,
  format,
  isSameDay,
  setHours,
  isWithinInterval,
  parse,
  addWeeks,
  subWeeks,
} from "date-fns";
import events from "../data/events.json";
import "./WeekView.css";

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

function WeekView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate);

  const getEventsForSlot = (day, hour) => {
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
        isSameDay(day, eventDate) && isWithinInterval(slotTime, { start, end })
      );
    });
  };

  const goToPreviousWeek = () => {
    setCurrentDate((prev) => subWeeks(prev, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate((prev) => addWeeks(prev, 1));
  };

  return (
    <div className="week-view-container">
      <div className="week-nav">
        <button className="nav-btn left" onClick={goToPreviousWeek}>
          ←
        </button>
        <div className="current-week-label">
          Week of {format(weekStart, "dd MMMM yyyy")}
        </div>
        <button className="nav-btn right" onClick={goToNextWeek}>
          →
        </button>
      </div>

      <div className="week-view">
        <div className="week-header">
          <div className="time-label"></div>
          {[...Array(7)].map((_, i) => {
            const day = addDays(weekStart, i);
            return (
              <div key={i} className="day-column-header">
                {format(day, "EEE dd")}
              </div>
            );
          })}
        </div>

        <div className="week-body">
          {hours.map((hourLabel, hour) => (
            <div className="hour-row" key={hour}>
              <div className="time-label">{hourLabel}</div>
              {[...Array(7)].map((_, i) => {
                const day = addDays(weekStart, i);
                const eventsInSlot = getEventsForSlot(day, hour);
                return (
                  <div key={i} className="hour-cell">
                    {eventsInSlot.map((event, idx) => (
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
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeekView;
