import React from 'react';

export function Scene03({ mousePos, onHoverInteractive, playHoverSound }) {
  // Calculate spatial tilt based on mouse position relative to window center
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
  
  const rotateX = ((mousePos.y - centerY) / centerY) * -12;
  const rotateY = ((mousePos.x - centerX) / centerX) * 12;

  return (
    <section className="viewport-screen scene-container" id="scene-03">
      <div>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
          SCENE 03 // SPATIALITY
        </span>
        <h2 className="monumental-heading" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)', marginTop: '1rem' }}>
          WHEN DOES A WEBSITE<br />BECOME A PLACE?
        </h2>
      </div>

      {/* Interactive 3D Spatial Plane */}
      <div 
        className="spatial-perspective-box"
        onMouseEnter={() => {
          onHoverInteractive(true);
          playHoverSound(310, 0.1);
        }}
        onMouseLeave={() => onHoverInteractive(false)}
      >
        <div 
          className="spatial-typography-layer"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(40px)`
          }}
        >
          NOT A PAGE.<br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>AN ARCHITECTURE.</span>
        </div>
      </div>

      {/* Subtitle statement */}
      <div style={{ maxWidth: '600px' }}>
        <p className="mono" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          YOU DO NOT READ A PLACE. YOU ENTER IT. YOU REMAIN IN IT. YOU DEPART FROM IT.
        </p>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="scene-footer">
        <div>SPATIAL MATRIX ORIENTATION ACTIVE</div>
        <div className="mono">03 / 05</div>
      </div>
    </section>
  );
}
