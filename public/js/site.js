// Tarkeswor Dentist - Firebase Real-Time Loader
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, doc, getDoc, onSnapshot, addDoc, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyD_UEopKeV9hSoULOs8uQbtE0zxc6aryXo",
  authDomain: "dental-fdb54.firebaseapp.com",
  projectId: "dental-fdb54",
  storageBucket: "dental-fdb54.firebasestorage.app",
  messagingSenderId: "73072316508",
  appId: "1:73072316508:web:1a1383aa1ffec477821699"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── DEFAULT FALLBACK CONTENT ────────────────────────────────────────────────
const DEFAULTS = {
  services: [
    { id:'d1', image:'img/service-1.jpg', title:'General Dentistry', description:'Routine checkups, cleanings, and fillings to keep your teeth healthy and strong.', sortOrder:1 },
    { id:'d2', image:'img/service-2.jpg', title:'Cosmetic Dentistry', description:'Teeth whitening, veneers, and smile makeovers to give you a confident, beautiful smile.', sortOrder:2 },
    { id:'d3', image:'img/service-3.jpg', title:'Orthodontics', description:'Braces and clear aligners to straighten your teeth and improve your bite.', sortOrder:3 },
    { id:'d4', image:'img/service-4.jpg', title:'Oral Surgery', description:'Tooth extractions, wisdom teeth removal, and other surgical dental procedures.', sortOrder:4 },
    { id:'d5', image:'img/service-5.jpg', title:'Root Canal Treatment', description:'Comfortable, effective endodontic treatment to save your natural tooth.', sortOrder:5 },
    { id:'d6', image:'img/service-6.jpg', title:'Dental Implants', description:'Permanent, natural-looking tooth replacements that restore your smile and function.', sortOrder:6 },
    { id:'d7', image:'img/service-7.jpg', title:'Pediatric Dentistry', description:'Gentle, child-friendly dental care to build healthy habits from a young age.', sortOrder:7 },
    { id:'d8', image:'img/service-8.jpg', title:'Emergency Dentistry', description:'Urgent dental care for toothaches, broken teeth, and other dental emergencies.', sortOrder:8 }
  ],
  features: [
    { id:'f1', icon:'fas fa-user-md', title:'Expert Dentists', description:'Qualified and experienced dental professionals dedicated to your oral health.', sortOrder:1 },
    { id:'f2', icon:'fas fa-tools', title:'Modern Equipment', description:'State-of-the-art dental technology for accurate diagnosis and comfortable treatment.', sortOrder:2 },
    { id:'f3', icon:'fas fa-ambulance', title:'Emergency Care', description:'24/7 emergency dental services available when you need us most.', sortOrder:3 },
    { id:'f4', icon:'fas fa-money-bill-wave', title:'Affordable Pricing', description:'Quality dental care at reasonable prices with flexible payment options.', sortOrder:4 },
    { id:'f5', icon:'fas fa-x-ray', title:'Digital X-Rays', description:'Low-radiation digital imaging for safe, detailed dental examinations.', sortOrder:5 },
    { id:'f6', icon:'fas fa-child', title:'Child Friendly', description:'A warm, welcoming environment that makes children feel comfortable and at ease.', sortOrder:6 },
    { id:'f7', icon:'fas fa-couch', title:'Comfortable Environment', description:'Relaxing clinic atmosphere designed for a stress-free dental experience.', sortOrder:7 },
    { id:'f8', icon:'fas fa-clock', title:'Flexible Hours', description:'Morning and evening appointments to fit your busy schedule.', sortOrder:8 }
  ],
  doctors: [
    { id:'dr1', avatarUrl:'img/team-1.jpg', name:'Dr. Tarkeswor Sharma', category:'Senior Dentist', level:'BDS, MDS', sortOrder:1 },
    { id:'dr2', avatarUrl:'img/team-2.jpg', name:'Dr. Anita Shrestha', category:'Orthodontist', level:'BDS, MDS', sortOrder:2 },
    { id:'dr3', avatarUrl:'img/team-3.jpg', name:'Dr. Bikash Thapa', category:'Oral Surgeon', level:'BDS, MDS', sortOrder:3 },
    { id:'dr4', avatarUrl:'img/team-4.jpg', name:'Dr. Sita Karki', category:'Pediatric Dentist', level:'BDS', sortOrder:4 }
  ],
  reviews: [
    { id:'r1', image:'img/testimonial-img.jpg', name:'Ram Bahadur', role:'Patient', rating:5, review:'Excellent service! The doctors are very professional and the clinic is very clean. Highly recommended for all dental needs.', sortOrder:1 },
    { id:'r2', image:'img/testimonial-img.jpg', name:'Sita Devi', role:'Patient', rating:5, review:'Very good experience. The staff is friendly and the treatment was painless. I will definitely come back.', sortOrder:2 },
    { id:'r3', image:'img/testimonial-img.jpg', name:'Hari Prasad', role:'Patient', rating:5, review:'Best dental clinic in the area. Modern equipment and skilled doctors. My whole family comes here for dental care.', sortOrder:3 }
  ],
  gallery: [
    { id:'g1', imageUrl:'img/about-1.jpg', caption:'Our Modern Clinic', sortOrder:1 },
    { id:'g2', imageUrl:'img/about-2.jpg', caption:'Reception Area', sortOrder:2 },
    { id:'g3', imageUrl:'img/video-img.jpg', caption:'Treatment Room', sortOrder:3 },
    { id:'g4', imageUrl:'img/carousel-1.jpg', caption:'Dental Equipment', sortOrder:4 }
  ],
  blog: [
    { id:'b1', image:'img/blog-1.jpg', title:'How to Maintain Good Oral Hygiene', author:'Dr. Tarkeswor Sharma', publishedAt:'Jan 15, 2025', excerpt:'Learn the best practices for maintaining healthy teeth and gums at home with simple daily habits.', sortOrder:1 },
    { id:'b2', image:'img/blog-2.jpg', title:'Why Regular Dental Checkups are Important', author:'Dr. Anita Shrestha', publishedAt:'Feb 10, 2025', excerpt:'Regular dental visits can prevent serious problems and save you time and money in the long run.', sortOrder:2 },
    { id:'b3', image:'img/blog-3.jpg', title:'Everything You Need to Know About Dental Implants', author:'Dr. Bikash Thapa', publishedAt:'Mar 5, 2025', excerpt:'Dental implants are the most natural-looking and permanent solution for missing teeth.', sortOrder:3 }
  ]
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function star(n) {
  return Array.from({length:5},(_,i) => `<i class="fas fa-star${i<n?'':'-half-alt'} text-warning"></i>`).join('');
}

function initOwl(selector, opts) {
  if (!window.$) return;
  const $el = $(selector);
  if (!$el.length) return;
  if ($el.data('owl.carousel')) $el.trigger('destroy.owl.carousel');
  $el.owlCarousel(opts);
}

// ─── SETTINGS (one-time + real-time) ─────────────────────────────────────────
let _settings = {};
function applySettingsData(s) {
  _settings = s || {};
  if (s.seo_title) document.title = s.seo_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && s.seo_description) metaDesc.setAttribute('content', s.seo_description);
  const phoneEl = document.getElementById('site-phone');
  if (phoneEl && s.phone) { phoneEl.textContent = s.phone; phoneEl.href = 'tel:'+s.phone; }
  const emailEl = document.getElementById('site-email');
  if (emailEl && s.email) { emailEl.textContent = s.email; emailEl.href = 'mailto:'+s.email; }
  const addrEl = document.getElementById('site-address');
  if (addrEl && s.address) { addrEl.textContent = s.address; if (s.location_url) addrEl.href = s.location_url; }
  ['facebook','twitter','instagram','linkedin'].forEach(sn => {
    const el = document.getElementById('site-'+sn); if (el && s[sn]) el.href = s[sn];
    const fel = document.getElementById('footer-'+sn); if (fel && s[sn]) fel.href = s[sn];
  });
  const logoEl = document.getElementById('site-logo-text');
  if (logoEl && s.logo_text) logoEl.textContent = s.logo_text;
  document.querySelectorAll('.footer-site-name').forEach(el => { if (s.site_name) el.textContent = s.site_name; });
  const fPhoneEl = document.getElementById('footer-phone');
  if (fPhoneEl && s.phone) { fPhoneEl.textContent = s.phone; fPhoneEl.href = 'tel:'+s.phone; }
  const fEmailEl = document.getElementById('footer-email');
  if (fEmailEl && s.email) { fEmailEl.textContent = s.email; fEmailEl.href = 'mailto:'+s.email; }
  const fAddrEl = document.getElementById('footer-address');
  if (fAddrEl && s.address) fAddrEl.textContent = s.address;
  const fLocEl = document.getElementById('footer-location');
  if (fLocEl && s.location_url) fLocEl.href = s.location_url;
  // Logo image
  const logoImgEl = document.getElementById('site-logo-img');
  if (logoImgEl && s.logo_url) {
    logoImgEl.src = s.logo_url;
    logoImgEl.style.display = '';
    const logoTxtContainer = document.getElementById('site-logo-text-container');
    if (logoTxtContainer) logoTxtContainer.style.display = 'none';
  }
}

