# 🛺 Campus-to-City Ride Pooler

> **Stop spamming WhatsApp groups.** Find ride-share buddies heading to the same city destination — right from your campus.

A minimal web bulletin board built for students at **VIT Bhopal (Kothri Kalan)** who want to share autos or cabs to Bhopal city, splitting the fare automatically.

---

## The Problem

VIT Bhopal's campus is located in **Kothri Kalan**, roughly 30 km from Bhopal city. There's no direct public transit, so students rely on shared autos or cabs. The challenge?

- A solo auto/cab costs ₹280–₹550 depending on destination.
- Students constantly spam WhatsApp groups: *"Anyone going to Bhopal Junction at 8am? 🙏"*
- Finding 2–3 people leaving at the **exact same time** is a coordination nightmare.

This app is a **bulletin board** that solves this by matching students automatically.

---

## What it Does

1. **Post your ride request** — enter your name, destination, and departure time.
2. **Auto-match** — the app finds other students in the pool leaving within ±45 minutes.
3. **See the fare split** — instantly calculates ₹/person for both auto and cab.
4. **Share the nudge** — generates a ready-to-paste WhatsApp message for your group.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (functional components + hooks) |
| Build Tool | Vite |
| Styling | Tailwind CSS + custom CSS properties |
| State | React `useState` / `useCallback` (no Redux) |
| Data | Simulated mock data (no backend / API) |
| Fonts | Syne (display) + Space Mono (body/code) |

---

## Project Structure

```
ride-pooler/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx              ← React DOM entry point
│   ├── App.jsx               ← Root component, phase state machine
│   ├── index.css             ← Global styles + Tailwind directives
│   ├── components/
│   │   ├── RideForm.jsx      ← Search form (name, dest, time, vehicle)
│   │   ├── MatchBoard.jsx    ← Results view: group + fare display
│   │   ├── StudentCard.jsx   ← Individual matched student tile
│   │   ├── FareCard.jsx      ← Per-vehicle fare breakdown card
│   │   └── LiveBoard.jsx     ← "Bulletin board" showing active pool
│   └── data/
│       └── mockData.js       ← Student pool, fare table, match logic
├── README.md
└── Project_Report.md
```

---

## Setup & Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/campus-ride-pooler.git
cd campus-ride-pooler

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will open at **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
# Output goes to the /dist folder
npm run preview  # Preview the production build locally
```

---

## How to Use

1. **Open the app** at `http://localhost:5173`
2. In the **"New Ride Request"** form (left panel):
   - Type your name
   - Select a destination (e.g., Bhopal Junction, ISBT)
   - Set your preferred departure time
   - Choose Auto or Cab
3. Click **"Find Ride Buddies"**
4. Wait ~1.5 seconds while the app "scans the pool"
5. View your **matched group** and the **fare split per person**
6. Copy the generated WhatsApp message to coordinate with your group
7. Click **"← New search"** to start over

### Sample Scenarios to Try

| Name | Destination | Time | Expected Result |
|------|-------------|------|-----------------|
| Your Name | Bhopal Junction | 08:10 | ~3 matches (Priya, Arjun, Kavya) |
| Your Name | ISBT Nadra | 10:20 | ~3 matches |
| Your Name | MP Nagar | 15:00 | No matches (tests empty state) |
| Your Name | Raja Bhoj Airport | 06:15 | ~2 matches |

---

## Key Design Decisions

- **Frontend-only**: No backend, no auth, no database. This is a prototype / proof-of-concept.
- **Mock data in JS**: The `mockData.js` file acts as a fake database, making the app fully self-contained.
- **±45 min window**: Based on typical student tolerance — people are flexible within this window.
- **Fare estimates**: Based on approximate real auto/cab rates from Kothri Kalan as of 2024.

---

## Author

**Nilesh** | Reg No: 25BCE10316  
B.Tech — Computer Science Engineering  
VIT Bhopal University, Kothri Kalan, Madhya Pradesh

---

## License

MIT — Free to use, modify, and distribute for educational purposes.
