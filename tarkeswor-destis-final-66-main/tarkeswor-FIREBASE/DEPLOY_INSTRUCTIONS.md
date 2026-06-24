# Tarkeswor Dentist — Firebase Setup & Deployment

## IMPORTANT: Do These Steps FIRST Before Deploying

---

## STEP 1: Create Firestore Database

1. Go to https://console.firebase.google.com
2. Select your project: **dental-fdb54**
3. Left sidebar → **Firestore Database** → **Create database**
4. Choose **Production mode** → pick a region → **Enable**

---

## STEP 2: Set Security Rules (REQUIRED — site won't load data without this)

In Firestore → **Rules** tab → **replace ALL text** with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{id} {
      allow create: if true;
      allow read, write: if request.auth != null;
    }
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

---

## STEP 3: Enable Admin Login

1. Firebase Console → **Authentication** → **Get started**
2. **Sign-in method** → **Email/Password** → **Enable** → Save
3. **Users** tab → **Add user** → enter your email + password → **Add user**

---

## STEP 4: Deploy Website

### Netlify (Easiest — Drag & Drop)
1. Go to https://app.netlify.com → **Add new site** → **Deploy manually**
2. Drag this entire extracted folder onto the upload zone
3. Done! Live in seconds.

### Vercel
1. Go to https://vercel.com → **Add New Project** → **Upload**
2. Upload this extracted folder (ZIP extracted)
3. No environment variables needed → **Deploy**

### Firebase Hosting (Same Project — Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory: . (dot, current folder)
# Single-page app: No
firebase deploy
```

---

## STEP 5: Access Admin Panel

URL: `https://your-domain/admin.html`

Login with the Firebase email + password from Step 3.

**Admin panel lets you manage:**
- Site Settings (phone, email, address, logo, social media)
- Banners (homepage slideshow)
- Services, Features (Why Choose Us), Gallery
- Doctors/Team, Reviews/Testimonials, Blog
- Bookings (appointment requests from patients)
- Change Password

---

## How Real-Time Updates Work

When you update content in the admin panel → the website **automatically updates in real-time** for all visitors without any page refresh. This uses Firebase Firestore real-time listeners.

---

## Troubleshooting

**Content not loading?** → Check Firestore rules (Step 2). Must be set to allow public reads.

**Admin login fails?** → Check Authentication is enabled (Step 3) and user was created.

**Reset password?** → Firebase Console → Authentication → Users → Send password reset email.
