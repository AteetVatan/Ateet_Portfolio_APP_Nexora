import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * MermaidDiagram — renders Mermaid diagrams with Monolith theming
 */
interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const { isDark } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      themeVariables: isDark
        ? {
          darkMode: true,
          primaryColor: '#FF4D00',
          primaryTextColor: '#E5E5E5',
          primaryBorderColor: 'rgba(245, 240, 235, 0.08)',
          lineColor: '#8B8680',
          secondaryColor: '#1A1A1A',
          tertiaryColor: '#222',
          background: '#111',
          mainBkg: '#1A1A1A',
          nodeBorder: 'rgba(245, 240, 235, 0.15)',
          clusterBkg: '#1A1A1A',
          clusterBorder: 'rgba(245, 240, 235, 0.08)',
          titleColor: '#E5E5E5',
          edgeLabelBackground: '#1A1A1A',
          nodeTextColor: '#E5E5E5',
          actorTextColor: '#E5E5E5',
          actorBorder: 'rgba(245, 240, 235, 0.15)',
          actorBkg: '#1A1A1A',
          actorLineColor: '#8B8680',
          signalColor: '#E5E5E5',
          signalTextColor: '#E5E5E5',
          labelBoxBkgColor: '#1A1A1A',
          labelBoxBorderColor: 'rgba(245, 240, 235, 0.08)',
          labelTextColor: '#E5E5E5',
          loopTextColor: '#E5E5E5',
          noteBkgColor: '#222',
          noteTextColor: '#E5E5E5',
          noteBorderColor: 'rgba(245, 240, 235, 0.08)',
          sectionBkgColor: '#1A1A1A',
          altSectionBkgColor: '#222',
          sectionBkgColor2: '#1A1A1A',
          taskBorderColor: '#FF4D00',
          taskBkgColor: '#FF4D00',
          taskTextColor: '#fff',
          taskTextLightColor: '#E5E5E5',
          activeTaskBorderColor: '#E64400',
          activeTaskBkgColor: '#E64400',
          gridColor: 'rgba(245, 240, 235, 0.08)',
          doneTaskBkgColor: '#333',
          doneTaskBorderColor: '#666',
          critBorderColor: '#EF4444',
          critBkgColor: '#7F1D1D',
          todayLineColor: '#FF4D00',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '13px',
        }
        : {
          darkMode: false,
          primaryColor: '#FF4D00',
          primaryTextColor: '#1A1A1A',
          primaryBorderColor: 'rgba(26, 26, 26, 0.08)',
          lineColor: '#8B8680',
          secondaryColor: '#F5F0EB',
          tertiaryColor: '#FFF',
          background: '#F5F0EB',
          mainBkg: '#FFF',
          nodeBorder: 'rgba(26, 26, 26, 0.15)',
          clusterBkg: '#FFF',
          clusterBorder: 'rgba(26, 26, 26, 0.08)',
          titleColor: '#1A1A1A',
          edgeLabelBackground: '#FFF',
          nodeTextColor: '#1A1A1A',
          actorTextColor: '#1A1A1A',
          actorBorder: 'rgba(26, 26, 26, 0.15)',
          actorBkg: '#FFF',
          actorLineColor: '#8B8680',
          signalColor: '#1A1A1A',
          signalTextColor: '#1A1A1A',
          labelBoxBkgColor: '#FFF',
          labelBoxBorderColor: 'rgba(26, 26, 26, 0.08)',
          labelTextColor: '#1A1A1A',
          loopTextColor: '#1A1A1A',
          noteBkgColor: '#F5F0EB',
          noteTextColor: '#1A1A1A',
          noteBorderColor: 'rgba(26, 26, 26, 0.08)',
          sectionBkgColor: '#FFF',
          altSectionBkgColor: '#F5F0EB',
          sectionBkgColor2: '#FFF',
          taskBorderColor: '#FF4D00',
          taskBkgColor: '#FF4D00',
          taskTextColor: '#fff',
          taskTextLightColor: '#1A1A1A',
          activeTaskBorderColor: '#E64400',
          activeTaskBkgColor: '#E64400',
          gridColor: 'rgba(26, 26, 26, 0.08)',
          doneTaskBkgColor: '#ddd',
          doneTaskBorderColor: '#aaa',
          critBorderColor: '#EF4444',
          critBkgColor: '#FEE2E2',
          todayLineColor: '#FF4D00',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '13px',
        },
    });

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvgContent(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart, isDark]);

  if (error) {
    return (
      <div
        className="p-4 rounded text-sm my-4"
        style={{ background: 'var(--mono-surface)', color: 'var(--mono-muted)', border: '1px solid var(--mono-border)' }}
      >
        ⚠️ {error}
      </div>
    );
  }

  return (
    <>
      {/* Inline diagram */}
      <div className="relative my-6 group">
        <div
          ref={containerRef}
          className="overflow-x-auto p-4 rounded"
          style={{ background: 'var(--mono-surface)', border: '1px solid var(--mono-border)' }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {/* Expand button */}
        <button
          className="mermaid-expand-btn absolute top-2 right-2 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          style={{ background: 'var(--mono-surface)', border: '1px solid var(--mono-border)', color: 'var(--mono-text)' }}
          onClick={() => setIsExpanded(true)}
          title="Expand diagram"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="mermaid-expanded-container relative w-full h-full max-w-[90vw] max-h-[90vh] overflow-auto p-6 rounded"
            style={{ background: 'var(--mono-surface)', border: '1px solid var(--mono-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded transition-colors cursor-pointer z-10"
              style={{ background: 'var(--mono-surface)', border: '1px solid var(--mono-border)', color: 'var(--mono-text)' }}
              onClick={() => setIsExpanded(false)}
              title="Close expanded view"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <div dangerouslySetInnerHTML={{ __html: svgContent }} />
          </div>
        </div>
      )}
    </>
  );
};

export default MermaidDiagram;
