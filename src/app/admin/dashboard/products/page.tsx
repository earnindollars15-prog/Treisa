'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ProductManager() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        if (!supabase) return;
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data || []);
            const uniqueCats: string[] = Array.from(new Set((data || []).map((p: any) => p.category).filter(Boolean)));
            const defaultCats = ['Bath Soap', 'Dishwash Bar', 'Liquid Detergent', 'Hand Clean', 'Dishwash Liquid'];
            const allCats = Array.from(new Set([...defaultCats, ...uniqueCats]));
            setCategories(allCats);
        }
        setLoading(false);
    };

    const handleImageUpload = async (file: File) => {
        if (!supabase) return null;
        setUploading(true);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `private/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from('website images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image: ' + uploadError.message);
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
        const imageFile = formData.get('image_file') as File;

        let imageUrl = editingProduct.image_url;

        if (imageFile && imageFile.size > 0) {
            const uploadedUrl = await handleImageUpload(imageFile);
            if (uploadedUrl) imageUrl = uploadedUrl;
            else return; // Stop if upload failed
        }

        const category = isAddingNewCategory ? newCategoryName : formData.get('category');

        if (!category) {
            alert('Please select or enter a category');
            return;
        }

        const name = formData.get('name')?.toString() || '';
        const autoSlug = name.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove non-word characters (except spaces and hyphens)
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
            .trim();

        const productData = {
            name: name,
            category: category,
            slug: formData.get('slug')?.toString() || autoSlug,
            description: formData.get('description'),
            usage_instructions: formData.get('usage_instructions'),
            safety_info: formData.get('safety_info'),
            image_url: imageUrl,
        };

        let error;
        if (editingProduct?.id) {
            const { error: err } = await supabase
                .from('products')
                .update(productData)
                .eq('id', editingProduct.id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('products')
                .insert([productData]);
            error = err;
        }

        if (error) {
            alert('Error saving product: ' + error.message);
        } else {
            alert('Product saved successfully!');
            setEditingProduct(null);
            setIsAddingNewCategory(false);
            setNewCategoryName('');
            setPreviewUrl(null);
            fetchProducts();
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setIsAddingNewCategory(false);
        setNewCategoryName('');
        setPreviewUrl(product.image_url || null);
    };

    const deleteProduct = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        if (!supabase) return;

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) alert('Error deleting product');
        else fetchProducts();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading Products...</div>;

    return (
        <main className="container" style={{ paddingTop: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/dashboard" style={{ color: 'var(--primary)' }}><i className="fas fa-arrow-left"></i></Link>
                    <h1>Product Manager</h1>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditingProduct({}); setIsAddingNewCategory(false); setPreviewUrl(null); }}>+ Add Product</button>
            </div>

            {editingProduct ? (
                <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #ddd' }}>
                    <h3>{editingProduct.id ? 'Edit' : 'Add'} Product</h3>
                    <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <div>
                            <label style={{ fontWeight: 600 }}>Product Name</label>
                            <input name="name" type="text" className="form-control" defaultValue={editingProduct.name} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                        </div>

                        <div>
                            <label style={{ fontWeight: 600 }}>Category</label>
                            {!isAddingNewCategory ? (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select
                                        name="category"
                                        className="form-control"
                                        defaultValue={editingProduct.category}
                                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => setIsAddingNewCategory(true)}
                                        style={{ whiteSpace: 'nowrap', padding: '0.5rem 1rem' }}
                                    >
                                        + New
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter new category name"
                                        className="form-control"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }}
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => setIsAddingNewCategory(false)}
                                        style={{ whiteSpace: 'nowrap', padding: '0.5rem 1rem' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ fontWeight: 600 }}>URL Slug (e.g. bath-soap)</label>
                            <input name="slug" type="text" className="form-control" defaultValue={editingProduct.slug} placeholder="Leave blank to auto-generate" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                        </div>

                        <div>
                            <label style={{ fontWeight: 600 }}>Product Image</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {previewUrl && (
                                    <img src={previewUrl} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ddd' }} />
                                )}
                                <input
                                    name="image_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Recommended: Square image, 500x500px</p>
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ fontWeight: 600 }}>Description</label>
                            <textarea name="description" className="form-control" defaultValue={editingProduct.description} rows={3} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}></textarea>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600 }}>Usage Instructions</label>
                            <textarea name="usage_instructions" className="form-control" defaultValue={editingProduct.usage_instructions} rows={3} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}></textarea>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600 }}>Safety Info</label>
                            <textarea name="safety_info" className="form-control" defaultValue={editingProduct.safety_info} rows={3} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}></textarea>
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Save Product'}
                            </button>
                            <button type="button" className="btn btn-outline" onClick={() => setEditingProduct(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : null}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: '15px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                    <thead style={{ background: 'var(--secondary)' }}>
                        <tr>
                            <th style={{ padding: '1.2rem', textAlign: 'left' }}>Image</th>
                            <th style={{ padding: '1.2rem', textAlign: 'left' }}>Product Name</th>
                            <th style={{ padding: '1.2rem', textAlign: 'left' }}>Category</th>
                            <th style={{ padding: '1.2rem', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No products found. Start by adding one!</td></tr>
                        ) : (
                            products.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.2rem' }}>
                                        <img src={p.image_url || '/assets/bath-soap.jpg'} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>{p.name}</td>
                                    <td style={{ padding: '1.2rem' }}>{p.category}</td>
                                    <td style={{ padding: '1.2rem', textAlign: 'center' }}>
                                        <button onClick={() => handleEdit(p)} style={{ marginRight: '1.5rem', color: 'var(--primary)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem' }}><i className="fas fa-edit"></i> Edit</button>
                                        <button onClick={() => deleteProduct(p.id)} style={{ color: '#e53935', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem' }}><i className="fas fa-trash"></i> Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
