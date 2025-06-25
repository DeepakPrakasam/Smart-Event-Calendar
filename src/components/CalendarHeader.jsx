import React, { useState, useEffect } from "react";
import "./CalendarHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCalendarWeek,
  faCalendarDay,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

function CalendarHeader({ onViewChange }) {
  const [showOptions, setShowOptions] = useState(false);
  const [rotatingWord, setRotatingWord] = useState("Victories");
  const [selectedView, setSelectedView] = useState("Month"); // Default view

  const words = ["Victories", "Business", "Schedule", "Travels"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingWord((prev) => {
        const currentIndex = words.indexOf(prev);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleOptionClick = (view) => {
    const capitalizedView = view.charAt(0).toUpperCase() + view.slice(1);
    setSelectedView(capitalizedView);
    onViewChange(view);
    setShowOptions(false);
  };

  return (
    <div className="header">
      <h1>Calendar</h1>
      <h2>
        Plan Your <span className="highlight">{rotatingWord}</span>
      </h2>
      <p>{format(new Date(), "dd MMMM yyyy")}</p>

      <div className="add-event">
        <div className="calendar-dropdown-container">
          <div className="calendaricon" onClick={toggleOptions}>
            <FontAwesomeIcon icon={faCalendarDays} /> {selectedView}
          </div>

          {showOptions && (
            <div className="calendar-options">
              <div
                className="option"
                onClick={() => handleOptionClick("month")}
              >
                <FontAwesomeIcon icon={faCalendar} />
                <span>Month</span>
              </div>
              <div className="option" onClick={() => handleOptionClick("week")}>
                <FontAwesomeIcon icon={faCalendarWeek}/>
                <span>Week</span>
              </div>
              <div className="option" onClick={() => handleOptionClick("day")}>
                <FontAwesomeIcon icon={faCalendarDay}/>
                <span>Day</span>
              </div>
            </div>
          )}
        </div>

        <h3 className="persistent-tooltip">START YOUR DAY ON A POSITIVE NOTE</h3>
      </div>
    </div>
  );
}

export default CalendarHeader;
