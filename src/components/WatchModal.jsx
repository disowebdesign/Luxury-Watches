import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Watch } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config';
import './WatchModal.css';

export default function WatchModal({ watch, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = watch.images && watch.images.length > 0 ? watch.images : [''];

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const next = () => setImgIndex((i) => (i + 1) % images.length);
  const prev = () => setImgIndex((i) => (i - 1 + images.length) % images.length);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, me interesa reservar el reloj ${watch.name} (${watch.subtitle}).`
  )}`;

  return (
    <AnimatePresence>
      <motion.div
        className="wm-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <button className="wm-close" onClick={onClose} aria-label="Cerrar">
          <X size={22} />
        </button>

        <div className="wm-layout">
          {/* ── Galería ── */}
          <div className="wm-gallery">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                className="wm-gallery-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {images[imgIndex] ? (
                  <img src={images[imgIndex]} alt={watch.name} className="wm-photo" />
                ) : (
                  <div className="wm-placeholder">
                    <Watch size={64} strokeWidth={1} />
                    <span>Foto {imgIndex + 1} de {images.length} — pendiente</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button className="wm-nav wm-nav-prev" onClick={prev} aria-label="Foto anterior">
                  <ChevronLeft size={22} />
                </button>
                <button className="wm-nav wm-nav-next" onClick={next} aria-label="Siguiente foto">
                  <ChevronRight size={22} />
                </button>
                <div className="wm-thumbs">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`wm-thumb ${i === imgIndex ? 'active' : ''}`}
                      onClick={() => setImgIndex(i)}
                      aria-label={`Ver foto ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Panel de compra ── */}
          <div className="wm-panel">
            <div className="wm-panel-inner">
              {watch.tag && <div className="wm-tag">{watch.tag}</div>}
              <h1 className="wm-name">{watch.name}</h1>
              <div className="wm-subtitle">{watch.subtitle}</div>

              <div className="wm-price">{watch.price}</div>

              <p className="wm-desc">{watch.description}</p>

              <div className="wm-specs">
                <div className="wm-spec"><span>Movimiento</span><em>{watch.subtitle}</em></div>
                <div className="wm-spec"><span>Material</span><em>Acero inoxidable</em></div>
                <div className="wm-spec"><span>Cristal</span><em>Zafiro antirreflejante</em></div>
                <div className="wm-spec"><span>Garantía</span><em>2 años internacional</em></div>
              </div>

              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="wm-whatsapp">
                Reservar por WhatsApp →
              </a>
              <div className="wm-note">Sin pago en línea — la reserva se confirma directamente con nuestro equipo.</div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
