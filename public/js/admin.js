// Admin Panel - Firebase CRUD Operations
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot, addDoc, query, orderBy, writeBatch } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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

let editingId = null;
let editingType = null;

// ════════════════════ UTILITIES ════════════════════
function showAlert(msg, type='success') {
  const alertHtml = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
  const container = document.querySelector('.main-content');
  if (container) { const div = document.createElement('div'); div.innerHTML = alertHtml; container.insertBefore(div, container.firstChild); setTimeout(() => div.remove(), 4000); }
}

function showSection(name, el) {
  document.querySelectorAll('.section-panel').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${name}`)?.classList.add('active');
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
  if (name === 'services') loadServices();
  else if (name === 'features') loadFeatures();
  else if (name === 'gallery') loadGallery();
  else if (name === 'doctors') loadDoctors();
  else if (name === 'reviews') loadReviews();
  else if (name === 'blog') loadBlog();
  else if (name === 'banners') loadBanners();
  else if (name === 'solutions') loadSolutions();
  else if (name === 'bookings') loadBookings();
}

function toggleSidebar() { document.getElementById('sidebar')?.classList.toggle('open'); document.getElementById('sidebarOverlay')?.classList.toggle('show'); }
function closeSidebar() { document.getElementById('sidebar')?.classList.remove('open'); document.getElementById('sidebarOverlay')?.classList.remove('show'); }

// ════════════════════ SERVICES CRUD ════════════════════
async function loadServices() {
  try {
    const snap = await getDocs(query(collection(db, 'services'), orderBy('sortOrder')));
    const tbody = document.getElementById('services-table');
    if (!tbody) return;
    if (!snap.size) { tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No services yet</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map(d => {
      const data = d.data();
      return `<tr>
        <td><img src="${data.image}" class="img-preview" alt=""></td>
        <td>${data.title}</td>
        <td><small>${data.description?.substring(0,40)}...</small></td>
        <td><small>${data.sortOrder||1}</small></td>
        <td><button class="btn btn-sm btn-warning" onclick="editService('${d.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteService('${d.id}')"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    }).join('');
  } catch(e) { console.error('[v0] Services load error:', e); showAlert('Error loading services', 'danger'); }
}

function openModal(type) {
  editingId = null;
  editingType = type;
  const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')) || new bootstrap.Modal(document.getElementById('editModal'));
  document.getElementById('editModal').querySelector('.modal-title').textContent = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  document.getElementById('modalForm')?.reset();
  modal.show();
}

window.editService = async function(id) {
  try {
    const snap = await getDoc(doc(db, 'services', id));
    if (!snap.exists()) return;
    const data = snap.data();
    editingId = id;
    editingType = 'service';
    document.getElementById('editModal').querySelector('.modal-title').textContent = 'Edit Service';
    document.getElementById('modalForm')?.reset();
    Object.keys(data).forEach(k => {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = data[k];
    });
    new bootstrap.Modal(document.getElementById('editModal')).show();
  } catch(e) { showAlert('Error loading service', 'danger'); }
};

window.deleteService = async function(id) {
  if (!confirm('Delete this service?')) return;
  try {
    await deleteDoc(doc(db, 'services', id));
    showAlert('Service deleted');
    loadServices();
  } catch(e) { showAlert('Error deleting service', 'danger'); }
};

