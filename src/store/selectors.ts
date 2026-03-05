import { RootState } from "./store";

export const selectAllItems = (state: RootState) => state.schedule.items;

export const selectTasks = (state: RootState) =>
  state.schedule.items.filter((i) => i.type === "task");

export const selectEvents = (state: RootState) =>
  state.schedule.items.filter((i) => i.type === "event");

export const selectItemById = (id: string) => (state: RootState) =>
  state.schedule.items.find((i) => i.id === id);

export const selectTasksGroupedByPriority = (state: RootState) => {
  return {
    high: state.schedule.items.filter((i) => i.type === "task" && i.priority === "high"),
    medium: state.schedule.items.filter((i) => i.type === "task" && i.priority === "medium"),
    low: state.schedule.items.filter((i) => i.type === "task" && i.priority === "low"),
  };
};


export const selectEventsByDate = (date: string) => (state: RootState) =>
  state.schedule.items.filter(
    (i) =>
      i.type === "event" &&
      i.startTime.startsWith(date) // e.g. "2025-11-20"
  );

  export const selectUpcomingDeadlines = (state: RootState) => {
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  return state.schedule.items.filter((i) => {
    if (i.type !== "task") return false;
    const deadline = new Date(i.deadline);
    return deadline >= now && deadline <= nextWeek;
  });
};


// export const selectEventsGroupedByHour = (state: RootState) => {
//   const groups: Record<string, CalendarEvent[]> = {};

//   state.schedule.items.forEach((i) => {
//     if (i.type !== "event") return;

//     const hour = i.startTime.slice(0, 2); // "09" from "09:30"
//     if (!groups[hour]) groups[hour] = [];

//     groups[hour].push(i);
//   });

//   return groups;
// };


export const selectTodayItems = (state: RootState) => {
  const today = new Date().toISOString().split("T")[0];

  return state.schedule.items.filter((i) => {
    if (i.type === "event") {
      return i.startTime.startsWith(today);
    }
    if (i.type === "task") {
      return i.deadline.startsWith(today);
    }
    return false;
  });
};


export const selectHeatmapData = (state: RootState) => {
  const map: Record<string, number> = {};

  state.schedule.items.forEach((i) => {
    const date =
      i.type === "event"
        ? i.startTime.split("T")[0]
        : i.deadline.split("T")[0];

    map[date] = (map[date] || 0) + 1;
  });

  return map;
};
