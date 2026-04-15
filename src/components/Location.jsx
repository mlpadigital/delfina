import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const RSVP = () => {
  const mapUrl = "https://www.google.com/maps/place/Sal%C3%B3n+Costa+Luj%C3%A1n/@-34.5541741,-59.2643043,12z/data=!4m10!1m2!2m1!1sEx+ruta+7+y+R%C3%ADo+Luj%C3%A1n,+Buenos+Aires!3m6!1s0x95bc7de43724518d:0x10c6c40add0eaedc!8m2!3d-34.5541741!4d-59.1201087!15sCiVFeCBydXRhIDcgeSBSw61vIEx1asOhbiwgQnVlbm9zIEFpcmVzWiYiJGV4IHJ1dGEgNyB5IHLDrW8gbHVqw6FuIGJ1ZW5vcyBhaXJlc5IBFmZ1bmN0aW9uX3Jvb21fZmFjaWxpdHmaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTjFjVTAzVW01QlJSQULgAQD6AQQIJhAi!16s%2Fg%2F11cmnjgg0s?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D";

  const handleConfirm = () => {
    window.open(mapUrl, '_blank');
  };

  return (
    <section className="pt-8 md:pt-16 pb-32 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center max-w-2xl px-6"
      >
        <h2 className="text-4xl md:text-5xl mb-8 font-heading" style={{ color: 'var(--black-text)' }}>¿Cómo llegar?</h2>
        <p className="font-serif text-lg md:text-xl mb-10" style={{ color: 'var(--gold-text)' }}>
          Hacé clic en el siguiente botón para ver la ubicación del salón en Google Maps.
        </p>

        <motion.button
          onClick={handleConfirm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-3 px-10 py-5 text-xl group mx-auto mb-10 shadow-lg"
        >
          Como llegar al lugar
          <MapPin className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.button>

        <p className="text-sm opacity-60 uppercase tracking-widest italic font-serif">
          Te espero con mucha ilusión
        </p>
      </motion.div>
    </section>
  );
};

export default RSVP;
