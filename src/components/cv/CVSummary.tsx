import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadSimple } from '@phosphor-icons/react';

interface CVSummaryProps {
  summary: string;
  onDownload: (e: React.MouseEvent) => void;
}

const CVSummary: React.FC<CVSummaryProps> = ({ summary, onDownload }) => {
  return (
    <Card className="monolith-card relative z-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle style={{ color: 'var(--mono-text)' }}>Professional Summary</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="transition-colors"
          style={{ color: 'var(--mono-primary)', borderColor: 'var(--mono-border)' }}
          onClick={onDownload}
        >
          <DownloadSimple className="mr-2 h-4 w-4" />
          PDF
        </Button>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed" style={{ color: 'var(--mono-muted)' }}>
          {summary || "Experienced developer with a passion for building innovative solutions."}
        </p>
      </CardContent>
    </Card>
  );
};

export default CVSummary;
