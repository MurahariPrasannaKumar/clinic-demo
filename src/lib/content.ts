export const site = {
  name: "Alder Clinic",
  short: "Alder",
  tagline: "Independent primary & specialty care",
  phone: "(503) 555-0148",
  phoneHref: "+15035550148",
  email: "visits@alderclinic.com",
  address: {
    line1: "214 Birchwood Lane",
    line2: "Suite 3, Rivermark District",
    cityStateZip: "Portland, OR 97209",
  },
  hours: [
    { days: "Monday – Thursday", time: "7:30 am – 6:00 pm" },
    { days: "Friday", time: "7:30 am – 4:00 pm" },
    { days: "Saturday", time: "9:00 am – 1:00 pm (urgent only)" },
    { days: "Sunday", time: "Closed" },
  ],
};

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const specialties = [
  "Internal Medicine",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Behavioral Health",
  "Physical Therapy",
];

export type Service = {
  id: string;
  index: string;
  name: string;
  group: "Primary Care" | "Specialty Care" | "Therapies & Support";
  summary: string;
  detail: string;
  duration: string;
  bestFor: string;
};

export const services: Service[] = [
  {
    id: "primary-care",
    index: "01",
    name: "Primary & Family Medicine",
    group: "Primary Care",
    summary: "An ongoing relationship with one physician, not a rotating queue of strangers.",
    detail:
      "Annual physicals, chronic condition management, preventive screening, and same-week sick visits, all coordinated by the one physician who knows your history.",
    duration: "30–45 min visits",
    bestFor: "Adults & families seeking a consistent primary physician",
  },
  {
    id: "pediatrics",
    index: "02",
    name: "Pediatrics",
    group: "Primary Care",
    summary: "Well-child visits and sick-day care in a practice that keeps appointments unrushed.",
    detail:
      "From newborn checkups through adolescence, our pediatric team tracks development over years, not single visits, and makes time for the questions that come up between them.",
    duration: "30 min visits",
    bestFor: "Newborns through age 18",
  },
  {
    id: "cardiology",
    index: "03",
    name: "Cardiology",
    group: "Specialty Care",
    summary: "Risk assessment, diagnostics, and ongoing management for heart health.",
    detail:
      "In-office EKG and stress testing, cholesterol and hypertension management, and long-term care plans built jointly with your primary physician rather than in isolation.",
    duration: "45 min visits",
    bestFor: "Hypertension, arrhythmia & preventive cardiac care",
  },
  {
    id: "dermatology",
    index: "04",
    name: "Dermatology",
    group: "Specialty Care",
    summary: "Medical and cosmetic skin care, from annual skin checks to targeted treatment.",
    detail:
      "Full-body skin cancer screening, acne and eczema management, and minor in-office procedures, scheduled without the months-long wait typical of standalone dermatology practices.",
    duration: "30 min visits",
    bestFor: "Skin checks, chronic skin conditions & minor procedures",
  },
  {
    id: "behavioral-health",
    index: "05",
    name: "Behavioral Health",
    group: "Therapies & Support",
    summary: "Counseling and psychiatric care integrated with your physical care team.",
    detail:
      "Individual therapy and medication management for anxiety, depression, and life transitions, with your behavioral health clinician in direct contact with the rest of your care team.",
    duration: "50 min sessions",
    bestFor: "Ongoing therapy, medication management & referrals",
  },
  {
    id: "physical-therapy",
    index: "06",
    name: "Physical Therapy",
    group: "Therapies & Support",
    summary: "Hands-on rehabilitation for injury, surgery recovery, and chronic pain.",
    detail:
      "One-on-one sessions built around a plan your physical therapist adjusts as you progress, with direct lines back to the physician who referred you.",
    duration: "45 min sessions",
    bestFor: "Post-surgical recovery, injury & chronic pain",
  },
];

export type Doctor = {
  id: string;
  index: string;
  name: string;
  credentials: string;
  specialty: string;
  image: string;
  bio: string;
  focus: string[];
};

