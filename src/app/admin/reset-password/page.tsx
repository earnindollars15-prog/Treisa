'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;
        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Password updated successfully! Please login with your new password.');
            router.push('/admin/login');
        }
        setLoading(false);
    };

    return (
        <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', background: 'var(--white)', borderRadius: '15px', boxShadow: 'var(--shadow)' }}>
                <h1 className="text-center">Reset Password</h1>
                <p className="text-center" style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Enter your new password below</p>
                <form onSubmit={handleUpdate}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            style={{ width: '100%', padding: '0.8rem', border: '2px solid #eee', borderRadius: '10px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </main>
    );
}
