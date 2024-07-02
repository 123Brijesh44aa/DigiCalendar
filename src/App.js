import "./app.css";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { useState } from "react";
export default function App() {

    const [selectedMonth, setSelectedMonth] = useState(new Date());

    function getAllDaysInMonth(month, year) {
        const lastDay = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: lastDay }, (_, index) => {
            return index + 1;
        })
    }

    function handleNextMonth() {
        const nextMonth = new Date(selectedMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setSelectedMonth(nextMonth);
    }

    function handlePreviousMonth() {
        const prevMonth = new Date(selectedMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setSelectedMonth(prevMonth);
    }

    function generateTable() {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        const daysInMonth = getAllDaysInMonth(month, year);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const tableData = {
            "Sun": [], "Mon": [], "Tue": [], "Wed": [], "Thu": [], "Fri": [], "Sat": []
        }

        const firstDayOfWeek = new Date(year, month, 1).getDay();
        let emptyCellsBeforeFirstDay = firstDayOfWeek === 0 ? 0 : firstDayOfWeek;
        for (let i = 0; i < emptyCellsBeforeFirstDay; i++) {
            tableData[daysOfWeek[i]].push("");
        }
        console.log(`first day of week is : ${firstDayOfWeek}`);

        console.log(`total days in current month is : ${daysInMonth.length}`);

        daysInMonth.forEach(day => {
            const date = new Date(year, month, Number(day));
            const dayNumber = date.getDay();
            const weekName = daysOfWeek[dayNumber];
            tableData[weekName].push(date.toLocaleString().slice(0, 10));
            // tableData[weekName].push(date.toISOString().slice(0,10));
            // tableData[weekName].push(date.getDate());
            // 0:sun, 1:mon, 2:tue, 3:wed, 4:thu, 5:fri, 6:sat
        });

        return tableData;
    }

    const tableData = generateTable();

    return (
        <div className="app">
            <Top nextMonth={handleNextMonth} prevMonth={handlePreviousMonth} selectedMonth={selectedMonth} />
            <Body tableData={tableData} />
        </div>
    )
}


function Top({ nextMonth, selectedMonth, prevMonth }) {
    return (
        <div className="top">
            <h3>
                <BiSolidLeftArrow className="arrow" cursor="pointer" color="#FF6056FF" size="14px" onClick={prevMonth} />
                {`${selectedMonth.toLocaleString("en-US", { month: "long" })} ${selectedMonth.getFullYear()}`}
                <BiSolidRightArrow className="arrow" cursor="pointer" color="#FF6056FF" size="14px" onClick={nextMonth} />
            </h3>
            <input type="date" className="date" />
            {/* <button className="btn">All Events</button> */}
        </div>
    )
}

function Body({ tableData }) {

    const today = new Date().toLocaleString().slice(0, 10);

    const color = (day, rowIndex, todayColor, todayAndSundayColor, sundayColor, other) => {
        const isSunday = day === "Sun";
        const isToday = tableData[day][rowIndex] === today;
        const isEmptyCell = tableData[day][rowIndex] === null || tableData[day][rowIndex] === undefined || tableData[day][rowIndex] === "";

        if (isSunday && isToday) {
            return todayAndSundayColor; //'#4677ea'; // Blue color for today which is also Sunday
        }
        else if (isToday) {
            return todayColor; //'#4677ea'; // Blue color for today
        }
        else if (isEmptyCell) { // "#3d4553"; // Background color for empty cells
            return "#3d4553"
        }
        else if (isSunday) {
            return sundayColor; //'#fff6f6'; // Background color for Sunday
        }
        else {
            return other; //'#E7E7E7FF'; // Background color for the rest of the days
        }
    };

    return (
        <div className="body">
            <table className="table">
                <tbody>
                    <tr>
                        {
                            Object.keys(tableData).map(day => {
                                return <th key={day}>{day}</th>
                            })
                        }
                    </tr>
                    {
                        [...Array(6)].map((_, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {
                                        Object.keys(tableData).map(day => {
                                            return <td
                                                key={day}
                                                style={{
                                                    color: color(day, rowIndex, "white", "white", "#ffe2e2", "rgb(62,71,86)"), // Red color for Sunday dates
                                                    backgroundColor: color(day, rowIndex, "#8e32ff", "#4677ea", "#ff6056", "#f1f1f1"),
                                                }}>
                                                {
                                                    tableData[day][rowIndex] ? tableData[day][rowIndex].split("/")[1] : ""
                                                }
                                            </td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}


