import { Menu, Search, MapPin, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="lw-navbar">
      <button className="lw-navbar-side lw-navbar-menu" aria-label="Abrir menú">
        <Menu size={18} strokeWidth={1.5} />
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
    </header>
  );
}
