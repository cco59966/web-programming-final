'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';

// This is the type for the event data
type Event = {
  title: string;
  start: string;
  end: string;
};


// This is how we implement the calendar view function for the checkout page
export default function CalendarView() {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetches the events from the server
  useEffect(() => {
    fetch('/api/calendar-events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  // Creates the calendar
  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Headset Checkout Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}
