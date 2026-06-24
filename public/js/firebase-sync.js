// Firebase Realtime Sync Module - Syncs website content from Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, doc, getDoc, getDocs, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
  authDomain: "tarkeswor-hospital.firebaseapp.com",
  projectId: "tarkeswor-hospital",
  storageBucket: "tarkeswor-hospital.firebasestorage.app",
  messagingSenderId: "1012082760166",
  appId: "1:1012082760166:web:7f1eae3749ab31a6f0de27",
  measurementId: "G-C5660VRHRY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global data cache (Firebase only, no localStorage)
const dataCache = {
  settings: null,
  services: [],
  banners: [],
  features: [],
  doctors: [],
  reviews: [],
  blog: [],
  gallery: [],
  solutions: []
};

// Default mock data for initial display
const DEFAULT_SERVICES = [
  {title: "General Dentistry", description: "Routine checkups, cleanings, and fillings to keep your teeth healthy and strong.", image: "https://images.unsplash.com/photo-1588776694971-07c06b2c5e47?w=500", order: 1},
  {title: "Cosmetic Dentistry", description: "Teeth whitening, veneers, and smile makeovers to give you a confident, beautiful smile.", image: "https://images.unsplash.com/photo-1606757226521-d92d6c3c2ca9?w=500", order: 2},
  {title: "Orthodontics", description: "Braces and clear aligners to straighten your teeth and improve your bite.", image: "https://images.unsplash.com/photo-1606059592919-0238b124c005?w=500", order: 3},
  {title: "Oral Surgery", description: "Tooth extractions, wisdom teeth removal, and other surgical dental procedures.", image: "https://images.unsplash.com/photo-1606755962773-d25614b4c4ea?w=500", order: 4},
  {title: "Root Canal Treatment", description: "Comfortable, effective endodontic treatment to save your natural tooth.", image: "https://images.unsplash.com/photo-1588776694971-07c06b2c5e47?w=500", order: 5},
  {title: "Dental Implants", description: "Permanent, natural-looking tooth replacements that restore your smile and function.", image: "https://images.unsplash.com/photo-1606059592919-0238b124c005?w=500", order: 6},
  {title: "Pediatric Dentistry", description: "Gentle, child-friendly dental care to build healthy habits from a young age.", image: "https://images.unsplash.com/photo-1606755962773-d25614b4c4ea?w=500", order: 7},
  {title: "Emergency Dentistry", description: "Urgent dental care for toothaches, broken teeth, and other dental emergencies.", image: "https://images.unsplash.com/photo-1588776694971-07c06b2c5e47?w=500", order: 8}
];

