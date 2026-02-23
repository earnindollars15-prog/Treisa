'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function About() {
    const [about, setAbout] = useState({ title: 'Quality. Commitment. Trust.', content: 'TREISA™ is a Bharatiya brand offering a range of household cleaning and personal hygiene products designed for everyday use. The brand focuses on providing reliable, practical, and value-driven solutions suited to the needs of Bharatiya households.\n\nTREISA™ is a brand of Shrivandan Industries, a registered proprietorship business operating in Bharat. Shrivandan Industries is responsible for the marketing, distribution, and brand management of all products offered under the TREISA™ brand.\n\nAll TREISA™ products are manufactured by licensed third-party manufacturers in compliance with applicable Indian laws and regulatory requirements. Shrivandan Industries does not own or operate any manufacturing facilities and does not manufacture the products directly. The products are marketed under the TREISA™ brand following applicable labeling, safety, and compliance standards.' });

    useEffect(() => {
        const getAbout = async () => {
            if (!supabase) return;
            const { data } = await supabase.from('page_sections').select('*').eq('id', 'about_story').single();
            if (data) setAbout({ title: data.title, content: data.content });
        };
        getAbout();
    }, []);

    return (
        <main className="container" style={{ paddingTop: '5rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="section-title">{about.title}</h1>

                <div style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>
                    {about.content}
                </div>

                <div className="business-details" style={{
                    background: 'var(--bg-light)',
                    padding: '2rem',
                    borderRadius: '15px',
                    margin: '3rem 0',
                    border: '1px solid #ddd'
                }}>
                    <h3>Business Details</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', width: '40%', color: 'var(--text-muted)' }}>Legal Entity Name</th>
                                <td style={{ padding: '1rem' }}>Shrivandan Industries</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)' }}>Business Constitution</th>
                                <td>Proprietorship</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)' }}>Brand Name</th>
                                <td>TREISA™</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)' }}>Udyam Registration</th>
                                <td>UDYAM-UP-01-0161315</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', borderTop: '1px solid #eee', paddingTop: '2rem', marginTop: '3rem' }}>
                    <h4>Disclosure</h4>
                    <ul>
                        <li>Product availability may vary by location and distributor coverage</li>
                        <li>Product images and packaging shown are for representation purposes only</li>
                        <li>Specifications and packaging may change without prior notice</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
