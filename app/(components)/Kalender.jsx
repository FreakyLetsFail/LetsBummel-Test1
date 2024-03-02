import React, { useState, useEffect, useMemo } from 'react';
import {Spacer} from "@nextui-org/react";


const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const Kalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [termine, setTermine] = useState([]);
  const [selectedTermine, setSelectedTermine] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/Kalender/read')
      .then(response => response.json())
      .then(data => setTermine(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, [currentDate]);

  const daysInMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), [currentDate]);
  const firstDayOfMonth = useMemo(() => {
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, [currentDate]);

  const calendarDays = useMemo(() => {
    const emptyDays = Array(firstDayOfMonth).fill(null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...emptyDays, ...monthDays];
  }, [firstDayOfMonth, daysInMonth]);

  // Funktion, um zu überprüfen, ob ein Tag Termine hat
  const hasTermine = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return termine.some(termin => termin.StartDatum.split('T')[0] === selectedDate);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    const termineForDay = termine.filter(termin => termin.StartDatum.split('T')[0] === selectedDate);
    setSelectedTermine(termineForDay);
  };

  const changeMonth = (delta) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <div className="container mx-auto p-4">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <button onClick={() => changeMonth(-1)} className="px-4 py-2 m-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow">Vorheriger Monat</button>
      <div>
        <span className="px-4 py-2 m-1 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow">{currentDate.toLocaleString('de', { month: 'long' })}</span>
        <span className="px-4 py-2 m-1 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow">{currentDate.getFullYear()}</span>
      </div>
      <button onClick={() => changeMonth(1)} className="px-4 py-2 m-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow">Nächster Monat</button>
    </div>

    <div className="grid grid-cols-7 gap-2 mb-4">
      {daysOfWeek.map(day => <div key={day} className="text-center font-bold">{day}</div>)}
    </div>


      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className={`p-4 rounded-lg ${day ? 'bg-white shadow cursor-pointer' : 'opacity-0'} ${isToday(day) ? 'bg-gray-100 text-blue-600' : ''} ${hasTermine(day) ? 'text-orange-500 font-bold' : ''}`} onClick={() => day && handleDayClick(day)}>
            {day || ''}
          </div>
        ))}
      </div>

      {/* Termindetails */}
      {selectedTermine.length > 0 && (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold">Termine am ausgewählten Tag:</h2>
          {selectedTermine.map((termin, index) => (
            <div key={index} className="mt-2">
             <p className="font-semibold">{termin.Veranstalltung}:</p>
             <p>{new Date(termin.StartDatum).toLocaleTimeString('de-DE')} - {new Date(termin.EndDatum).toLocaleTimeString('de-DE')}</p>
             <p>Beschreibung: {termin.Beschreibung}</p>
             <p>Ort: {termin.Ort}</p>
             {/* Fügt eine Trennlinie nach jedem Termin ein, außer nach dem letzten */}
             {index < selectedTermine.length - 1 && <hr className="my-4" />}
            </div>
))}
        </div>
      )}
    </div>
  );
};

export default Kalender;
