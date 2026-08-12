import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { SpatialCanvas } from './components/SpatialCanvas';
import { CustomCursor } from './components/CustomCursor';
import { useAudioEngine } from './components/AudioEngine';
import { Scene01 } from './components/Scene01';
import { Scene02 } from './components/Scene02';
import { Scene03 } from './components/Scene03';
import { Scene04 } from './components/Scene04';
import { Scene05 } from './components/Scene05';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [scrollY, setScrollY] = useState(0);
  const [activeScene, setActiveScene] = useState(1);
  const [activeMode, setActiveMode] = useState(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [theme, setTheme] = useState('dark');

  const { soundEnabled, toggleSound, playHoverSound, playClickSound, playStampSound } = useAudioEngine();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e) => {
      setScrollY(e.scroll);

      // Determine active scene based on scroll depth
      const vh = window.innerHeight;
      const sceneIndex = Math.min(5, Math.max(1, Math.floor((e.scroll + vh * 0.4) / vh) + 1));
      setActiveScene(sceneIndex);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Track global pointer / touch position
  useEffect(() => {
    const handlePointerMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Toggle dark/paper theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'paper' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'paper') {
      document.documentElement.setAttribute('data-theme', 'paper');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    playClickSound(400, 0.08);
  };

  return (
    <div className="app-main-wrapper">
      {/* Dynamic Background Spatial 2D Canvas */}
      <SpatialCanvas
        activeMode={activeMode}
        mousePos={mousePos}
        scrollY={scrollY}
        activeScene={activeScene}
      />

      {/* Precision Custom Cursor Overlay */}
      <CustomCursor
        mousePos={mousePos}
        isHoveringInteractive={isHoveringInteractive}
      />

      {/* Fixed Top Meta Navigation Bar */}
      <header className="top-meta-bar">
        <div className="brand-mark">THE LAST WEBSITE</div>
        
        <div className="date-mark mono" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button
            className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
            onClick={toggleSound}
          >
            SOUND: {soundEnabled ? 'ON' : 'OFF'}
          </button>
          <span>08.12.26</span>
        </div>
      </header>

      {/* Main Narrative Scenes Container */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Scene01
          onHoverInteractive={setIsHoveringInteractive}
          playHoverSound={playHoverSound}
        />

        <Scene02
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          onHoverInteractive={setIsHoveringInteractive}
          playHoverSound={playHoverSound}
        />

        <Scene03
          mousePos={mousePos}
          onHoverInteractive={setIsHoveringInteractive}
          playHoverSound={playHoverSound}
        />

        <Scene04
          mousePos={mousePos}
          scrollY={scrollY}
          onHoverInteractive={setIsHoveringInteractive}
          playHoverSound={playHoverSound}
        />

        <Scene05
          theme={theme}
          toggleTheme={toggleTheme}
          onHoverInteractive={setIsHoveringInteractive}
          playStampSound={playStampSound}
          playHoverSound={playHoverSound}
        />
      </main>
    </div>
  );
}