function startSettingsListener() {
  onSnapshot(doc(db, 'settings', 'main'), snap => {
    applySettingsData(snap.exists() ? snap.data() : {});
    renderBanner(snap.exists() ? snap.data() : {});
    renderAbout(snap.exists() ? snap.data() : {});
  });
}

// ─── BANNER ──────────────────────────────────────────────────────────────────
function renderBanner(s) {
  const c = document.getElementById('hero-carousel');
  if (!c) return;
  let banners = [];
  if (s && s.banners_data) {
    try { const p = JSON.parse(s.banners_data); if (Array.isArray(p) && p.length) banners = p; } catch(e) {}
  }
  if (!banners.length) {
    banners = [
      { image:'img/carousel-1.jpg', subtitle:'Dental Care Center', title:'Best Dental Care For Your Family', text:'Professional dental services with modern equipment and experienced dentists.', buttonText:'Book Appointment', buttonUrl:'appointment.html' },
      { image:'img/carousel-2.jpg', subtitle:'Advanced Dental Treatment', title:'Modern Dentistry For Your Bright Smile', text:'State-of-the-art dental technology for the best patient care experience.', buttonText:'Our Services', buttonUrl:'service.html' }
    ];
  }
  c.innerHTML = banners.map(b => `
    <div class="header-carousel-item">
      <img src="${b.image}" class="img-fluid w-100" alt="${b.title||''}">
      <div class="carousel-caption"><div class="carousel-caption-content p-3">
        <h5 class="text-white text-uppercase fw-bold mb-3" style="letter-spacing:3px;">${b.subtitle||''}</h5>
        <h1 class="display-1 text-capitalize text-white mb-3">${b.title||''}</h1>
        <p class="mb-4 fs-5">${b.text||''}</p>
        <a class="btn btn-primary rounded-pill text-white py-3 px-5" href="${b.buttonUrl||'appointment.html'}">${b.buttonText||'Book Appointment'}</a>
      </div></div>
    </div>`).join('');
  setTimeout(() => initOwl('.header-carousel', { animateOut:'slideOutDown', items:1, autoplay:true, smartSpeed:1000, dots:false, loop:banners.length>1, nav:true, navText:['<i class="bi bi-arrow-left"></i>','<i class="bi bi-arrow-right"></i>'], autoplayTimeout:7000 }), 0);
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function renderAbout(s) {
  const el = document.getElementById('about-section');
  if (!el || !s) return;
  if (!s.about_title && !s.about_text) return;
  el.innerHTML = `
    <div class="col-lg-5 wow fadeInLeft" data-wow-delay="0.2s">
      <div class="about-img pb-5 ps-5">
        <img src="${s.about_image1||'img/about-1.jpg'}" class="img-fluid rounded w-100" style="object-fit:cover;" alt="">
        <div class="about-img-inner"><img src="${s.about_image2||'img/about-2.jpg'}" class="img-fluid rounded-circle w-100 h-100" alt=""></div>
        <div class="about-experience d-none d-xl-block">${s.about_experience||'15 years experience'}</div>
      </div>
    </div>
    <div class="col-lg-7 wow fadeInRight" data-wow-delay="0.4s">
      <div class="section-title text-start mb-5">
        <h4 class="sub-title pe-3 mb-0">About Us</h4>
        <h1 class="display-3 mb-4">${s.about_title||'We are Ready to Help.'}</h1>
        <p class="mb-4">${s.about_text||''}</p>
        <div class="mb-4">
          ${s.about_check1?`<p class="text-secondary"><i class="fa fa-check text-primary me-2"></i>${s.about_check1}</p>`:''}
          ${s.about_check2?`<p class="text-secondary"><i class="fa fa-check text-primary me-2"></i>${s.about_check2}</p>`:''}
          ${s.about_check3?`<p class="text-secondary"><i class="fa fa-check text-primary me-2"></i>${s.about_check3}</p>`:''}
        </div>
        <a href="about.html" class="btn btn-primary rounded-pill text-white py-3 px-5">Discover More</a>
      </div>
    </div>`;
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
function renderServices(data) {
  const el = document.getElementById('services-grid');
  if (!el) return;
  el.innerHTML = data.map(s => `
    <div class="col-6 col-md-6 col-lg-4 col-xl-3 wow fadeInUp">
      <div class="service-item rounded">
        <div class="service-img rounded-top"><img src="${s.image}" class="img-fluid rounded-top w-100" alt="${s.title}" onerror="this.src='img/service-1.jpg'"></div>
        <div class="service-content rounded-bottom bg-light p-4">
          <div class="service-content-inner">
            <h5 class="mb-4">${s.title}</h5>
            <p class="mb-4">${s.description}</p>
            <a href="service.html" class="btn btn-primary rounded-pill text-white py-2 px-4 mb-2">Read More</a>
          </div>
        </div>
      </div>
    </div>`).join('');
}

function startServicesListener() {
  const el = document.getElementById('services-grid');
  if (!el) return;
  renderServices(DEFAULTS.services); // show defaults immediately
  try {
    onSnapshot(query(collection(db, 'services'), orderBy('sortOrder')), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderServices(data);
    });
  } catch(e) {
    onSnapshot(collection(db, 'services'), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderServices(data);
    });
  }
  // Update booking dept dropdown on services change
  startBookingDeptListener();
}

