import React, { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

import { getFeaturedProducts } from '../data/products';
import { testimonials } from '../data/testimonials';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const { hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only smooth‐scroll in if we arrived via a PUSH to /#products,
    // not on an initial load or a browser refresh (POP).
    if (hash === '#products' && navigationType === 'PUSH') {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash, navigationType]);

  return (
    <>
      <Hero />

      <section id="products">
        <FeaturedProducts products={featuredProducts} />
      </section>

      <About />
      <Testimonials testimonials={testimonials} />
      <Contact />
    </>
  );
};

export default Home;
