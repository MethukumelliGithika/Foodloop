// Sample initial donations data for FoodLoop
// Provides realistic donations for a Hyderabad demo

export const getRelativeISOString = (hoursFromNow) => {
  const d = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
  return d.toISOString();
};

export const sampleDonationPresets = [
  {
    label: "Vegetarian Thali / Meal Boxes",
    category: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    defaultUnit: "meal boxes"
  },
  {
    label: "Fresh Breads & Bakery",
    category: "Bakery",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    defaultUnit: "packets"
  },
  {
    label: "Farm Fresh Vegetables",
    category: "Fruits & Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    defaultUnit: "kg"
  },
  {
    label: "Rice & Curry Boxes",
    category: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    defaultUnit: "meal boxes"
  },
  {
    label: "Fresh Fruit Baskets",
    category: "Fruits & Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
    defaultUnit: "packs"
  },
  {
    label: "Non-Veg Meal Packs",
    category: "Non-Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    defaultUnit: "meal boxes"
  }
];

export const getInitialDonations = () => [
  {
    id: "FL-101",
    name: "25 Vegetarian Deluxe Meal Boxes",
    provider: "Annapurna Kitchen & Catering",
    providerType: "Restaurant",
    category: "Vegetarian",
    quantity: 25,
    unit: "meal boxes",
    pickupLocation: "Road No. 36, Jubilee Hills, Hyderabad",
    pickupDeadline: getRelativeISOString(5), // 5 hours from now
    description: "Freshly prepared South Indian thali boxes packed with paneer butter masala, jeera rice, dal tadka, 2 rotis, and gulab jamun. Prepared for an afternoon corporate lunch event and remained unserved in sealed insulated thermal boxes.",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    status: "available",
    createdAt: getRelativeISOString(-1.5),
    contactPhone: "+91 98490 12345",
    handlingNotes: "Keep upright. Sealed in food-grade foil containers. Ready for immediate pickup.",
    estimatedWeightKg: 12.5,
    claimedBy: null,
    claimedAt: null,
    rescuedAt: null
  },
  {
    id: "FL-102",
    name: "15 Artisan Bread & Pastry Packets",
    provider: "Golden Crust European Bakery",
    providerType: "Bakery",
    category: "Bakery",
    quantity: 15,
    unit: "packets",
    pickupLocation: "Road No. 12, Banjara Hills, Hyderabad",
    pickupDeadline: getRelativeISOString(8), // 8 hours from now
    description: "Assorted daily fresh bakery surpluses including whole wheat sandwich bread, multigrain rolls, milk buns, and butter croissants. Baked this morning at 6:00 AM, sealed in hygienic paper bags.",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    status: "available",
    createdAt: getRelativeISOString(-2.5),
    contactPhone: "+91 98491 56789",
    handlingNotes: "Store in cool dry place. Best consumed within 24 to 48 hours.",
    estimatedWeightKg: 7.5,
    claimedBy: null,
    claimedAt: null,
    rescuedAt: null
  },
  {
    id: "FL-103",
    name: "10 kg Fresh Farm Vegetables & Greens",
    provider: "Green Leaf Fresh Supermarket",
    providerType: "Grocery Store",
    category: "Fruits & Vegetables",
    quantity: 10,
    unit: "kg",
    pickupLocation: "Financial District, Gachibowli, Hyderabad",
    pickupDeadline: getRelativeISOString(24), // tomorrow
    description: "Crated surplus farm-fresh produce: crisp carrots, bell peppers, tomatoes, spinach bundles, and cucumbers. High nutritional quality, ideal for community kitchens or shelter pantries.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    status: "available",
    createdAt: getRelativeISOString(-3),
    contactPhone: "+91 98492 34567",
    handlingNotes: "Packed in sturdy aerated plastic crates. Easy to transport.",
    estimatedWeightKg: 10,
    claimedBy: null,
    claimedAt: null,
    rescuedAt: null
  },
  {
    id: "FL-104",
    name: "20 Steamed Rice & Sambar Meal Boxes",
    provider: "Sri Sai Student Residency Hostel",
    providerType: "Hostel",
    category: "Vegetarian",
    quantity: 20,
    unit: "meal boxes",
    pickupLocation: "Ayyappa Society, Madhapur, Hyderabad",
    pickupDeadline: getRelativeISOString(4), // 4 hours from now
    description: "Surplus hygienic dinner preparation from student hostel mess. Includes seasoned sona masoori rice, drumstick sambar, curd rice, and vegetable poriyal packed cleanly in disposable meal trays.",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    status: "available",
    createdAt: getRelativeISOString(-1),
    contactPhone: "+91 98493 78901",
    handlingNotes: "Steam-hot when packed. Please bring thermal delivery bags for pickup.",
    estimatedWeightKg: 10,
    claimedBy: null,
    claimedAt: null,
    rescuedAt: null
  },
  {
    id: "FL-105",
    name: "12 Seasonal Fresh Fruit Packs",
    provider: "Rainbow Heights Resident Welfare Group",
    providerType: "Household",
    category: "Fruits & Vegetables",
    quantity: 12,
    unit: "packs",
    pickupLocation: "Silpa Park, Kondapur, Hyderabad",
    pickupDeadline: getRelativeISOString(7), // 7 hours from now
    description: "Pre-sorted family fruit donation from apartment community drive: apples, sweet bananas, oranges, and seedless pomegranates packed in eco-friendly mesh bags.",
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
    status: "claimed",
    createdAt: getRelativeISOString(-4),
    contactPhone: "+91 98494 23412",
    handlingNotes: "Keep away from direct heat. Ready for immediate distribution.",
    estimatedWeightKg: 6,
    claimedBy: "Demo Volunteer (You)",
    claimedAt: getRelativeISOString(-1.2),
    rescuedAt: null
  },
  {
    id: "FL-106",
    name: "18 Royal Vegetarian Feast Boxes",
    provider: "Shree Balaji Catering & Events",
    providerType: "Catering",
    category: "Vegetarian",
    quantity: 18,
    unit: "meal boxes",
    pickupLocation: "Marredpally, Secunderabad, Hyderabad",
    pickupDeadline: getRelativeISOString(-1), // already rescued earlier
    description: "Premium wedding catering surplus with vegetable dum biryani, mirchi ka salan, cucumber raita, and moong dal halwa. Packed safely right after buffet service.",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    status: "rescued",
    createdAt: getRelativeISOString(-10),
    contactPhone: "+91 98495 67890",
    handlingNotes: "Delivered to Asha Child Care Home, Secunderabad.",
    estimatedWeightKg: 9,
    claimedBy: "Demo Volunteer (You)",
    claimedAt: getRelativeISOString(-6),
    rescuedAt: getRelativeISOString(-2)
  },
  {
    id: "FL-107",
    name: "16 Chicken Dum Biryani & Raita Packs",
    provider: "Nawabi Dastarkhwan",
    providerType: "Restaurant",
    category: "Non-Vegetarian",
    quantity: 16,
    unit: "meal boxes",
    pickupLocation: "Begumpet Main Road, Hyderabad",
    pickupDeadline: getRelativeISOString(6), // 6 hours from now
    description: "Authentic Hyderabadi chicken biryani cooked fresh today. Includes boiled eggs, onion raita, and salan. Cleanly packed in tamper-evident sealed container packs.",
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    status: "available",
    createdAt: getRelativeISOString(-2),
    contactPhone: "+91 98496 78123",
    handlingNotes: "Hot containers. Handle with care during transit.",
    estimatedWeightKg: 8.5,
    claimedBy: null,
    claimedAt: null,
    rescuedAt: null
  },
  {
    id: "FL-108",
    name: "14 Sweet Treat & Muffin Gift Boxes",
    provider: "Sweet Symphony Confectionery",
    providerType: "Bakery",
    category: "Bakery",
    quantity: 14,
    unit: "packets",
    pickupLocation: "Inorbit Mall Road, Hitec City, Hyderabad",
    pickupDeadline: getRelativeISOString(10), // 10 hours from now
    description: "Assorted vanilla muffins, chocolate chip teacakes, and savory puff pastries from afternoon counter batch. Fresh, hygienic, and individually boxed.",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    status: "available",
    createdAt: getRelativeISOString(-1),
    contactPhone: "+91 98497 90234",
    handlingNotes: "Fragile boxes. Keep horizontal.",
    estimatedWeightKg: 5,
    claimedBy: null,
    claimedAt: null,
    rescuedAt: null
  }
];
