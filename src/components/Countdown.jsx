import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const TimeUnit = ({ value, label }) => (
    <motion.div 
      variants={itemVariants}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 5px', minWidth: '80px' }}
    >
      <span className="font-heading" style={{ color: 'var(--black-text)', fontSize: 'var(--countdown-digit-size)', fontWeight: 'bold', lineHeight: '1.1' }}>{value}</span>
      <span className="uppercase" style={{ color: 'var(--gold-text)', fontSize: 'var(--countdown-label-size)', letterSpacing: '0.2em', marginTop: '2px' }}>{label}</span>
    </motion.div>
  );

  return (
    <section className="pt-8 md:pt-16 pb-0 flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card"
        style={{ 
          maxWidth: '850px', 
          width: '95%', 
          padding: '30px 10px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 'var(--countdown-gap)',
          border: '1px solid rgba(166, 124, 0, 0.2)'
        }}
      >
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Minutos" />
        <TimeUnit value={timeLeft.seconds} label="Segundos" />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        viewport={{ once: true }}
        className="font-heading tracking-wider uppercase" 
        style={{ fontSize: '1.2rem', letterSpacing: '0.2em', color: 'var(--gold-text)', marginTop: '10px' }}
      >
        18 de Abril 2026
      </motion.p>
    </section>
  );
};

export default Countdown;
