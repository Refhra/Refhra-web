import categories, { Category } from "@/Data/Categories";

type Props = {
  onSelect: (cat: Category) => void;
  onBack: () => void;
};

export default function CategorySelectStep({ onSelect, onBack }: Props) {
  return (
    <div>
      <div className="flex flex-col w-full justify-center text-center">
        <h2 className="text-xl font-bold mb-2">
          Choose Your Starter Category 🧩
        </h2>
        <p className="text-gray-600 mb-6">
          You’ll be able to borrow tasks from other categories later.
        </p>
      </div>

      <div className="grid  grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelect(cat)}
            className="border p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <h3 className="font-semibold mb-4 ">{cat.title}</h3>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 px-4 w-full">
        <div className="">
          <button
            onClick={onBack}
            className="mt-4 text-base font-bold text-gray-500 border border-transparent hover:border-border px-4 py-2 rounded-lg "
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
