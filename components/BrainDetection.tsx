'use client';

import { useState } from 'react';
import { UploadCard } from './UploadCard';
import { ResultDisplay } from './ResultDisplay';

interface AnalysisResult {
  class_name: string;
  confidence: number;
  output_url: string;
}

interface BrainDetectionProps {
  onAnalyzeStart?: () => void;
  onAnalyzeEnd?: () => void;
}

export function BrainDetection({ onAnalyzeStart, onAnalyzeEnd }: BrainDetectionProps) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (file: File) => {
    setLoading(true);
    onAnalyzeStart?.();

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/brain_abnormalities', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze brain image');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Brain analysis error:', error);
      throw error;
    } finally {
      setLoading(false);
      onAnalyzeEnd?.();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UploadCard
        title="Brain MRI Upload"
        description="Upload a brain MRI image for abnormality detection"
        onSubmit={handleSubmit}
        isLoading={loading}
        previewUrl={result?.output_url}
      />
      <ResultDisplay
        result={result}
        title="Brain Analysis Results"
        loading={loading}
      />
    </div>
  );
}