// ─── FEATURES ────────────────────────────────────────────────────────────────
function renderFeatures(data) {
  const el = document.getElementById('features-grid');
  if (!el) return;
  el.innerHTML = data.map(f => `
    <div class="col-6 col-md-6 col-lg-4 col-xl-3 wow fadeInUp">
      <div class="row-cols-1 feature-item p-4">
        <div class="col-12">
          <div class="feature-icon mb-4"><div class="p-3 d-inline-flex bg-white rounded"><i class="${f.icon} fa-4x text-primary"></i></div></div>
          <div class="feature-content d-flex flex-column">
            <h5 class="mb-4">${f.title}</h5>
            <p class="mb-0">${f.description}</p>
          </div>
        </div>
      </div>
    </div>`).join('');
}

function startFeaturesListener() {
  const el = document.getElementById('features-grid');
  if (!el) return;
  renderFeatures(DEFAULTS.features);
  try {
    onSnapshot(query(collection(db, 'features'), orderBy('sortOrder')), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderFeatures(data);
    });
  } catch(e) {
    onSnapshot(collection(db, 'features'), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderFeatures(data);
    });
  }
}

// ─── DOCTORS ─────────────────────────────────────────────────────────────────
function renderDoctors(data) {
  const el = document.getElementById('doctors-grid');
  if (!el) return;
  el.innerHTML = data.map(d => `
    <div class="col-6 col-md-6 col-lg-4 col-xl-3 wow fadeInUp">
      <div class="team-item rounded overflow-hidden" style="cursor:pointer;" onclick="showDoctorModal('${d.id}')">
        <div class="team-img rounded-top">
          <img src="${d.avatarUrl}" class="img-fluid w-100" alt="${d.name}" onerror="this.src='img/team-1.jpg'">
          <div class="team-social">
            ${d.facebook?`<a href="${d.facebook}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-facebook-f"></i></a>`:''}
            ${d.twitter?`<a href="${d.twitter}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-twitter"></i></a>`:''}
            ${d.instagram?`<a href="${d.instagram}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-instagram"></i></a>`:''}
            ${d.linkedin?`<a href="${d.linkedin}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-linkedin-in"></i></a>`:''}
          </div>
        </div>
        <div class="team-content text-center p-4">
          <h5>${d.name}</h5>
          <p class="text-primary mb-0">${d.category||''}</p>
          <small class="text-muted">${d.level||''}</small>
        </div>
      </div>
    </div>`).join('');
}

