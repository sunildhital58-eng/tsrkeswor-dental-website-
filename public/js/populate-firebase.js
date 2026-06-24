// Comprehensive Firebase data population script
// This populates all website content into Firebase Firestore

export async function populateFirebaseFromWebsite(db) {
  try {
    console.log("[v0] Starting Firebase population...");
    
    // 1. SERVICES Data
    const services = [
      {
        title: "General Dentistry",
        description: "Routine checkups, cleanings, and fillings to keep your teeth healthy and strong.",
        image: "https://images.unsplash.com/photo-1588776694971-07c06b2c5e47?w=500",
        order: 1
      },
      {
        title: "Cosmetic Dentistry",
        description: "Teeth whitening, veneers, and smile makeovers to give you a confident, beautiful smile.",
        image: "https://images.unsplash.com/photo-1606757226521-d92d6c3c2ca9?w=500",
        order: 2
      },
      {
        title: "Orthodontics",
        description: "Braces and clear aligners to straighten your teeth and improve your bite.",
        image: "https://images.unsplash.com/photo-1606059592919-0238b124c005?w=500",
        order: 3
      },
      {
        title: "Oral Surgery",
        description: "Tooth extractions, wisdom teeth removal, and other surgical dental procedures.",
        image: "https://images.unsplash.com/photo-1606755962773-d25614b4c4ea?w=500",
        order: 4
      },
      {
        title: "Root Canal Treatment",
        description: "Comfortable, effective endodontic treatment to save your natural tooth.",
        image: "https://images.unsplash.com/photo-1588776694971-07c06b2c5e47?w=500",
        order: 5
      },
      {
        title: "Dental Implants",
        description: "Permanent, natural-looking tooth replacements that restore your smile and function.",
        image: "https://images.unsplash.com/photo-1606059592919-0238b124c005?w=500",
        order: 6
      },
      {
        title: "Pediatric Dentistry",
        description: "Gentle, child-friendly dental care to build healthy habits from a young age.",
        image: "https://images.unsplash.com/photo-1606755962773-d25614b4c4ea?w=500",
        order: 7
      },
      {
        title: "Emergency Dentistry",
        description: "Urgent dental care for toothaches, broken teeth, and other dental emergencies.",
        image: "https://images.unsplash.com/photo-1588776694971-07c06b2c5e47?w=500",
        order: 8
      }
    ];
    
    // 2. DOCTORS Data
    const doctors = [
      {
        name: "Dr. Tarkeswor Sharma",
        title: "Senior Dentist",
        qualification: "BDS, MDS",
        image: "https://images.unsplash.com/photo-1622496309379-e5b908fa7be5?w=500",
        order: 1
      },
      {
        name: "Dr. Anita Shrestha",
        title: "Orthodontist",
        qualification: "BDS, MDS",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
        order: 2
      },
      {
        name: "Dr. Bikash Thapa",
        title: "Oral Surgeon",
        qualification: "BDS, MDS",
        image: "https://images.unsplash.com/photo-1622496309379-e5b908fa7be5?w=500",
        order: 3
      },
      {
        name: "Dr. Sita Karki",
        title: "Pediatric Dentist",
        qualification: "BDS",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
        order: 4
      }
    ];
    
    // 3. REVIEWS Data
    const reviews = [
      {
        name: "Ram Bahadur",
        text: "Excellent service and professional staff. I feel very comfortable visiting this clinic.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        order: 1
      },
      {
        name: "Sita Poudel",
        text: "Best dental experience ever. Dr. Sharma was very caring and explained everything clearly.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        order: 2
      },
      {
        name: "Hari Khadka",
        text: "Clean facility, friendly staff, and painless treatment. Highly recommended!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        order: 3
      }
    ];
    
    // 4. BLOG POSTS Data
    const blogPosts = [
      {
        title: "How to Maintain Good Oral Hygiene",
        author: "Dr. Tarkeswor Sharma",
        date: new Date("2025-01-15"),
        image: "https://images.unsplash.com/photo-1632825014793-61e47e883dc5?w=500",
        content: "Learn the best practices for maintaining healthy teeth and gums at home with simple daily habits.",
        order: 1
      },
      {
        title: "Why Regular Dental Checkups are Important",
        author: "Dr. Anita Shrestha",
        date: new Date("2025-02-10"),
        image: "https://images.unsplash.com/photo-1606757226521-d92d6c3c2ca9?w=500",
        content: "Regular dental visits can prevent serious problems and save you time and money in the long run.",
        order: 2
      },
      {
        title: "Everything You Need to Know About Dental Implants",
        author: "Dr. Bikash Thapa",
        date: new Date("2025-03-05"),
        image: "https://images.unsplash.com/photo-1588776694971-07c06b2c5e47?w=500",
        content: "Dental implants are the most natural-looking and permanent solution for missing teeth.",
        order: 3
      }
    ];
    
    // 5. GALLERY Images
    const gallery = [
      {
        title: "Our Modern Clinic",
        image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500",
        order: 1
      },
      {
        title: "Reception Area",
        image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500",
        order: 2
      },
      {
        title: "Treatment Room",
        image: "https://images.unsplash.com/photo-1576091160399-112233bbd566?w=500",
        order: 3
      },
      {
        title: "Dental Equipment",
        image: "https://images.unsplash.com/photo-1606803814792-a56b34b76ee5?w=500",
        order: 4
      }
    ];
    
    // 6. FEATURES/Why Choose Us
    const features = [
      {
        title: "Expert Dentists",
        description: "Qualified and experienced dental professionals dedicated to your oral health.",
        icon: "fas fa-user-md",
        order: 1
      },
      {
        title: "Modern Equipment",
        description: "State-of-the-art dental technology for accurate diagnosis and comfortable treatment.",
        icon: "fas fa-wrench",
        order: 2
      },
      {
        title: "Emergency Care",
        description: "24/7 emergency dental services available whenever you need us most.",
        icon: "fas fa-ambulance",
        order: 3
      },
      {
        title: "Affordable Pricing",
        description: "Quality dental care at reasonable prices with flexible payment options.",
        icon: "fas fa-tag",
        order: 4
      },
      {
        title: "Digital X-Rays",
        description: "Low-radiation digital imaging for safe, detailed dental examinations.",
        icon: "fas fa-tooth",
        order: 5
      },
      {
        title: "Child Friendly",
        description: "A warm, welcoming environment that makes children feel comfortable and at ease.",
        icon: "fas fa-smile",
        order: 6
      },
      {
        title: "Comfortable Environment",
        description: "Relaxing clinic atmosphere designed for a stress-free dental experience.",
        icon: "fas fa-couch",
        order: 7
      },
      {
        title: "Flexible Hours",
        description: "Morning and evening appointments to fit your busy schedule.",
        icon: "fas fa-clock",
        order: 8
      }
    ];
    
    // 7. SITE SETTINGS
    const settings = {
      siteName: "Tarkeswor Dentist",
      phone: "+977-1-2345-67890",
      email: "info@tarkeswor.com",
      address: "Kathmandu, Nepal",
      whatsapp: "9779876543210",
      facebook: "https://facebook.com/tarkeswor",
      twitter: "https://twitter.com/tarkeswor",
      instagram: "https://instagram.com/tarkeswor",
      linkedin: "https://linkedin.com/company/tarkeswor",
      googleMapsUrl: "https://maps.google.com/?q=Kathmandu,Nepal"
    };
    
    // Upload to Firebase
    const { setDoc, doc, collection, writeBatch } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    const batch = writeBatch(db);
    
    // Add Services
    services.forEach((service, index) => {
      batch.set(doc(collection(db, "services")), service);
    });
    
    // Add Doctors
    doctors.forEach((doctor, index) => {
      batch.set(doc(collection(db, "doctors")), doctor);
    });
    
    // Add Reviews
    reviews.forEach((review, index) => {
      batch.set(doc(collection(db, "reviews")), review);
    });
    
    // Add Blog Posts
    blogPosts.forEach((post, index) => {
      batch.set(doc(collection(db, "blog")), post);
    });
    
    // Add Gallery
    gallery.forEach((image, index) => {
      batch.set(doc(collection(db, "gallery")), image);
    });
    
    // Add Features
    features.forEach((feature, index) => {
      batch.set(doc(collection(db, "features")), feature);
    });
    
    // Add Settings
    batch.set(doc(db, "settings", "site"), settings);
    
    await batch.commit();
    
    console.log("[v0] Firebase populated successfully!");
    alert("Firebase has been populated with all website content!");
    return true;
  } catch (error) {
    console.error("[v0] Population error:", error);
    alert("Error populating Firebase: " + error.message);
    return false;
  }
}
