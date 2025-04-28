
/**
 * Contact Form Confirmation Email Edge Function
 * 
 * This Edge Function sends a confirmation email to users who submit the contact form.
 * It uses Resend, a third-party email service, to deliver the emails.
 * 
 * The function:
 * 1. Receives form submission data (name, email, message)
 * 2. Validates the data
 * 3. Sends a confirmation email to the user
 * 4. Sends a notification email to the site owner
 * 5. Returns success/error response
 */

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key from environment variables
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers to allow cross-origin requests (needed for web clients)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Type definition for expected contact submission data
interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

// Get the admin email from environment variable or use a default
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "your-email@example.com";

/**
 * Main request handler function
 * 
 * This function processes incoming HTTP requests:
 * - Handles OPTIONS requests for CORS preflight
 * - Processes POST requests with contact form data
 * - Validates form data
 * - Sends confirmation email via Resend
 * - Returns appropriate response
 */
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests for this endpoint
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse the JSON request body into our ContactSubmission type
    const submission: ContactSubmission = await req.json();
    console.log("Received submission:", JSON.stringify(submission));

    // Validate the submission data
    // At minimum, we need an email address and name to send a confirmation
    if (!submission.email || !submission.name) {
      console.error("Invalid submission data:", submission);
      return new Response(JSON.stringify({ error: 'Invalid submission data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Sending confirmation email to:", submission.email);
    
    // Send confirmation email to the user
    const { data: userEmailData, error: userEmailError } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [submission.email],
      subject: 'We received your message',
      html: `
        <h1>Thank you for reaching out, ${submission.name}!</h1>
        <p>We have received your message and will get back to you soon.</p>
        <p>Your message: "${submission.message}"</p>
        <p>Best regards,<br>Developer Portfolio Team</p>
      `,
    });

    // Log any user email sending errors but continue to try sending admin notification
    if (userEmailError) {
      console.error('User confirmation email error:', userEmailError);
    } else {
      console.log("Confirmation email sent to user:", userEmailData);
    }

    // Send notification email to site admin
    console.log("Sending notification email to admin:", ADMIN_EMAIL);
    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `New Contact Form Submission from ${submission.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${submission.name} (${submission.email})</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message}</p>
      `,
    });

    // Handle admin email sending errors
    if (adminEmailError) {
      console.error('Admin notification email error:', adminEmailError);
    } else {
      console.log("Admin notification email sent:", adminEmailData);
    }

    // If both emails failed, return an error
    if (userEmailError && adminEmailError) {
      return new Response(JSON.stringify({ 
        error: 'Failed to send emails', 
        details: { userEmailError, adminEmailError } 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Return a successful response if at least one email was sent
    return new Response(JSON.stringify({ 
      message: 'Contact form processed',
      userEmailSent: !userEmailError,
      adminEmailSent: !adminEmailError,
      data: { userEmailData, adminEmailData } 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // Handle any unexpected errors
    console.error('Contact confirmation function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

// Start the Deno server to listen for incoming requests
serve(handler);
