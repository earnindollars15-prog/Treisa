'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [hero, setHero] = useState({ title: 'Quality Cleaning & Hygiene Products for Everyday Use', content: 'TREISA™ offers reliable, practical, and value-driven solutions designed for the needs of Indian households.' });

  useEffect(() => {
    const getData = async () => {
      if (!supabase) return;

      // Fetch Hero
      const { data: heroData } = await supabase.from('page_sections').select('*').eq('id', 'home_hero').single();
      if (heroData) setHero({ title: heroData.title, content: heroData.content });

      // Fetch Products
      const { data } = await supabase.from('products').select('*');
      if (data && data.length > 0) setProducts(data);
      else {
        // Fallback to static if DB is empty
        setProducts([
          { name: 'Bath Soap', category: 'Bath Soap', slug: 'bath-soap', image: '/assets/bath-soap.jpg' },
          { name: 'Dishwash Bar', category: 'Dishwash Bar', slug: 'dishwash-bar', image: '/assets/dishwash-bar.jpg' },
          { name: 'Detergent Liquid', category: 'Liquid Detergent', slug: 'liquid-detergent', image: '/assets/liquid-detergent.jpg' },
          { name: 'Liquid Hand Clean', category: 'Hand Clean', slug: 'hand-clean', image: '/assets/hand-wash.jpg' }
        ]);
      }
    };
    getData();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="container text-center">
          <h1>{hero.title}</h1>
          <p>{hero.content}</p>
          <div className="hero-btns">
            <Link href="/distributor-enquiry" className="btn btn-primary">Become a Distributor</Link>
            <a href="https://wa.me/message/X4RRHKY5ARLSH1" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Contact on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="container">
        <div className="section-title">
          <h2>Our Product Categories</h2>
          <p>Designed for daily hygiene and household cleaning needs.</p>
        </div>
        <div className="product-grid">
          {products.map((p, i) => (
            <div key={i} className="category-card">
              <img src={p.image_url || p.image} alt={p.name} className="category-img" />
              <h3>{p.name}</h3>
              <Link href={p.slug ? `/products/${p.slug}` : `/products/bath-soap`} className="btn btn-outline">View Details</Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>
          <p>All products are available through authorized distributors. Cash on Delivery available as per location.</p>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="section-title">
            <h2>Why TREISA?</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <h3>Licensed Quality</h3>
              <p>Products manufactured by licensed manufacturers under applicable Indian regulations.</p>
            </div>
            <div className="why-card">
              <h3>Distributor Friendly</h3>
              <p>Business model with transparent policies designed for long-term growth.</p>
            </div>
            <div className="why-card">
              <h3>Home Centric</h3>
              <p>Designed for the practical needs of Indian households.</p>
            </div>
            <div className="why-card">
              <h3>Trust & Partnership</h3>
              <p>Commitment to long-term partnerships and transparent business practices.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
