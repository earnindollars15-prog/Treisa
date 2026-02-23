import React from 'react';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || '';
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
        title: `${title} | TREISA™`,
    };
}

import { supabase } from '@/lib/supabase';

export default async function LegalPage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || '';

    const formatting: Record<string, string> = {
        'privacy': 'Privacy Policy',
        'terms': 'Terms & Conditions',
        'refund': 'Refund & Return Policy',
        'shipping': 'Shipping & Distributor Supply Policy',
        'disclaimer': 'Disclaimer'
    };

    const title = formatting[slug] || (slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Policy');

    // Fetch dynamic content from Supabase based on the slug
    // Assuming the admin panel saves legal pages with IDs matching 'legal_slug'
    let content = null;
    if (supabase) {
        const { data } = await supabase
            .from('page_sections')
            .select('content')
            .eq('id', `legal_${slug}`)
            .single();

        if (data && data.content) {
            content = data.content;
        }
    }

    return (
        <div className="container" style={{ padding: '8rem 20px', minHeight: '60vh' }}>
            <h1 className="section-title">{title}</h1>
            <div style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-main)', lineHeight: '1.8' }}>
                {content ? (
                    <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
                ) : (
                    <>
                        <p>This page is currently under development. The official document for <strong>{title}</strong> will be updated here shortly.</p>
                        <p style={{ marginTop: '1.5rem' }}>For any urgent inquiries regarding our policies, please contact us at:</p>
                        <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: '10px' }}>
                            <p><strong>Email:</strong> info@treisa.in</p>
                            <p><strong>WhatsApp:</strong> +91 82798 11111</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
