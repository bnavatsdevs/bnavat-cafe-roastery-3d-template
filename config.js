export const SITE_CONFIG = {
  brand: {
    name: "NOIR & CREMA",
    shortMark: "N&C",
    tagline: "Artisanal Roastery & Kitchen",
    currency: "₹",
    whatsappNumber: "919820112233",
    phoneDisplay: "+91 98201 12233",
    phoneHref: "tel:+919820112233",
    email: "bnavatdevs@gmail.com",
    copyright: "© 2026 NOIR & CREMA. Digital Architecture by BNAVAT."
  },

  colors: {
    accent: "#ff6a1a",
    accentHover: "#ff7e38",
    wood: "#5a3822",
    stone: "#2c3138",
    brass: "#c89b54",
    surfaceDark: "#111214",
    surfaceElevated: "#181a1f",
    surfaceLight: "#f4f2ee",
    inkLight: "#f7f5f1",
    inkMuted: "#b6b2aa",
    inkDark: "#141619"
  },

  hero: {
    eyebrow: "Small-Batch Roastery · Indiranagar",
    headline: "Crafted in Fire, Poured in Silence.",
    subline: "Single-origin espresso, live brass-drum roasting, and hearth plates crafted daily.",
    primaryCta: "Reserve a Table",
    secondaryCta: "Explore Menu",
    timeSlots: [
      "08:30 AM IST",
      "10:00 AM IST",
      "12:30 PM IST",
      "02:30 PM IST",
      "05:30 PM IST",
      "07:30 PM IST",
      "09:00 PM IST"
    ]
  },

  cameraPresets: [
    {
      id: "espresso",
      label: "Espresso Bar",
      position: [0.3, 2.35, 5.4],
      target: [0, 1.35, 0]
    },
    {
      id: "roastery",
      label: "Roastery",
      position: [4.2, 2.55, 4.1],
      target: [2.45, 1.25, -0.4]
    },
    {
      id: "overview",
      label: "Overview",
      position: [-4.4, 3.35, 6.6],
      target: [0.35, 1.25, -0.3]
    }
  ],

  hotspots: [
    {
      id: "espresso-machine",
      title: "Dual-Group Precision Extraction",
      badge: "Espresso Bar",
      position: [-0.45, 1.68, 0.35],
      cameraPosition: [-0.25, 2.05, 3.25],
      cameraTarget: [-0.45, 1.45, 0.15],
      summary:
        "PID-stabilized thermal groups and hand-tamped Chikmagalur & Ratnagiri washed lots pull syrupy crema with clean caramel clarity."
    },
    {
      id: "pour-over-vessel",
      title: "Hand-Turned Ceramic Carafe",
      badge: "Filter & Pour-Over",
      position: [0.95, 1.42, 0.55],
      cameraPosition: [1.35, 1.82, 2.85],
      cameraTarget: [0.95, 1.22, 0.45],
      summary:
        "Lathe-profiled stoneware carafe and tasting cup keep aromatic floral and stone-fruit notes open without harsh astringency."
    },
    {
      id: "brass-roaster",
      title: "5kg Cast-Iron & Brass Drum Roaster",
      badge: "Micro-Roastery",
      position: [2.55, 1.62, -0.35],
      cameraPosition: [3.85, 2.15, 2.45],
      cameraTarget: [2.5, 1.32, -0.35],
      summary:
        "Roasted on-site in small batches with rapid air-assisted cooling trays to lock sweetness and low-acid balance into every bag."
    }
  ],

  menu: {
    heading: "Seasonal Menu",
    subheading: "Roasted in-house, plated to order, available for dine-in or instant WhatsApp pre-order.",
    categories: ["Specialty Coffee", "Artisanal Plates", "Desserts"],
    items: [
      {
        id: "ratnagiri-flat-white",
        category: "Specialty Coffee",
        name: "Ratnagiri Honey Flat White",
        price: 260,
        tag: "House Signature",
        description: "Double ristretto from estate honey-processed beans with micro-textured organic milk."
      },
      {
        id: "malabar-v60",
        category: "Specialty Coffee",
        name: "Bababudangiri Pour-Over",
        price: 310,
        tag: "Single Origin",
        description: "Hand-poured filter brew highlighting toasted cacao nib, bergamot peel, and cane sugar."
      },
      {
        id: "smoked-jaggery-cortado",
        category: "Specialty Coffee",
        name: "Smoked Jaggery Cortado",
        price: 280,
        tag: "Roaster's Pick",
        description: "Equal parts bold espresso and warm milk infused with organic palm jaggery."
      },
      {
        id: "sourdough-burrata-tartine",
        category: "Artisanal Plates",
        name: "Charred Sourdough & Burrata",
        price: 540,
        tag: "Vegetarian",
        description: "Country levain toast, creamy burrata, blistered cherry tomatoes, cold-pressed olive oil, and basil."
      },
      {
        id: "truffle-mushroom-brioche",
        category: "Artisanal Plates",
        name: "Wild Mushroom & Gruyère Melt",
        price: 590,
        tag: "Chef's Favorite",
        description: "Butter-toasted brioche layered with roasted shiitake, thyme cream, and aged mountain cheese."
      },
      {
        id: "avocado-dukkah-bowl",
        category: "Artisanal Plates",
        name: "Spiced Avocado & Dukkah Plate",
        price: 480,
        tag: "Vegan",
        description: "Crushed Hass avocado, toasted hazelnut-sesame dukkah, pickled shallots, and lemon oil."
      },
      {
        id: "espresso-tiramisu",
        category: "Desserts",
        name: "Single-Estate Espresso Tiramisu",
        price: 420,
        tag: "Signature",
        description: "Savoiardi soaked in fresh house espresso, mascarpone sabayon, and dark Valrhona cocoa."
      },
      {
        id: "burnt-basque-cheesecake",
        category: "Desserts",
        name: "Caramelized Basque Cheesecake",
        price: 450,
        tag: "Vegetarian",
        description: "Deeply caramelized crust with a warm, custardy vanilla-bean center."
      },
      {
        id: "cardamom-brown-butter-tart",
        category: "Desserts",
        name: "Cardamom Brown-Butter Tart",
        price: 380,
        tag: "Small Batch",
        description: "Crisp nutty pastry shell filled with roasted almond frangipane and green cardamom."
      }
    ]
  },

  craft: [
    {
      index: "01",
      title: "Sourcing",
      copy: "Direct-trade Indian micro-lots cupped for clarity, roasted in small brass-drum batches for peak sweetness."
    },
    {
      index: "02",
      title: "Kitchen",
      copy: "Naturally leavened bakes, seasonal produce, and clean preparations built to pair effortlessly with coffee."
    },
    {
      index: "03",
      title: "Space",
      copy: "Acoustic walnut timber, honed stone counters, and warm pendant light designed for unhurried conversation."
    }
  ],

  location: {
    heading: "Reserve & Visit",
    subheading: "Lock in your table in seconds via WhatsApp or walk straight into the roastery.",
    address: "148, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
    hours: "Daily · 08:00 AM – 10:30 PM IST",
    googleMapsUrl: "https://maps.google.com/?q=12th+Main+Road+Indiranagar+Bengaluru+560038"
  }
};

