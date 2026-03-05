"use client";

import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import type { EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import timelinePlugin from "@fullcalendar/timeline";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons

interface CalendarEvent {
  id: string;
  title: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  location?: string;
  color?: string;
  rrule?: Record<string, unknown>;
  extendedProps: {
    description?: string;
    notification?: string;
  };
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Math Study",
    start: "2025-05-26T10:00:00",
    end: "2025-05-26T11:00:00",
    color: "#2563eb",
    location: "Library",
    extendedProps: {
      description: "Algebra review",
      notification: "10m before",
    },
  },
];

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [view, setView] = useState("dayGridMonth");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({});
  const calendarRef = useRef<FullCalendar | null>(null);

  const handleEventDrop = (info: EventDropArg) => {
    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? {
            ...event,
            start: info.event.start?.toISOString() || event.start,
            end: info.event.end?.toISOString() || event.end,
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleViewChange = (newView: string) => {
    setView(newView);
    calendarRef.current?.getApi().changeView(newView);
  };

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
  };
  const handleNext = () => {
    calendarRef.current?.getApi().next();
  };
  const handleToday = () => {
    calendarRef.current?.getApi().today();
  };

  const openModal = (dateStr?: string) => {
    setNewEvent({
      id: String(Date.now()),
      title: "",
      start: dateStr || new Date().toISOString(),
      end: new Date(
        new Date(dateStr || Date.now()).getTime() + 60 * 60 * 1000
      ).toISOString(),
      color: "#2563eb",
      allDay: false,
      extendedProps: { description: "", notification: "10m before" },
    });
    setIsModalOpen(true);
  };

  const saveEvent = () => {
    if (newEvent.title) {
      setEvents([...events, newEvent as CalendarEvent]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-6 bg-white ">
      {/* 🔥 Header - Google Calendar style */}
      <div className="flex justify-between items-center mb-4">
        {/* Left side: Today + arrows + Month/Year */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToday}
            className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
          >
            Today
          </button>
          <button
            onClick={handlePrev}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold ml-2">
            {calendarRef.current?.getApi().view.title || "Calendar"}
          </h2>
        </div>

        <div className="flex gap-6 flex-row">
          {/* Center: View selector */}
          <select
            value={view}
            onChange={(e) => handleViewChange(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm text-sm bg-white"
          >
            <option value="dayGridMonth">Month</option>
            <option value="timeGridWeek">Week</option>
            <option value="timeGridDay">Day</option>
            <option value="listWeek">Agenda (Week)</option>
            <option value="timelineDay">Timeline (Day)</option>
            <option value="timelineWeek">Timeline (Week)</option>
            <option value="timelineMonth">Timeline (Month)</option>
          </select>

          {/* Right side: Add button */}
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add
          </button>
        </div>
      </div>
      {/* Calendar */}
      <FullCalendar
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          rrulePlugin,
          timelinePlugin,
        ]}
        initialView={view}
        events={events}
        editable
        droppable
        eventDrop={handleEventDrop}
        headerToolbar={false} // ❌ disable built-in header
        dateClick={(info) => openModal(info.dateStr)}
        height="85vh"
        allDaySlot={false}
        // slotDuration="01:00:00"
        eventContent={(eventInfo) => (
          <div
            className="px-2 py-1 text-xs sm:text-sm rounded-md"
            style={{ backgroundColor: eventInfo.event.backgroundColor }}
          >
            <p className="font-medium">{eventInfo.event.title}</p>
            {eventInfo.event.extendedProps.description && (
              <p className="text-[11px] opacity-70">
                {eventInfo.event.extendedProps.description}
              </p>
            )}
          </div>
        )}
        views={{
          timeGridWeek: {
            dayHeaderContent: (args) => {
              const date = args.date;
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              }); // Sunday
              const dayNum = date.getDate(); // 10
              return {
                html: `
            <div class="flex flex-col pt-2  gap-6 items-center">
              <span class=" text-sm font-medium">${dayName}</span>
              <span class="text-2xl font-normal text-black">${dayNum}</span>
            </div>
          `,
              };
            },
          },
        }}
      />
      {/* Modal — same as before... */}
      {/* (Keeping it unchanged for now) */}
      {/* Modal */}{" "}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          {" "}
          <div className="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4">
            {" "}
            <h3 className="text-lg font-semibold mb-2">Add Event</h3>{" "}
            {/* Title */}{" "}
            <input
              type="text"
              placeholder="Add title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            />{" "}
            {/* Location */}{" "}
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            />{" "}
            {/* Date & Time */}{" "}
            <div className="flex gap-3">
              {" "}
              <input
                type="datetime-local"
                value={newEvent.start?.slice(0, 16)}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e.target.value })
                }
                className="flex-1 border rounded-md px-3 py-2"
              />{" "}
              <input
                type="datetime-local"
                value={newEvent.end?.slice(0, 16)}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: e.target.value })
                }
                className="flex-1 border rounded-md px-3 py-2"
              />{" "}
            </div>{" "}
            {/* All Day */}{" "}
            <label className="flex items-center gap-2">
              {" "}
              <input
                type="checkbox"
                checked={newEvent.allDay || false}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, allDay: e.target.checked })
                }
              />{" "}
              All Day{" "}
            </label>{" "}
            {/* Repeat */}{" "}
            <select
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  rrule:
                    e.target.value !== "none"
                      ? {
                          freq: e.target.value.toUpperCase(),
                          dtstart: newEvent.start,
                          until: newEvent.end,
                        }
                      : undefined,
                })
              }
              className="w-full border rounded-md px-3 py-2"
            >
              {" "}
              <option value="none">Does not repeat</option>{" "}
              <option value="daily">Daily</option>{" "}
              <option value="weekly">Weekly</option>{" "}
              <option value="monthly">Monthly</option>{" "}
              <option value="yearly">Yearly</option>{" "}
            </select>{" "}
            {/* Notifications */}{" "}
            <select
              value={newEvent.extendedProps?.notification}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  extendedProps: {
                    ...newEvent.extendedProps,
                    notification: e.target.value,
                  },
                })
              }
              className="w-full border rounded-md px-3 py-2"
            >
              {" "}
              <option>10m before</option> <option>30m before</option>{" "}
              <option>1h before</option> <option>1 day before</option>{" "}
              <option>None</option>{" "}
            </select>{" "}
            {/* Color */}{" "}
            <div className="flex items-center gap-2">
              {" "}
              <label>Event color:</label>{" "}
              <input
                type="color"
                value={newEvent.color}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, color: e.target.value })
                }
              />{" "}
            </div>{" "}
            {/* Description */}{" "}
            <textarea
              placeholder="Add description"
              value={newEvent.extendedProps?.description || ""}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  extendedProps: {
                    ...newEvent.extendedProps,
                    description: e.target.value,
                  },
                })
              }
              className="w-full border rounded-md px-3 py-2"
            />{" "}
            {/* Buttons */}{" "}
            <div className="flex gap-3">
              {" "}
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border rounded-md py-2 hover:bg-gray-100"
              >
                {" "}
                Cancel{" "}
              </button>{" "}
              <button
                onClick={saveEvent}
                className="flex-1 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
              >
                {" "}
                Save{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
