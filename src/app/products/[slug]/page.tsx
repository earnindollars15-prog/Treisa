'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (data) {
                setProduct(data);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading Product...</div>;

    if (!product) return (
        <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>
            <h2>Product Not Found</h2>
            <Link href="/" style={{ color: 'var(--primary)' }}>Back to Home</Link>
        </div>
    );

    return (
        <main className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <Link href="/#products" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                <i className="fas fa-arrow-left"></i> Back to Products
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem', alignItems: 'start' }}>
                <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                    <img
                        src={product.image_url || '/assets/bath-soap.jpg'}
                        alt={product.name}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px', boxShadow: 'var(--shadow)' }}
                    />
                </div>

                <div className="product-info">
                    <div style={{ display: 'inline-block', background: 'var(--accent)', color: 'white', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Authorized Distributors Only
                    </div>
                    <h1>TREISA™ {product.name}</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>{product.description || 'Quality cleaning product from TREISA.'}</p>

                    <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>Product Description</h4>
                        <p>{product.description}</p>
                    </div>

                    {product.usage_instructions && (
                        <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>How to Use</h4>
                            <p>{product.usage_instructions}</p>
                        </div>
                    )}

                    {product.safety_info && (
                        <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>Safety Information</h4>
                            <p>{product.safety_info}</p>
                        </div>
                    )}

                    <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>Manufacturing & Marketing</h4>
                        <p>Manufactured by licensed third-party manufacturers under applicable Indian regulations.</p>
                        <p><strong>Marketed by:</strong> Shrivandan Industries (Brand: TREISA™)</p>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                        All products are available through authorized distributors. Cash on Delivery available as per location.
                    </p>

                    <div style={{ marginTop: '2rem' }}>
                        <Link href="/distributor-enquiry" className="btn btn-primary">Enquire for Distribution</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
