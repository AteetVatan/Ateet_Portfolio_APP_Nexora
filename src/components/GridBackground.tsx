
import React, { useEffect, useRef } from 'react';

const GridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    
    // Set canvas dimensions to match window size
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();
    
    // Draw the grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get viewport dimensions
      const viewportWidth = canvas.width;
      const viewportHeight = canvas.height;
      
      // Grid config
      const gridSize = 50; // Grid cell size in pixels
      const gridOpacity = 0.15;
      
      ctx.strokeStyle = '#0078A3';
      ctx.lineWidth = 1;
      
      // Adjust the grid time factor for movement
      const timeOffset = time * 0.3;
      
      // Draw vertical lines
      for (let x = timeOffset % gridSize; x < viewportWidth; x += gridSize) {
        const lineOpacity = gridOpacity * (1 - 0.3 * Math.sin(x * 0.01 + time * 0.2));
        ctx.globalAlpha = lineOpacity;
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, viewportHeight);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = timeOffset % gridSize; y < viewportHeight; y += gridSize) {
        const lineOpacity = gridOpacity * (1 - 0.3 * Math.cos(y * 0.01 + time * 0.1));
        ctx.globalAlpha = lineOpacity;
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(viewportWidth, y);
        ctx.stroke();
      }
      
      // Draw some glowing nodes at intersections
      ctx.fillStyle = '#00c3ff';
      const nodeInterval = gridSize * 4; // Space nodes further apart
      
      for (let x = timeOffset % nodeInterval; x < viewportWidth; x += nodeInterval) {
        for (let y = timeOffset % nodeInterval; y < viewportHeight; y += nodeInterval) {
          // Add some variation to node sizes
          const nodeSize = 2 + Math.sin(x * 0.05 + y * 0.05 + time * 0.5) * 1.5;
          const nodeOpacity = 0.3 + 0.5 * Math.sin(x * 0.01 + y * 0.01 + time * 0.2);
          
          ctx.globalAlpha = nodeOpacity;
          ctx.beginPath();
          ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, nodeSize * 3);
          gradient.addColorStop(0, 'rgba(0, 195, 255, 0.4)');
          gradient.addColorStop(1, 'rgba(0, 195, 255, 0)');
          
          ctx.globalAlpha = nodeOpacity * 0.7;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, nodeSize * 3, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#00c3ff';
        }
      }
      
      // Add depth to the grid with perspective lines
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = '#00c3ff';
      
      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;
      const numLines = 12;
      const angleIncrement = (Math.PI * 2) / numLines;
      
      for (let i = 0; i < numLines; i++) {
        const angle = i * angleIncrement + time * 0.05;
        const length = Math.max(viewportWidth, viewportHeight) * 1.5;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * length,
          centerY + Math.sin(angle) * length
        );
        ctx.stroke();
      }
      
      time += 0.01;
      animationFrameId = requestAnimationFrame(drawGrid);
    };
    
    // Start the animation
    drawGrid();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="grid-canvas" />;
};

export default GridBackground;
