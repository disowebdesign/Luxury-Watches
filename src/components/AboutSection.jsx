import { Watch } from 'lucide-react';
import './AboutSection.css';

const stats = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '2,400', label: 'Relojes entregados' },
  { value: '5', label: 'Colecciones activas' },
];

export default function AboutSection() {
  return (
    <section id="historia" className="as-section">
      <div className="as-media">
        {/* Espacio para foto de boutique / taller / fundador.
            Reemplaza este bloque por: <img src={...} className="as-photo" /> */}
        <div className="as-placeholder">
          <Watch size={48} strokeWidth={1} />
          <span>Espacio para fotografía de boutique o taller</span>
        </div>
      </div>

      <div className="as-copy">
        <div className="as-eyebrow">Quiénes somos</div>
        <h2 className="as-title">Precisión que<br /><em>se hereda</em></h2>
        <p className="as-text">
          Luxury Watches nació de una idea simple: un reloj no solo marca la hora,
          marca un momento. Seleccionamos cada pieza de nuestro catálogo con el
          mismo criterio con el que un relojero elige un movimiento — por su
          precisión, su historia y la manera en que envejece con quien lo usa.
        </p>
        <p className="as-text">
          Trabajamos directamente con talleres certificados para ofrecerte
          piezas auténticas, con garantía real y acompañamiento después de la
          compra. No vendemos relojes; ayudamos a encontrar el que ya es tuyo.
        </p>

        <div className="as-stats">
          {stats.map((s) => (
            <div className="as-stat" key={s.label}>
              <div className="as-stat-value">{s.value}</div>
              <div className="as-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
