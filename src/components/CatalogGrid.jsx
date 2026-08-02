import WatchCard from './WatchCard';
import './CatalogGrid.css';

export default function CatalogGrid({ watches, onSelect }) {
  return (
    <div className="cg-grid">
      {watches.map((w) => (
        <WatchCard key={w.id} watch={w} onSelect={onSelect} />
      ))}
    </div>
  );
}
