import React, { useEffect, useState } from 'react';

export function Scene04({ mousePos, scrollY, onHoverInteractive, playHoverSound }) {
  const [dwellTime, setDwellTime] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDwellTime((prev) => prev + 1);
    }, 1000);

    const handleResize = () => {
      setWindowDimensions({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Format position coordinates as normalized 3-digit padded numbers (000 - 999)
  const normX = String(Math.floor((mousePos.x / (windowDimensions.w || 1)) * 999)).padStart(3, '0');
  const normY = String(Math.floor((mousePos.y / (windowDimensions.h || 1)) * 999)).padStart(3, '0');

  // Calculate scroll depth percentage
  const maxScroll = typeof document !== 'undefined' 
    ? Math.max(1, document.documentElement.scrollHeight - windowDimensions.h) 
    : 1000;
  const scrollPercent = String(Math.min(100, Math.floor((scrollY / maxScroll) * 100))).padStart(2, '0');

  // Determine quadrant
  const isRight = mousePos.x > windowDimensions.w / 2;
  const isBottom = mousePos.y > windowDimensions.h / 2;
  const quadrant = !isRight && !isBottom ? 'Q01 NORTH-WEST' :
                    isRight && !isBottom ? 'Q02 NORTH-EAST' :
                   !isRight && isBottom  ? 'Q03 SOUTH-WEST' : 'Q04 SOUTH-EAST';

  return (
    <section className="viewport-screen scene-container" id="scene-04">
      <div>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
          SCENE 04 // TELEMETRY
        </span>
        <h2 className="monumental-heading" style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)', marginTop: '1rem' }}>
          YOU ARE<br />CURRENTLY HERE.
        </h2>
      </div>

      {/* Main Telemetry Box */}
      <div 
        className="telemetry-grid"
        onMouseEnter={() => {
          onHoverInteractive(true);
          playHoverSound(420, 0.08);
        }}
        onMouseLeave={() => onHoverInteractive(false)}
      >
        <div className="telemetry-item">
          <div className="telemetry-label">VISITOR POSITION X</div>
          <div className="telemetry-value accented">{normX}</div>
        </div>

        <div className="telemetry-item">
          <div className="telemetry-label">VISITOR POSITION Y</div>
          <div className="telemetry-value accented">{normY}</div>
        </div>

        <div className="telemetry-item">
          <div className="telemetry-label">SCROLL DEPTH</div>
          <div className="telemetry-value">{scrollPercent}%</div>
        </div>

        <div className="telemetry-item">
          <div className="telemetry-label">ACTIVE QUADRANT</div>
          <div className="telemetry-value" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}>{quadrant}</div>
        </div>

        <div className="telemetry-item">
          <div className="telemetry-label">CANVAS VIEWPORT</div>
          <div className="telemetry-value" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}>
            {windowDimensions.w} &times; {windowDimensions.h}
          </div>
        </div>

        <div className="telemetry-item">
          <div className="telemetry-label">DWELL DURATION</div>
          <div className="telemetry-value">{dwellTime}s</div>
        </div>
      </div>

      <p className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
        OBSERVING REALTIME SPATIAL ATTACHMENT WITHOUT PERSONAL DATA RETENTION.
      </p>

      {/* Bottom Metadata Bar */}
      <div className="scene-footer">
        <div>LIVE TELEMETRY STREAM ONLINE</div>
        <div className="mono">04 / 05</div>
      </div>
    </section>
  );
}
