'use client';

import { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileInputProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
}

export function FileInput({
  onFileSelect,
  accept = 'image/*',
  label = 'Select Medical Image',
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className="relative w-full border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary hover:bg-secondary"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{label}</p>
            <p className="text-sm text-muted-foreground">
              Drag and drop your image here or click to browse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
