import React, { useState, useEffect } from "react";
import "./CalendarHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCalendarWeek,
  faCalendarDay,
  faCalendar,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

function CalendarHeader({ onViewChange }) {
  const [showOptions, setShowOptions] = useState(false);
  const [rotatingWord, setRotatingWord] = useState("Victories");

  const words = ["Victories", "Business", "Schedule", "Travels"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingWord((prev) => {
        const currentIndex = words.indexOf(prev);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2000); // change word every 2 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleOptionClick = (view) => {
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
            <FontAwesomeIcon icon={faCalendarDays} />
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
                <FontAwesomeIcon icon={faCalendarWeek} />
                <span>Week</span>
              </div>
              <div className="option" onClick={() => handleOptionClick("day")}>
                <FontAwesomeIcon icon={faCalendarDay} />
                <span>Day</span>
              </div>
              {/* <div
                className="option"
                onClick={() => handleOptionClick("event")}
              >
                <FontAwesomeIcon icon={faListAlt} />
                <span>Event</span>
              </div> */}
            </div>
          )}
        </div>

        <h3 className="persistent-tooltip">Click This Icon To Change Calendar View</h3>
      </div>
    </div>
  );
}

export default CalendarHeader;
