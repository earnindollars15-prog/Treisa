'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function FAQ() {
    const [faqs, setFaqs] = useState<{ question: string, answer: string }[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const getFaqs = async () => {
            if (!supabase) {
                setFaqs(defaultFaqs);
                setLoading(false);
                return;
            }
            try {
                const { data, error } = await supabase.from('page_sections').select('*').eq('id', 'faq_content').single();
                if (data && data.metadata?.items) {
                    setFaqs(data.metadata.items);
                } else {
                    setFaqs(defaultFaqs);
                }
            } catch (err) {
                setFaqs(defaultFaqs);
            } finally {
                setLoading(false);
            }
        };
        getFaqs();
    }, []);

    if (loading) return <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>Loading FAQs...</div>;

    return (
        <main className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="section-title">Frequently Asked Questions</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Sahi jaankari, behtar bharosa. TREISA™ se jude aapke sawalon ke jawab.</p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {faqs.map((faq, i) => (
                    <div key={i} style={{
                        background: 'var(--white)',
                        padding: '2rem',
                        borderRadius: '16px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(0,0,0,0.05)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        transition: 'transform 0.3s ease'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '800' }}>
                            {faq.question}
                        </h3>
                        <div style={{
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.7',
                            color: 'var(--text-main)',
                            fontSize: '1.05rem'
                        }}>
                            {faq.answer}
                        </div>
                    </div>
                ))}

                <div style={{
                    marginTop: '4rem',
                    padding: '2.5rem',
                    background: 'var(--bg-light)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,123,181,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>🛡️ NOTE</h3>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                        Ye FAQ general information ke liye hai. Final terms, conditions aur responsibilities website par available <br />
                        <strong>Terms & Conditions, Refund & Return Policy, Shipping & Distributor Supply Policy aur Disclaimer</strong> <br />
                        ke according govern hoti hain.
                    </p>
                </div>
            </div>
        </main>
    );
}
