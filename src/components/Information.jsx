import { MapPin, Clock, Calendar, Gift, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import slipperImg from '../assets/slipper.png';

const Information = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="section-padding">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {/* Dress Code & Slipper */}
        <div className="text-center flex flex-col items-center">
          <p className="font-heading border-b border-gold-text inline-block pb-1"
            style={{ borderBottomColor: 'var(--gold-text)', color: 'var(--gold-text)', fontSize: 'var(--dress-code-size)' }}>
            <b>Dress Code:</b>
            <br /> Elegante / Elegante Sport
          </p>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={slipperImg}
              alt="Zapato de cristal"
              className="mx-auto mt-6 opacity-90"
              style={{ filter: 'url(#remove-white)', width: 'var(--slipper-width)', height: 'auto' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section >
  );
};

export default Information;
