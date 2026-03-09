import { motion } from 'framer-motion';
import carriageImg from '../assets/carriage.png';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        {/* Carriage Decoration */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={carriageImg}
            alt="Carroza de Delfina"
            className="mx-auto mb-8 opacity-90"
            style={{
              filter: 'url(#remove-white)',
              width: 'var(--carriage-width)',
              height: 'auto'
            }}
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="block uppercase tracking-[0.3em] text-sm md:text-base mb-2 font-serif"
          style={{ color: 'var(--gold-text)' }}
        >
          <h1>Mis 15 Años</h1>
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
          className="mb-8 font-script"
          style={{ color: 'var(--black-text)', fontSize: 'var(--hero-title-size)', margin: '0' }}
        >
          Delfi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="font-serif italic mx-auto px-4"
          style={{
            color: 'var(--gold-text)',
            lineHeight: '1.4',
            fontSize: 'var(--hero-quote-size)',
            maxWidth: '800px',
            marginBottom: '3rem'
          }}>
          "Entre sueños, ilusión y un poquito de magia, llega la noche que imaginé desde niña. Te invito a ser parte de este momento único y celebrar juntos mis 15 años."
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-2xl mt-8"
          style={{ color: 'var(--gold-text)' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
