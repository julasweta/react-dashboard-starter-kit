import { useState, useEffect } from "react";
import { Button } from "../Buttons/Button";
import { Input } from "../Inputs/Input";
import classNames from "classnames";
import styles from "./ModalForm.module.scss";

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
    <div className={styles.overlay}>
      <div className={classNames(styles.modal)}>
        <h2 className={styles.title}>
          {initialData ? "Edit Item" : "Add Item"}
        </h2>

        {keys.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
            className={styles.form}
          >
            {keys.map((key) => (
              <Input
                key={key}
                label={key}
                name={key}
                value={form[key] ?? ""}
                onChange={handleChange}
              />
            ))}

            <div className={styles.actions}>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

