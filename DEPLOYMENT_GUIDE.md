# Tarkeswor Dentist - Deployment Guide

## Project Overview
This is a complete dental clinic website with a Firebase-integrated admin panel for content management. All data is stored in Firebase Firestore with real-time synchronization.

## Firebase Configuration
- **Project ID**: tarkeswor-hospital
- **Auth Domain**: tarkeswor-hospital.firebaseapp.com
- **Storage Bucket**: tarkeswor-hospital.firebasestorage.app
- **Config Already Set**: Firebase credentials are configured in:
  - `/public/admin.html` (Admin Panel)
  - `/public/js/firebase-sync.js` (Website Real-time Sync)

## Installation & Setup

### 1. Extract Project
```bash
tar -xzf tarkeswor-dentist-clean.tar.gz
cd v0-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` for the website and `http://localhost:3000/admin.html` for admin panel.

### 4. Build for Production
```bash
npm run build
npm start
```

## Admin Panel Setup

### First Time Setup
1. Open `http://yoursite.com/admin.html`
2. Login with password: **12345**
3. Go to **Site Settings** → Click **"Populate Firebase"** button
4. This will populate Firebase with default website content (services, doctors, reviews, blog posts, gallery)

### Management Features
- **Banners**: Add rotating home page banners
- **Services**: Manage dental services
- **Doctors**: Add/edit doctor profiles
- **Reviews**: Manage patient testimonials
- **Blog**: Create dental health blog posts
- **Gallery**: Upload facility photos
- **Features**: Manage "Why Choose Us" section
- **Site Settings**: Update contact info, social links, branding
- **Bookings**: View appointment requests

## Key Features

### Website
- Beautiful responsive design
- Real-time data from Firebase
- Appointment booking system
- Service showcase
- Doctor profiles
- Patient testimonials
- Blog section
- Gallery
- Contact information

### Admin Panel
- Password-protected (12345)
- No email/Gmail login required
- Full CRUD operations for all content
- Real-time updates to website
- Settings management

## Firebase Real-Time Sync
All changes in the admin panel instantly appear on the website through Firebase Firestore listeners:
- Services, Doctors, Reviews, Blog posts, Gallery, Features update in real-time
- No manual refresh needed
- Zero localStorage usage - pure Firestore only

## Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Push code to main branch
3. Vercel auto-deploys

### Other Platforms
1. Build project: `npm run build`
2. Start: `npm start`
3. Ensure Node.js 18+ available
4. Set environment variables if needed

## Project Structure
```
/app              - Next.js pages
/public           - Static files, HTML pages, images
  /admin.html     - Admin panel
  /index.html     - Website homepage
  /js/            - JavaScript modules
    /firebase-sync.js    - Firebase real-time listeners
    /populate-firebase.js - Data migration script
/styles           - CSS files
```

## Admin Login Credentials
- **URL**: http://yoursite.com/admin.html
- **Password**: 12345

## Important Notes

- **No Email Login**: Uses password only (12345)
- **Firebase Only**: All data in Firestore, no localStorage
- **Real-time Sync**: Website updates instantly when admin changes content
- **Public HTML Files**: Served directly from `/public` folder
- **Mobile Responsive**: Works on all devices

## Troubleshooting

### Firebase Not Loading
- Verify Firebase config in admin.html and firebase-sync.js
- Check Firestore has data (use "Populate Firebase" button)
- Check browser console for Firebase errors

### Admin Panel Not Loading
- Ensure JavaScript is enabled
- Check Firebase connectivity
- Verify credentials in admin.html

### Website Not Showing Content
- Click "Populate Firebase" in admin panel
- Allow 2-3 seconds for real-time listeners to initialize
- Check browser console for errors
- Verify Firestore collections are populated

## Footer Attribution
Website footer shows: "Designed by Sunil Dhital"

## Support
For issues or questions, check Firebase Console at: https://console.firebase.google.com