let _doctorsCache = [];
function startDoctorsListener() {
  const el = document.getElementById('doctors-grid');
  if (!el) return;
  renderDoctors(DEFAULTS.doctors);
  _doctorsCache = [...DEFAULTS.doctors];
  try {
    onSnapshot(query(collection(db, 'doctors'), orderBy('sortOrder')), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) { renderDoctors(data); _doctorsCache = data; }
    });
  } catch(e) {
    onSnapshot(collection(db, 'doctors'), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) { renderDoctors(data); _doctorsCache = data; }
    });
  }
}

window.showDoctorModal = function(id) {
  const d = _doctorsCache.find(x => x.id === id);
  if (!d) return;
  let modal = document.getElementById('doctorDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'doctorDetailModal';
    modal.className = 'modal fade';
    modal.setAttribute('tabindex','-1');
    modal.innerHTML = `<div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content">
      <div class="modal-header bg-primary text-white"><h5 class="modal-title" id="ddm-name"></h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-4"><div class="col-md-4 text-center"><img id="ddm-avatar" class="img-fluid rounded-circle mb-3" style="width:150px;height:150px;object-fit:cover;" alt=""></div><div class="col-md-8" id="ddm-info"></div></div><div class="mt-3" id="ddm-detail"></div></div>
    </div></div>`;
    document.body.appendChild(modal);
  }
  modal.querySelector('#ddm-name').textContent = d.name;
  modal.querySelector('#ddm-avatar').src = d.avatarUrl;
  modal.querySelector('#ddm-info').innerHTML = `
    <p><strong>Category:</strong> ${d.category||''}</p>
    <p><strong>Level:</strong> ${d.level||''}</p>
    ${d.experience?`<p><strong>Experience:</strong> ${d.experience}</p>`:''}
    ${d.phone?`<p><strong>Phone:</strong> <a href="tel:${d.phone}">${d.phone}</a></p>`:''}
    ${d.email?`<p><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></p>`:''}`;
  modal.querySelector('#ddm-detail').innerHTML = d.detail ? `<hr><h6>About Dr. ${d.name}</h6><p>${d.detail}</p>` : '';
  new bootstrap.Modal(modal).show();
};

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
function renderReviews(data) {
  const el = document.getElementById('reviews-carousel');
  if (!el) return;
  el.innerHTML = data.map(r => `
    <div class="testimonial-item text-center rounded p-4">
      <div class="testimonial-img rounded-circle mb-3 mx-auto" style="width:80px;height:80px;overflow:hidden;">
        <img src="${r.image}" class="img-fluid" alt="${r.name}" style="object-fit:cover;width:100%;height:100%;" onerror="this.src='img/testimonial-img.jpg'">
      </div>
      <p class="fs-5 mb-4">${r.review}</p>
      <div class="mb-2">${star(r.rating||5)}</div>
      <h5 class="mb-1">${r.name}</h5>
      <p class="text-primary mb-0">${r.role||''}</p>
    </div>`).join('');
  setTimeout(() => initOwl(el, {autoplay:true,smartSpeed:1000,loop:true,nav:false,dots:true,items:1,autoplayTimeout:5000}), 0);
}

