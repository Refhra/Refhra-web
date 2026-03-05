import React from "react";

interface Props {
  // id: number | string;
  color: string;
  startTime: string;
  endTime: string;
  title: string;
}

const TaskCard = ({
  // id,
  color,
  startTime,
  endTime,
  title,
}: Props) => {
  return (
    <div
      className="p-2 rounded-lg text-xs font-medium text-white w-full h-full shadow-sm flex flex-col justify-between"
      style={{ backgroundColor: color }}
    >
      <div className="truncate">{title}</div>
      <div className="text-[10px] opacity-80">
        {startTime} - {endTime}
      </div>
    </div>
  );
};

export default TaskCard;
