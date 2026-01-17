# EmailJS Setup Guide

EmailJS has been successfully integrated into your portfolio! Follow these steps to complete the setup:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. For **Gmail**:
   - Click on Gmail
   - Click "Connect Account"
   - Sign in with your Google account
   - Grant permissions
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** Contact Form Portfolio

**Subject:** 
```
New Contact from {{from_name}} - {{subject}}
```

**Content (HTML or Plain Text):**
```
Hello Aditya,

You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{reply_to}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Click **Save** and copy the **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Scroll down to **API Keys** section
3. Copy your **Public Key** (e.g., `xYzAbC123DeFgHiJ`)

## Step 5: Update Environment Variables

Open the `.env.local` file and replace the placeholder values:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
```

## Step 6: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to the contact section on your portfolio
3. Fill out the form and click "Send Message"
4. Check your email inbox for the message
5. Check the browser console for any errors

## Important Notes

- ✅ The form now sends real emails using EmailJS
- ✅ Error handling is included
- ✅ Form fields have proper names for EmailJS:
  - `from_name` - sender's name
  - `reply_to` - sender's email
  - `subject` - message subject
  - `message` - message body
- ✅ `.env.local` is git-ignored by default (keep your keys private!)

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Rate limit: 2 requests per second
- Perfect for a portfolio website!

## Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Verify all environment variables are correct
3. Make sure you restarted the dev server after updating `.env.local`
4. Check EmailJS dashboard for any service issues

### Getting rate limit errors?
- Wait a few seconds between test emails
- Upgrade to paid plan if needed

### Emails going to spam?
- Add `noreply@emailjs.com` to your contacts
- Check your spam folder initially

## Security Note

- Never commit `.env.local` to git
- Your public key is safe to expose (it's called "public" for a reason)
- Service ID and Template ID are also safe to expose

---

Need help? Check [EmailJS Documentation](https://www.emailjs.com/docs/)
