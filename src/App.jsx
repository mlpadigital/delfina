import { useState, useEffect } from 'react'
import Background from './components/Background'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Information from './components/Information'
import Location from './components/Location'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

function App() {
  const targetDate = "2026-04-18T21:00:00";
  const [isOpened, setIsOpened] = useState(true);
  const [isMusicStarted, setIsMusicStarted] = useState(true);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      setIsInteracted(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <>
      {/* SVG Filter to remove white background from images */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="remove-white" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -1 -1 -1 3 0" />
          </filter>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              1 1 1 0 0" />
          </filter>
        </defs>
      </svg>

      {/* Pantalla de Bienvenida eliminada por solicitud */}


      <main className="relative">
        <Background />
        <Hero />
        <div className="relative z-10">
          <Countdown targetDate={targetDate} />
          <Location />
          <Information />
        </div>

        {/* Footer */}
        <footer className="py-8 text-center opacity-40 text-sm font-serif" style={{ color: 'var(--gold-text)' }}>
          HECHO CON ♡ PARA DELFINA
        </footer>
      </main>

      {/* Reproductor Musical */}
      <MusicPlayer isOpened={isOpened} isMusicStarted={isMusicStarted} isInteracted={isInteracted} />
    </>
  )
}

export default App
