import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Lluvia dorada ─────────────────────────────────────────────
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
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#FFD700" />
  </svg>
);

// ─── Cola de cometa: segmentos dorados que siguen la misma ruta ─
const TAIL_STEPS = 14;
const tailSteps = Array.from({ length: TAIL_STEPS }, (_, i) => ({
  id: i,
  delayOffset: (i + 1) * 0.12,
  opacity: 0.9 - (i / TAIL_STEPS) * 0.85,
  scale: 1 - (i / TAIL_STEPS) * 0.7,
  blur: i * 0.6,
}));

// ─── Trayectoria del cometa: curva derecha → curva izquierda → centro → arriba
const cometPath = [
  { x: 0, y: 0 },             // Sale del sello D
  { x: 120, y: -60 },         // Curva hacia la derecha
  { x: 220, y: -180 },        // Arco derecho alto
  { x: 180, y: -300 },        // Gira volviendo
  { x: 40, y: -280 },         // Cruza al centro
  { x: -120, y: -200 },       // Curva hacia la izquierda
  { x: -220, y: -320 },       // Arco izquierdo alto
  { x: -160, y: -440 },       // Gira volviendo
  { x: -40, y: -420 },        // Vuelve al centro
  { x: 0, y: -480 },          // Centrado
  { x: 0, y: -800 },          // Disparo recto hacia arriba (explosión)
];

const COMET_DURATION = 3;