export const doctors: Doctor[] = [
  {
    id: "elena-marsh",
    index: "01",
    name: "Dr. Elena Marsh",
    credentials: "MD, Internal Medicine",
    specialty: "Primary Care & Medical Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=80&fit=crop&crop=faces",
    bio: "Elena founded Alder Clinic after a decade in large hospital systems, built around a simple conviction: care improves when physicians have time to listen. She still carries a full patient panel alongside her role as medical director.",
    focus: ["Preventive care", "Chronic disease management", "Care coordination"],
  },
  {
    id: "imran-qureshi",
    index: "02",
    name: "Dr. Imran Qureshi",
    credentials: "MD, Cardiology",
    specialty: "Cardiology",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=1400&q=80&fit=crop&crop=faces",
    bio: "Imran trained in interventional cardiology before choosing outpatient practice, where he could follow patients over years rather than single admissions. He reads every EKG himself, same day.",
    focus: ["Hypertension", "Arrhythmia", "Preventive cardiac screening"],
  },
  {
    id: "priya-nathan",
    index: "03",
    name: "Dr. Priya Nathan",
    credentials: "MD, Pediatrics",
    specialty: "Pediatrics",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1400&q=80&fit=crop&crop=faces",
    bio: "Priya has spent twelve years in pediatric primary care and believes the best outcomes come from treating the whole family, not just the chart in front of her. Parents describe her as unflappable.",
    focus: ["Well-child visits", "Developmental screening", "Adolescent medicine"],
  },
  {
    id: "marcus-webb",
    index: "04",
    name: "Dr. Marcus Webb",
    credentials: "MD, Dermatology",
    specialty: "Dermatology",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1400&q=80&fit=crop&crop=faces",
    bio: "Marcus moved from a large dermatology group to Alder to spend more than seven minutes per patient. He handles both medical and minor surgical dermatology in-house.",
    focus: ["Skin cancer screening", "Acne & eczema", "In-office procedures"],
  },
  {
    id: "sofia-arden",
    index: "05",
    name: "Dr. Sofia Arden",
    credentials: "PsyD, Behavioral Health",
    specialty: "Behavioral Health",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=80&fit=crop&crop=faces",
    bio: "Sofia leads our behavioral health practice and works in direct contact with the physicians down the hall, so a medication conversation never has to wait for a fax to go through.",
    focus: ["Anxiety & depression", "Life transitions", "Medication management"],
  },
];

export const values = [
  {
    index: "01",
    title: "Time, as standard",
    body: "Every visit is scheduled at thirty minutes or more. We built the calendar around that rule before we built anything else, and we have not shortened it since.",
  },
  {
    index: "02",
    title: "One chart, one team",
    body: "Your primary physician, specialists, and therapist work from the same record and talk to each other directly, not through forwarded referral letters.",
  },
  {
    index: "03",
    title: "Independent, on purpose",
    body: "Alder is privately owned by its physicians. No health system dictates how many patients we see in a day, so we have never had to find out what that number is.",
  },
  {
    index: "04",
    title: "Plain language",
    body: "We explain what we find and what we recommend in terms you can act on, and we're direct when something is uncertain rather than papering over it.",
  },
];

export const milestones = [
  { year: "2011", text: "Alder Clinic opens with two physicians and a single exam room on Birchwood Lane." },
  { year: "2015", text: "Pediatrics and cardiology join the practice; the thirty-minute visit becomes policy, not preference." },
  { year: "2019", text: "Behavioral health is integrated directly into the care team rather than referred out." },
  { year: "2024", text: "Alder moves to the Rivermark District, with five physicians seeing patients under one roof." },
];

export const testimonial = {
  quote:
    "It was the first appointment in years where I wasn't watching the clock for both of us. My doctor actually read my chart before walking in.",
  name: "Dana R.",
  context: "Patient since 2021",
};

export const stats = [
  { value: "13", suffix: "+", label: "Years in the Rivermark District" },
  { value: "5", suffix: "", label: "Physicians under one roof" },
  { value: "30", suffix: " min", label: "Minimum length of every visit" },
  { value: "4.9", suffix: "/5", label: "Average rating across 600+ reviews" },
];

export const process = [
  {
    index: "01",
    title: "Book online or by phone",
    body: "Choose a physician and a time that suits you. Most new patients are seen within a week, not a month.",
  },
  {
    index: "02",
    title: "Share your history once",
    body: "Complete your intake before you arrive, so the thirty minutes in the room go to the conversation, not the paperwork.",
  },
  {
    index: "03",
    title: "Meet, unhurried",
    body: "Your physician has already read your chart. The visit is built around your questions, not the clock.",
  },
  {
    index: "04",
    title: "Stay connected after",
    body: "Results, notes, and next steps land in your patient portal the same day, and reach the rest of your care team automatically.",
  },
];

export const testimonials = [
  {
    quote:
      "It was the first appointment in years where I wasn't watching the clock for both of us. My doctor actually read my chart before walking in.",
    name: "Dana R.",
    context: "Patient since 2021",
  },
  {
    quote:
      "My daughter's pediatrician has known her since she was six weeks old. That continuity is worth more than any app or portal.",
    name: "Marcus T.",
    context: "Pediatrics patient family",
  },
  {
    quote:
      "I switched after my cardiologist and my primary physician finally talked to each other directly instead of through a referral letter that took three weeks.",
    name: "Helen O.",
    context: "Cardiology patient since 2019",
  },
];

