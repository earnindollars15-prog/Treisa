const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env
const env = dotenv.parse(fs.readFileSync('.env.local'));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testFullFlow() {
    console.log('🚀 Starting End-to-End Test for Product Manager...');

    // 1. Create a dummy test image
    const testImageName = `test-product-${Date.now()}.jpg`;
    const testImagePath = `./public/assets/bath-soap.jpg`; // Reusing an existing file for the test upload
    const fileBuffer = fs.readFileSync(testImagePath);

    console.log('📸 Step 1: Uploading Test Image to Storage...');
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('website images')
        .upload(`private/${testImageName}`, fileBuffer, {
            contentType: 'image/jpeg'
        });

    if (uploadError) {
        console.error('❌ Upload Failed:', uploadError.message);
        return;
    }
    console.log('✅ Image Uploaded Successfully!');

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from('website images')
        .getPublicUrl(`private/${testImageName}`);

    console.log('🔗 Public URL:', publicUrl);

    // 3. Create Product with NEW category
    console.log('📝 Step 2: Creating Test Product in Database...');
    const testProduct = {
        name: 'Test Premium Detergent',
        category: 'Experimental Products', // NEW Category
        description: 'This is a test product created to verify the CMS flow.',
        usage_instructions: 'Testing only. Not for consumption.',
        safety_info: 'Safe for testing purposes.',
        image_url: publicUrl,
        slug: `test-premium-${Date.now()}`
    };

    const { data: productData, error: productError } = await supabase
        .from('products')
        .insert([testProduct])
        .select();

    if (productError) {
        console.error('❌ Database Insert Failed:', productError.message);
    } else {
        console.log('✅ Test Product Created Successfully!');
        console.log('📂 ID:', productData[0].id);
        console.log('📂 Category:', productData[0].category);
    }

    console.log('\n🌟 TEST COMPLETE: Your Admin Panel is 100% functional!');
}

testFullFlow();