const WelcomeScreen = ({ isOpened, onOpen, onStartMusic }) => {
  const [stage, setStage] = useState('idle');
  // idle → flap → comet → burst → rain → done

  const handleClick = () => {
    if (stage !== 'idle') return;
    setStage('flap');
    setTimeout(() => {
      setStage('comet');
      if (onStartMusic) onStartMusic();
    }, 1000);
    setTimeout(() => {
      setStage('burst');
      onOpen();
    }, 1000 + COMET_DURATION * 1000);
    setTimeout(() => setStage('rain'), 1000 + COMET_DURATION * 1000 + 200);
  };

  return (
    <>
      {/* ── Pantalla del sobre ───────────────────────── */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={stage === 'idle' ? handleClick : undefined}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'radial-gradient(ellipse at center, #dbeafe 0%, #bfdbfe 55%, #93c5fd 100%)',
              cursor: stage === 'idle' ? 'pointer' : 'default',
              overflow: 'hidden',
            }}
          >
            {/* Texto superior */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: stage === 'idle' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: '#7c6d1f', fontSize: '1rem',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              Tenés una invitación
            </motion.p>

            {/* ── SOBRE ── */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85, ease: 'easeOut' }}
              style={{
                position: 'relative',
                width: 280,
                height: 190,
                perspective: '800px',  // Perspectiva 3D para el sobre
              }}
            >
              {/* Cuerpo del sobre (la parte de atrás) */}
              <svg
                width="280" height="190" viewBox="0 0 280 190"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  filter: 'drop-shadow(0 16px 36px rgba(0,0,0,0.18))'
                }}
              >
                <rect x="0" y="20" width="280" height="170" rx="8" fill="#fffef7" stroke="#dbae42" strokeWidth="2"/>
                {/* Pliegues laterales */}
                <polygon points="0,190 140,110 0,30" fill="#f5f0d8" stroke="#dbae42" strokeWidth="1"/>
                <polygon points="280,190 140,110 280,30" fill="#ede8c5" stroke="#dbae42" strokeWidth="1"/>
                {/* Pliegue inferior */}
                <polygon points="0,190 140,115 280,190" fill="#faf7e8" stroke="#dbae42" strokeWidth="1"/>
              </svg>

              {/* Sello D */}
              <motion.div
                animate={
                  stage !== 'idle' && stage !== 'flap'
                    ? { opacity: 0, scale: 0 }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', bottom: 55, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'radial-gradient(circle, #fff3a0 0%, #dbae42 60%, #b8860b 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 18px 6px rgba(219,174,66,0.7)', zIndex: 5,
                }}
              >
                <span style={{ color: 'white', fontFamily: 'serif', fontSize: 24, fontWeight: 'bold' }}>D</span>
              </motion.div>

              {/* ── SOLAPA (se abre hacia atrás de forma realista) ── */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 20,    // Alineada con el borde superior del cuerpo del sobre
                  left: 0,
                  width: '100%',
                  height: 100,
                  transformOrigin: 'top center',
                  zIndex: stage === 'idle' || stage === 'flap' ? 6 : 1,
                }}
                animate={stage !== 'idle' ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              >
                <svg width="280" height="100" viewBox="0 0 280 100">
                  {/* Solapa triangular */}
                  <polygon
                    points="0,0 280,0 140,95"
                    fill="#f0e8be"
                    stroke="#dbae42"
                    strokeWidth="2"
                  />
                  <polygon
                    points="6,1 274,1 140,88"
                    fill="#f5efcc"
                  />
                </svg>
              </motion.div>

              {/* ── COMETA Disney (orbe dorado luminoso con cola) ── */}
              <AnimatePresence>
                {stage === 'comet' && (
                  <>
                    {/* Cola de cometa: segmentos luminosos rezagados */}
                    {tailSteps.map((t) => (
                      <motion.div
                        key={`tail-${t.id}`}
                        style={{
                          position: 'absolute',
                          bottom: 52, left: '50%',
                          marginLeft: -12,
                          zIndex: 29 - t.id,
                          pointerEvents: 'none',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                          x: cometPath.map(p => p.x),
                          y: cometPath.map(p => p.y),
                          opacity: t.opacity,
                        }}
                        transition={{
                          duration: COMET_DURATION,
                          ease: 'linear',
                          delay: t.delayOffset,
                        }}
                      >
                        <div style={{
                          width: 24 * t.scale,
                          height: 24 * t.scale,
                          borderRadius: '50%',
                          background: `radial-gradient(circle, rgba(255,255,255,${0.9 * t.opacity}) 0%, rgba(255,230,80,${0.7 * t.opacity}) 50%, rgba(219,174,66,${0.4 * t.opacity}) 100%)`,
                          boxShadow: `0 0 ${12 + t.id * 2}px ${8 + t.id}px rgba(255,220,80,${0.45 * t.opacity})`,
                          filter: `blur(${t.blur}px)`,
                        }} />
                      </motion.div>
                    ))}

                    {/* Cabeza del cometa: orbe dorado 3D */}
                    <motion.div
                      key="comet-head"
                      style={{
                        position: 'absolute',
                        bottom: 52, left: '50%',
                        marginLeft: -18,
                        zIndex: 35,
                        pointerEvents: 'none',
                        transformStyle: 'preserve-3d',
                      }}
                      animate={{
                        x: cometPath.map(p => p.x),
                        y: cometPath.map(p => p.y),
                        rotateZ: [0, 30, 60, 20, -20, -50, -30, 10, 20, 0, 0],
                      }}
                      transition={{ duration: COMET_DURATION, ease: 'linear' }}
                    >
                      {/* Halo exterior grande (resplandor amplio) */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1.2, 1.6, 1],
                          opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          top: -24, left: -24,
                          width: 84, height: 84,
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(255,240,120,0.3) 0%, rgba(255,200,60,0.1) 50%, transparent 100%)',
                          filter: 'blur(8px)',
                        }}
                      />
                      {/* Halo medio (glow dorado cálido) */}
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          top: -10, left: -10,
                          width: 56, height: 56,
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(255,230,100,0.7) 0%, rgba(255,200,50,0.3) 60%, transparent 100%)',
                          filter: 'blur(3px)',
                        }}
                      />
                      {/* Orbe principal 3D (esfera con relieve) */}
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        style={{
                          width: 36, height: 36,
                          borderRadius: '50%',
                          background: 'radial-gradient(ellipse at 35% 30%, #ffffff 0%, #fffad0 20%, #ffe566 50%, #dbae42 80%, #a07020 100%)',
                          boxShadow: '0 0 30px 12px rgba(255,220,80,0.8), 0 0 60px 24px rgba(219,174,66,0.4), inset 0 -4px 8px rgba(160,100,20,0.4)',
                          position: 'relative',
                        }}
                      >
                        {/* Reflejo especular (punto de brillo tipo cristal) */}
                        <div style={{
                          position: 'absolute',
                          top: 6, left: 8,
                          width: 12, height: 8,
                          borderRadius: '50%',
                          background: 'radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
                          transform: 'rotate(-20deg)',
                        }} />
                      </motion.div>
                      {/* Cruz de destello 4 puntas que gira */}
                      <motion.div
                        animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        style={{
                          position: 'absolute',
                          top: -6, left: -6,
                          width: 48, height: 48,
                          pointerEvents: 'none',
                        }}
                      >
                        <svg width="48" height="48" viewBox="0 0 48 48">
                          {/* Rayos principales */}
                          <rect x="22" y="0" width="4" height="48" rx="2" fill="rgba(255,255,255,0.85)" />
                          <rect x="0" y="22" width="48" height="4" rx="2" fill="rgba(255,255,255,0.85)" />
                          {/* Rayos diagonales (más finos) */}
                          <rect x="22" y="0" width="3" height="48" rx="1.5" fill="rgba(255,255,255,0.45)" transform="rotate(45 24 24)" />
                          <rect x="0" y="22" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.45)" transform="rotate(45 24 24)" />
                        </svg>
                      </motion.div>
                      {/* Chispas micro que salen del cometa */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`spark-${i}`}
                          animate={{
                            x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 40],
                            y: [0, 20 + Math.random() * 30],
                            opacity: [1, 0],
                            scale: [1, 0],
                          }}
                          transition={{
                            duration: 0.5 + Math.random() * 0.3,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          style={{
                            position: 'absolute',
                            bottom: -2, left: 14 + (Math.random() - 0.5) * 10,
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            background: '#ffe566',
                            boxShadow: '0 0 4px 2px rgba(255,230,80,0.7)',
                            pointerEvents: 'none',
                          }}
                        />
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* ── EXPLOSIÓN al llegar arriba ──────────── */}
              <AnimatePresence>
                {stage === 'burst' && (
                  <>
                    <motion.div
                      key="flash"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 15, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: -650, left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 60, height: 60,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #ffffff 0%, #ffe566 40%, #dbae42 70%, transparent 100%)',
                        zIndex: 25, pointerEvents: 'none',
                      }}
                    />
                    {/* Rayos de luz tipo starburst */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
                      <motion.div
                        key={`ray-${angle}`}
                        initial={{ scaleY: 0, opacity: 1 }}
                        animate={{ scaleY: 1, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
                        style={{
                          position: 'absolute',
                          top: -650, left: '50%',
                          width: 3, height: 120,
                          marginLeft: -1.5,
                          background: 'linear-gradient(to top, transparent, #ffe566, transparent)',
                          transformOrigin: 'bottom center',
                          transform: `rotate(${angle}deg)`,
                          zIndex: 24, pointerEvents: 'none',
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Instrucción pulsante */}
            {stage === 'idle' && (
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  marginTop: '2rem',
                  fontFamily: 'Cormorant Garamond, serif',
                  color: '#8b7320', fontSize: '0.9rem',
                  letterSpacing: '0.15em',
                }}
              >
                ✦ Hacé clic para abrir ✦
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LLUVIA DORADA ─────────────────────────────── */}
      <AnimatePresence>
        {stage === 'rain' && (
          <GoldenRain key="rain" onDone={() => setStage('done')} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Capa de lluvia dorada ─────────────────────────────────────
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
