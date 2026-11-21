// ✏️ Ellaa details-um inga mattum maatha pothum.

export const SITE_URL = "https://your-wedding-site.vercel.app"; // deploy pannina apram idha maathunga (QR idhu-ku point aagum)

// Optional: guests feedback ellaarukum theriya Google Apps Script / Firebase endpoint
// Empty-a vittaa feedback antha phone-la mattum save aagum (localStorage)
export const FEEDBACK_ENDPOINT = "";

export const COUPLE = {
  groom: {
    name: "Dr. S. Gokulraj",
    short: "Gokulraj",
    degree: "M.B.B.S.",
    role: "General Physician",
    parents: "Son of M. Sakthivel – Selvi",
    place: "Kallakurichi",
  },
  bride: {
    name: "Dr. M.P. Megala",
    short: "Megala",
    degree: "M.B.B.S., M.S. (OG)",
    role: "Obstetrician & Gynecologist",
    parents: "Daughter of A. Manokaran – Poonkuzhali",
    place: "Sathanandhal",
  },
};

export const EVENTS = [
  {
    key: "wedding",
    title: "Wedding",
    // tamil: "திருமணம்",
    day: "Sunday",
    date: "22 Nov 2026",
    time: "8:30 – 10:00 AM",
    venue: "Sri Govindaraja Perumal Temple",
    address: "Thillai, Kallakurichi",
    iso: "2026-11-22T08:30:00+05:30",
    map: "https://www.google.com/maps/search/?api=1&query=Sri+Govindaraja+Perumal+Temple+Thillai+Kallakurichi",
  },
  {
    key: "reception",
    title: "Reception",
    // tamil: "வரவேற்பு",
    day: "Monday",
    date: "23 Nov 2026",
    time: "6:00 PM onwards",
    venue: "R.E. Mahal (A/C)",
    address: "Valathi, Gingee Road",
    iso: "2026-11-23T18:00:00+05:30",
    map: "https://www.google.com/maps/search/?api=1&query=R.E.+Mahal+Valathi+Gingee+Road",
  },
];

export const HOSTS = ["M. Sakthivel – Selvi", "A. Manokaran – Poonkuzhali"];

export const BLESSINGS = ["SRI PERIYANDAVAR THUNAI", "SRI PALAYATHU PACHAIYAMMAN THUNAI"];

// Photos: public/ folder-la podunga. File illaina illustration kaattum.
export const PHOTOS = {
  couple: "/megala_photos/photo4.jpg",
  coupleSaree: "/megala_photos/photo11.jpg",
  holdingHands: "/holding_hands.png",
  gallery: [
    "/megala_photos/photo1.jpg",
    "/megala_photos/photo2.jpg",
    "/megala_photos/photo3.jpg",
    "/megala_photos/photo4.jpg",
    "/megala_photos/photo5.jpg",
    "/megala_photos/photo6.jpg",
    "/megala_photos/photo7.jpg",
    "/megala_photos/photo8.jpg",
    "/megala_photos/photo9.jpg",
    "/megala_photos/photo10.jpg",
    "/megala_photos/photo11.jpg",
    "/megala_photos/photo12.jpg",
  ],
};

export const STORY = [
  {
    year: "6 September",
    title: "A chance meeting",
    text: "Two doctors, one unplanned meeting. What began as a simple hello quietly became the start of something special.",
  },
  {
    year: "One week later",
    title: "Families came together",
    text: "Just a week after they first met, the groom's family visited, and the warmth between both families made everything feel right.",
  },
  {
    year: "The Promise",
    title: "Marriage fixed, forever begins",
    text: "With both families' blessings, the date was set. A new chapter begins, built on care, respect and a shared calling to heal.",
  },
];

export const SEED_REVIEWS = [
  { name: "Family & Friends", rating: 5, message: "Wishing you a lifetime of love, health and happiness, doctors! 💚", ts: 1 },
];

// 🧩 Puzzle Section Configuration
export const PUZZLE_CONFIG = {
  title: "Doctor Couple Puzzle",
  // tamilTitle: "திருமண புதிர் விளையாட்டு",
  subtitle: "Can you reassemble Dr. Gokulraj & Dr. Megala's portrait?",
  photos: [
    { id: 1, label: "Doctor Couple", src: "/megala_photos/photo4.jpg" },
    { id: 2, label: "Golden Saree", src: "/megala_photos/moment4.png" },
    { id: 3, label: "Holding Hands ", src: "/megala_photos/moment5.png" },
    { id: 4, label: "Celebration Moments", src: "/loader_bg.png" },
  ],
};