export const insurancePlans = [
  "Aetna",
  "Cigna",
  "Blue Cross Blue Shield",
  "UnitedHealthcare",
  "Providence Health Plan",
  "Medicare",
];

export const faqs = [
  {
    q: "Are you accepting new patients?",
    a: "Yes, across every specialty. Most new patients are offered an appointment within a week of their first call, and sooner for urgent concerns.",
  },
  {
    q: "What insurance do you accept?",
    a: "We're in-network with Aetna, Cigna, Blue Cross Blue Shield, UnitedHealthcare, Providence Health Plan, and Medicare. We also see self-pay patients at transparent, published rates — call us to confirm your specific plan.",
  },
  {
    q: "Can I really get a thirty-minute visit?",
    a: "Yes. Every visit on our schedule, from a routine physical to a same-week sick visit, is booked at thirty minutes or more. It's a scheduling policy, not a promise that varies by physician.",
  },
  {
    q: "Do you offer telehealth appointments?",
    a: "Most follow-up visits, medication management, and behavioral health sessions are available by video. Your physician will let you know when an in-person visit is needed instead.",
  },
  {
    q: "What happens if I need a specialist referral?",
    a: "Because our specialists work from the same shared chart, most referrals happen inside the practice without a separate intake process, and your primary physician stays looped in on the plan.",
  },
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
};

// Facility and care-space photography used across the site, gathered here
// for the gallery page. width/height set each card's aspect ratio in the
// masonry grid — not the source photo's native size.
export const galleryImages: GalleryImage[] = [
  {
    id: "waiting-area",
    src: "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?w=800&h=1000&q=80&fit=crop",
    alt: "A bright, plant-filled clinic waiting area",
    title: "Waiting Area",
    width: 800,
    height: 1000,
  },
  {
    id: "exam-suite",
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1000&h=750&q=80&fit=crop",
    alt: "A clean, modern exam room",
    title: "Exam Suite",
    width: 1000,
    height: 750,
  },
  {
    id: "reception",
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=1200&q=80&fit=crop",
    alt: "The clinic's reception desk",
    title: "Reception",
    width: 900,
    height: 1200,
  },
  {
    id: "diagnostics",
    src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=900&h=900&q=80&fit=crop",
    alt: "An X-ray displayed on a radiology monitor",
    title: "Diagnostics",
    width: 900,
    height: 900,
  },
  {
    id: "patient-rooms",
    src: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1000&h=625&q=80&fit=crop",
    alt: "A comfortable, private patient room",
    title: "Patient Rooms",
    width: 1000,
    height: 625,
  },
  {
    id: "primary-care",
    src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=750&h=1000&q=80&fit=crop",
    alt: "A primary care consultation in progress",
    title: "Primary Care",
    width: 750,
    height: 1000,
  },
  {
    id: "pediatrics",
    src: "https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?w=900&h=675&q=80&fit=crop",
    alt: "A pediatric visit",
    title: "Pediatrics",
    width: 900,
    height: 675,
  },
  {
    id: "cardiology",
    src: "https://images.unsplash.com/photo-1530026341218-8e3d0b803ca6?w=800&h=800&q=80&fit=crop",
    alt: "Cardiology diagnostic equipment",
    title: "Cardiology",
    width: 800,
    height: 800,
  },
  {
    id: "dermatology",
    src: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=760&h=950&q=80&fit=crop",
    alt: "A dermatology treatment room",
    title: "Dermatology",
    width: 760,
    height: 950,
  },
  {
    id: "behavioral-health",
    src: "https://images.unsplash.com/photo-1746021513193-a314945d15c4?w=900&h=600&q=80&fit=crop",
    alt: "A calm behavioral health counseling room",
    title: "Behavioral Health",
    width: 900,
    height: 600,
  },
  {
    id: "physical-therapy",
    src: "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?w=700&h=1050&q=80&fit=crop",
    alt: "A physical therapy session",
    title: "Physical Therapy",
    width: 700,
    height: 1050,
  },
  {
    id: "care-team",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=675&q=80&fit=crop",
    alt: "The Alder Clinic care team reviewing a shared patient chart around a table",
    title: "Care Team",
    width: 1200,
    height: 675,
  },
  {
    id: "consultation-room",
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=750&h=1000&q=80&fit=crop",
    alt: "A bright, modern consultation room at Alder Clinic with natural light",
    title: "Consultation Room",
    width: 750,
    height: 1000,
  },
];
