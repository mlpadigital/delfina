import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Lluvia dorada (utilizada al finalizar la transición) ─────────
const RAIN_COUNT = 90;
const rainParticles = Array.from({ length: RAIN_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 1.5 + Math.random() * 2,
  size: 4 + Math.random() * 7,
  isStar: Math.random() > 0.45,
  swayX: (Math.random() - 0.5) * 80,
}));

const StarShape = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 5px gold)' }}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#FFD700" />
  </svg>
);

// ─── Configuración del Arco de Disney ──────────────────────────────
const ARC_POINTS = Array.from({ length: 20 }, (_, i) => {
  const angle = (Math.PI / 1.1) + (i / 19) * (Math.PI / 0.9); // De izquierda a derecha en arco
  return {
    x: Math.cos(angle) * 350,
    y: Math.sin(angle) * 200 - 100,
  };
});

const WelcomeScreen = ({ isOpened, onOpen, onStartMusic, onInteract }) => {
  const [stage, setStage] = useState('idle');
  // idle → start → arc → zoom → rain → done

  const handleClick = () => {
    if (stage !== 'idle') return;
    if (onInteract) onInteract();
    setStage('start');
    
    // Inicia música y arco
    setTimeout(() => {
      if (onStartMusic) onStartMusic();
      setStage('arc');
    }, 500);

    // Zoom cinematográfico y transición final
    setTimeout(() => {
      setStage('zoom');
    }, 3500);

    setTimeout(() => {
      onOpen();
      setStage('rain');
    }, 4500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="castle-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: '#0a0a1a',
              overflow: 'hidden',
            }}
          >
            {/* Imagen del Castillo de Fondo */}
            <motion.div
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url("/assets/castle-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
              }}
              animate={stage === 'zoom' ? { scale: 1.5, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 2, ease: "easeIn" }}
            />

            {/* Capa de Oscurecimiento / Niebla Mágica */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at center, transparent 30%, rgba(10,10,26,0.6) 100%)',
              zIndex: 2,
            }} />

            {/* Arco Mágico de Disney (Cometa) */}
            <AnimatePresence>
              {stage === 'arc' && (
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  {/* El punto brillante */}
                  <motion.div
                    animate={{
                      x: ARC_POINTS.map(p => p.x),
                      y: ARC_POINTS.map(p => p.y),
                      scale: [1, 1.5, 1],
                      opacity: [0, 1, 1, 0.8, 0],
                    }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    style={{
                      width: 20, height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 0 20px #fff, 0 0 40px #ffd700, 0 0 60px #ffd700',
                    }}
                  >
                    {/* Estelas de chispas */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1 }}
                        animate={{ 
                          x: (Math.random() - 0.5) * 50, 
                          y: (Math.random() - 0.5) * 50, 
                          opacity: 0,
                          scale: 0 
                        }}
                        transition={{ duration: 0.8, delay: Math.random() * 0.5, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          width: 4, height: 4,
                          borderRadius: '50%',
                          background: '#ffd700',
                          boxShadow: '0 0 5px gold',
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contenido Principal (Texto y Botón) */}
            <div style={{ position: 'relative', zIndex: 20, textAlign: 'center' }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: stage === 'idle' ? 1 : 0 }}
                transition={{ duration: 1 }}
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  color: '#fff',
                  fontSize: '2.5rem',
                  textShadow: '0 0 10px rgba(0,0,0,0.5), 0 0 20px rgba(219,174,66,0.5)',
                  marginBottom: '1rem',
                  letterSpacing: '0.1em',
                }}
              >
                Delfina
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === 'idle' ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1.2rem',
                  marginBottom: '3rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Te invita a su mundo mágico
              </motion.p>

              {stage === 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(219,174,66,0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClick}
                  style={{
                    background: 'linear-gradient(135deg, #dbae42 0%, #b8860b 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Entrar al Castillo ✦
                </motion.button>
              )}
            </div>

            {/* Fuegos Artificiales de Fondo (Sutiles en idle) */}
            {stage === 'idle' && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.6, 0], 
                      scale: [0, 1, 1.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 1.5,
                    }}
                    style={{
                      position: 'absolute',
                      top: `${10 + Math.random() * 40}%`,
                      left: `${10 + Math.random() * 80}%`,
                      width: 100, height: 100,
                      background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
                      filter: 'blur(10px)',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LLUVIA DORADA (Cuando el castillo desaparece) ──────────── */}
      <AnimatePresence>
        {stage === 'rain' && (
          <GoldenRain key="rain" onDone={() => setStage('done')} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Capa de lluvia dorada (Copiada del original para mantener consistencia) ──
const GoldenRain = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 5500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0.8, 0] }}
      transition={{ duration: 5.5, times: [0, 0.4, 0.7, 1], ease: 'easeIn' }}
      style={{ position: 'fixed', inset: 0, zIndex: 95, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {rainParticles.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: 0, opacity: 0.9 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 40 : 900,
            x: p.swayX,
            opacity: [0.9, 0.9, 0.6, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'linear' }}
          style={{
            position: 'absolute', top: 0,
            left: `${p.left}%`,
            width: p.size, height: p.size,
            pointerEvents: 'none',
          }}
        >
          {p.isStar
            ? <StarShape size={p.size} />
            : <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: 'radial-gradient(circle, #fff3a0 0%, #dbae42 80%)', boxShadow: '0 0 5px #ffe566' }} />
          }
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WelcomeScreen;
