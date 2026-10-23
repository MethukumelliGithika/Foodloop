# FoodLoop - Save Food, Share Hope

## Project Overview

FoodLoop is a frontend web application developed to reduce food waste by connecting food donors with NGOs and volunteers. It allows users to list surplus food, explore available donations, claim food, and track rescued food.

The main goal of this project is to reduce food waste and support people in need.

## Features

- **Home Page:** Introduces the platform and displays featured food donations.
- **Explore Food:** Allows users to search, filter, and sort food listings.
- **Donate Food:** Allows food providers to add surplus food details.
- **Food Details:** Displays food information and provides options to claim donations.
- **My Rescues:** Helps users track pending pickups and completed rescues.
- **Impact Dashboard:** Displays food donation statistics and estimated environmental impact.
- **Local Storage:** Saves donation information in the browser.
- **Responsive Design:** Provides a user-friendly interface across different screen sizes.

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- React.js
- React Router
- Context API
- Browser LocalStorage
- Vite

## Getting Started

### Prerequisites

Install Node.js and npm before running the project.

Check the installation:

```bash
node -v
npm -v
```

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Open the project folder:

```bash
cd FoodLoop
```

Install the dependencies:

```bash
npm install
```

### Run the Application

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173/`

### Build the Project

```bash
npm run build
```

## Project Structure

```text
FoodLoop/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── context/
│   │   └── FoodContext.jsx
│   ├── data/
│   │   └── initialDonations.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FoodCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── ToastAlert.jsx
│   │   └── ImageWithFallback.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── ExploreFood.jsx
│       ├── DonateFood.jsx
│       ├── FoodDetails.jsx
│       ├── MyRescues.jsx
│       └── ImpactDashboard.jsx
```

## Demo Information

The application uses sample food donation data. Donation listings and status changes are stored in browser LocalStorage.

This is a frontend demonstration project. It does not include a backend server, a permanent database, or actual food pickup and delivery services.

## Future Enhancements

- Add a backend and database.
- Implement user registration and login.
- Add notifications for food pickups.
- Integrate maps for pickup locations.
- Connect food donors with verified NGOs and volunteers.

## Conclusion

FoodLoop demonstrates how frontend web technologies can be used to create a platform for managing surplus food donations. The project helped me learn React components, routing, state management, form validation, LocalStorage, and responsive web design.
