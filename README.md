# FoodLoop – Save Food, Share Hope 🌱🍲

> A modern, sustainability-driven surplus food rescue platform connecting restaurants, hostels, bakeries, households, NGOs, and volunteers to divert fresh meals from landfills and nourish communities in need.

---

## 🌟 Project Overview
**FoodLoop** is a fully functional college frontend demonstration web application built with **React**, **Vite**, **Bootstrap 5**, and custom **CSS3**. It provides a complete workflow for:
1. **Food Providers** (restaurants, hostels, bakeries, caterers, households) to list surplus food batches with category, quantity, location, handling notes, and safe pickup deadlines.
2. **Volunteers & NGOs** to search, filter, and claim available batches in their neighborhood.
3. **Rescue Champions** to track their pending pickups, mark rescues as delivered, or cancel claims if unable to pick up.
4. **Community Transparency** through an **Impact Dashboard** measuring total food saved (kg), meals provided, and estimated CO₂ emissions prevented.

> ℹ️ **Demo Note:** FoodLoop is an interactive frontend demonstration project. All state changes, claims, and listings are persisted locally in the browser via `localStorage`. No actual backend or logistical dispatch is scheduled.

---

## ✨ Key Features

- **Sustainability-Themed Visual Design**:
  - Curated forest-green, cream, and white color palette.
  - Modern typography using Google Fonts (*Outfit* and *Plus Jakarta Sans*).
  - Responsive layouts built with Bootstrap 5 and custom CSS tokens.
  - High-resolution genuine food photography with SVG/CSS category fallbacks.
  
- **Home Page**:
  - Hero section with quick impact snapshot and clear call-to-actions (*Explore Food* and *Donate Food*).
  - Featured live surplus food cards with instant claim modal.
  - 3-step "How FoodLoop Works" explanation.
  - Community impact teaser and Hyderabad donor testimonials.

- **Explore Food**:
  - Live inventory cards showing food image, name, provider, category, quantity, location, and deadline.
  - Real-time search across food names, provider names, and Hyderabad localities.
  - Category filters: *All*, *Vegetarian*, *Non-Vegetarian*, *Bakery*, *Fruits & Vegetables*.
  - Status toggle (*Available*, *Claimed*, *Completed Rescues*, *All*).
  - Sorting by *Earliest Deadline*, *Newest*, and *Largest Quantity*.
  - Clear empty states with one-click filter reset.

- **Donate Food**:
  - Structured donation form with provider details, Hyderabad pickup location, quantity, unit, description, and handling notes.
  - Strict pickup deadline validation rejecting past dates or invalid times.
  - One-click image presets for easy demo testing.
  - Instant submission to `localStorage` with success toast and automatic navigation to the new listing.

- **Food Details**:
  - Complete donation breakdown with status badge (*Available*, *Claimed*, *Rescued*, *Expired*).
  - Claim button with confirmation modal preventing double-claiming.
  - Quick volunteer actions (*Mark as Rescued* / *Cancel Claim*) if claimed by the current volunteer.

- **My Rescues**:
  - Dedicated volunteer portal tracking *Active Pending Pickups* and *Completed Rescues*.
  - One-click *Mark as Rescued* to finalize delivery.
  - One-click *Cancel Claim* to immediately return the item to the available food pool.
  - Volunteer summary counters.

- **Impact Dashboard**:
  - Real-time dynamic statistics: total listings, available batches, claimed pickups, completed rescues.
  - Food waste prevented (kg) and meals served.
  - Environmental carbon metrics (CO₂e mitigated based on FAO standard 1 kg waste ≈ 2.5 kg CO₂).
  - Visual progress bars for milestone targets and rescue completion rates.
  - Category distribution breakdown.
  - Completed rescue audit log table.
  - *Reset Demo Data* button to restore initial sample listings at any time.

---

## 🛠️ Technology Stack
- **Frontend Framework**: React 19 + Vite
- **Styling**: Bootstrap 5 + Bootstrap Icons + Custom CSS3
- **Navigation & Routing**: React Router v7 (`react-router-dom`)
- **State Persistence**: Browser `localStorage` with React Context API (`FoodContext`)
- **Fonts**: Google Fonts (*Outfit*, *Plus Jakarta Sans*)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or later) and **npm** installed on your system.

```bash
node -v
npm -v
```

### 2. Installation
Open your terminal in the project directory and install dependencies:

```bash
npm install
```

### 3. Running Locally
Start the Vite development server:

```bash
npm run dev
```

The application will be accessible at:
```
http://localhost:5173/
```

### 4. Production Build
To create an optimized production bundle:

```bash
npm run build
npm run preview
```

---

## 📁 Project Directory Structure
```
Foodloop/
├── index.html                   # HTML template with fonts and metadata
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite build configuration
├── src/
│   ├── main.jsx                 # React root mounting & styles
│   ├── App.jsx                  # React Router routes & layout
│   ├── styles.css               # Forest-green & cream design system
│   ├── context/
│   │   └── FoodContext.jsx      # Global state, localStorage, & actions
│   ├── data/
│   │   └── initialDonations.js  # Realistic Hyderabad sample donations
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation with live rescue badges
│   │   ├── Footer.jsx           # Mission, zones, demo notice & reset
│   │   ├── FoodCard.jsx         # Card component with badges & actions
│   │   ├── StatCard.jsx         # Metric card with visual schemes
│   │   ├── ToastAlert.jsx       # Floating notification alert
│   │   └── ImageWithFallback.jsx# Resilient image loader with SVG fallbacks
│   └── pages/
│       ├── Home.jsx             # Landing page with hero & featured items
│       ├── ExploreFood.jsx      # Search, filter, and sort listings
│       ├── DonateFood.jsx       # Surplus listing form with validation
│       ├── FoodDetails.jsx      # Single listing details & claiming flow
│       ├── MyRescues.jsx        # Volunteer dashboard for pickups
│       └── ImpactDashboard.jsx  # Environmental & community metrics
└── README.md
```

---

## 👥 Hyderabad Demo Scenarios
The initial database includes realistic sample donations across Hyderabad:
1. **Annapurna Kitchen** (Jubilee Hills) – 25 Vegetarian Deluxe Meal Boxes
2. **Golden Crust Bakery** (Banjara Hills) – 15 Artisan Bread & Pastry Packets
3. **Green Leaf Supermarket** (Gachibowli) – 10 kg Fresh Farm Vegetables
4. **Sri Sai Student Hostel** (Madhapur) – 20 Rice & Sambar Meal Boxes
5. **Rainbow Heights Community** (Kondapur) – 12 Fresh Fruit Packs (Claimed in demo)
6. **Shree Balaji Catering** (Secunderabad) – 18 Feast Boxes (Delivered in demo)
7. **Nawabi Dastarkhwan** (Begumpet) – 16 Chicken Dum Biryani Packs
8. **Sweet Symphony** (Hitec City) – 14 Sweet Treat & Muffin Boxes

---

## 🎓 Academic Demonstration Notice
FoodLoop is designed for academic presentation. It demonstrates reactive state management, asynchronous form validation, responsive layout engineering, and user experience design principles for sustainable technology.