function startReviewsListener() {
  const el = document.getElementById('reviews-carousel');
  if (!el) return;
  renderReviews(DEFAULTS.reviews);
  try {
    onSnapshot(query(collection(db, 'reviews'), orderBy('sortOrder')), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderReviews(data);
    });
  } catch(e) {
    onSnapshot(collection(db, 'reviews'), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderReviews(data);
    });
  }
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────
function renderGallery(data) {
  const el = document.getElementById('gallery-grid');
  if (!el) return;
  el.innerHTML = data.map(g => `
    <div class="col-6 col-md-6 col-lg-3 wow fadeInUp">
      <div class="gallery-item rounded overflow-hidden">
        <img src="${g.imageUrl}" class="img-fluid w-100" style="height:180px;object-fit:cover;" alt="${g.caption||''}" onerror="this.src='img/about-1.jpg'">
        ${g.caption?`<div class="p-2 text-center small text-muted">${g.caption}</div>`:''}
      </div>
    </div>`).join('');
}

function startGalleryListener() {
  const el = document.getElementById('gallery-grid');
  if (!el) return;
  renderGallery(DEFAULTS.gallery);
  try {
    onSnapshot(query(collection(db, 'gallery'), orderBy('sortOrder')), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderGallery(data);
    });
  } catch(e) {
    onSnapshot(collection(db, 'gallery'), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderGallery(data);
    });
  }
}

