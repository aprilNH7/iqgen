import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function DateCalendarViews() {
    const [date, setDate] = useState(null);
    const [dateData , setDatedata ] = useState([]);
    
    
    const handleclick = (e) =>{
        const target = e.value
        setDate(target)

    }

    return (
        <div className="calender-wrapper">
            <Calendar className="calender-style" value={date} onChange={handleclick} inline/>
        </div>

    )
}



