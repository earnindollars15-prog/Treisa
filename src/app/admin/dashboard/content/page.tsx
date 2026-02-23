'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ContentManager() {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSection, setEditingSection] = useState<any>(null);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('page_sections')
            .select('*')
            .not('id', 'like', '%faq%')
            .order('id', { ascending: true });

        if (data) setSections(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const updatedData = {
            title: formData.get('title'),
            content: formData.get('content'),
        };

        const { error } = await supabase
            .from('page_sections')
            .update(updatedData)
            .eq('id', editingSection.id);

        if (error) {
            alert('Error updating section: ' + error.message);
        } else {
            alert('Section updated successfully!');
            setEditingSection(null);
            fetchSections();
        }
    };

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading Content...</div>;

    return (
        <main className="container" style={{ paddingTop: '5rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <Link href="/admin/dashboard" style={{ color: 'var(--primary)' }}><i className="fas fa-arrow-left"></i> Back to Dashboard</Link>
                <h1>Page Content Manager</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage text for Home, About, FAQ, and Legal pages.</p>
            </div>

            {editingSection ? (
                <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #ddd' }}>
                    <h3>Edit Section: {editingSection.id.replace('_', ' ').toUpperCase()}</h3>
                    <form onSubmit={handleSave} style={{ marginTop: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontWeight: 600 }}>Headline / Title</label>
                            <input name="title" type="text" className="form-control" defaultValue={editingSection.title} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontWeight: 600 }}>Body Content</label>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Tip: Use double enter for new paragraphs.</p>
                            <textarea name="content" className="form-control" defaultValue={editingSection.content} rows={12} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit', lineHeight: '1.6' }}></textarea>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <button type="button" className="btn btn-outline" onClick={() => setEditingSection(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {sections.length === 0 ? (
                        <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem' }}>
                            <p>No content sections found in database. Please run the SQL seed script provided.</p>
                        </div>
                    ) : (
                        sections.map(section => (
                            <div key={section.id} style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--primary)' }}>{section.id.replace('_', ' ').toUpperCase()}</h4>
                                    <p style={{ margin: '0.5rem 0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {section.title}
                                    </p>
                                </div>
                                <button onClick={() => setEditingSection(section)} className="btn btn-outline" style={{ width: '100%' }}>Edit</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </main>
    );
}