// ════════════════════ FEATURES CRUD ════════════════════
async function loadFeatures() {
  try {
    const snap = await getDocs(query(collection(db, 'features'), orderBy('sortOrder')));
    const tbody = document.getElementById('features-table');
    if (!tbody) return;
    if (!snap.size) { tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No features yet</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map(d => {
      const data = d.data();
      return `<tr>
        <td><i class="${data.icon}"></i></td>
        <td>${data.title}</td>
        <td><small>${data.description?.substring(0,40)}...</small></td>
        <td><small>${data.sortOrder||1}</small></td>
        <td><button class="btn btn-sm btn-warning" onclick="editFeature('${d.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteFeature('${d.id}')"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    }).join('');
  } catch(e) { console.error('[v0] Features load error:', e); }
}

window.editFeature = async function(id) {
  try {
    const snap = await getDoc(doc(db, 'features', id));
    if (!snap.exists()) return;
    const data = snap.data();
    editingId = id;
    editingType = 'feature';
    document.getElementById('editModal').querySelector('.modal-title').textContent = 'Edit Feature';
    document.getElementById('modalForm')?.reset();
    Object.keys(data).forEach(k => {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = data[k];
    });
    new bootstrap.Modal(document.getElementById('editModal')).show();
  } catch(e) { showAlert('Error loading feature', 'danger'); }
};

window.deleteFeature = async function(id) {
  if (!confirm('Delete this feature?')) return;
  try {
    await deleteDoc(doc(db, 'features', id));
    showAlert('Feature deleted');
    loadFeatures();
  } catch(e) { showAlert('Error deleting feature', 'danger'); }
};

// ════════════════════ GALLERY CRUD ════════════════════
async function loadGallery() {
  try {
    const snap = await getDocs(query(collection(db, 'gallery'), orderBy('sortOrder')));
    const grid = document.getElementById('gallery-admin-grid');
    if (!grid) return;
    if (!snap.size) { grid.innerHTML = '<div class="col-12 text-center py-4 text-muted">No gallery items</div>'; return; }
    grid.innerHTML = snap.docs.map(d => {
      const data = d.data();
      return `<div class="col-md-4 col-6">
        <div class="card"><img src="${data.imageUrl}" class="card-img-top" alt="" style="height:200px;object-fit:cover;">
        <div class="card-body p-2"><small>${data.caption}</small>
        <div class="mt-2"><button class="btn btn-sm btn-warning" onclick="editGallery('${d.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteGallery('${d.id}')"><i class="fas fa-trash"></i></button></div></div></div>
      </div>`;
    }).join('');
  } catch(e) { console.error('[v0] Gallery load error:', e); }
}

window.editGallery = async function(id) {
  try {
    const snap = await getDoc(doc(db, 'gallery', id));
    if (!snap.exists()) return;
    const data = snap.data();
    editingId = id;
    editingType = 'gallery';
    document.getElementById('editModal').querySelector('.modal-title').textContent = 'Edit Gallery Item';
    document.getElementById('modalForm')?.reset();
    Object.keys(data).forEach(k => {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = data[k];
    });
    new bootstrap.Modal(document.getElementById('editModal')).show();
  } catch(e) { showAlert('Error loading gallery item', 'danger'); }
};

window.deleteGallery = async function(id) {
  if (!confirm('Delete this gallery item?')) return;
  try {
    await deleteDoc(doc(db, 'gallery', id));
    showAlert('Gallery item deleted');
    loadGallery();
  } catch(e) { showAlert('Error deleting gallery item', 'danger'); }
};

// ════════════════════ DOCTORS CRUD ════════════════════
async function loadDoctors() {
  try {
    const snap = await getDocs(query(collection(db, 'doctors'), orderBy('sortOrder')));
    const grid = document.getElementById('doctors-admin-grid');
    if (!grid) return;
    if (!snap.size) { grid.innerHTML = '<div class="col-12 text-center py-4 text-muted">No doctors</div>'; return; }
    grid.innerHTML = snap.docs.map(d => {
      const data = d.data();
      return `<div class="col-md-6 col-lg-4">
        <div class="card"><img src="${data.avatarUrl}" class="card-img-top" alt="" style="height:250px;object-fit:cover;">
        <div class="card-body"><h6>${data.name}</h6><small>${data.category}</small>
        <div class="mt-2"><button class="btn btn-sm btn-warning" onclick="editDoctor('${d.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteDoctor('${d.id}')"><i class="fas fa-trash"></i></button></div></div></div>
      </div>`;
    }).join('');
  } catch(e) { console.error('[v0] Doctors load error:', e); }
}

window.editDoctor = async function(id) {
  try {
    const snap = await getDoc(doc(db, 'doctors', id));
    if (!snap.exists()) return;
    const data = snap.data();
    editingId = id;
    editingType = 'doctor';
    document.getElementById('editModal').querySelector('.modal-title').textContent = 'Edit Doctor';
    document.getElementById('modalForm')?.reset();
    Object.keys(data).forEach(k => {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = data[k];
    });
    new bootstrap.Modal(document.getElementById('editModal')).show();
  } catch(e) { showAlert('Error loading doctor', 'danger'); }
};

window.deleteDoctor = async function(id) {
  if (!confirm('Delete this doctor?')) return;
  try {
    await deleteDoc(doc(db, 'doctors', id));
    showAlert('Doctor deleted');
    loadDoctors();
  } catch(e) { showAlert('Error deleting doctor', 'danger'); }
};

// ════════════════════ REVIEWS CRUD ════════════════════
async function loadReviews() {
  try {
    const snap = await getDocs(query(collection(db, 'reviews'), orderBy('sortOrder')));
    const tbody = document.getElementById('reviews-table');
    if (!tbody) return;
    if (!snap.size) { tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No reviews</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map(d => {
      const data = d.data();
      return `<tr>
        <td><img src="${data.image}" class="img-preview" alt=""></td>
        <td>${data.name}</td>
        <td>${data.role}</td>
        <td>${'⭐'.repeat(data.rating||5)}</td>
        <td><small>${data.review?.substring(0,30)}...</small></td>
        <td><button class="btn btn-sm btn-warning" onclick="editReview('${d.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteReview('${d.id}')"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    }).join('');
  } catch(e) { console.error('[v0] Reviews load error:', e); }
}

window.editReview = async function(id) {
  try {
    const snap = await getDoc(doc(db, 'reviews', id));
    if (!snap.exists()) return;
    const data = snap.data();
    editingId = id;
    editingType = 'review';
    document.getElementById('editModal').querySelector('.modal-title').textContent = 'Edit Review';
    document.getElementById('modalForm')?.reset();
    Object.keys(data).forEach(k => {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = data[k];
    });
    new bootstrap.Modal(document.getElementById('editModal')).show();
  } catch(e) { showAlert('Error loading review', 'danger'); }
};

window.deleteReview = async function(id) {
  if (!confirm('Delete this review?')) return;
  try {
    await deleteDoc(doc(db, 'reviews', id));
    showAlert('Review deleted');
    loadReviews();
  } catch(e) { showAlert('Error deleting review', 'danger'); }
};

// ════════════════════ BLOG CRUD ════════════════════
async function loadBlog() {
  try {
    const snap = await getDocs(query(collection(db, 'blog'), orderBy('sortOrder')));
    const tbody = document.getElementById('blog-table');
    if (!tbody) return;
    if (!snap.size) { tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No blog posts</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map(d => {
      const data = d.data();
      return `<tr>
        <td><img src="${data.image}" class="img-preview" alt=""></td>
        <td>${data.title}</td>
        <td>${data.author}</td>
        <td><small>${data.publishedAt}</small></td>
        <td><button class="btn btn-sm btn-warning" onclick="editBlog('${d.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteBlog('${d.id}')"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    }).join('');
  } catch(e) { console.error('[v0] Blog load error:', e); }
}

window.editBlog = async function(id) {
  try {
    const snap = await getDoc(doc(db, 'blog', id));
    if (!snap.exists()) return;
    const data = snap.data();
    editingId = id;
    editingType = 'blog';
    document.getElementById('editModal').querySelector('.modal-title').textContent = 'Edit Blog Post';
    document.getElementById('modalForm')?.reset();
    Object.keys(data).forEach(k => {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = data[k];
    });
    new bootstrap.Modal(document.getElementById('editModal')).show();
  } catch(e) { showAlert('Error loading blog', 'danger'); }
};

window.deleteBlog = async function(id) {
  if (!confirm('Delete this blog post?')) return;
  try {
    await deleteDoc(doc(db, 'blog', id));
    showAlert('Blog post deleted');
    loadBlog();
  } catch(e) { showAlert('Error deleting blog', 'danger'); }
};

// ════════════════════ BANNERS CRUD ════════════════════
async function loadBanners() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'main'));
    let banners = [];
    if (snap.exists() && snap.data().banners_data) {
      try { banners = JSON.parse(snap.data().banners_data); } catch(e) {}
    }
    const list = document.getElementById('banners-list');
    if (!list) return;
    if (!banners.length) { list.innerHTML = '<div class="col-12 text-center py-4 text-muted">No banners</div>'; return; }
    list.innerHTML = banners.map((b, i) => `<div class="col-md-6 col-lg-4">
      <div class="card"><img src="${b.image}" class="banner-thumb" alt="" style="width:100%;height:200px;object-fit:cover;">
      <div class="card-body"><h6>${b.title}</h6><small>${b.subtitle}</small>
      <div class="mt-2"><button class="btn btn-sm btn-warning" onclick="editBanner(${i})"><i class="fas fa-edit"></i></button>
      <button class="btn btn-sm btn-danger" onclick="deleteBanner(${i})"><i class="fas fa-trash"></i></button></div></div></div>
    </div>`).join('');
  } catch(e) { console.error('[v0] Banners load error:', e); }
}

// ════════════════════ SOLUTIONS CRUD ════════════════════
async function loadSolutions() {
  try {
    const snap = await getDocs(query(collection(db, 'solutions'), orderBy('sortOrder')));
    const tbody = document.getElementById('solutions-table');
    if (!tbody) return;
    if (!snap.size) { tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-muted">No solution items</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map(d => {
      const data = d.data();
      return `<tr>
        <td>${data.title}</td>
        <td><small>${data.description?.substring(0,40)}...</small></td>
        <td><small>${data.sortOrder||1}</small></td>
        <td><button class="btn btn-sm btn-warning" onclick="editSolution('${d.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteSolution('${d.id}')"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    }).join('');
  } catch(e) { console.error('[v0] Solutions load error:', e); }
}

window.editSolution = async function(id) {
  try {
    const snap = await getDoc(doc(db, 'solutions', id));
    if (!snap.exists()) return;
    const data = snap.data();
    editingId = id;
    editingType = 'solution';
    document.getElementById('editModal').querySelector('.modal-title').textContent = 'Edit Solution Item';
    document.getElementById('modalForm')?.reset();
    Object.keys(data).forEach(k => {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = data[k];
    });
    new bootstrap.Modal(document.getElementById('editModal')).show();
  } catch(e) { showAlert('Error loading solution', 'danger'); }
};

window.deleteSolution = async function(id) {
  if (!confirm('Delete this solution item?')) return;
  try {
    await deleteDoc(doc(db, 'solutions', id));
    showAlert('Solution deleted');
    loadSolutions();
  } catch(e) { showAlert('Error deleting solution', 'danger'); }
};

async function saveSolutionMeta() {
  try {
    const data = {
      sol_sub: document.getElementById('sol-sub')?.value || '',
      sol_ttl: document.getElementById('sol-ttl')?.value || '',
      sol_dsc: document.getElementById('sol-dsc')?.value || '',
      sol_vid: document.getElementById('sol-vid')?.value || '',
      sol_img: document.getElementById('sol-img')?.value || ''
    };
    const snap = await getDoc(doc(db, 'settings', 'main'));
    if (snap.exists()) {
      await updateDoc(doc(db, 'settings', 'main'), data);
    } else {
      await setDoc(doc(db, 'settings', 'main'), data);
    }
    showAlert('Solutions header saved');
  } catch(e) { showAlert('Error saving', 'danger'); }
}

// ════════════════════ BOOKINGS ════════════════════
async function loadBookings() {
  try {
    const snap = await getDocs(query(collection(db, 'bookings'), orderBy('date')));
    const tbody = document.getElementById('bookings-table');
    if (!tbody) return;
    if (!snap.size) { tbody.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-muted">No bookings</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map((d, i) => {
      const data = d.data();
      const status = data.status || 'pending';
      return `<tr>
        <td>${i+1}</td>
        <td>${data.name}</td>
        <td>${data.phone}</td>
        <td>${data.email}</td>
        <td><small>${data.date}</small></td>
        <td>${data.dept}</td>
        <td><span class="badge badge-${status}">${status}</span></td>
        <td><button class="btn btn-sm btn-info" onclick="deleteBooking('${d.id}')"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    }).join('');
  } catch(e) { console.error('[v0] Bookings load error:', e); }
}

window.deleteBooking = async function(id) {
  if (!confirm('Delete this booking?')) return;
  try {
    await deleteDoc(doc(db, 'bookings', id));
    showAlert('Booking deleted');
    loadBookings();
  } catch(e) { showAlert('Error deleting booking', 'danger'); }
};

// ════════════════════ GLOBAL INIT ════════════════════
window.addEventListener('load', () => {
  const form = document.getElementById('modalForm');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      if (!data.sortOrder) data.sortOrder = 1;
      
      const collection_map = {
        'service': 'services',
        'feature': 'features',
        'gallery': 'gallery',
        'doctor': 'doctors',
        'review': 'reviews',
        'blog': 'blog',
        'solution': 'solutions'
      };
      
      const coll = collection_map[editingType];
      if (coll) {
        if (editingId) {
          await updateDoc(doc(db, coll, editingId), data);
          showAlert(editingType.charAt(0).toUpperCase() + editingType.slice(1) + ' updated');
        } else {
          await addDoc(collection(db, coll), data);
          showAlert(editingType.charAt(0).toUpperCase() + editingType.slice(1) + ' added');
        }
        bootstrap.Modal.getInstance(document.getElementById('editModal'))?.hide();
        showSection(coll.replace('s',''), null);
      }
    };
  }
});

window.showSection = showSection;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.openModal = openModal;
window.saveSolutionMeta = saveSolutionMeta;
