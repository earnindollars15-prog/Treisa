export default function Contact() {
    return (
        <main className="container" style={{ paddingTop: '5rem' }}>
            <h1 className="section-title">Contact Us</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'start'
            }}>
                <div>
                    <p>For product information, distributor enquiries, or business-related queries, feel free to get in touch with us using the details below.</p>

                    <div className="contact-card" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
                        <h3>Business Details</h3>
                        <p><strong>Name:</strong> Shrivandan Industries</p>
                        <p><strong>Brand:</strong> TREISA™</p>
                        <p><strong>Location:</strong> Agra, Uttar Pradesh, India</p>
                    </div>

                    <div className="contact-card" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
                        <h3>Direct Communication</h3>
                        <p><i className="fab fa-whatsapp"></i> +91 9259055546</p>
                        <p><i className="fas fa-envelope"></i> info@treisa.in</p>
                    </div>

                    <div className="contact-card" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
                        <h3>Business Hours</h3>
                        <p>Monday to Saturday: 10:00 AM – 6:00 PM</p>
                        <p>(Sundays & public holidays closed)</p>
                    </div>
                </div>

                <div>
                    <h3>Connect With Us</h3>
                    <p>Follow TREISA™ on our official social media channels:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        <a href="https://www.facebook.com/share/1SgNF8k2ht/" className="social-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem', background: 'var(--white)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
                            <i className="fab fa-facebook" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> Facebook
                        </a>
                        <a href="https://www.instagram.com/treisadailycare?igsh=cHFpYWowdnkzdW96" className="social-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem', background: 'var(--white)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
                            <i className="fab fa-instagram" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> Instagram
                        </a>
                        <a href="https://wa.me/message/X4RRHKY5ARLSH1" className="social-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem', background: 'var(--white)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
                            <i className="fab fa-whatsapp" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> WhatsApp
                        </a>
                        <a href="https://t.me/treiSadailycare" className="social-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem', background: 'var(--white)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
                            <i className="fab fa-telegram" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> Telegram
                        </a>
                        <a href="https://whatsapp.com/channel/0029VbC37zE7dmeaUSdp0p3O" className="social-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem', background: 'var(--white)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
                            <i className="fas fa-bullhorn" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> WhatsApp Channel
                        </a>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', background: '#fff8e1', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ffc107', marginTop: '2rem' }}>
                        <strong>Note:</strong>
                        <ul>
                            <li>Product availability may vary by location</li>
                            <li>No walk-in sales or public dealing at this address</li>
                            <li>Communication only through authorized business channels</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
