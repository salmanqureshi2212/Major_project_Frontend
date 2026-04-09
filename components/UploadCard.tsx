'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileInput } from './FileInput';
import { Spinner } from '@/components/ui/spinner';

interface UploadCardProps {
  title: string;
  description: string;
  onSubmit: (file: File) => Promise<void>;
  isLoading?: boolean;
  previewUrl?: string;
}

export function UploadCard({
  title,
  description,
  onSubmit,
  isLoading = false,
  previewUrl,
}: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setError(null);
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    try {
      await onSubmit(selectedFile);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {previewUrl && (
          <div className="w-full rounded-lg overflow-hidden bg-muted aspect-video">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <FileInput onFileSelect={handleFileSelect} />

        {selectedFile && !previewUrl && (
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-sm font-medium text-foreground">
              Selected: {selectedFile.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          className="w-full mt-auto"
        >
          {isLoading ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Image'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
