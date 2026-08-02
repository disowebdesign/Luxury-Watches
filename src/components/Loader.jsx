import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

// Loader de marca — el logo por defecto es "Luxury Watches" en texto.
// Para reemplazarlo por el logo real del cliente, ve la nota al final del archivo.
export default function Loader({ minDuration = 2200, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      if (onDone) setTimeout(onDone, 700);
    }, minDuration);
    return () => clearTimeout(t);
  }, [minDuration, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <div className="loader-mark">
            <svg viewBox="0 0 120 120" className="loader-bezel" aria-hidden="true">
              <circle cx="60" cy="60" r="54" className="loader-bezel-track" />
              <motion.circle
                cx="60" cy="60" r="54"
                className="loader-bezel-sweep"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
              <motion.line
                x1="60" y1="60" x2="60" y2="14"
                className="loader-hand"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                style={{ transformOrigin: '60px 60px' }}
              />
            </svg>
          </div>

          <motion.div
            className="loader-word"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
          >
            LUXURY <em>WATCHES</em>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/*
  CÓMO CAMBIAR AL LOGOTIPO REAL DEL CLIENTE
  ------------------------------------------
  1. Coloca el archivo del logo (SVG o PNG con fondo transparente,
     idealmente en tono claro) en: src/assets/logo.svg
  2. Reemplaza el bloque <motion.div className="loader-word"> por:

     <motion.img
       src={logo}
       alt="Logo"
       className="loader-logo-img"
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
     />

     y agrega arriba del componente: import logo from '../assets/logo.svg';
  3. Ajusta el tamaño en Loader.css con la clase .loader-logo-img
*/
