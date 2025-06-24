import React, { useState } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import WeekView from "./components/WeekView";
import DayView from "./components/DayView";


function App() {
  const [view, setView] = useState("month"); 

  const renderView = () => {
    switch (view) {
      case "month":
        return <CalendarGrid />;
      case "week":
        return <WeekView />;
      case "day":
        return <DayView />;
      default:
        return <CalendarGrid />;
    }
  };

  return (
    <div>
      <CalendarHeader onViewChange={setView} />
      {renderView()}
    </div>
  );
}

export default App;
