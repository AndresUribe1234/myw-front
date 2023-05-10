import React, { useState, useEffect } from "react";
import moment from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import classes from "./../../styles/Calendar.module.scss";
require("moment/locale/es");

function Calendar(props) {
  const [currentDate, setCurrentDate] = useState(moment());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const calculateCalendar = () => {
      // Day index a month starts with. Example:Sunday=0,monday=1, tuesday=2,etc.
      const beginningOfMonthDayIndex = currentDate.startOf("month").day();

      // Calendar array consisting of 6 possible weeks a month can have
      let calendar = Array.from({ length: 6 }, () => ({
        valueHtmlCalendar: [],
        dateValueSecondsFromUTC: [],
      }));

      // Populate first week with empty spaces until first day of month (a month can start on a Tuesday).
      for (let i = 0; i < beginningOfMonthDayIndex; i++) {
        calendar[0].valueHtmlCalendar.push("");
        calendar[0].dateValueSecondsFromUTC.push("");
      }

      // Get number of days in a month in order to populate array with corresponding data
      const daysInMonth = currentDate.daysInMonth();
      let weekCounter = 0;
      // Make a copy of current date in order to avoid changing unintentionally
      let currentDateCounter = currentDate.clone();

      // Iterate over all days of month in order to populate calendar array with information needed
      for (let i = 1; i <= daysInMonth; i++) {
        calendar[weekCounter].valueHtmlCalendar.push(i);
        calendar[weekCounter].dateValueSecondsFromUTC.push(
          new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
        );

        // Once day index reaches end of week jump to next week
        if (currentDateCounter.day() === 6) {
          weekCounter = weekCounter + 1;
        }
        // Add day to calendar day counter
        currentDateCounter.add(1, "d");
      }
      // Return calendar object as value
      return calendar;
    };

    setCalendar(calculateCalendar());
  }, [currentDate]);

  const calendarHandler = (typeOfOperation, unit) => {
    setCurrentDate((prevDate) =>
      typeOfOperation === "add"
        ? moment(prevDate).add(1, unit)
        : moment(prevDate).subtract(1, unit)
    );
  };

  const tableDateFunctionalityHTML = (
    <div className={classes["change-date-container"]}>
      <div className={classes["change-date-btn-container"]}>
        <div
          className={classes["change-date-btn"]}
          onClick={calendarHandler.bind(this, "subtract", "year")}
        >
          <KeyboardDoubleArrowLeftIcon />
        </div>
        <div
          className={classes["change-date-btn"]}
          onClick={calendarHandler.bind(this, "subtract", "month")}
        >
          <KeyboardArrowLeftIcon />
        </div>
      </div>
      <h2 className={classes["current-date"]}>
        {currentDate.locale("es").format("MMMM YYYY")}
      </h2>
      <div className={classes["change-date-btn-container"]}>
        <div
          className={classes["change-date-btn"]}
          onClick={calendarHandler.bind(this, "add", "month")}
        >
          <KeyboardArrowRightIcon />
        </div>
        <div
          className={classes["change-date-btn"]}
          onClick={calendarHandler.bind(this, "add", "year")}
        >
          <KeyboardDoubleArrowRightIcon />
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes["calendar-container"]}>
      {tableDateFunctionalityHTML}
      <div className={classes.calendar_table_container}>
        <div className={classes.row_container}>
          <div className={classes.row_cell}>Dom</div>
          <div className={classes.row_cell}>Lun</div>
          <div className={classes.row_cell}>Mar</div>
          <div className={classes.row_cell}>Mie</div>
          <div className={classes.row_cell}>Jue</div>
          <div className={classes.row_cell}>Vie</div>
          <div className={classes.row_cell}>Sab</div>
        </div>

        <div className={classes.calendar_body}>
          {calendar.map((ele, index) => {
            //Declare empty body of tr tag
            const rowsBody = [];
            //Loop through all data of correspodning week. "In" returns index in for loop. "Of" returns value in for loop.
            for (let day of ele.valueHtmlCalendar) {
              //   Add html value for each day in order to construct array od <td/> tags that will build <tr/> tag
              rowsBody.push(
                <div
                  key={day}
                  data-week={index + 1}
                  data-day={day}
                  className={classes.row_cell}
                >
                  <div>{day}</div>
                </div>
              );
            }
            // Return one table row for each week of the calendar array
            return (
              <div
                data-week={index + 1}
                key={index}
                className={classes.row_container}
              >
                {rowsBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
