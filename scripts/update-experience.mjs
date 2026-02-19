import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bidswcansixttbhmwpkj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZHN3Y2Fuc2l4dHRiaG13cGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzOTQ1MjUsImV4cCI6MjA1OTk3MDUyNX0.CFee_yedi9AIzASQomf7Ax1iZWhixehcG6cSyS9J-jo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const newExperience = [
    {
        title: "AI Architect & Co-Founder",
        company: "12IQ Inc",
        location: "Germany",
        dates: "Nov 2025 - Present",
        responsibilities: [
            "Leading architecture and end-to-end development of a large-scale Deterministic AI platform focused on predictable, auditable, and intelligence workflows.",
            "Architected a modular, execution-driven AI system with a single deterministic execution spine, coordinating orchestration, context management, knowledge processing, reasoning, and multi-model validation.",
            "Designed agent orchestration patterns enforcing execution order, context propagation, budget control, fault isolation, and confidence scoring.",
            "Built multi-database AI infrastructure (relational, document, graph, vector, cache) to support persistent reasoning state and continuous learning.",
            "Hands-on Python lead, defining core abstractions, data contracts, and CI/CD standards for production-grade reliability and scalability.",
            "Leading technical delivery, interviewing, mentoring, and guiding engineers and interns."
        ]
    },
    {
        title: "Freelance Consulting & Strategic Transition into AI Engineering",
        company: "Freelancing and Professional Development",
        location: "Germany",
        dates: "Dec 2024 - Oct 2025",
        responsibilities: [
            "Transitioned into AI Engineering through an intensive learning and mentoring program at Masterschool Institute of Technology, Berlin, followed with independent freelance-style project execution and real-world system development.",
            "Designed and engineered three AI platforms (mainly Python): Med AI (Healthcare Automation), MASX AI (Geopolitical Forecasting), and Echo AI (Personal AI Clone).",
            "Delivered functional AI prototypes for prospective clients, showcasing applied expertise in multi-agent systems, real-time data pipelines, RAG architectures, and LLM integrations (OpenAI, Mistral, Hugging Face)."
        ]
    },
    {
        title: "Senior Software Engineer",
        company: "IHS Markit",
        location: "Essen, Germany",
        dates: "Jul 2017 - Nov 2024",
        responsibilities: [
            "Owned platform migration and project delivery across backend/frontend, leading team of 5+. Directed deployments, system validation, and CI/CD pipelines. Aligned with global stakeholders across 3 continents.",
            "Engineered secure, async-ready APIs and dashboards using Python, C#, Node.js, and AWS (Lambda, ECS).",
            "Migrated 10+ legacy applications to AWS and Angular, reducing latency by 40% and accelerating deployment cycles by 60%.",
            "Built CI/CD pipelines using GitLab, Docker, and Azure DevOps, cutting deployment errors and shortening release timelines by over 60%."
        ]
    },
    {
        title: "Software Engineer",
        company: "IHS Markit",
        location: "Essen/Leverkusen, Germany",
        dates: "Mar 2012 - Jul 2017",
        responsibilities: [
            "Delivered end-to-end digital analytics systems for enterprise automotive clients across 7 continents.",
            "Developed scalable analytics platforms using C#, VB.NET, serving 20+ global clients.",
            "Ensured data integrity, secure deployments, and continuous system enhancements through collaboration with cross-functional teams."
        ]
    },
    {
        title: "Software Engineer",
        company: "Pitney Bowes Software",
        location: "Noida, India",
        dates: "Mar 2009 - Jul 2011",
        responsibilities: [
            "Contributed to the development of the MapInfo MapXtreme GIS SDK, building reusable geospatial components and enterprise mapping tools for large-scale enterprise GIS systems used worldwide.",
            "Developed GIS SDK modules using C#, .NET Framework, and SQL Server, powering large-scale enterprise spatial applications.",
            "Designed metadata tagging and spatial retrieval logic, reducing map-layer load times and optimizing performance across massive geodata sets.",
            "Created structured GIS metadata models for location-aware querying and rendering, enabling context-driven geographic intelligence."
        ]
    }
];

async function updateExperience() {
    // First, fetch the current row
    const { data: currentData, error: fetchError } = await supabase
        .from('cv')
        .select('id, name, experience')
        .eq('language', 'en')
        .single();

    if (fetchError) {
        console.error('Error fetching current CV data:', fetchError);
        const { data: allData } = await supabase.from('cv').select('id, name').limit(5);
        console.log('All CV rows:', JSON.stringify(allData, null, 2));
        return;
    }

    console.log('Found CV row:', currentData.id, '- Name:', currentData.name);
    console.log('Current experience count:', Array.isArray(currentData.experience) ? currentData.experience.length : 'not an array');

    // Update the experience field
    const { error: updateError, status, statusText } = await supabase
        .from('cv')
        .update({
            experience: newExperience,
            updated_at: new Date().toISOString()
        })
        .eq('id', currentData.id);

    console.log('Update response:', status, statusText);

    if (updateError) {
        console.error('Update error:', updateError);
    }

    // Verify by re-fetching
    const { data: verifyData, error: verifyError } = await supabase
        .from('cv')
        .select('experience')
        .eq('id', currentData.id)
        .single();

    if (verifyError) {
        console.error('Verify error:', verifyError);
    } else {
        const exp = verifyData.experience;
        if (Array.isArray(exp)) {
            console.log('\n✅ Verification - experience entries:', exp.length);
            exp.forEach((e, i) => {
                console.log(`  ${i + 1}. ${e.title} @ ${e.company} (${e.dates})`);
            });
        } else {
            console.log('Experience field is not an array after update:', typeof exp);
        }
    }
}

updateExperience();
