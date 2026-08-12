import React, { useEffect, useRef } from 'react';

/**
 * Spatial Canvas rendering perspective grids, real-time node tracking,
 * subtle grain noise, and dynamic scene deconstruction modes.
 */
export function SpatialCanvas({ activeMode, mousePos, scrollY, activeScene }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for subtle spatial grid
    const cols = Math.floor(width / 80);
    const rows = Math.floor(height / 80);
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isPaperTheme = document.documentElement.getAttribute('data-theme') === 'paper';
      const lineColor = isPaperTheme ? 'rgba(15, 15, 14, 0.04)' : 'rgba(244, 241, 234, 0.04)';
      const nodeColor = isPaperTheme ? 'rgba(15, 15, 14, 0.12)' : 'rgba(244, 241, 234, 0.12)';
      const accentColor = isPaperTheme ? '#aa2c1d' : '#bf3b2b';

      // Base Grid Lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Vertical Grid Lines
      const gridSpacingX = width / 12;
      for (let x = 0; x <= width; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Scene 03: Spatial Perspective Projection Grid
      if (activeScene === 3) {
        ctx.strokeStyle = isPaperTheme ? 'rgba(15, 15, 14, 0.08)' : 'rgba(244, 241, 234, 0.08)';
        const horizonY = height * 0.5;
        const vanishingX = width * 0.5 + (mousePos.x - width * 0.5) * 0.1;

        for (let i = -10; i <= 10; i++) {
          ctx.beginPath();
          ctx.moveTo(vanishingX + i * 20, horizonY);
          ctx.lineTo(vanishingX + i * 180, height);
          ctx.stroke();
        }

        // Horizontal perspective lines
        for (let y = horizonY; y < height; y += Math.pow((y - horizonY) * 0.1, 1.4) + 10) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Interactive Modes from Scene 02
      if (activeMode === 'IMAGE') {
        // Subtle monochrome pixel noise grid slice around mouse
        const sliceSize = 120;
        ctx.strokeStyle = accentColor;
        ctx.strokeRect(mousePos.x - sliceSize / 2, mousePos.y - sliceSize / 2, sliceSize, sliceSize);
        ctx.fillStyle = isPaperTheme ? 'rgba(170, 44, 29, 0.03)' : 'rgba(191, 59, 43, 0.03)';
        ctx.fillRect(mousePos.x - sliceSize / 2, mousePos.y - sliceSize / 2, sliceSize, sliceSize);
      } else if (activeMode === 'MOTION') {
        // Sine wave vector lines responding to mouse
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          const dist = Math.abs(x - mousePos.x);
          const factor = Math.max(0, 1 - dist / 300);
          const y = mousePos.y + Math.sin(x * 0.02 + time * 3) * (20 * factor);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeMode === 'ATTENTION') {
        // Precision reticle crosshair around cursor
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 40, 0, Math.PI * 2);
        ctx.moveTo(mousePos.x - 60, mousePos.y);
        ctx.lineTo(mousePos.x + 60, mousePos.y);
        ctx.moveTo(mousePos.x, mousePos.y - 60);
        ctx.lineTo(mousePos.x, mousePos.y + 60);
        ctx.stroke();
      }

      // Subtle cursor tracking node
      if (mousePos.x > 0 && mousePos.y > 0) {
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMode, mousePos, scrollY, activeScene]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