// ─── BLOG ────────────────────────────────────────────────────────────────────
function renderBlog(data) {
  const el = document.getElementById('blog-grid');
  if (!el) return;
  el.innerHTML = data.map(b => `
    <div class="col-12 col-md-6 col-lg-4 wow fadeInUp">
      <div class="blog-item rounded overflow-hidden">
        <div class="blog-img"><img src="${b.image}" class="img-fluid w-100" style="height:220px;object-fit:cover;" alt="${b.title}" onerror="this.src='img/blog-1.jpg'"></div>
        <div class="p-4">
          <div class="mb-2 text-muted small"><i class="fas fa-user text-primary me-1"></i>${b.author||''} &nbsp;<i class="fas fa-calendar text-primary me-1 ms-2"></i>${b.publishedAt||''}</div>
          <h5 class="mb-3">${b.title}</h5>
          <p class="mb-3 text-muted">${b.excerpt||''}</p>
          <a href="#" class="btn btn-sm btn-primary rounded-pill">Read More</a>
        </div>
      </div>
    </div>`).join('');
}

function startBlogListener() {
  const el = document.getElementById('blog-grid');
  if (!el) return;
  renderBlog(DEFAULTS.blog);
  try {
    onSnapshot(query(collection(db, 'blog'), orderBy('sortOrder')), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderBlog(data);
    });
  } catch(e) {
    onSnapshot(collection(db, 'blog'), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) renderBlog(data);
    });
  }
}

