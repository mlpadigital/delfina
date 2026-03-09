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
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        {/* Date & Time */}
        <motion.div variants={itemVariants} className="glass-card pt-19 pb-10 px-6 text-center flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} className="mt-4">
            <Calendar className="w-8 h-8 mb-6" style={{ color: 'var(--gold-text)' }} />
          </motion.div>
          <h3 className="text-2xl mb-4 font-heading" style={{ color: 'var(--gold-text)' }}>FECHA</h3>
          <p className="font-serif uppercase tracking-wider" style={{ color: 'var(--black-text)', fontSize: 'var(--info-p-size)' }}>Sábado 18 de Abril, 2026</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card pt-19 pb-10 px-6 text-center flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} className="mt-4">
            <Clock className="w-8 h-8 mb-6" style={{ color: 'var(--gold-text)' }} />
          </motion.div>
          <h3 className="text-2xl mb-4 font-heading" style={{ color: 'var(--gold-text)' }}>HORARIO</h3>
          <p className="font-serif uppercase tracking-wide" style={{ color: 'var(--black-text)', fontSize: 'var(--info-p-size)' }}>21:00hs</p>
        </motion.div>

        {/* Location */}
        <motion.div variants={itemVariants} className="glass-card pt-19 pb-10 px-6 text-center flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }} className="mt-4">
            <MapPin className="w-8 h-8 mb-6" style={{ color: 'var(--gold-text)' }} />
          </motion.div>
          <h3 className="text-2xl mb-4 font-heading" style={{ color: 'var(--gold-text)' }}>LUGAR</h3>
          <p className="font-serif uppercase tracking-wide" style={{ color: 'var(--black-text)', fontSize: 'var(--info-p-size)' }}>Salón Costa Luján</p>
          <p className="font-serif text-sm opacity-80 mb-6" style={{ color: 'var(--gold-text)' }}>Ex ruta 7 y Río Luján, Buenos Aires</p>
          <a
            href="https://www.google.com/maps/place/Sal%C3%B3n+Costa+Luj%C3%A1n/@-34.5541741,-59.2643043,12z/data=!4m10!1m2!2m1!1sEx+ruta+7+y+R%C3%ADo+Luj%C3%A1n,+Buenos+Aires!3m6!1s0x95bc7de43724518d:0x10c6c40add0eaedc!8m2!3d-34.5541741!4d-59.1201087!15sCiVFeCBydXRhIDcgeSBSw61vIEx1asOhbiwgQnVlbm9zIEFpcmVzWiYiJGV4IHJ1dGEgNyB5IHLDrW8gbHVqw6FuIGJ1ZW5vcyBhaXJlc5IBFmZ1bmN0aW9uX3Jvb21fZmFjaWxpdHmaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTjFjVTAzVW01QlJSQULgAQD6AQQIJhAi!16s%2Fg%2F11cmnjgg0s?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            VER MAPA
          </a>
        </motion.div>

        {/* Gift Info */}
        <motion.div variants={itemVariants} className="glass-card pt-19 pb-10 px-6 text-center flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.3, rotate: -10 }} whileTap={{ scale: 0.9 }} className="mt-4">
            <Gift className="w-8 h-8 mb-6" style={{ color: 'var(--gold-text)' }} />
          </motion.div>
          <h3 className="text-2xl mb-4 font-heading" style={{ color: 'var(--gold-text)' }}>REGALOS</h3>
          <p className="font-serif mb-6 text-sm md:text-base" style={{ color: 'var(--black-text)' }}>
            Tu presencia es lo más importante para mí. Si igualmente querés hacerme un regalo, podés hacerlo mediante el siguiente alias:
          </p>
          <h3 className="font-serif text-sm border border-gold-text/25 p-3 rounded" style={{ color: 'var(--gold-text)' }}>
            Alias: <b>delfiluzmp</b> | Nombre:Delfina Luz Veltri
          </h3>
        </motion.div>
      </motion.div>

      {/* Dress Code & Slipper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mt-20 text-center flex flex-col items-center"
      >
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
      </motion.div>
    </section >
  );
};

export default Information;
