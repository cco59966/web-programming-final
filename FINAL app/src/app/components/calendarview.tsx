'use client'

import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'

type EventType = {
  title: string
  start: string
  end: string
}

export default function CalendarView() {
  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {
    fetch('/api/calendar-events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching calendar events:', err))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Headset Checkout Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  )
}
