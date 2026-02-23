'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) {
            alert('Supabase is not configured.');
            return;
        }
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/admin/reset-password`,
        });

        if (error) {
            alert(error.message);
        } else {
            setMessage('Password reset link has been sent to your email.');
        }
        setLoading(false);
    };

    return (
        <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', background: 'var(--white)', borderRadius: '15px', boxShadow: 'var(--shadow)' }}>
                <h1 className="text-center">Forgot Password</h1>
                <p className="text-center" style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Enter your email to receive a reset link</p>

                {message ? (
                    <div style={{ padding: '1rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {message}
                    </div>
                ) : (
                    <form onSubmit={handleReset}>
                        <div style={{ marginBottom: '2rem' }}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.8rem', border: '2px solid #eee', borderRadius: '10px' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link href="/admin/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Back to Login</Link>
                </div>
            </div>
        </main>
    );
}
