import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

function ClockComponent({ timezone }) {
    const [time, setTime] = useState(moment().tz(timezone).format('LTS'));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(moment().tz(timezone).format('LTS'));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timezone]);

    return <div>{time}</div>;
}

export default ClockComponent;