import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const RSVP = () => {
  const whatsappNumber = "5491164865600"; // Placeholder
  const message = "¡Hola Delfina! Confirmo mi asistencia a tu fiesta de 15 años. ¡Muchas gracias por la invitación!";

  const handleConfirm = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section-padding flex flex-col items-center pb-32">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center max-w-2xl px-6"
      >
        <h2 className="text-4xl md:text-5xl mb-8 font-heading" style={{ color: 'var(--black-text)' }}>¿Me acompañás?</h2>
        <p className="font-serif text-lg md:text-xl mb-10" style={{ color: 'var(--gold-text)' }}>
          Por favor, confirmá tu asistencia para poder organizar todo perfectamente.
        </p>

        <motion.button
          onClick={handleConfirm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-3 px-10 py-5 text-xl group mx-auto mb-10 shadow-lg"
        >
          Confirmar Asistencia
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.button>

        <p className="text-sm opacity-60 uppercase tracking-widest italic font-serif">
          Te espero con mucha ilusión
        </p>
      </motion.div>
    </section>
  );
};

export default RSVP;
