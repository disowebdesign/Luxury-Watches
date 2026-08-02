// Catálogo — ahora se arma automáticamente a partir de los archivos JSON
// en src/data/watches/, que es donde Decap CMS guarda cada reloj que tu
// cliente edita desde el panel de admin (/admin). No edites este archivo
// para agregar o cambiar relojes: eso se hace desde el panel.

const watchModules = import.meta.glob('./watches/*.json', { eager: true });

const collectionLabels = {
  seleccion: 'Selección del momento',
  classic: 'Colección Classic',
  sport: 'Colección Sport',
  diver: 'Colección Diver',
};

const watchesByCollection = {};

Object.entries(watchModules).forEach(([path, mod]) => {
  const watch = mod.default;
  const id = path.split('/').pop().replace('.json', '');
  const images = (watch.images || []).map((img) => img || '');
  while (images.length < 3) images.push('');

  const entry = { id, ...watch, images };
  const key = watch.collection || 'seleccion';
  if (!watchesByCollection[key]) watchesByCollection[key] = [];
  watchesByCollection[key].push(entry);
});

const collections = Object.keys(collectionLabels).map((key) => ({
  id: key,
  label: collectionLabels[key],
  watches: watchesByCollection[key] || [],
}));

// "Todo" — junta automáticamente los relojes de todas las colecciones.
export const allWatches = collections.flatMap((c) => c.watches);

export default collections;
