import React from 'react';

export function Scene01({ onHoverInteractive, playHoverSound }) {
  return (
    <section className="viewport-screen scene-container" id="scene-01">
      {/* Upper Spacing Header Area */}
      <div style={{ minHeight: '40px' }} />

      {/* Main Monumental Editorial Center */}
      <div style={{ maxWidth: '1100px', width: '100%' }}>
        <h1 className="monumental-heading">
          THE INTERNET<br />
          HAS ENOUGH<br />
          WEBSITES.
        </h1>

        <p 
          className="subordinate-heading"
          style={{ marginTop: 'clamp(1.5rem, 3vh, 3rem)' }}
        >
          THIS ONE IS THE LAST.
        </p>
      </div>

      {/* Asymmetrical Bottom Metadata Bar */}
      <div className="scene-footer">
        <div>
          <span className="indicator-pulse" />
          <span>SCROLL TO CONTINUE</span>
        </div>
        <div className="mono">01 / 05</div>
      </div>
    </section>
  );
}
