'use client';

import { useState } from 'react';
import { UploadCard } from './UploadCard';
import { ResultDisplay } from './ResultDisplay';

interface AnalysisResult {
  class_name: string;
  confidence: number;
  output_url: string;
}

interface HeartDetectionProps {
  onAnalyzeStart?: () => void;
  onAnalyzeEnd?: () => void;
}

export function HeartDetection({ onAnalyzeStart, onAnalyzeEnd }: HeartDetectionProps) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (file: File) => {
    setLoading(true);
    onAnalyzeStart?.();

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/heart_abnormalities', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze heart image');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Heart analysis error:', error);
      throw error;
    } finally {
      setLoading(false);
      onAnalyzeEnd?.();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UploadCard
        title="Heart Ultrasound Upload"
        description="Upload a heart ultrasound image for abnormality detection"
        onSubmit={handleSubmit}
        isLoading={loading}
        previewUrl={result?.output_url}
      />
      <ResultDisplay
        result={result}
        title="Heart Analysis Results"
        loading={loading}
      />
    </div>
  );
}
