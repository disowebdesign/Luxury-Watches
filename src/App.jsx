import { useState } from 'react';
import Loader from './components/Loader';
import Hero from './components/Hero';
import CatalogSection from './components/CatalogSection';
import WarrantySection from './components/WarrantySection';
import AboutSection from './components/AboutSection';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Hero />
      <CatalogSection />
      <WarrantySection />
      <AboutSection />
    </>
  );
}
