import './CollectionFilters.css';

export default function CollectionFilters({ collections, active, onChange }) {
  return (
    <div className="cf-wrap">
      <button
        className={`cf-pill ${active === 'todo' ? 'active' : ''}`}
        onClick={() => onChange('todo')}
      >
        Todo
      </button>
      {collections.map((c) => (
        <button
          key={c.id}
          className={`cf-pill ${active === c.id ? 'active' : ''}`}
          onClick={() => onChange(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
