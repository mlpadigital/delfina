import { useState } from 'react'
import Background from './components/Background'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Information from './components/Information'
import RSVP from './components/RSVP'
import MusicPlayer from './components/MusicPlayer'
import WelcomeScreen from './components/WelcomeScreen'
import './App.css'

function App() {
  const targetDate = "2026-04-18T21:00:00";
  const [isOpened, setIsOpened] = useState(false);
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleStartMusic = () => {
    setIsMusicStarted(true);
  };

  const handleInteract = () => {
    setIsInteracted(true);
  };

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

      {/* Pantalla de Bienvenida (Sobre Virtual) */}
      <WelcomeScreen 
        isOpened={isOpened} 
        onOpen={handleOpen} 
        onStartMusic={handleStartMusic} 
        onInteract={handleInteract}
      />

      <main className="relative">
        <Background />
        <Hero />
        <div className="relative z-10">
          <Countdown targetDate={targetDate} />
          <RSVP />
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