// ─── SOLUTIONS ───────────────────────────────────────────────────────────────
function startSolutionsListener() {
  const el = document.getElementById('solutions-section');
  if (!el) return;
  onSnapshot(doc(db, 'settings', 'solutions'), snap => {
    if (!snap.exists()) return;
    const {meta, items} = snap.data();
    if (!meta) return;
    const qs = (sel) => el.querySelector(sel);
    if (qs('#sol-subtitle')) qs('#sol-subtitle').textContent = meta.subtitle||'';
    if (qs('#sol-title')) qs('#sol-title').textContent = meta.title||'';
    if (qs('#sol-desc')) qs('#sol-desc').textContent = meta.description||'';
    if (qs('#sol-video-img') && meta.imageUrl) qs('#sol-video-img').src = meta.imageUrl;
    const btn = qs('#sol-video-btn');
    if (btn && meta.videoUrl) btn.setAttribute('data-src', meta.videoUrl);
    const itemsEl = qs('#sol-items');
    if (itemsEl && items && items.length) {
      itemsEl.innerHTML = items.map(it => `
        <div class="mb-4">
          <h5 class="mb-3"><i class="fa fa-check text-primary me-2"></i>${it.title}</h5>
          <p class="mb-0">${it.description}</p>
        </div>`).join('');
    }
  });
}

// ─── BOOKING FORM ────────────────────────────────────────────────────────────
let _latestServices = DEFAULTS.services;

function startBookingDeptListener() {
  const form = document.getElementById('booking-form');
  if (!form) return;
  const deptSelect = form.querySelector('#booking-dept');
  if (!deptSelect) return;
  // Update department dropdown whenever services change
  try {
    onSnapshot(query(collection(db, 'services'), orderBy('sortOrder')), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) _latestServices = data;
      updateDeptDropdown(deptSelect);
    });
  } catch(e) {
    onSnapshot(collection(db, 'services'), snap => {
      const data = snap.docs.map(d => ({id:d.id,...d.data()}));
      if (data.length) _latestServices = data;
      updateDeptDropdown(deptSelect);
    });
  }
  updateDeptDropdown(deptSelect);
}

function updateDeptDropdown(deptSelect) {
  deptSelect.innerHTML = '<option value="">Select Department</option>' +
    _latestServices.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;
  startBookingDeptListener();
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const data = {
      name: form.querySelector('#book-name')?.value||'',
      email: form.querySelector('#book-email')?.value||'',
      phone: form.querySelector('#book-phone')?.value||'',
      gender: form.querySelector('#book-gender')?.value||'',
      date: form.querySelector('#book-date')?.value||'',
      department: form.querySelector('#booking-dept')?.value||'',
      comment: form.querySelector('#book-comment')?.value||'',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    try {
      await addDoc(collection(db, 'bookings'), data);
      alert('Appointment booked successfully!');
      form.reset();
      if (_settings && _settings.whatsapp_number) {
        const msg = `Hello! New appointment from ${data.name} (${data.phone}) on ${data.date} for ${data.department}.`;
        window.open(`https://wa.me/${_settings.whatsapp_number}?text=${encodeURIComponent(msg)}`, '_blank');
      }
    } catch(err) {
      alert('Error saving appointment. Please try again.');
    } finally {
      btn.textContent = origText;
      btn.disabled = false;
    }
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Immediately show default content in ALL sections (removes spinners)
  renderServices(DEFAULTS.services);
  renderFeatures(DEFAULTS.features);
  renderDoctors(DEFAULTS.doctors);
  renderReviews(DEFAULTS.reviews);
  renderGallery(DEFAULTS.gallery);
  renderBlog(DEFAULTS.blog);
  renderBanner({});

  // Then start real-time Firebase listeners (will override defaults when data exists)
  startSettingsListener();
  startServicesListener();
  startFeaturesListener();
  startDoctorsListener();
  startReviewsListener();
  startGalleryListener();
  startBlogListener();
  startSolutionsListener();
  initBookingForm();
});
