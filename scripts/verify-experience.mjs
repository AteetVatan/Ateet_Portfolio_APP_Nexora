import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bidswcansixttbhmwpkj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZHN3Y2Fuc2l4dHRiaG13cGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzOTQ1MjUsImV4cCI6MjA1OTk3MDUyNX0.CFee_yedi9AIzASQomf7Ax1iZWhixehcG6cSyS9J-jo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function verify() {
    const { data, error } = await supabase
        .from('cv')
        .select('id, name, experience')
        .eq('language', 'en')
        .single();

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('CV ID:', data.id);
    console.log('Name:', data.name);
    const exp = data.experience;
    if (Array.isArray(exp)) {
        console.log('Experience entries:', exp.length);
        exp.forEach((e, i) => {
            console.log(`  ${i + 1}. "${e.title}" @ ${e.company} (${e.dates})`);
        });

        // Check if 12IQ is present
        const has12iq = exp.some(e => e.company && e.company.includes('12IQ'));
        console.log('\n12IQ present:', has12iq ? '✅ YES' : '❌ NO');
    }
}

verify();
