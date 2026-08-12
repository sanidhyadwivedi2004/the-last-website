import React, { useState } from 'react';

const DECONSTRUCT_ITEMS = [
  { id: 'IMAGE', num: '01', desc: 'PIXEL NOISE / RASTER SLICE' },
  { id: 'TEXT', num: '02', desc: 'GLYPH PERMUTATION / SYMBOL' },
  { id: 'MOTION', num: '03', desc: 'VECTOR DISPLACEMENT WAVE' },
  { id: 'MEMORY', num: '04', desc: 'SESSION STATE / ANCIENT RETENTION' },
  { id: 'ATTENTION', num: '05', desc: 'VISITOR CROSSHAIR RETICLE' }
];

export function Scene02({ activeMode, setActiveMode, onHoverInteractive, playHoverSound }) {
  const [activeWordState, setActiveWordState] = useState(null);

  const handleWordSelect = (itemId) => {
    const nextMode = activeMode === itemId ? null : itemId;
    setActiveMode(nextMode);
    setActiveWordState(nextMode);
    playHoverSound(340, 0.1);
  };

  return (
    <section className="viewport-screen scene-container" id="scene-02">
      <div>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
          SCENE 02 // ANATOMY
        </span>
        <h2 className="monumental-heading" style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)', marginTop: '1rem' }}>
          WHAT MAKES<br />A WEBSITE?
        </h2>
      </div>

      {/* Asymmetric Words Grid */}
      <div className="deconstruct-grid">
        {DECONSTRUCT_ITEMS.map((item) => {
          const isActive = activeMode === item.id;
          return (
            <div
              key={item.id}
              className={`deconstruct-word ${isActive ? 'active' : ''}`}
              onMouseEnter={() => {
                onHoverInteractive(true);
                playHoverSound(280 + parseInt(item.num) * 40, 0.08);
              }}
              onMouseLeave={() => onHoverInteractive(false)}
              onClick={() => handleWordSelect(item.id)}
            >
              <span className="word-num">{item.num}</span>
              <div>{item.id}</div>
              <span className="word-desc">{item.desc}</span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Feedback Detail readout */}
      {activeMode && (
        <div 
          className="mono" 
          style={{ 
            marginTop: '2rem', 
            padding: '1rem 1.5rem', 
            borderLeft: '2px solid var(--accent)', 
            backgroundColor: 'var(--bg-subtle)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}
        >
          MODE ACTIVE: <span style={{ color: 'var(--text-primary)' }}>{activeMode}</span> // INTERACT WITH CANVAS MATRIX
        </div>
      )}

      {/* Bottom Metadata Bar */}
      <div className="scene-footer">
        <div>TAP OR HOVER WORDS TO DECONSTRUCT</div>
        <div className="mono">02 / 05</div>
      </div>
    </section>
  );
}
