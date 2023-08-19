import { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export const useCalendarContext = () => {
    return useContext(CalendarContext);
};

export const CalendarProvider = ({ children }) => {
    const [coordinates, setCoordinates] = useState([1]);

    return (
        <CalendarContext.Provider value={{ coordinates, setCoordinates }}>
            {children}
        </CalendarContext.Provider>
    );
};