'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const IDLE_TIME_LIMIT = 5 * 60 * 1000; // 5 minutes in milliseconds

    const handleLogout = useCallback(async () => {
        if (!supabase) return;
        console.log('Logging out due to inactivity...');
        await supabase.auth.signOut();
        router.push('/admin/login');
    }, [router]);

    const resetTimer = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(handleLogout, IDLE_TIME_LIMIT);
    }, [handleLogout]);

    useEffect(() => {
        let isMounted = true;

        const checkUser = async () => {
            if (!supabase) {
                if (isMounted) setLoading(false);
                return;
            }

            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!isMounted) return;

                if (!user) {
                    router.push('/admin/login');
                } else {
                    setAuthorized(true);
                    resetTimer();
                }
            } catch (err) {
                console.error('Auth check error:', err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        checkUser();

        return () => {
            isMounted = false;
        };
    }, [router, resetTimer]);

    // Handle activity listeners separately to avoid logic issues
    useEffect(() => {
        if (!authorized) return;

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, resetTimer);
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [authorized, resetTimer]);

    // Listen for sign-out events globally
    useEffect(() => {
        if (!supabase) return;

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any) => {
            if (event === 'SIGNED_OUT') {
                router.push('/admin/login');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    if (loading) return (
        <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>
            <div className="spinner"></div>
            <p>Verifying session...</p>
        </div>
    );

    if (!authorized) return null;

    return <>{children}</>;
}
