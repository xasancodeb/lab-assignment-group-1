export type Stylist = {
  id: string;
  name: string;
  tagline: string;
  specialty: string[];
  rating: number;
  reviews: number;
  price: number; // per hour
  location: string;
  available: boolean;
  avatar: string; // placeholder color
  coverColor: string;
};

export const stylists: Stylist[] = [
  {
    id: "1",
    name: "Amara Osei",
    tagline: "Bold colors, fearless choices",
    specialty: ["Wardrobe Detox", "Capsule Wardrobes", "Color Analysis"],
    rating: 4.9,
    reviews: 128,
    price: 85,
    location: "New York, NY",
    available: true,
    avatar: "#D4A574",
    coverColor: "#2D1B69",
  },
  {
    id: "2",
    name: "Lena Hoffmann",
    tagline: "Minimal, effortless, timeless",
    specialty: ["Minimalist Style", "Business Casual", "Drawer Organization"],
    rating: 4.8,
    reviews: 94,
    price: 70,
    location: "Los Angeles, CA",
    available: true,
    avatar: "#E8C9A0",
    coverColor: "#1A3A2A",
  },
  {
    id: "3",
    name: "Marcus Webb",
    tagline: "Streetwear meets sophistication",
    specialty: ["Streetwear", "Sneaker Styling", "Casual Wardrobe"],
    rating: 4.7,
    reviews: 76,
    price: 65,
    location: "Chicago, IL",
    available: false,
    avatar: "#8B9DC3",
    coverColor: "#3D1515",
  },
  {
    id: "4",
    name: "Sofia Reyes",
    tagline: "Your closet, your story",
    specialty: ["Personal Shopping", "Budget Styling", "Wardrobe Audit"],
    rating: 5.0,
    reviews: 212,
    price: 95,
    location: "Miami, FL",
    available: true,
    avatar: "#C9B8A8",
    coverColor: "#0D3349",
  },
  {
    id: "5",
    name: "James Okafor",
    tagline: "Sharp lines, sharp looks",
    specialty: ["Menswear", "Formal Occasions", "Suit Styling"],
    rating: 4.6,
    reviews: 53,
    price: 80,
    location: "Atlanta, GA",
    available: true,
    avatar: "#A0856C",
    coverColor: "#1E1E2E",
  },
  {
    id: "6",
    name: "Yuki Tanaka",
    tagline: "East meets West in every outfit",
    specialty: ["Eclectic Style", "Thrift Styling", "Pattern Mixing"],
    rating: 4.9,
    reviews: 167,
    price: 75,
    location: "Seattle, WA",
    available: true,
    avatar: "#D4B8C7",
    coverColor: "#2A1A0D",
  },
];

export const specialties = [
  "All",
  "Wardrobe Detox",
  "Capsule Wardrobes",
  "Color Analysis",
  "Minimalist Style",
  "Business Casual",
  "Drawer Organization",
  "Streetwear",
  "Personal Shopping",
  "Menswear",
  "Eclectic Style",
];

export const howItWorks = [
  {
    step: "01",
    title: "Browse Stylists",
    description:
      "Explore profiles of verified stylists. Filter by specialty, location, or budget to find your perfect match.",
  },
  {
    step: "02",
    title: "Book a Session",
    description:
      "Pick a time that works for you. Sessions can be in-person at your home or virtual via video call.",
  },
  {
    step: "03",
    title: "Transform Your Look",
    description:
      "Your stylist arrives, assesses your wardrobe, and helps you build outfits, declutter, and shop smarter.",
  },
];
