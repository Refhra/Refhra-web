import { Category } from "@/Data/Categories";
import { useState } from "react";

type Props = {
  selectedCategory: Category;
  onNext: (payload: { tasks: string[] }) => void;
  onBack: () => void;
};

export default function CategoryTasksStep({
  selectedCategory,
  onNext,
  onBack,
}: Props) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const toggleTask = (task: string) => {
    setSelectedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{selectedCategory.title}</h2>
      <p className="text-gray-600 mb-4">{selectedCategory.description}</p>

      <div className="flex flex-col gap-2">
        {selectedCategory.sampleTasks.map((task) => (
          <label
            key={task}
            className="flex items-center gap-2 border rounded-lg p-2"
          >
            <input
              type="checkbox"
              checked={selectedTasks.includes(task)}
              onChange={() => toggleTask(task)}
            />
            {task}
          </label>
        ))}
      </div>

      <div className="absolute bottom-8 right-0 px-4 w-full">
        <div className="mt-4 flex justify-between">
          <button onClick={onBack} className="text-gray-500">
            ← Back
          </button>
          <button
            onClick={() => onNext({ tasks: selectedTasks })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
