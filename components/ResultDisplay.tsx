'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AbnormalityBadge } from './AbnormalityBadge';

interface AnalysisResult {
  class_name: string;
  confidence: number;
  output_url: string;
}

interface ResultDisplayProps {
  result: AnalysisResult | null;
  title: string;
  loading?: boolean;
}

export function ResultDisplay({ result, title, loading = false }: ResultDisplayProps) {
  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Analyzing image...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 bg-muted animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>No results yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 flex items-center justify-center bg-secondary rounded-lg">
            <p className="text-muted-foreground">Upload an image to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Analysis Results</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Heatmap Image */}
        <div className="w-full rounded-lg overflow-hidden bg-muted">
          <img
            src={result.output_url}
            alt="Analysis heatmap"
            className="w-full h-auto"
          />
        </div>

        {/* Status Badge */}
        <AbnormalityBadge
          status={result.class_name.toLowerCase().includes('abnormal') ? 'abnormal' : 'normal'}
          confidence={result.confidence}
        />

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Confidence Level</span>
            <span className="text-muted-foreground">{(result.confidence * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Classification */}
        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs font-medium text-muted-foreground uppercase">Classification</p>
          <p className="text-lg font-semibold text-foreground mt-1">
            {result.class_name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
