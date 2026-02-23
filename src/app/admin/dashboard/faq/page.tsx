'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQManager() {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newItem, setNewItem] = useState<FAQItem>({ question: '', answer: '' });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        fetchFAQs();
    }, []);

    const defaultFaqs = [
        {
            question: "1️⃣ TREISA kya hai?",
            answer: "TREISA™️ household cleaning aur personal hygiene products ka ek Indian brand hai.\nTREISA™️ is a brand of Shrivandan Industries, jo ek proprietorship business hai aur products ka marketing aur distribution karta hai."
        },
        {
            question: "2️⃣ Kya TREISA khud products manufacture karta hai?",
            answer: "Nahi.\nTREISA™️ ke sabhi products licensed third-party manufacturers ke dwara banaye jaate hain.\nIn products ko TREISA™️ brand ke under Shrivandan Industries (Proprietorship) market aur distribute karta hai."
        },
        {
            question: "3️⃣ TREISA ke kaun-kaun se products available hain?",
            answer: "TREISA™️ brand ke under ye product categories available hain:\n• Bath Soap\n• Dishwash Bar\n• Dishwash Liquid\n• Liquid Detergent\n• Hand Clean Liquid\n\nProduct availability location aur authorized distributor coverage par depend karti hai."
        },
        {
            question: "4️⃣ Kya main TREISA products website se online kharid sakta hoon?",
            answer: "Nahi.\nIs website par direct online purchase ya online payment facility available nahi hai.\nProducts authorized distributors aur offline sales channels ke through supply kiye jaate hain."
        },
        {
            question: "5️⃣ Kya Cash on Delivery (COD) available hai?",
            answer: "Cash on Delivery (COD) select locations par available ho sakti hai.\nCOD availability authorized distributor aur location par depend karti hai."
        },
        {
            question: "6️⃣ Main TREISA ka distributor kaise ban sakta hoon?",
            answer: "Aap website par available Distributor Enquiry Form ke through apni details submit kar sakte hain.\nSabhi enquiries verification aur approval process ke baad hi consider ki jaati hain.\nDistributor appointment Shrivandan Industries ke discretion par hoti hai."
        },
        {
            question: "7️⃣ Distributor banne ke liye koi registration ya joining fee hoti hai?",
            answer: "Distributor terms, minimum order quantity aur commercial conditions location, business profile aur market potential ke basis par decide ki jaati hain.\nFinal details approval ke baad hi share ki jaati hain."
        },
        {
            question: "8️⃣ Distributor ko products kaise supply kiye jaate hain?",
            answer: "Confirmed orders ke against products:\n• Shrivandan Industries (Proprietorship) ke through, ya\n• Authorized logistics / transport partners ke through\ndispatch kiye jaate hain.\nDelivery timelines indicative hoti hain aur location par depend karti hain."
        },
        {
            question: "9️⃣ Supply / shipping ka expense kaun bear karta hai?",
            answer: "Normally, products ki supply, freight, transport aur logistics ka expense distributor hi bear karta hai, jab tak kisi special scheme ya written agreement me alag se mention na ho."
        },
        {
            question: "🔟 Agar distributor ko damaged, leaked ya wrong product mile to kya process hai?",
            answer: "Distributor ko delivery ke time products inspect karna hota hai.\nAgar koi damage, leakage, shortage ya mismatch ho to 48 hours ke andar proof (photos/videos) ke saath report karna zaroori hai.\nVerification ke baad replacement ya adjustment consider kiya ja sakta hai."
        },
        {
            question: "1️⃣1️⃣ Kya unsold, slow-moving ya expired stock return ho sakta hai?",
            answer: "Nahi.\nUnsold, slow-moving, expired ya near-expiry stock return, buy-back ya refund ke liye eligible nahi hota."
        },
        {
            question: "1️⃣2️⃣ End customer ke liye return / refund policy kya hai?",
            answer: "End-customer returns ya refunds sirf damaged, leaked ya wrong product ke cases me consider kiye jaate hain, wo bhi authorized distributor ke through verification ke baad.\nOpened ya used products returnable nahi hote."
        },
        {
            question: "1️⃣3️⃣ Kya TREISA products medical ya cosmetic treatment ke liye hain?",
            answer: "Nahi.\nTREISA™️ products daily cleaning aur hygiene use ke liye hote hain.\nYe products kisi bhi disease ko diagnose, treat, cure ya prevent karne ke liye nahi hain."
        },
        {
            question: "1️⃣4️⃣ Website par dikhayi gayi product images final hoti hain?",
            answer: "Website par dikhayi gayi product images sirf representation ke liye hoti hain.\nActual packaging, label design, ya appearance me variation ho sakta hai."
        },
        {
            question: "1️⃣5️⃣ Koi legal, policy ya business-related query ho to kahan contact karein?",
            answer: "Aap Contact Us page par diye gaye phone, WhatsApp ya email ke through Shrivandan Industries (Proprietorship) se sampark kar sakte hain."
        }
    ];

    const fetchFAQs = async () => {
        if (!supabase) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('page_sections')
            .select('*')
            .eq('id', 'faq_content')
            .single();

        if (data && data.metadata?.items) {
            setFaqs(data.metadata.items);
        } else {
            setFaqs(defaultFaqs);
        }
        setLoading(false);
    };

    const handleAdd = () => {
        if (!newItem.question.trim() || !newItem.answer.trim()) {
            alert('Please fill both question and answer');
            return;
        }
        setFaqs([...faqs, newItem]);
        setNewItem({ question: '', answer: '' });
    };

    const handleDelete = (index: number) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            const upatedFaqs = faqs.filter((_, i) => i !== index);
            setFaqs(upatedFaqs);
        }
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
    };

    const handleUpdate = (index: number, updatedItem: FAQItem) => {
        const newFaqs = [...faqs];
        newFaqs[index] = updatedItem;
        setFaqs(newFaqs);
        setEditingIndex(null);
    };

    const handleSaveAll = async () => {
        if (!supabase) return;
        setSaving(true);

        const { error } = await supabase
            .from('page_sections')
            .upsert({
                id: 'faq_content',
                title: 'FAQ Content',
                metadata: { items: faqs }
            });

        if (error) {
            alert('Error saving FAQs: ' + error.message);
        } else {
            alert('All FAQs saved successfully!');
        }
        setSaving(false);
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newFaqs = [...faqs];
        const temp = newFaqs[index];
        newFaqs[index] = newFaqs[index - 1];
        newFaqs[index - 1] = temp;
        setFaqs(newFaqs);
    };

    const moveDown = (index: number) => {
        if (index === faqs.length - 1) return;
        const newFaqs = [...faqs];
        const temp = newFaqs[index];
        newFaqs[index] = newFaqs[index + 1];
        newFaqs[index + 1] = temp;
        setFaqs(newFaqs);
    };

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading FAQs...</div>;

    return (
        <main className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <Link href="/admin/dashboard" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <i className="fas fa-arrow-left"></i> Back to Dashboard
                    </Link>
                    <h1>FAQ Manager</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Add, edit, delete and reorder your Frequently Asked Questions.</p>
                </div>
                <button
                    onClick={handleSaveAll}
                    className="btn btn-primary"
                    disabled={saving}
                    style={{ padding: '0.8rem 2rem' }}
                >
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {/* Add New FAQ Form */}
            <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #ddd' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Add New Question</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Question</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newItem.question}
                            onChange={(e) => setNewItem({ ...newItem, question: e.target.value })}
                            placeholder="e.g. 1️⃣ TREISA kya hai?"
                            style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Answer</label>
                        <textarea
                            className="form-control"
                            value={newItem.answer}
                            onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })}
                            placeholder="Write answer here... (Use \n for new lines)"
                            rows={4}
                            style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
                        ></textarea>
                    </div>
                    <button onClick={handleAdd} className="btn btn-outline" style={{ alignSelf: 'flex-start' }}>Add to List</button>
                </div>
            </div>

            {/* FAQ List */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {faqs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: '#f9f9f9', borderRadius: '15px' }}>
                        <p>No FAQs added yet. Use the form above to start adding.</p>
                    </div>
                ) : (
                    faqs.map((faq, index) => (
                        <div key={index} style={{
                            background: 'var(--white)',
                            padding: '1.5rem',
                            borderRadius: '15px',
                            border: '1px solid #eee',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                            position: 'relative'
                        }}>
                            {editingIndex === index ? (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={faq.question}
                                        onBlur={(e) => handleUpdate(index, { ...faq, question: e.target.value })}
                                        style={{ width: '100%', padding: '0.5rem', fontWeight: 700 }}
                                    />
                                    <textarea
                                        className="form-control"
                                        defaultValue={faq.answer}
                                        onBlur={(e) => handleUpdate(index, { ...faq, answer: e.target.value })}
                                        rows={4}
                                        style={{ width: '100%', padding: '0.5rem', fontFamily: 'inherit' }}
                                    ></textarea>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => setEditingIndex(null)} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Done</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ paddingRight: '100px' }}>
                                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{faq.question}</h4>
                                            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{faq.answer}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                                            <button onClick={() => moveUp(index)} disabled={index === 0} title="Move Up" style={{ border: 'none', background: 'none', cursor: 'pointer', color: index === 0 ? '#ccc' : '#666' }}>
                                                <i className="fas fa-chevron-up"></i>
                                            </button>
                                            <button onClick={() => moveDown(index)} disabled={index === faqs.length - 1} title="Move Down" style={{ border: 'none', background: 'none', cursor: 'pointer', color: index === faqs.length - 1 ? '#ccc' : '#666' }}>
                                                <i className="fas fa-chevron-down"></i>
                                            </button>
                                            <button onClick={() => handleEdit(index)} title="Edit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button onClick={() => handleDelete(index)} title="Delete" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ff4d4d' }}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button
                    onClick={handleSaveAll}
                    className="btn btn-primary"
                    disabled={saving}
                    style={{ padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,123,181,0.3)' }}
                >
                    {saving ? 'Saving Changes...' : 'Save All Changes'}
                </button>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <i className="fas fa-info-circle"></i> Don't forget to save your changes to push them live.
                </p>
            </div>
        </main>
    );
}
