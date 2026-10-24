import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Received contact form submission from:", email);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store the submission in the database
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    // Send email notification using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["lankavinayvamsi@gmail.com"],
        reply_to: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 212, 255, 0.15);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); padding: 30px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #0a0a0f; font-size: 24px; font-weight: 700; letter-spacing: 1px;">
                          ✨ New Message Received
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        
                        <!-- Sender Info Card -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 212, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.2); border-radius: 12px; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 24px;">
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="padding-bottom: 12px;">
                                    <span style="color: #00d4ff; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">From</span>
                                    <p style="margin: 4px 0 0 0; color: #ffffff; font-size: 18px; font-weight: 600;">${name}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span style="color: #00d4ff; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Email</span>
                                    <p style="margin: 4px 0 0 0;">
                                      <a href="mailto:${email}" style="color: #00d4ff; font-size: 16px; text-decoration: none;">${email}</a>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message Card -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(255, 255, 255, 0.03); border-radius: 12px; border-left: 4px solid #00d4ff;">
                          <tr>
                            <td style="padding: 24px;">
                              <span style="color: #00d4ff; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Message</span>
                              <p style="margin: 12px 0 0 0; color: #e0e0e0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Reply Button -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                          <tr>
                            <td align="center">
                              <a href="mailto:${email}?subject=Re: Your message" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: #0a0a0f; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
                                Reply to ${name}
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background: rgba(0, 0, 0, 0.3); padding: 24px 40px; text-align: center; border-top: 1px solid rgba(0, 212, 255, 0.1);">
                        <p style="margin: 0; color: #666; font-size: 12px;">
                          Sent from your portfolio contact form
                        </p>
                        <p style="margin: 8px 0 0 0; color: #444; font-size: 11px;">
                          ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    if (!emailResponse.ok) {
      console.error("Email sending failed:", emailResult);
      throw new Error(emailResult.message || "Failed to send email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
