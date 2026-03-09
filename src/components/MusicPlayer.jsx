import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

const MusicPlayer = ({ isOpened, isMusicStarted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasAutoplayedRef = useRef(false);

  // Cuando se indica que debe empezar la música (isMusicStarted = true), arrancarla
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (isMusicStarted && !hasAutoplayedRef.current) {
      hasAutoplayedRef.current = true;
      audioEl.volume = 0.5;
      audioEl.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Error al reproducir:', err));
    }
  }, [isMusicStarted]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioEl.addEventListener('play', handlePlay);
    audioEl.addEventListener('pause', handlePause);

    return () => {
      audioEl.removeEventListener('play', handlePlay);
      audioEl.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error('Error:', err));
    }
  };

  return (
    <>
      {/* Reproductor de audio HTML5 nativo - invisible */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />

      {/* Botón flotante dorado - solo aparece cuando la invitación está abierta */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 right-6"
            style={{ zIndex: 9999999 }}
          >
            <button
              onClick={toggleMusic}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #dbae42 0%, #b8860b 100%)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.4)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
              title={isPlaying ? "Pausar música" : "Reproducir música"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" style={{ position: 'relative', zIndex: 1 }} />
              ) : (
                <Music className="w-6 h-6" style={{ position: 'relative', zIndex: 1 }} />
              )}

              {/* Onda pulsante cuando suena */}
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    key="pulse"
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.5)',
                      zIndex: 0
                    }}
                  />
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
