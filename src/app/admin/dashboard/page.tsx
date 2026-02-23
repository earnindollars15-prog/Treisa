'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
    const router = useRouter();

    // The user session and idle timer are now managed by the parent layout.tsx

    return (
        <main className="container" style={{ paddingTop: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1>Admin Dashboard</h1>
                <button
                    onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }}
                    className="btn btn-outline"
                    style={{ border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '50px' }}
                >
                    Logout
                </button>
            </div>

            <p>Welcome to the Admin Dashboard. You can manage your website content here.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                <Link href="/admin/dashboard/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'var(--transition)' }}>
                        <i className="fas fa-box" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                        <h3>Product Manager</h3>
                        <p>Add, edit, or remove products and descriptions.</p>
                    </div>
                </Link>
                <Link href="/admin/dashboard/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'var(--transition)' }}>
                        <i className="fas fa-cog" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                        <h3>Site Settings</h3>
                        <p>Change your logo, phone number, and social links.</p>
                    </div>
                </Link>
                <Link href="/admin/dashboard/content" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'var(--transition)' }}>
                        <i className="fas fa-file-invoice" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                        <h3>Page Content</h3>
                        <p>Manage headlines and text for Home and About pages.</p>
                    </div>
                </Link>
                <Link href="/admin/dashboard/faq" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'var(--transition)' }}>
                        <i className="fas fa-question-circle" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                        <h3>FAQ Manager</h3>
                        <p>Add, edit, or remove questions and answers.</p>
                    </div>
                </Link>
            </div>
        </main>
    );
}
