import React, { useState } from 'react';
import { Button } from "../../components/ui/Buttons/Button";
import { useThemeStore } from "../../store";
import styles from './Table.module.scss';

interface TableProps<T> {
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (id: string | number) => void; // Змінено тип
  idKey: keyof T;
}

export default function Table<T extends Record<string, any>>({
  data,
  onEdit,
  onDelete,
  idKey,
}: TableProps<T>) {
  const { theme } = useThemeStore();
  const [expandedCell, setExpandedCell] = useState<string | null>(null);

  if (data.length === 0) {
    return <div className={styles.noData}>No data available</div>;
  }

  // Function for safe value rendering with compact preview
  const formatCellValue = (value: any, columnName: string, rowId: string | number): React.ReactNode => {
    const cellId = `${rowId}-${columnName}`;
    const isExpanded = expandedCell === cellId;

    // Handle null and undefined
    if (value === null || value === undefined) return '-';

    // Handle objects
    if (typeof value === 'object' && value !== null) {
      // Special handling for objects with color and type
      if (value.color && value.type) {
        return (
          <span
            style={{ color: value.color }}
            className={styles.coloredText}
          >
            {value.type}
          </span>
        );
      }

      // Handle arrays
      if (Array.isArray(value)) {
        if (isExpanded) {
          return (
            <div
              className={styles.objectContainerExpanded}
              onMouseLeave={() => setExpandedCell(null)}
            >
              <div className={`${styles.badge} ${styles.badgeInfo}`}>
                Array ({value.length} items)
              </div>
              {value.map((item, index) => (
                <div key={index} className={styles.objectProperty}>
                  <span className={styles.propertyKey}>[{index}]:</span>
                  <span className={styles.propertyValue}>
                    {typeof item === 'object' && item !== null ? JSON.stringify(item) : String(item)}
                  </span>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div
            className={styles.objectContainer}
            onMouseEnter={() => setExpandedCell(cellId)}
          >
            <div className={styles.compactPreview}>
              <span className={styles.previewItem}>Array</span>
              <span className={styles.previewItem}>{value.length} items</span>
              <span className={styles.expandIcon}>⌄</span>
            </div>
          </div>
        );
      }

      // Handle dates
      if (value instanceof Date) {
        return (
          <span title={value.toISOString()}>
            {value.toLocaleDateString()}
          </span>
        );
      }

      // General object handling - compact preview with hover expansion
      try {
        const entries = Object.entries(value);

        if (isExpanded) {
          return (
            <div
              className={styles.objectContainerExpanded}
              onMouseLeave={() => setExpandedCell(null)}
            >
              {entries.map(([key, val]) => (
                <div key={key} className={styles.objectProperty}>
                  <span className={styles.propertyKey}>
                    {key}:
                  </span>
                  <span className={styles.propertyValue}>
                    {typeof val === 'object' && val !== null
                      ? JSON.stringify(val)
                      : String(val)
                    }
                  </span>
                </div>
              ))}
            </div>
          );
        }

        // Compact preview - show first few keys
        const previewKeys = entries.slice(0, 3).map(([key]) => key);
        const hasMore = entries.length > 3;

        return (
          <div
            className={styles.objectContainer}
            onMouseEnter={() => setExpandedCell(cellId)}
          >
            <div className={styles.compactPreview}>
              {previewKeys.map((key, index) => (
                <span key={index} className={styles.previewItem}>{key}</span>
              ))}
              {hasMore && <span className={styles.previewItem}>+{entries.length - 3}</span>}
              <span className={styles.expandIcon}>⌄</span>
            </div>
          </div>
        );
      } catch (error) {
        return (
          <span className={`${styles.badge} ${styles.badgeError}`}>
            [Invalid Object]
          </span>
        );
      }
    }

    // Handle boolean values
    if (typeof value === 'boolean') {
      return (
        <span className={value ? styles.badgeSuccess : styles.badgeError}>
          {value ? 'Yes' : 'No'}
        </span>
      );
    }

    // Handle numbers
    if (typeof value === 'number') {
      return value.toLocaleString();
    }

    // Handle strings and other primitives
    const stringValue = String(value);

    // Truncate very long strings with hover tooltip
    if (stringValue.length > 50) {
      if (isExpanded) {
        return (
          <div
            className={styles.objectContainerExpanded}
            onMouseLeave={() => setExpandedCell(null)}
          >
            <div className={styles.propertyValue}>
              {stringValue}
            </div>
          </div>
        );
      }

      return (
        <span
          className={styles.objectContainer}
          onMouseEnter={() => setExpandedCell(cellId)}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.compactPreview}>
            <span className={styles.previewItem}>
              {stringValue.substring(0, 30)}...
            </span>
            <span className={styles.expandIcon}>⌄</span>
          </div>
        </span>
      );
    }

    return stringValue;
  };

  // Get columns
  const getAllColumns = () => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  };

  const columns = getAllColumns();

  // Format column headers
  const formatColumnHeader = (col: string): string => {
    return col
      .charAt(0).toUpperCase() +
      col.slice(1).replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .trim();
  };

  return (
    <div className={`${styles.tableContainer} ${styles[theme]}`}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={styles.headerCell}
              >
                {formatColumnHeader(col)}
              </th>
            ))}
            <th className={styles.actionsHeader}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map((row, index) => {
            const rowIdValue = row[idKey];

            return (
              <tr
                key={rowIdValue as string | number}
                className={styles.tableRow}
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className={styles.tableCell}
                  >
                    {formatCellValue(row[col], col, rowIdValue as string | number)}
                  </td>
                ))}
                <td className={styles.actionsCell}>
                  <div className={styles.actionButtons}>
                    <Button
                      onClick={() => onEdit(row)}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(rowIdValue)} // Прибрано приведення типу
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}