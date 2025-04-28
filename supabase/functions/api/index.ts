
// This is a Deno Edge Function that uses Python for our REST API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Initialize Supabase client with the service role key
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Get the URL and parse the path
  const url = new URL(req.url);
  const path = url.pathname.replace('/api', '');
  const pathParts = path.split('/').filter(part => part);

  try {
    // Handle blog posts endpoints
    if (pathParts[0] === 'blog') {
      // GET /blog - List all blog posts
      if (req.method === 'GET' && pathParts.length === 1) {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // GET /blog/:slug - Get a specific blog post by slug
      if (req.method === 'GET' && pathParts.length === 2) {
        const slug = pathParts[1];
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          return new Response(JSON.stringify({ error: 'Blog post not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // POST /blog - Create a new blog post
      if (req.method === 'POST' && pathParts.length === 1) {
        const blogPost = await req.json();
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(blogPost)
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Handle contact submissions endpoints
    else if (pathParts[0] === 'contact') {
      // POST /contact - Submit a contact form
      if (req.method === 'POST' && pathParts.length === 1) {
        const contactForm = await req.json();

        // Capture IP and referrer from headers when available
        const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
        const referrer = req.headers.get('referer') || '';

        const submission = {
          ...contactForm,
          ip_address: ipAddress,
          referrer: referrer
        };

        const { data, error } = await supabase
          .from('contact_submissions')
          .insert(submission)
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ message: 'Contact form submitted successfully' }), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Handle job applications endpoints
    else if (pathParts[0] === 'jobs') {
      // POST /jobs/apply - Submit a job application
      if (req.method === 'POST' && pathParts.length === 2 && pathParts[1] === 'apply') {
        const jobApplication = await req.json();

        const { data, error } = await supabase
          .from('job_applications')
          .insert(jobApplication)
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ message: 'Job application submitted successfully' }), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Handle site metrics endpoints
    else if (pathParts[0] === 'metrics') {
      // POST /metrics/pageview - Record a page view
      if (req.method === 'POST' && pathParts.length === 2 && pathParts[1] === 'pageview') {
        const pageView = await req.json();
        const { page_path } = pageView;

        if (!page_path) {
          return new Response(JSON.stringify({ error: 'page_path is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Check if this page already has metrics
        const { data: existingMetrics, error: fetchError } = await supabase
          .from('site_metrics')
          .select('*')
          .eq('page_path', page_path)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
          throw fetchError;
        }

        if (existingMetrics) {
          // Update existing metrics
          const { error: updateError } = await supabase
            .from('site_metrics')
            .update({
              visit_count: existingMetrics.visit_count + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingMetrics.id);

          if (updateError) throw updateError;
        } else {
          // Create new metrics
          const userAgent = req.headers.get('user-agent') || '';
          const referrer = req.headers.get('referer') || '';

          const { error: insertError } = await supabase
            .from('site_metrics')
            .insert({
              page_path,
              visit_count: 1,
              user_agent: userAgent,
              referrer: referrer
            });

          if (insertError) throw insertError;
        }

        return new Response(JSON.stringify({ message: 'Page view recorded' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // If no route matched
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
