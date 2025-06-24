import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import events from "../data/events.json";
import "./CalendarGrid.css";

function CalendarGrid() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button className="nav-btn" onClick={prevMonth}>
          ←
        </button>
        <div className="month-year">{format(currentMonth, "MMMM yyyy")}</div>
        <button className="nav-btn" onClick={nextMonth}>
          →
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day-name" key={i}>
          {dayNames[i]}
        </div>
      );
    }
    return <div className="days-row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const dateStr = format(day, "yyyy-MM-dd");

        const dayEvents = events.filter((event) => event.date === dateStr);

        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
            } ${isSameDay(day, new Date()) ? "today" : ""}`}
            key={day}
          >
            <div className="date-number">{formattedDate}</div>
            <div className="events">
              {dayEvents.map((event, idx) => (
                <div key={idx} className="event-wrapper">
                  <div
                    className="event"
                    style={{ backgroundColor: event.color || "#ffcc00" }}
                  >
                    {event.title}
                  </div>
                  <div className="custom-tooltip">
                    <strong>{event.title}</strong>
                    <br />
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="week-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div className="calendar-grid">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default CalendarGrid;
