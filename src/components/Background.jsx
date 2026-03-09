import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" 
         style={{ background: 'radial-gradient(circle, var(--bg-blue-light) 0%, var(--bg-blue-dark) 100%)' }}>
      
      {/* Ornate Frame Corners (Decorative SVGs) */}
      <div className="ornate-border" />

      {/* Subtle floating particles (less flashy, more elegant) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0.05,
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 bg-white rounded-full blur-[2px]"
        />
      ))}
    </div>
  );
};

export default Background;
