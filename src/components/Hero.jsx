import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, ArrowLeft, ArrowRight, Watch } from 'lucide-react';
import Navbar from './Navbar';
import heroSlides from '../data/heroSlides';
import './Hero.css';

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);

  const slide = heroSlides[index];

  const goTo = useCallback((i) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [index, playing, next]);

  return (
    <section id="top" className="lw-hero">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="lw-hero-stage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {/* ── Fondo ambiental ── */}
          <div className="lw-hero-bg" />

          {/* ── Espacio para la fotografía del reloj ──
              Reemplaza este bloque por:
              <img src={slide.image} alt={slide.imageAlt} className="lw-hero-photo" />
              Medida recomendada: 1600x1400px, fondo transparente o
              recortado, reloj centrado ligeramente por encima del centro. */}
          <motion.div
            className="lw-hero-photo-slot"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {slide.image ? (
              <img src={slide.image} alt={slide.imageAlt} className="lw-hero-photo" />
            ) : (
              <div className="lw-hero-placeholder">
                <Watch size={56} strokeWidth={1} />
                <span>Espacio para fotografía del reloj</span>
                <span className="lw-hero-placeholder-dim">recomendado 1600×1400px</span>
              </div>
            )}
          </motion.div>

          <div className="lw-hero-scrim" />

          {/* ── Texto superpuesto ── */}
          <div className="lw-hero-copy">
            <motion.div
              className="lw-hero-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {slide.eyebrow}
            </motion.div>
            <motion.h1
              className="lw-hero-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7 }}
            >
              {slide.title} <em>{slide.titleEm}</em>
            </motion.h1>
            <motion.div
              className="lw-hero-links"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.7 }}
            >
              <a href={slide.ctaPrimaryHref}>{slide.ctaPrimaryLabel}</a>
              <a href={slide.ctaSecondaryHref}>{slide.ctaSecondaryLabel}</a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Controles del carrusel ── */}
      <div className="lw-hero-controls">
        <button
          className="lw-hero-play"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <div className="lw-hero-dots">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              className={`lw-hero-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
            >
              {i === index && (
                <motion.span
                  className="lw-hero-dot-fill"
                  key={slide.id + '-fill'}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: playing ? 1 : 0 }}
                  transition={{ duration: playing ? SLIDE_DURATION / 1000 : 0.3, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="lw-hero-arrows">
          <button onClick={prev} aria-label="Diapositiva anterior"><ArrowLeft size={18} /></button>
          <button onClick={next} aria-label="Siguiente diapositiva"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
