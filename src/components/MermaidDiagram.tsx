import React, { useCallback, useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, Minimize2 } from 'lucide-react';

// Initialize mermaid with dark theme matching the portfolio aesthetic
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    primaryColor: '#1291c7',
    primaryTextColor: '#e0f0ff',
    primaryBorderColor: '#1e3a4a',
    lineColor: '#4dabce',
    secondaryColor: '#0c1824',
    tertiaryColor: '#0a1628',
    background: '#0a1628',
    mainBkg: '#0c1824',
    nodeBorder: '#1e3a4a',
    clusterBkg: '#0c1824',
    clusterBorder: '#1e3a4a',
    titleColor: '#00c3ff',
    edgeLabelBackground: '#0c1824',
    nodeTextColor: '#e0f0ff',
    actorTextColor: '#e0f0ff',
    actorLineColor: '#4dabce',
    signalColor: '#4dabce',
    signalTextColor: '#e0f0ff',
    labelBoxBkgColor: '#0c1824',
    labelBoxBorderColor: '#1e3a4a',
    labelTextColor: '#e0f0ff',
    loopTextColor: '#85a5b3',
    noteBkgColor: '#122a3a',
    noteTextColor: '#a9c2d1',
    noteBorderColor: '#1e3a4a',
  },
  fontFamily: 'monospace',
  fontSize: 14,
});

interface MermaidDiagramProps {
  chart: string;
}

let diagramCounter = 0;

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const id = `mermaid-diagram-${Date.now()}-${diagramCounter++}`;
        const { svg } = await mermaid.render(id, chart.trim());
        setSvgContent(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
        // Clean up any leftover error elements mermaid may have injected
        const errorEl = document.getElementById(`d${diagramCounter - 1}`);
        if (errorEl) errorEl.remove();
      }
    };

    renderDiagram();
  }, [chart]);

  // Close on Escape key
  useEffect(() => {
    if (!expanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while expanded
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [expanded]);

  const toggleExpand = useCallback(() => setExpanded(prev => !prev), []);

  if (error) {
    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1rem 1.25rem',
          background: 'rgba(255, 62, 62, 0.08)',
          border: '1px solid rgba(255, 62, 62, 0.25)',
          borderRadius: '0.75rem',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          color: '#ff6b6b',
        }}
      >
        <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#ff3e3e' }}>
          ⚠ Diagram render error
        </div>
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: '#a9c2d1',
          }}
        >
          {chart}
        </pre>
      </div>
    );
  }

  // Shared button style
  const btnStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(77, 171, 206, 0.35)',
    background: 'rgba(12, 24, 36, 0.85)',
    color: '#4dabce',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease',
    zIndex: 10,
  };

  // ----- Full-screen overlay -----
  if (expanded) {
    return (
      <div
        onClick={toggleExpand}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(5, 10, 20, 0.88)',
          backdropFilter: 'blur(12px)',
          padding: '2rem',
        }}
      >
        {/* Minimize button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
          style={{ ...btnStyle, top: '1.5rem', right: '1.5rem' }}
          title="Minimize diagram"
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(18, 145, 199, 0.25)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#00c3ff';
            (e.currentTarget as HTMLButtonElement).style.color = '#00c3ff';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 12px rgba(0, 195, 255, 0.25)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(12, 24, 36, 0.85)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(77, 171, 206, 0.35)';
            (e.currentTarget as HTMLButtonElement).style.color = '#4dabce';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          <Minimize2 size={16} />
        </button>

        {/* Expanded diagram container */}
        <div
          onClick={e => e.stopPropagation()}
          className="mermaid-expanded-container"
          style={{
            width: '95vw',
            height: '90vh',
            overflow: 'auto',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(12, 24, 36, 0.95) 0%, rgba(10, 22, 40, 0.98) 100%)',
            border: '1px solid rgba(77, 171, 206, 0.3)',
            borderRadius: '1rem',
            boxShadow: '0 0 40px rgba(0, 195, 255, 0.1), 0 0 80px rgba(0, 195, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    );
  }

  // ----- Inline (normal) view -----
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        margin: '1.5rem 0',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(12, 24, 36, 0.9) 0%, rgba(10, 22, 40, 0.95) 100%)',
        border: '1px solid rgba(77, 171, 206, 0.2)',
        borderRadius: '0.75rem',
        boxShadow: '0 0 20px rgba(0, 195, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        overflow: 'auto',
        textAlign: 'center',
      }}
    >
      {/* Maximize button — visible on hover via CSS class below */}
      <button
        onClick={toggleExpand}
        className="mermaid-expand-btn"
        style={{ ...btnStyle, top: '0.75rem', right: '0.75rem', opacity: 0 }}
        title="Maximize diagram"
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(18, 145, 199, 0.25)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#00c3ff';
          (e.currentTarget as HTMLButtonElement).style.color = '#00c3ff';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 12px rgba(0, 195, 255, 0.25)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(12, 24, 36, 0.85)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(77, 171, 206, 0.35)';
          (e.currentTarget as HTMLButtonElement).style.color = '#4dabce';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
        }}
      >
        <Maximize2 size={16} />
      </button>

      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

export default MermaidDiagram;
