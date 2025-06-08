// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const urlsToPing = [
    'https://masx-ai-gdelt-api.onrender.com/',
    'https://movie-app-kufy.onrender.com/'
];
Deno.serve(async (req) => {
    // CORS preflight support
    if (req.method === "OPTIONS") {
        return new Response("OK", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "*"
            }
        });
    }
    const results = await Promise.all(urlsToPing.map(async (url) => {
        try {
            const res = await fetch(url, {
                method: 'GET'
            });
            return {
                url,
                status: res.status,
                ok: res.ok
            };
        } catch (error) {
            return {
                url,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }));
    return new Response(JSON.stringify({
        results
    }), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
});
