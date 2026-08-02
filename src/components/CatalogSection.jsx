import { useState, useMemo, useEffect } from 'react';
import CollectionFilters from './CollectionFilters';
import CatalogCarousel from './CatalogCarousel';
import CatalogGrid from './CatalogGrid';
import WatchModal from './WatchModal';
import collections, { allWatches } from '../data/catalog';
import './CatalogSection.css';

export default function CatalogSection() {
  const [active, setActive] = useState(collections[0].id);
  const [selected, setSelected] = useState(null);

  // Permite que el menú de navegación (Navbar) cambie el filtro activo
  // al elegir una colección desde el desplegable.
  useEffect(() => {
    const onSetCollection = (e) => setActive(e.detail);
    window.addEventListener('lw:setCollection', onSetCollection);
    return () => window.removeEventListener('lw:setCollection', onSetCollection);
  }, []);

  const activeWatches = useMemo(() => {
    if (active === 'todo') return allWatches;
    return collections.find((c) => c.id === active)?.watches ?? [];
  }, [active]);

  return (
    <section id="coleccion" className="cat-section">
      <CollectionFilters collections={collections} active={active} onChange={setActive} />

      {active === 'todo' ? (
        <CatalogGrid watches={activeWatches} onSelect={setSelected} />
      ) : (
        <CatalogCarousel watches={activeWatches} onSelect={setSelected} />
      )}

      {selected && <WatchModal watch={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
