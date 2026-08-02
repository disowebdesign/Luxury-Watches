import { Watch } from 'lucide-react';
import './WatchCard.css';

export default function WatchCard({ watch, onSelect }) {
  return (
    <article className="wc-card" onClick={() => onSelect(watch)} role="button" tabIndex={0}>
      <div className="wc-media">
        {watch.image ? (
          <img src={watch.image} alt={watch.name} className="wc-photo" />
        ) : (
          <div className="wc-placeholder">
            <Watch size={34} strokeWidth={1} />
            <span>Foto pendiente</span>
          </div>
        )}
      </div>
      <div className="wc-info">
        {watch.tag && <div className="wc-tag">{watch.tag}</div>}
        <div className="wc-name">{watch.name}</div>
        <div className="wc-subtitle">{watch.subtitle}</div>
        <div className="wc-price">{watch.price}</div>
      </div>
    </article>
  );
}
