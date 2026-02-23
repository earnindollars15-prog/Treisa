'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function SiteSettings() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .single();

        if (data) {
            setSettings(data);
            setPreviewUrl(data.logo_url);
        }
        setLoading(false);
    };

    const handleImageUpload = async (file: File) => {
        if (!supabase) return null;
        setUploading(true);

        const fileExt = file.name.split('.').pop();
        const fileName = `site-logo-${Date.now()}.${fileExt}`;
        const filePath = `private/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('website images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading logo: ' + uploadError.message);
            setUploading(false);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('website images')
            .getPublicUrl(filePath);

        setUploading(false);
        return publicUrl;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const imageFile = formData.get('logo_file') as File;

        let logoUrl = settings?.logo_url;

        if (imageFile && imageFile.size > 0) {
            const uploadedUrl = await handleImageUpload(imageFile);
            if (uploadedUrl) {
                logoUrl = uploadedUrl;
            } else {
                return; // Stop if upload failed
            }
        }

        const newSettings = {
            contact_phone: formData.get('phone'),
            contact_email: formData.get('email'),
            udyam_registration: formData.get('udyam'),
            logo_url: logoUrl,
        };

        const { error } = await supabase
            .from('site_settings')
            .update(newSettings)
            .eq('id', settings?.id || 1);

        if (error) {
            alert('Error updating settings: ' + error.message);
        } else {
            alert('Settings updated successfully!');
            fetchSettings();
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading Settings...</div>;

    return (
        <main className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <Link href="/admin/dashboard" style={{ color: 'var(--primary)' }}><i className="fas fa-arrow-left"></i> Back to Dashboard</Link>
                <h1>Site Settings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Update your contact details and brand identity across the entire website.</p>
            </div>

            <div className="form-card" style={{ background: 'var(--white)', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--shadow)', maxWidth: '700px' }}>
                <form onSubmit={handleSave}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Business Email</label>
                        <input name="email" type="email" defaultValue={settings?.contact_email} className="form-control" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '10px' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Contact Phone / WhatsApp</label>
                        <input name="phone" type="text" defaultValue={settings?.contact_phone} className="form-control" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '10px' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Udyam Registration Number</label>
                        <input name="udyam" type="text" defaultValue={settings?.udyam_registration} className="form-control" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '10px' }} />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Business Logo</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#f8f9fa', padding: '1rem', borderRadius: '12px', border: '1px dashed #ccc' }}>
                            {previewUrl && (
                                <img src={previewUrl} alt="Logo Preview" style={{ maxHeight: '60px', borderRadius: '5px' }} />
                            )}
                            <div style={{ flex: 1 }}>
                                <input
                                    name="logo_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    style={{ width: '100%' }}
                                />
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Recommended: Transparent PNG, max 500kb</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem' }}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading Logo...' : 'Update Brand Details'}
                    </button>
                </form>
            </div>
        </main>
    );
}
