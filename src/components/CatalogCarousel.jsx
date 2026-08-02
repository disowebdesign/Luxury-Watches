import { useRef, useState, useEffect, useCallback } from 'react';
import { Pause, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import WatchCard from './WatchCard';
import './CatalogCarousel.css';

const AUTO_MS = 4500;

export default function CatalogCarousel({ watches, onSelect }) {
  const trackRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [page, setPage] = useState(0);
  const pages = watches.length; // un "paso" por reloj, simple y predecible

  const scrollToPage = useCallback((p) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.wc-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24; // + gap
    const next = (p + pages) % pages;
    track.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
    setPage(next);
  }, [pages]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => scrollToPage(page + 1), AUTO_MS);
    return () => clearTimeout(t);
  }, [page, playing, scrollToPage]);

  // Reinicia el índice de página cuando cambia la colección activa
  useEffect(() => {
    setPage(0);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: 0 });
  }, [watches]);

  return (
    <div className="cc-wrap">
      <div className="cc-track" ref={trackRef}>
        {watches.map((w) => (
          <WatchCard key={w.id} watch={w} onSelect={onSelect} />
        ))}
      </div>

      <div className="cc-controls">
        <button
          className="cc-play"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <div className="cc-dots">
          {watches.map((w, i) => (
            <button
              key={w.id}
              className={`cc-dot ${i === page ? 'active' : ''}`}
              onClick={() => scrollToPage(i)}
              aria-label={`Ir al reloj ${i + 1}`}
            />
          ))}
        </div>

        <div className="cc-arrows">
          <button onClick={() => scrollToPage(page - 1)} aria-label="Anterior"><ArrowLeft size={18} /></button>
          <button onClick={() => scrollToPage(page + 1)} aria-label="Siguiente"><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
