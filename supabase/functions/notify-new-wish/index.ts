import "@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req) => {
  try {
    // Get the new wish from the Supabase webhook
    const payload = await req.json();

    const wish = payload.record;

    if (!wish) {
      return new Response(
        JSON.stringify({ error: "No wish record received" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const name = wish.name;
    const wishText = wish.wish;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["claireiweama@gmail.com"],
        subject: `🎂 ${name} left you a birthday wish on your Wish Wall!`,
        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 30px;
            background: #fff7fa;
            border-radius: 20px;
          ">
            <h1 style="color: #E56B8A;">
              💌 You received a new birthday wish on your Wish Wall!
            </h1>

            <p style="font-size: 16px; color: #4A5D7A;">
              <strong>${name}</strong> is wishing you a happy birthday
              and just dropped a wish on your Wish Wall.
            </p>

            <div style="
              margin: 25px 0;
              padding: 20px;
              background: white;
              border-left: 4px solid #E56B8A;
              border-radius: 12px;
              color: #4B5563;
              font-size: 16px;
              line-height: 1.6;
            ">
              "${wishText}"
            </div>

            <a
              href="YOUR_WEBSITE_URL"
              style="
                display: inline-block;
                padding: 12px 24px;
                background: #E56B8A;
                color: white;
                text-decoration: none;
                border-radius: 999px;
                font-weight: bold;
              "
            >
              ✨ See the wish
            </a>

            <p style="
              margin-top: 30px;
              color: #4A5D7A;
              font-size: 15px;
            ">
              Cheers to your 24th once again! 🥂❤️
            </p>
          </div>
        `,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend error:", result);

      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          details: result,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Birthday notification sent:", result);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Birthday notification sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Function error:", error);

    return new Response(
      JSON.stringify({
        error: "Something went wrong",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
});