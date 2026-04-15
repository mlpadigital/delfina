import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

const MusicPlayer = ({ isOpened, isMusicStarted, isInteracted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasUnlockedRef = useRef(false);
  const hasStartedRef = useRef(false);

  // Desbloqueo inmediato con volumen 0 para "engañar" al navegador
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl || !isInteracted || hasUnlockedRef.current) return;

    hasUnlockedRef.current = true;
    audioEl.volume = 0;
    audioEl.play()
      .then(() => {
        console.log('Audio desbloqueado (volumen 0)');
        // Si por alguna razón la música ya debería estar sonando, subimos el volumen
        if (isMusicStarted) {
          audioEl.volume = 0.5;
          setIsPlaying(true);
        }
      })
      .catch(err => console.warn('Bloqueo preventivo de audio:', err));
  }, [isInteracted, isMusicStarted]);

  // Cuando empieza el cometa, subimos el volumen y reseteamos el tiempo si es necesario
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl || !isMusicStarted || hasStartedRef.current) return;

    hasStartedRef.current = true;
    audioEl.currentTime = 0; // Buscamos que empiece el tema justo con el cometa
    audioEl.volume = 0.5;
    audioEl.play()
      .then(() => setIsPlaying(true))
      .catch(err => {
        console.error('Error al iniciar música:', err);
        // Fallback: si falló por el delay, al menos que el botón lo permita
      });
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
        src="music.mp3"
        loop
        preload="auto"
      />

      {/* Botón flotante dorado - Siempre visible si intro está off */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-8 right-8 flex items-center gap-3"
        style={{ zIndex: 999999 }}
      >
        <span className="font-serif text-sm uppercase tracking-widest hidden md:block" style={{ color: 'var(--gold-text)', backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--gold-text)' }}>
          {isPlaying ? 'Sonando' : 'Música'}
        </span>
        <button
          onClick={toggleMusic}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #dbae42 0%, #b8860b 100%)',
            color: 'white',
            border: '3px solid rgba(255,255,255,0.6)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" style={{ position: 'relative', zIndex: 1 }} />
          ) : (
            <Music className="w-8 h-8" style={{ position: 'relative', zIndex: 1 }} />
          )}

          {/* Onda pulsante cuando suena */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0.4, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
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
        </button>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
