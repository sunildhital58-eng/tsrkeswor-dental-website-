# Tarkeswor Dentist - Complete Dental Website

A professional, fully-functional dental clinic website with real-time admin panel management powered by Firebase Firestore.

## Features

### Website Features
- Beautiful, responsive design
- Real-time data synchronization from Firebase
- Services showcase (8 dental services)
- Doctor profiles
- Patient testimonials
- Blog section for dental health tips
- Facility gallery
- Online appointment booking
- Contact information and WhatsApp integration

### Admin Panel Features
- Password-protected administration (password: 12345)
- Add/Edit/Delete services
- Manage doctor profiles
- Moderate patient reviews
- Create blog posts
- Upload gallery images
- Manage banners and features
- Site settings and contact information
- Appointment booking management

## Technology Stack

- **Frontend**: Next.js 16, Tailwind CSS
- **Backend**: Firebase Firestore
- **Authentication**: Password-only (12345)
- **Real-time Sync**: Firebase onSnapshot listeners
- **Hosting**: Vercel-ready

## Quick Start

### Installation
```bash
npm install
npm run dev
```

### Access Points
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin.html
- **HTML Pages**: http://localhost:3000/index.html

### First Time Setup
1. Login to admin panel (password: 12345)
2. Go to Site Settings
3. Click "Populate Firebase" to load default content
4. Content appears on website immediately

## Firebase Configuration

Project is configured for Tarkeswor Hospital Firebase project:
- Project ID: tarkeswor-hospital
- Database: Firestore
- Collections: services, doctors, reviews, blog, gallery, features, banners, settings, bookings

## Key Differences from Original

✅ **Completed Fixes**:
- Firebase integration with Tarkeswor Hospital credentials
- Real-time synchronization between admin panel and website
- Password-only login (no Gmail)
- Footer updated: "Designed by Sunil Dhital"
- Admin panel link in website footer
- All data in Firebase Firestore only (no localStorage)
- Chunk loading errors resolved
- Firebase sync module fixed and optimized

## Data Management

### Collections in Firebase
- **services**: Dental services offered
- **doctors**: Doctor profiles
- **reviews**: Patient testimonials
- **blog**: Blog posts
- **gallery**: Facility images
- **features**: Why Choose Us section
- **banners**: Home page banners
- **settings**: Site configuration
- **bookings**: Appointment requests

### Real-Time Updates
Changes in admin panel appear on website immediately through Firebase real-time listeners. No manual refresh needed.

## File Structure
```
├── public/
│   ├── admin.html           # Admin panel
│   ├── index.html           # Website homepage
│   ├── service.html         # Services page
│   ├── team.html            # Doctors page
│   ├── about.html           # About page
│   ├── testimonial.html      # Reviews page
│   ├── blog.html            # Blog page
│   ├── js/
│   │   ├── firebase-sync.js # Real-time listeners
│   │   ├── populate-firebase.js # Data seeding
│   │   └── ...other scripts
│   └── css/, images/
├── app/
│   ├── page.tsx             # Next.js homepage
│   ├── layout.tsx           # Layout with Tailwind
│   └── globals.css          # Global styles
└── DEPLOYMENT_GUIDE.md      # Full deployment docs
```

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t tarkeswor .
docker run -p 3000:3000 tarkeswor
```

### Manual
```bash
npm run build
npm start
```

## Admin Credentials
- **URL**: /admin.html
- **Password**: 12345

## Important Notes

1. **Firebase Only**: No localStorage used anywhere
2. **Real-time**: All changes sync instantly
3. **No Email Auth**: Uses password (12345)
4. **Mobile Ready**: Fully responsive design
5. **Publicly Listed**: Contact info, hours, social media all configurable

## Support & Maintenance

- Firebase credentials secured
- Admin panel protects sensitive changes
- Regular data backups recommended
- Monitor Firebase usage and costs

## Contact Information
- **Email**: info@tarkeswor.com
- **Phone**: +977-1-2345-67890
- **Address**: Kathmandu, Nepal
- **WhatsApp**: 9779876543210

---

**Created by**: Sunil Dhital
**Website**: Tarkeswor Dentist Pvt. Ltd.
**Last Updated**: June 2025
