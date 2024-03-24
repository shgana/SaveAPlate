import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({ onDateChange }) {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={value}
                onClickDay={(value) => onDateChange(value)}
            />
        </div>
    );
}

export default CalendarComponent;