import { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, MapPin, User, ChevronRight } from 'lucide-react';
import './Navbar.css';

const COLLECTIONS = [
  { id: 'todo', label: 'Todo' },
  { id: 'seleccion', label: 'Selección del momento' },
  { id: 'classic', label: 'Colección Classic' },
  { id: 'sport', label: 'Colección Sport' },
  { id: 'diver', label: 'Colección Diver' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
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

      {open && (
        <div className="lw-navmenu" ref={panelRef}>
          <button className="lw-navmenu-item" onClick={() => goToSection('top')}>
            Inicio
          </button>

          <div className="lw-navmenu-group">
            <div className="lw-navmenu-heading">Colección</div>
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                className="lw-navmenu-subitem"
                onClick={() => goToCollection(c.id)}
              >
                <ChevronRight size={13} strokeWidth={1.5} />
                {c.label}
              </button>
            ))}
          </div>

          <button className="lw-navmenu-item" onClick={() => goToSection('garantia')}>
            Garantía
          </button>
          <button className="lw-navmenu-item" onClick={() => goToSection('historia')}>
            Nosotros
          </button>
          <button className="lw-navmenu-item" onClick={() => goToSection('contacto')}>
            Contacto
          </button>
        </div>
      )}
    </header>
  );
}
