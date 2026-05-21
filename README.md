# Waypoint Dentistry — Booking Form & Admin Dashboard

A production-ready Next.js app for Waypoint Dentistry that includes:

- **Public booking form** — patients submit appointment requests
- **Admin dashboard** — manage leads with real-time Firestore sync
- **EmailJS** — instant confirmation email to the patient with unique Patient ID
- **Formspree** — admin notification email on each submission
- **Firebase Firestore** — all leads stored in real-time database

---

## 🗂 Project Structure

```
waypoint-form/
├── components/
│   ├── Header.jsx          # Sticky header with logo
│   ├── BookingForm.jsx     # Public patient intake form
│   ├── Sidebar.jsx         # Contact + steps + links sidebar
│   ├── FAQ.jsx             # Accordion FAQ section
│   ├── SiteLinks.jsx       # Grid links to main website
│   ├── Footer.jsx          # Site footer
│   ├── AdminLogin.jsx      # Admin login screen
│   ├── AdminDashboard.jsx  # Lead management dashboard
│   ├── LeadCard.jsx        # Individual lead card
│   └── AddLeadModal.jsx    # Manual lead entry modal
├── lib/
│   ├── firebase.js         # Firebase initialization
│   └── utils.js            # Patient ID gen, formatters, constants
├── pages/
│   ├── _app.jsx
│   ├── _document.jsx
│   ├── index.jsx           # Public form (/)
│   ├── admin.jsx           # Admin panel (/admin)
│   └── api/
│       └── auth.js         # Server-side credential check
├── styles/
│   └── globals.css         # All styles
├── emailjs-template.html   # Paste this into EmailJS dashboard
├── .env.local.example      # Environment variable reference
└── vercel.json
```

---

## 🚀 Setup & Deployment

### 1. Clone & Install

```bash
git clone https://github.com/shakilxvs/waypoint-form.git
cd waypoint-form
npm install
```

### 2. Environment Variables

Copy `.env.local.example` → `.env.local` and fill in your values:

```
ADMIN_EMAIL=admin@waypointdentistry.com
ADMIN_PASSWORD=EasyPass@1234$

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

NEXT_PUBLIC_EMAILJS_SERVICE_ID=waypointdentistry
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=waypointdentistry
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Ffs0vx4do7yc9RukQ

NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xbdboklo
```

### 3. Firebase Firestore Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) → your project
2. **Firestore Database** → Create database → Start in **production mode**
3. Add this security rule (allows reads/writes from your app only):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      allow read, write: if true; // tighten with auth later
    }
  }
}
```

> For production, enable Firebase Auth and lock the rules to authenticated users.

### 4. EmailJS Setup

1. Log in to [emailjs.com](https://www.emailjs.com/)
2. Go to **Email Templates** → your template
3. Replace the template body with the contents of **`emailjs-template.html`**
4. Set the **Subject** to:
   ```
   ✓ We received your request — {{patient_id}}
   ```
5. Ensure these template variables are mapped:
   - `to_name`, `to_email`, `patient_id`, `service`, `call_date`, `call_time`, `message`

### 5. Formspree Setup

Your Formspree endpoint (`https://formspree.io/f/xbdboklo`) is already configured.
- Log in to [formspree.io](https://formspree.io) to set the notification email to `admin@waypointdentistry.com`

### 6. Deploy to Vercel

```bash
# Push to GitHub first
git add .
git commit -m "Initial commit"
git push origin main
```

Then in Vercel:
1. Import the GitHub repo
2. Add all environment variables from `.env.local.example` under **Project Settings → Environment Variables**
3. Deploy!

---

## 🔑 Admin Access

Navigate to `/admin` on your deployed site.

| Field    | Value                           |
|----------|---------------------------------|
| Email    | `admin@waypointdentistry.com`   |
| Password | set in Vercel env (`ADMIN_PASSWORD`) |

---

## 📧 EmailJS Template Variables

| Variable     | Example Value           |
|--------------|------------------------|
| `to_name`    | Jane Doe               |
| `to_email`   | jane@example.com       |
| `patient_id` | WPD-K3F2A9             |
| `service`    | Professional Cleaning  |
| `call_date`  | 2025-06-12             |
| `call_time`  | 14:00                  |
| `message`    | Any notes from patient |

---

## 🎨 Design System

| Token        | Value        |
|--------------|-------------|
| Primary      | `#2B5F22`   |
| Primary Mid  | `#3D7A33`   |
| Background   | `#F5F0E8`   |
| Card BG      | `#FFFFFF`   |
| Text         | `#1A1A18`   |
| Muted Text   | `#6B6860`   |
| Border       | `#E5DDD0`   |
| Font Display | Playfair Display |
| Font Body    | DM Sans     |
