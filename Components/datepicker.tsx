import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function range(startYear: number, endYear: number) {
    const years = []
    for (let year = startYear; year <= endYear; year++) {
        years.push(year)
    }
    return years
}
function getYear(dateString: any) {
    const date = new Date(dateString)
    return date.getFullYear()
}
function getMonth(dateString: any) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    return month;
}
export default function DatePicker({ placeholder, className, alterar, value }: { placeholder: string, className: string, alterar: any, value?: Date }) {
    const [semV, setSemV] = useState(true)
    useEffect(() => {
        setSemV(true)
    }, [])
    const [startDate, setStartDate] = useState<Date>(value ? value : new Date())
    const years = range(1930, (new Date()).getFullYear())
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return (
        <ReactDatePicker
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(Number(value))}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={getMonth(date)}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
            className={className}
            placeholderText={placeholder}
            value={`${(startDate.getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/${startDate.getUTCDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/${startDate.getUTCFullYear().toLocaleString("en-US", { minimumIntegerDigits: 4, useGrouping: false })}`}
            selected={semV ? undefined : startDate}
            onChange={(date) => {
                setSemV(false)
                setStartDate(date!)
                alterar(date!)
            }}
        />
    )
}