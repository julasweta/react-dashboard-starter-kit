import { useRef, useState } from "react";
import styles from "./FileUpload.module.scss";
import { Button } from "../Buttons/Button";
import { Input } from "../Inputs/Input";

interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
  onFilesSelected: (files: File[]) => void;
}

export const FileUpload = ({
  multiple = false,
  accept = "*",
  maxSizeMB = 5,
  onFilesSelected,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const validFiles = Array.from(files).filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );

    setSelectedFiles((prevFiles) => {
      if (multiple) {
        const newFiles = [...prevFiles];
        validFiles.forEach((file) => {
          if (!newFiles.some(f => f.name === file.name && f.size === file.size)) {
            newFiles.push(file);
          }
        });
        onFilesSelected(newFiles);
        return newFiles;
      } else {
        onFilesSelected(validFiles);
        return validFiles;
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      onFilesSelected(newFiles);
      return newFiles;
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append("files", file);
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Файли успішно завантажені!");
      setSelectedFiles([]);
      onFilesSelected([]);
    } catch (error) {
      alert("Помилка при завантаженні файлів");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <div
        className={`${styles.uploadWrapper} ${dragActive ? styles.dragActive : ""}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onClick={handleBrowseClick}
      >
        <Input
          type="file"
          ref={fileInputRef}
          className={styles.hiddenInput}
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className={styles.text}>
          {multiple
            ? "Drag & drop files or click to upload"
            : "Drag & drop a file or click to upload"}
        </p>
        <span className={styles.subtext}>Max size: {maxSizeMB}MB</span>
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles.filesAndButtonWrapper}>
          <ul className={styles.fileList}>
            {selectedFiles.map((file, index) => (
              <li key={file.name + index} className={styles.fileItem}>
                📄 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveFile(index)}
                  disabled={isUploading}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      )}
    </div>
  );
};
