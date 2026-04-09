'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface AbnormalityBadgeProps {
  status: 'normal' | 'abnormal';
  confidence: number;
}

export function AbnormalityBadge({ status, confidence }: AbnormalityBadgeProps) {
  const isNormal = status === 'normal';

  return (
    <div className="flex items-center gap-2">
      {isNormal ? (
        <>
          <CheckCircle2 className="w-5 h-5 text-success" />
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            Normal
          </Badge>
        </>
      ) : (
        <>
          <AlertCircle className="w-5 h-5 text-destructive" />
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            Abnormal
          </Badge>
        </>
      )}
      <span className="text-sm font-medium text-muted-foreground">
        {(confidence * 100).toFixed(1)}% confidence
      </span>
    </div>
  );
}
