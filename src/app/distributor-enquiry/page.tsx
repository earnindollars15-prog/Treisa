'use client';

import { useState } from 'react';

export default function DistributorEnquiry() {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        mobile: '',
        business: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Format WhatsApp message
        const message = `*TREISA Distributor Enquiry*%0A%0A` +
            `*Name:* ${formData.name}%0A` +
            `*City/State:* ${formData.city}%0A` +
            `*Mobile:* ${formData.mobile}%0A` +
            `*Business Type:* ${formData.business}%0A` +
            `*Message:* ${formData.message || 'N/A'}`;

        const whatsappUrl = `https://wa.me/919259055546?text=${message}`;

        alert('Thank you for your enquiry. We are redirecting you to WhatsApp for final submission.');
        window.location.href = whatsappUrl;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="container" style={{ paddingTop: '5rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h1 className="section-title">Become a Distributor</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: '15px' }}>
                        <i className="fas fa-handshake" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                        <h4>Long-term Partnership</h4>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: '15px' }}>
                        <i className="fas fa-shield-alt" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                        <h4>Transparent Policies</h4>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: '15px' }}>
                        <i className="fas fa-chart-line" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                        <h4>Growth Potential</h4>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3>Who Can Apply?</h3>
                    <p>We are looking for committed partners who have a strong distribution network in their local area and a passion for hygiene products.</p>
                </div>

                <div className="form-card" style={{ background: 'var(--white)', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #eee', borderRadius: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>City / State</label>
                            <input
                                type="text"
                                name="city"
                                className="form-control"
                                placeholder="e.g. Agra, Uttar Pradesh"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #eee', borderRadius: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                className="form-control"
                                placeholder="Enter your mobile number"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #eee', borderRadius: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Business Type</label>
                            <select
                                name="business"
                                className="form-control"
                                value={formData.business}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #eee', borderRadius: '10px' }}
                            >
                                <option value="">Select Business Type</option>
                                <option value="Wholesaler">Wholesaler</option>
                                <option value="Retailer">Retailer</option>
                                <option value="Distributor">Existing Distributor</option>
                                <option value="New Business">New Business / Individual</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Additional Message (Optional)</label>
                            <textarea
                                name="message"
                                className="form-control"
                                rows={4}
                                placeholder="Tell us about your business setup"
                                value={formData.message}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #eee', borderRadius: '10px', fontFamily: 'inherit' }}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Submit Enquiry</button>
                        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Distributor appointment subject to Shrivandan Industries approval.
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}
