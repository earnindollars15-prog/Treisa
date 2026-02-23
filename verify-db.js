const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

// Load .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = dotenv.parse(envFile);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
    console.log('--- Verifying Supabase Connection ---');

    const { data: products, error: pError } = await supabase.from('products').select('count', { count: 'exact' });
    if (pError) console.error('❌ Products table error:', pError.message);
    else console.log('✅ Products table exists.');

    const { data: settings, error: sError } = await supabase.from('site_settings').select('*').single();
    if (sError) console.error('❌ Site Settings table error:', sError.message);
    else console.log('✅ Site Settings table exists and contains data.');

    if (!pError && !sError) {
        console.log('\n🚀 ALL SYSTEMS GO! Your database is perfectly configured.');
    }
}

verify();
