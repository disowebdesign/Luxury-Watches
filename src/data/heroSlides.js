// Diapositivas del hero — se editan desde el panel de admin (/admin),
// pestaña "Portada (Hero)". No edites este archivo a mano.

import heroData from './heroSlides.json';

const heroSlides = (heroData.slides || []).map((slide, i) => ({
  id: `slide-${i + 1}`,
  ...slide,
}));

export default heroSlides;
