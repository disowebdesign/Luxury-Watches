import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, MapPin, User, ChevronDown } from 'lucide-react';
import './Navbar.css';

const COLLECTIONS = [
  { id: 'todo', label: 'Todo' },
  { id: 'seleccion', label: 'Selección del momento' },
  { id: 'classic', label: 'Colección Classic' },
  { id: 'sport', label: 'Colección Sport' },
  { id: 'diver', label: 'Colección Diver' },
];

const NAV_ITEMS = [
  { id: 'top', label: 'Inicio' },
  { id: 'garantia', label: 'Garantía' },
  { id: 'historia', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setCollectionsOpen(false);
  }, [open]);

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const goToCollection = (id) => {
    window.dispatchEvent(new CustomEvent('lw:setCollection', { detail: id }));
    document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="lw-navbar">
      <button
        className="lw-navbar-side lw-navbar-menu"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        <span>Menú</span>
      </button>

      <button className="lw-navbar-search" aria-label="Buscar">
        <Search size={16} strokeWidth={1.5} />
        <span>Buscar</span>
      </button>

      <a href="#top" className="lw-navbar-brand">
        Luxury<span>Watches</span>
      </a>

      <div className="lw-navbar-side lw-navbar-right">
        <a href="#contacto" className="lw-navbar-contact">Contáctanos</a>
        <button aria-label="Encuentra una boutique"><MapPin size={17} strokeWidth={1.5} /></button>
        <button aria-label="Mi cuenta"><User size={17} strokeWidth={1.5} /></button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="lw-navmenu-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="lw-navmenu"
              ref={panelRef}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="lw-navmenu-item" onClick={() => goToSection('top')}>
                Inicio
              </button>

              <div className="lw-navmenu-collapsible">
                <button
                  className="lw-navmenu-item lw-navmenu-toggle"
                  aria-expanded={collectionsOpen}
                  onClick={() => setCollectionsOpen((o) => !o)}
                >
                  Colección
                  <motion.span
                    className="lw-navmenu-chevron"
                    animate={{ rotate: collectionsOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown size={15} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {collectionsOpen && (
                    <motion.div
                      className="lw-navmenu-group"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {COLLECTIONS.map((c) => (
                        <button
                          key={c.id}
                          className="lw-navmenu-subitem"
                          onClick={() => goToCollection(c.id)}
                        >
                          {c.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_ITEMS.slice(1).map((item) => (
                <button
                  key={item.id}
                  className="lw-navmenu-item"
                  onClick={() => goToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
