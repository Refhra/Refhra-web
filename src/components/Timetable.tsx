'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import { EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    description: string;
  };
}

const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Math Study', start: '2025-05-26T10:00:00', end: '2025-05-26T11:00:00', extendedProps: { description: 'Algebra review' } },
  { id: '2', title: 'Break', start: '2025-05-26T11:00:00', end: '2025-05-26T11:15:00', extendedProps: { description: 'Coffee break' } },
  { id: '3', title: 'CS Study', start: '2025-05-27T14:00:00', end: '2025-05-27T15:30:00', extendedProps: { description: 'Coding practice' } },
];

export default function Timetable() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);

  const handleEventDrop = (info: EventDropArg) => {
    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? { ...event, start: info.event.start?.toISOString() || event.start, end: info.event.end?.toISOString() || event.end }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Weekly Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="md:block hidden">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridWeek"
              events={events}
              editable={true}
              droppable={true}
              eventDrop={handleEventDrop}
              eventContent={(eventInfo) => (
                <Button
                  variant="outline"
                  className="w-full text-left bg-blue-100 hover:bg-blue-200"
                  role="button"
                  aria-label={`Event: ${eventInfo.event.title}, ${eventInfo.event.extendedProps.description}`}
                >
                  {eventInfo.event.title}
                </Button>
              )}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridWeek,dayGridDay,listWeek',
              }}
              aria-describedby="calendar-description"
            />
          </div>
          <div className="md:block">
            <ul className="space-y-2">
              {events.map((event) => ( 
                <li key={event.id}>
                  <Card>
                    <CardContent className="p-4">
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.extendedProps.description}</p>
                      <p className="text-sm">
                        {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <div id="calendar-description" className="sr-only">
            Weekly timetable with draggable events for scheduling tasks.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}