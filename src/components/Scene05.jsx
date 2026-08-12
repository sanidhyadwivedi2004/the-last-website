import React, { useState } from 'react';

export function Scene05({ theme, toggleTheme, onHoverInteractive, playStampSound, playHoverSound }) {
  const [digitalStamp, setDigitalStamp] = useState(null);

  const handleGenerateStamp = () => {
    playStampSound();
    const randomHash = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    
    setDigitalStamp({
      id: `MEM-${randomHash}`,
      timestamp: timeStr,
      date: '08.12.26',
      status: 'ARCHIVED IN THE PERMANENT RECORD'
    });
  };

  const handleResetScroll = () => {
    playHoverSound(500, 0.1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="viewport-screen scene-container" id="scene-05">
      <div>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
          SCENE 05 // EPILOGUE
        </span>
        <h2 className="monumental-heading" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', marginTop: '1rem' }}>
          THERE WAS NEVER<br />
          A LAST WEBSITE.
        </h2>

        <p className="subordinate-heading" style={{ marginTop: '2rem', color: 'var(--text-primary)', fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
          THERE WAS ONLY THIS ONE.
        </p>

        <p className="serif" style={{ marginTop: '1.5rem', fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', color: 'var(--accent)', fontStyle: 'italic' }}>
          THANK YOU FOR STAYING.
        </p>
      </div>

      {/* Epilogue Interactive Action Section */}
      <div>
        <div className="epilogue-actions">
          {!digitalStamp ? (
            <button
              className="stamp-btn"
              onClick={handleGenerateStamp}
              onMouseEnter={() => onHoverInteractive(true)}
              onMouseLeave={() => onHoverInteractive(false)}
            >
              DEPOSIT ATTENDANCE STAMP
            </button>
          ) : (
            <button
              className="stamp-btn"
              style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              onClick={handleResetScroll}
              onMouseEnter={() => onHoverInteractive(true)}
              onMouseLeave={() => onHoverInteractive(false)}
            >
              RETURN TO ENTRANCE
            </button>
          )}

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            onMouseEnter={() => onHoverInteractive(true)}
            onMouseLeave={() => onHoverInteractive(false)}
          >
            THEME: {theme === 'paper' ? 'PAPER LIGHT' : 'CHARCOAL DARK'}
          </button>
        </div>

        {/* Digital Stamp Certificate Display */}
        {digitalStamp && (
          <div className="digital-stamp-badge">
            <div style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: '0.5rem' }}>
              OFFICIAL DIGITAL ATTENDANCE RECORD
            </div>
            <div>RECORD IDENTIFIER: {digitalStamp.id}</div>
            <div>TIME DEPOSITED: {digitalStamp.timestamp} GMT ({digitalStamp.date})</div>
            <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
              STATUS: {digitalStamp.status}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Metadata Bar */}
      <div className="scene-footer">
        <div className="serif" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
          THE END
        </div>
        <div className="mono">05 / 05</div>
      </div>
    </section>
  );
}
