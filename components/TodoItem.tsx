interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-4 h-4"
        />
        <span className={completed ? "line-through text-gray-500" : ""}>
          #{id} - {text}
        </span>
      </div>
      <button
        onClick={() => {
          if (confirm("Bu görevi silmek istediğine emin misin?")) {
            onDelete(id);
          }
        }}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Sil
      </button>
    </div>
  );
}
