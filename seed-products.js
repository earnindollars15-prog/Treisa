const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env
const env = dotenv.parse(fs.readFileSync('.env.local'));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const initialProducts = [
    {
        name: 'TREISA™ Bath Soap',
        category: 'Bath Soap',
        description: 'Quality cleaning for everyday hygiene. Designed for routine cleansing needs.',
        usage_instructions: 'Apply on wet body, lather, and rinse with water.',
        safety_info: 'Avoid contact with eyes. Keep away from children.',
        image_url: '/assets/bath-soap.jpg'
    },
    {
        name: 'TREISA™ Dishwash Bar',
        category: 'Dishwash Bar',
        description: 'Designed to help clean utensils by removing grease and food residue.',
        usage_instructions: 'Rub on a scrubber or sponge, clean utensils, and rinse with water.',
        safety_info: 'Avoid contact with eyes. Keep away from children.',
        image_url: '/assets/dishwash-bar.jpg'
    },
    {
        name: 'TREISA™ Liquid Detergent',
        category: 'Liquid Detergent',
        description: 'Formulated for effective cleaning of clothes in everyday laundry.',
        usage_instructions: 'Use an appropriate quantity as per load size. Wash and rinse thoroughly.',
        safety_info: 'Avoid contact with eyes. Keep away from children.',
        image_url: '/assets/liquid-detergent.jpg'
    },
    {
        name: 'TREISA™ Hand Clean Liquid',
        category: 'Hand Clean',
        description: 'Intended for routine hand hygiene and cleansing. Leaves a fresh feel.',
        usage_instructions: 'Apply on wet hands, lather well, rinse thoroughly.',
        safety_info: 'Avoid contact with eyes. Keep away from children.',
        image_url: '/assets/hand-wash.jpg'
    },
    {
        name: 'TREISA™ Dishwash Liquid',
        category: 'Dishwash Liquid',
        description: 'A powerful liquid formula designed for effective cleaning of utensils.',
        usage_instructions: 'Mix a small amount with water, scrub utensils, and rinse.',
        safety_info: 'Avoid contact with eyes. Keep away from children.',
        image_url: '/assets/dishwash-liquid.jpg'
    }
];

async function seed() {
    console.log('--- Migrating Products to Supabase ---');

    // Check if empty
    const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });

    if (count > 0) {
        console.log('⚠️ Database already has products. Skipping initial migration.');
        return;
    }

    const { error } = await supabase.from('products').insert(initialProducts);

    if (error) console.error('❌ Migration Error:', error.message);
    else console.log('✅ Successfully migrated 5 products to the dashboard!');
}

seed();
