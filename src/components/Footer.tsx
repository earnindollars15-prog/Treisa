'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const Footer = () => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            if (!supabase) return;
            const { data } = await supabase
                .from('site_settings')
                .select('logo_url')
                .single();
            if (data?.logo_url) setLogoUrl(data.logo_url);
        };
        fetchSettings();
    }, []);

    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <Link href="/" className="logo" style={{ display: 'inline-block', marginBottom: '1.5rem', height: '50px' }}>
                            {logoUrl ? (
                                <img src={logoUrl} alt="TREISA" style={{ height: '50px', width: 'auto', display: 'block' }} />
                            ) : (
                                <h3 style={{ color: 'var(--white)', margin: 0 }}>TREISA™</h3>
                            )}
                        </Link>
                        <p>A brand of Shrivandan Industries</p>
                        <p>Household Cleaning & Personal Hygiene Products</p>
                        <p style={{ marginTop: '1rem' }}><i className="fas fa-map-marker-alt"></i> Agra, Uttar Pradesh, India</p>
                    </div>
                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/distributor-enquiry">Distributor Enquiry</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Legal & Policies</h3>
                        <ul className="footer-links">
                            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms">Terms & Conditions</Link></li>
                            <li><Link href="/legal/refund">Refund & Return Policy</Link></li>
                            <li><Link href="/legal/shipping">Shipping & Distributor Supply Policy</Link></li>
                            <li><Link href="/legal/disclaimer">Disclaimer</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Connect With Us</h3>
                        <ul className="footer-links" style={{ display: 'flex', gap: '15px', fontSize: '1.5rem' }}>
                            <li><a href="https://www.facebook.com/share/1SgNF8k2ht/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="https://www.instagram.com/treisadailycare?igsh=cHFpYWowdnkzdW96" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="https://wa.me/message/X4RRHKY5ARLSH1" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025–Present TREISA™. All rights reserved.</p>
                    <p>TREISA™ is a brand of Shrivandan Industries (Proprietorship).</p>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Design and developed by BOOST BY TECH</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
