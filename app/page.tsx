'use client';

import { useState } from 'react';
import { Activity } from 'lucide-react';
import { BrainDetection } from '@/components/BrainDetection';
import { HeartDetection } from '@/components/HeartDetection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyzeStart = () => {
    setAnalyzing(true);
  };

  const handleAnalyzeEnd = () => {
    setAnalyzing(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Medical Diagnostic Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered abnormality detection for brain Ultrasound and heart ultrasound images
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="brain" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="brain">Brain Ultrasound</TabsTrigger>
            <TabsTrigger value="heart">Heart Ultrasound</TabsTrigger>
          </TabsList>

          <TabsContent value="brain" className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-2">Brain Ultrasound Analysis</h2>
              <p className="text-muted-foreground mb-6">
                Upload a brain Ultrasound image to detect potential abnormalities using our AI model.
                The analysis will provide a confidence score and heatmap highlighting areas of concern.
              </p>
              <BrainDetection
                onAnalyzeStart={handleAnalyzeStart}
                onAnalyzeEnd={handleAnalyzeEnd}
              />
            </div>
          </TabsContent>

          <TabsContent value="heart" className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-2">Heart Ultrasound Analysis</h2>
              <p className="text-muted-foreground mb-6">
                Upload a heart ultrasound image to detect potential abnormalities using our AI model.
                The analysis will provide a confidence score and heatmap highlighting areas of concern.
              </p>
              <HeartDetection
                onAnalyzeStart={handleAnalyzeStart}
                onAnalyzeEnd={handleAnalyzeEnd}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Status Indicator */}
        {analyzing && (
          <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg">
            <p className="text-sm font-medium">Analyzing image...</p>
          </div>
        )}
      </div>
    </main>
  );
}