const DEFAULT_DOCTORS = [
  {name: "Dr. Tarkeswor Sharma", title: "Senior Dentist", qualification: "BDS, MDS", image: "https://images.unsplash.com/photo-1622496309379-e5b908fa7be5?w=500", order: 1},
  {name: "Dr. Anita Shrestha", title: "Orthodontist", qualification: "BDS, MDS", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500", order: 2},
  {name: "Dr. Bikash Thapa", title: "Oral Surgeon", qualification: "BDS, MDS", image: "https://images.unsplash.com/photo-1622496309379-e5b908fa7be5?w=500", order: 3},
  {name: "Dr. Sita Karki", title: "Pediatric Dentist", qualification: "BDS", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500", order: 4}
];

// Load settings and setup listeners
export async function initializeFirebaseSync() {
  try {
    console.log('[Firebase Sync] Initializing...');
    
    // Load default data immediately
    dataCache.services = DEFAULT_SERVICES;
    dataCache.doctors = DEFAULT_DOCTORS;
    updateServicesUI();
    updateDoctorsUI();
    
    // Real-time listener for settings
    onSnapshot(
      doc(db, 'settings', 'main'),
      (snapshot) => {
        if (snapshot.exists()) {
          dataCache.settings = snapshot.data();
          console.log('[Firebase Sync] Settings updated');
          updateSettingsUI();
        }
      },
      (error) => {
        console.warn('[Firebase Sync] Settings listener error:', error.code);
      }
    );

    // Real-time listener for services
    onSnapshot(
      query(collection(db, 'services'), orderBy('order', 'asc')),
      (snapshot) => {
        dataCache.services = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
        console.log('[Firebase Sync] Services updated:', dataCache.services.length);
        updateServicesUI();
      },
      (error) => {
        console.warn('[Firebase Sync] Services query error (with order):', error.code);
        // Try without ordering
        onSnapshot(
          collection(db, 'services'),
          (snapshot) => {
            dataCache.services = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
            console.log('[Firebase Sync] Services updated (no order):', dataCache.services.length);
            updateServicesUI();
          },
          (error2) => {
            console.error('[Firebase Sync] Services error (no order):', error2);
          }
        );
      }
    );

    // Real-time listener for banners
    onSnapshot(query(collection(db, 'banners'), orderBy('sortOrder')), (snapshot) => {
      dataCache.banners = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
      updateBannersUI();
    });

    // Real-time listener for features
    onSnapshot(query(collection(db, 'features'), orderBy('sortOrder')), (snapshot) => {
      dataCache.features = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
      updateFeaturesUI();
    });

    // Real-time listener for doctors
    onSnapshot(
      query(collection(db, 'doctors'), orderBy('order', 'asc')),
      (snapshot) => {
        dataCache.doctors = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
        updateDoctorsUI();
      },
      (error) => {
        console.error('[Firebase Sync] Doctors error:', error);
        onSnapshot(collection(db, 'doctors'), (snapshot) => {
          dataCache.doctors = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
          updateDoctorsUI();
        });
      }
    );

    // Real-time listener for reviews
    onSnapshot(query(collection(db, 'reviews'), orderBy('sortOrder')), (snapshot) => {
      dataCache.reviews = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
      updateReviewsUI();
    });

    // Real-time listener for blog posts
    onSnapshot(query(collection(db, 'blog'), orderBy('publishedAt', 'desc')), (snapshot) => {
      dataCache.blog = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
      updateBlogUI();
    });

    // Real-time listener for gallery
    onSnapshot(query(collection(db, 'gallery'), orderBy('sortOrder')), (snapshot) => {
      dataCache.gallery = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
      updateGalleryUI();
    });

    // Real-time listener for solutions
    onSnapshot(query(collection(db, 'solutions'), orderBy('sortOrder')), (snapshot) => {
      dataCache.solutions = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
      updateSolutionsUI();
    });
  } catch (error) {
    console.error('[Firebase Sync] Initialization error:', error);
  }
}

// UI Update Functions
function updateSettingsUI() {
  if (!dataCache.settings) return;
  const s = dataCache.settings;
  
  // Update site metadata
  const phoneEl = document.getElementById('site-phone');
  const emailEl = document.getElementById('site-email');
  const addressEl = document.getElementById('site-address');
  
  if (s.phone && phoneEl) {
    phoneEl.href = 'tel:' + s.phone;
    phoneEl.textContent = s.phone;
  }
  if (s.email && emailEl) {
    emailEl.href = 'mailto:' + s.email;
    emailEl.textContent = s.email;
  }
  if (s.address && addressEl) {
    addressEl.textContent = s.address;
  }
  
  // Update social links
  const facebookEl = document.getElementById('site-facebook');
  const twitterEl = document.getElementById('site-twitter');
  const instagramEl = document.getElementById('site-instagram');
  const linkedinEl = document.getElementById('site-linkedin');
  
  if (s.facebook && facebookEl) facebookEl.href = s.facebook;
  if (s.twitter && twitterEl) twitterEl.href = s.twitter;
  if (s.instagram && instagramEl) instagramEl.href = s.instagram;
  if (s.linkedin && linkedinEl) linkedinEl.href = s.linkedin;
  
  // Update site branding
  if (s.siteName) {
    const logoEl = document.getElementById('site-logo-text');
    if (logoEl) logoEl.textContent = s.siteName;
    document.title = s.siteName;
  }
}

function updateServicesUI() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  
  if (dataCache.services.length === 0) {
    grid.innerHTML = '<div class="col-12 text-center py-5"><p>Loading services...</p></div>';
    return;
  }
  
  grid.innerHTML = dataCache.services.map(s => `
    <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
      <div class="service-item bg-light rounded h-100 p-5">
        <div class="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style="width: 65px; height: 65px;">
          <i class="fas fa-${s.icon?.replace('fas fa-', '') || 'tooth'} fa-2x text-primary"></i>
        </div>
        <h4 class="mb-3">${s.title || 'Service'}</h4>
        <p class="mb-0">${s.description || ''}</p>
      </div>
    </div>
  `).join('');
}

function updateBannersUI() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;
  
  if (dataCache.banners.length === 0) return;
  
  carousel.innerHTML = dataCache.banners.map((b, i) => `
    <div class="header-carousel-item bg-dark rounded" style="background-image: url('${b.image || 'img/carousel-1.jpg'}'); background-repeat: no-repeat; background-size: cover; background-position: center;">
      <div class="carousel-inner">
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <div class="p-3" style="max-width: 900px;">
              <h5 class="text-white text-uppercase mb-3">${b.subtitle || ''}</h5>
              <h1 class="display-1 text-white mb-md-4">${b.title || ''}</h1>
              <p class="text-white mb-4 fs-5">${b.text || ''}</p>
              <a href="${b.buttonUrl || 'appointment.html'}" class="btn btn-primary rounded-pill text-white py-md-3 px-md-5 me-3">
                ${b.buttonText || 'Book Appointment'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function updateFeaturesUI() {
  const grid = document.getElementById('why-choose-grid');
  if (!grid) return;
  
  if (dataCache.features.length === 0) return;
  
  grid.innerHTML = dataCache.features.map(f => `
    <div class="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
      <div class="why-choose-item bg-light rounded p-4 h-100">
        <div class="bg-white rounded-circle d-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
          <i class="fas fa-${f.icon?.replace('fas fa-', '') || 'check'} text-primary"></i>
        </div>
        <h5>${f.title || 'Feature'}</h5>
        <p class="mb-0">${f.description || ''}</p>
      </div>
    </div>
  `).join('');
}

function updateDoctorsUI() {
  const grid = document.getElementById('doctors-grid');
  if (!grid) return;
  
  if (dataCache.doctors.length === 0) return;
  
  grid.innerHTML = dataCache.doctors.map(d => `
    <div class="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
      <div class="team-item bg-light rounded overflow-hidden">
        <div class="position-relative overflow-hidden">
          <img class="img-fluid w-100" src="${d.avatarUrl || 'img/team-default.jpg'}" alt="${d.name}">
        </div>
        <div class="p-4">
          <h5>${d.name || 'Doctor'}</h5>
          <p class="text-primary mb-2">${d.category || 'Dentist'}</p>
          <p class="text-muted small mb-0">${d.detail || ''}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function updateReviewsUI() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;
  
  if (dataCache.reviews.length === 0) return;
  
  grid.innerHTML = dataCache.reviews.map(r => `
    <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
      <div class="testimonial-item bg-light rounded p-5 h-100">
        <div class="d-flex align-items-center mb-3">
          <img class="flex-shrink-0 rounded-circle" src="${r.avatarUrl || 'img/avatar-default.jpg'}" alt="${r.name}" style="width: 60px; height: 60px;">
          <div class="ms-3">
            <h5 class="mb-1">${r.name || 'Patient'}</h5>
            <div class="text-warning">${'⭐'.repeat(r.rating || 5)}</div>
          </div>
        </div>
        <p class="mb-0">"${r.review || ''}"</p>
      </div>
    </div>
  `).join('');
}

function updateBlogUI() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  
  if (dataCache.blog.length === 0) return;
  
  grid.innerHTML = dataCache.blog.slice(0, 3).map(b => `
    <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
      <div class="blog-item bg-light rounded overflow-hidden h-100">
        <div class="blog-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src="${b.image || 'img/blog-default.jpg'}" alt="${b.title}">
        </div>
        <div class="p-4">
          <a href="#" class="d-block h5 link-dark mb-2">${b.title || 'Blog Post'}</a>
          <p class="text-muted small mb-3">${b.author || 'Author'} - ${new Date(b.publishedAt?.toDate?.() || Date.now()).toLocaleDateString()}</p>
          <p class="mb-0">${b.excerpt || b.content?.substring(0, 100) || ''}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function updateGalleryUI() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  
  if (dataCache.gallery.length === 0) return;
  
  grid.innerHTML = dataCache.gallery.map(g => `
    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <div class="portfolio-item position-relative overflow-hidden rounded">
        <img class="img-fluid w-100" src="${g.imageUrl || 'img/gallery-default.jpg'}" alt="${g.caption}">
        <a class="portfolio-overlay" href="#">
          <h5 class="text-white">${g.caption || 'Gallery Image'}</h5>
        </a>
      </div>
    </div>
  `).join('');
}

function updateSolutionsUI() {
  const grid = document.getElementById('solutions-grid');
  if (!grid) return;
  
  if (dataCache.solutions.length === 0) return;
  
  grid.innerHTML = dataCache.solutions.map(sol => `
    <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
      <div class="service-item bg-light rounded p-5 h-100">
        <h5 class="mb-3">${sol.title || 'Solution'}</h5>
        <p class="mb-0">${sol.description || ''}</p>
      </div>
    </div>
  `).join('');
}

// Export cache for direct access
export const getDataCache = () => dataCache;