// 🎟️ Scratch Card Surprises
export const SCRATCH_CARDS = [
  {
    id: 1,
    title: "Golden Blessings ✨",
    tag: "Marriage Blessing",
    image: "/megala_photos/photo11.jpg",
    message: "May your lives be blessed with 100 years of unbroken health, overflowing joy, and endless love!",
    quote: "— From our hearts to yours 💚",
  },
  {
    id: 2,
    title: "Doctor's Secret Rx 🩺",
    tag: "Prescription for Love",
    image: "/megala_photos/photo4.jpg",
    message: "Rx: Daily dose of 1 warm hug, shared laughter over tea, and a lifetime of caring for each other!",
    quote: "— Dr. G & Dr. M",
  },
  {
    id: 3,
    title: "Forever Together 💍",
    tag: "Sacred Union",
    image: "/megala_photos/photo1.jpg",
    message: "Two healing hands, two noble doctors, beginning their forever journey with divine grace and love!",
    quote: "— Periyandavar & Pachaiyamman Thunai",
  },
];

// 💬 WhatsApp Website Inquiry Configuration (Full-Stack & Custom Web Development)
export const WHATSAPP_CONFIG = {
  // Ungaloda WhatsApp number inga podunga (with country code, e.g. +917603928428)
  phone: "+917603928428",
  displayPhone: "+917603928428",
  message: "Hello Ramya! I saw your work and I want to build a custom website with backend processes (E-Commerce Shop / Surprise Celebration / Wedding Site / Business Web App). Let's discuss!",
  badgeText: "Order Any Custom Website",
  title: "Need a Custom Website Built for Your Vision?",
  subtitle: "We build all types of modern websites with complete backend processes — E-Commerce Shops, Birthday & Event Surprises, Luxury Wedding Sites, Billing Systems, and Custom Web Applications.",
};

// 💻 Developer Portfolio & Works Showcase (Ramya Karunanithi's Deployed Works)
export const PORTFOLIO_CONFIG = {
  developerName: "Ramya Karunanithi",
  portfolioUrl: "https://ramyaportfolio-eight.vercel.app/",
  githubUrl: "https://github.com/ramyakarunanithi",
  vercelUrl: "https://vercel.com/ramyakarunanithis-projects",
  title: "Featured Works & Creations",
  subtitle: "Explore live web applications, responsive websites & deployed projects crafted by Ramya Karunanithi.",
  projects: [
    {
      id: "portfolio",
      title: "Ramya Karunanithi - Official Developer Portfolio",
      category: "Personal Portfolio & Showcase",
      desc: "Official personal developer portfolio presenting frontend engineering skills, creative design systems, animated web experiments, and featured works.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=700&q=80",
      github: "https://github.com/ramyakarunanithi/portfolio",
      live: "https://ramyaportfolio-eight.vercel.app/",
    },
    {
      id: "fastdriveee",
      title: "Fastdriveee - Driver & Car Rental Platform",
      category: "Web Application",
      desc: "Modern automobile booking and driving services web platform designed for smooth rides, chauffeur booking, and responsive vehicle fleet viewing.",
      tech: ["JavaScript", "HTML5", "CSS3", "Responsive UI"],
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80",
      github: "https://github.com/ramyakarunanithi/fastdriveee",
      live: "https://fastdriveee.vercel.app",
    },
    {
      id: "birthday-surprise",
      title: "Birthday Surprise Interactive Web Celebration",
      category: "Interactive Celebration App",
      desc: "Heartwarming personalized celebration web experience featuring custom sound effects, dynamic confetti bursts, memory galleries, and gift reveal animations.",
      tech: ["JavaScript", "Web Audio API", "CSS3 Animations"],
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=700&q=80",
      github: "https://github.com/ramyakarunanithi/birthdaySurprise",
      live: "https://sharmilasurprise.vercel.app",
    },
    {
      id: "arunagri",
      title: "Arun Agri - Agriculture & Farm Produce",
      category: "Agri-Tech Platform",
      desc: "Dedicated agricultural goods and farming produce platform showcasing organic harvests, agri-supplies, and seamless buyer inquiry flows.",
      tech: ["JavaScript", "HTML5", "CSS3", "Responsive"],
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&q=80",
      github: "https://github.com/ramyakarunanithi/Arunagri",
      live: "https://arunagri-five.vercel.app",
    },
    {
      id: "billing-arun",
      title: "Arun Billing & Retail Invoicing System",
      category: "Business Software",
      desc: "Commercial billing and invoice generation system designed for retail management, fast line-item checkout, tax tallying, and receipt export.",
      tech: ["JavaScript", "HTML5", "Business Logic"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
      github: "https://github.com/ramyakarunanithi/Billing-arun",
      live: "https://billing-arun.vercel.app",
    },
    {
      id: "printss",
      title: "Printss - Custom Digital Merchandise",
      category: "E-Commerce Platform",
      desc: "Online digital printing and custom merchandise store with interactive product preview, categories, cart management, and seamless order checkout.",
      tech: ["JavaScript", "HTML5", "CSS3", "E-Commerce"],
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&q=80",
      github: "https://github.com/ramyakarunanithi/printss",
      live: "https://printss-psi.vercel.app",
    },
    
   
  ],
};
