import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import React from "react";
import { ScheduleTask } from "@/components/types/Schedule";

interface Props extends ScheduleTask {
  setSelectedTask: React.Dispatch<React.SetStateAction<ScheduleTask | null>>;
  onEdit: (task: ScheduleTask) => void;
}

const TaskOverview = ({
  id,
  date,
  color,
  startTime,
  endTime,
  title,
  description = "This task involves reviewing key deliverables and ensuring alignment with design and engineering goals.",
  priority,
  setSelectedTask,
  onEdit,
}: Props) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[380px] rounded-2xl shadow-xl p-6 relative animate-fadeIn flex flex-col"
    >
      {/* Edit Icon */}
      <button
        onClick={() =>
          onEdit({ id, date, title, description, priority, startTime, endTime, color })
        }
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <Edit2 className="w-5 h-5" />
      </button>

      <div
        className="w-14 h-1.5 rounded-full mx-auto mb-3"
        style={{ backgroundColor: color }}
      />

      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">
        {startTime} - {endTime} | {date}
      </p>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Priority</h3>
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            priority === "High"
              ? "bg-red-100 text-red-700"
              : priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {priority}
        </span>
      </div>

      <Button
        className="mt-auto bg-blue-500 text-white w-full hover:bg-blue-600"
        onClick={() => setSelectedTask(null)}
      >
        Close
      </Button>
    </div>
  );
};

export default TaskOverview;
