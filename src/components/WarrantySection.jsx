import { ShieldCheck, BadgeCheck, Wrench, Undo2 } from 'lucide-react';
import './WarrantySection.css';

const features = [
  {
    icon: ShieldCheck,
    title: 'Garantía internacional',
    text: '2 años de garantía en movimiento y componentes, válida en cualquiera de nuestras boutiques.',
  },
  {
    icon: BadgeCheck,
    title: 'Autenticidad certificada',
    text: 'Cada reloj se entrega con certificado de origen y número de serie verificado.',
  },
  {
    icon: Wrench,
    title: 'Servicio y mantenimiento',
    text: 'Talleres autorizados para revisión, ajuste y mantenimiento preventivo de tu pieza.',
  },
  {
    icon: Undo2,
    title: 'Asesoría sin compromiso',
    text: '15 días para cambios si la pieza no cumple tus expectativas, sin preguntas.',
  },
];

export default function WarrantySection() {
  return (
    <section id="garantia" className="ws-section">
      <div className="ws-header">
        <div className="ws-eyebrow">Confianza</div>
        <h2 className="ws-title">Garantía <em>&amp;</em> Servicio</h2>
      </div>

      <div className="ws-grid">
        {features.map((f) => (
          <div className="ws-card" key={f.title}>
            <f.icon size={28} strokeWidth={1.4} className="ws-icon" />
            <h3 className="ws-card-title">{f.title}</h3>
            <p className="ws-card-text">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
