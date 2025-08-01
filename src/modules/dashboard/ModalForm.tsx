import { useState, useEffect } from "react";
interface Props<T extends Record<string, any>> {
  onClose: () => void;
  onSave: (data: T) => void;
  initialData: T | null;
}

export default function ModalForm<T extends Record<string, any>>({
  onClose,
  onSave,
  initialData,
}: Props<T>) {
  const [form, setForm] = useState<T>(initialData ?? ({} as T));

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const keys = Object.keys(form);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="p-6 rounded shadow max-w-md mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <h2 className="text-xl mb-4">
          {initialData ? "Edit Item" : "Add Item"}
        </h2>
        {keys.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
            className="space-y-3"
          >
            {keys.map((key) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  {key}
                </label>
                <input
                  name={key}
                  value={form[key] ?? ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
