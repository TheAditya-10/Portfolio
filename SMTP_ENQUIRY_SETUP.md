# SMTP Enquiry Setup

The enquiry form posts to `/api/enquiry` and sends two emails:

- one lead notification email to you
- one confirmation email to the visitor
- one persistent enquiry record into Neon Postgres table `service_enquiries`

Add these environment variables in `.env.local` and in your hosting provider:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM="APST Services <your_smtp_username>"
ENQUIRY_TO=aditya.pratap.singh.tomar.1082006@email.com
```

Optional scheduling CTA:

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/project-call
```

When `NEXT_PUBLIC_CALENDLY_URL` is set, the enquiry section shows a direct scheduling link above email and phone.

Notes:

- Use `SMTP_PORT=465` and `SMTP_SECURE=true` for SSL SMTP providers.
- For Gmail, use an app password instead of your normal account password.
- Keep all SMTP variables server-side only. Do not prefix them with `NEXT_PUBLIC_`.
- If SMTP is missing, the form returns an error asking the visitor to email directly.
- If SMTP is missing, the enquiry is still saved in Neon with `email_status='smtp_not_configured'`.
