'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const Navbar = () => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            if (!supabase) {
                setIsLoading(false);
                return;
            }
            try {
                const { data } = await supabase
                    .from('site_settings')
                    .select('logo_url')
                    .single();
                if (data?.logo_url) {
                    setLogoUrl(data.logo_url);
                }
            } catch (err) {
                console.error("Logo fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <header>
            <div className={`nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            <div className="container navbar">
                <Link href="/" className="logo-container" onClick={closeMenu}>
                    {isLoading ? (
                        <div className="logo-loading-wrapper">
                            <div className="logo-ring"></div>
                        </div>
                    ) : logoUrl ? (
                        <div className="logo-loading-wrapper" style={{ width: 'auto' }}>
                            {!isImageLoaded && <div className="logo-ring"></div>}
                            <img
                                src={logoUrl}
                                alt="TREISA"
                                className={`logo-img ${isImageLoaded ? 'loaded' : ''}`}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </div>
                    ) : (
                        <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px' }}>TREISA™</span>
                    )}
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                    <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </button>

                <nav className={isMenuOpen ? "nav-active" : ""}>
                    <ul className="nav-links">
                        <li><Link href="/" className="nav-item" onClick={closeMenu}>Home</Link></li>
                        <li><Link href="/#products" className="nav-item" onClick={closeMenu}>Products</Link></li>
                        <li><Link href="/about" className="nav-item" onClick={closeMenu}>About Us</Link></li>
                        <li><Link href="/distributor-enquiry" className="nav-item" onClick={closeMenu}>Distributor Enquiry</Link></li>
                        <li><Link href="/contact" className="nav-item" onClick={closeMenu}>Contact Us</Link></li>
                    </ul>

                    <div className="right-side-actions">
                        <div className="desktop-socials">
                            <a href="https://facebook.com/share/1SgNF8k2ht/" target="_blank" rel="noopener noreferrer" title="Facebook"><i className="fab fa-facebook"></i></a>
                            <a href="https://instagram.com/treisadailycare?igsh=cHFpYWowdnkzdW96" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="https://wa.me/message/X4RRHKY5ARLSH1" target="_blank" rel="noopener noreferrer" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                        </div>
                        <Link href="/admin/login" className="btn btn-outline" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }} onClick={closeMenu}>
                            Admin
                        </Link>
                    </div>

                    <div className="mobile-socials">
                        <a href="https://facebook.com/share/1SgNF8k2ht/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="https://instagram.com/treisadailycare?igsh=cHFpYWowdnkzdW96" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://wa.me/message/X4RRHKY5ARLSH1" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
