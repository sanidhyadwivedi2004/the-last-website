import React, { useEffect, useState } from 'react';

/**
 * Minimalist custom cursor component with smooth interpolation.
 * Automatically disabled on touch screens to ensure mobile performance.
 */
export function CustomCursor({ mousePos, isHoveringInteractive }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let animId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setSmoothPos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.2),
        y: lerp(prev.y, mousePos.y, 0.2)
      }));
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, isTouchDevice]);

  if (isTouchDevice || mousePos.x < 0) return null;

  return (
    <>
      {/* Precise Central Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHoveringInteractive ? '8px' : '4px',
          height: isHoveringInteractive ? '8px' : '4px',
          backgroundColor: isHoveringInteractive ? 'var(--accent)' : 'var(--text-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${mousePos.x - (isHoveringInteractive ? 4 : 2)}px, ${
            mousePos.y - (isHoveringInteractive ? 4 : 2)
          }px, 0)`,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
          mixBlendMode: 'difference'
        }}
      />

      {/* Subtle Outer Reticle Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHoveringInteractive ? '36px' : '20px',
          height: isHoveringInteractive ? '36px' : '20px',
          border: `1px solid ${isHoveringInteractive ? 'var(--accent)' : 'var(--border-color)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate3d(${smoothPos.x - (isHoveringInteractive ? 18 : 10)}px, ${
            smoothPos.y - (isHoveringInteractive ? 18 : 10)
          }px, 0)`,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          opacity: 0.7
        }}
      />
    </>
  );
}
