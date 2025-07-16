import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface StreamUpdateEmailParams {
  to_email: string
  topic: string
  summary_content: string
  stream_url: string
  user_name?: string
}

export async function sendStreamUpdateEmail({
  to_email,
  topic,
  summary_content,
  stream_url,
  user_name = 'there'
}: StreamUpdateEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Jurnl AI <updates@jurnl.ai>', // Replace with your verified domain
      to: [to_email],
      subject: `📈 New updates for "${topic}"`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Stream Update</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background-color: white;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #FF6600;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #FF6600;
              margin-bottom: 10px;
            }
            .topic-title {
              font-size: 20px;
              font-weight: 600;
              color: #2c3e50;
              margin-bottom: 20px;
            }
            .summary-content {
              background-color: #f8f9fa;
              border-left: 4px solid #FF6600;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .cta-button {
              display: inline-block;
              background-color: #FF6600;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📰 Jurnl AI</div>
              <p>Your AI research assistant has found new updates</p>
            </div>
            
            <h2>Hi ${user_name}!</h2>
            
            <p>We've found new developments for your stream:</p>
            
            <div class="topic-title">📈 ${topic}</div>
            
            <div class="summary-content">
              <h3>Latest Summary:</h3>
              ${summary_content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
            
            <p>
              <a href="${stream_url}" class="cta-button">View Full Stream →</a>
            </p>
            
            <p>This summary was generated based on the latest developments and news in your area of interest. Stay informed and never miss important updates!</p>
            
            <div class="footer">
              <p>You're receiving this because you subscribed to updates for "${topic}"</p>
              <p>
                <a href="${stream_url}">Manage your stream settings</a> • 
                <a href="mailto:support@jurnl.ai">Contact Support</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Fallback text version
      text: `
Hi ${user_name}!

We've found new developments for your stream: "${topic}"

Latest Summary:
${summary_content}

View the full stream at: ${stream_url}

This summary was generated based on the latest developments and news in your area of interest.

You're receiving this because you subscribed to updates for "${topic}".
Manage your stream settings at: ${stream_url}

Contact support: support@jurnl.ai
      `
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error(`Email sending failed: ${error.message}`)
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }

  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

// Function to send a simple test email (useful for debugging)
export async function sendTestEmail(to_email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Jurnl AI <updates@jurnl.ai>',
      to: [to_email],
      subject: '✅ Jurnl AI Email Test',
      html: `
        <h2>Email Service Working!</h2>
        <p>This is a test email to confirm your Jurnl AI email notifications are set up correctly.</p>
        <p>You should now receive updates when your streams have new content.</p>
      `,
      text: 'Email Service Working! This is a test email to confirm your Jurnl AI email notifications are set up correctly.'
    })

    if (error) {
      throw new Error(`Test email failed: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending test email:', error)
    throw error
  }
} 