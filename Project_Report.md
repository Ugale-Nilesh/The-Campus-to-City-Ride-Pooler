# Project Report

**Project Title:** Campus-to-City Ride Pooler  
**Student Name:** Nilesh  
**Registration Number:** 25BCE10316  
**Program:** B.Tech — Computer Science Engineering   
**Institution:** VIT Bhopal University, Kothri Kalan, Madhya Pradesh  
**Capstone:** Bring Your Own Project (BYOP)  
**Date:** 2026

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Why It Matters](#2-why-it-matters)
3. [Proposed Solution](#3-proposed-solution)
4. [System Design & Architecture](#4-system-design--architecture)
5. [Technical Approach](#5-technical-approach)
6. [Key Decisions Made](#6-key-decisions-made)
7. [Component Breakdown](#7-component-breakdown)
8. [Challenges Faced](#8-challenges-faced)
9. [What I Learned](#9-what-i-learned)
10. [Future Scope](#10-future-scope)
11. [Conclusion](#11-conclusion)

---

## 1. Problem Statement

VIT Bhopal's campus is located in **Kothri Kalan**, a semi-rural area approximately 30 kilometres from Bhopal city. There is no regular, affordable public transportation connecting the two.

Students who need to travel to Bhopal city — for trains at Bhopal Junction, buses at ISBT Nadra, flights from Raja Bhoj Airport, or commercial areas like MP Nagar — are left with one practical option: hire an auto-rickshaw or a cab. The full fare for this journey ranges between **₹280 and ₹550**, which is a significant expense for a first-year student on a monthly budget.

The most economical alternative is **ride pooling** — 3 or 4 students heading in the same direction share one vehicle, splitting the fare equally. This is already a common informal practice on campus.

The problem, however, is the **coordination overhead**. The current process looks like this:

1. A student decides they need to leave at, say, 8:00 AM.
2. They post in multiple WhatsApp groups: *"Anyone going to Bhopal Junction at 8? Please reply"*.
3. Replies trickle in over hours — some people want to go at 9 AM, some want to go the next day.
4. The process devolves into a thread of confusion, missed replies, and duplicated messages.
5. Often the student ends up going alone or missing their train.

There is **no structured, searchable, real-time place** for students to post or discover ride-share requests. This project attempts to solve that gap.

---

## 2. Why It Matters

### Financial Impact
Assuming a student makes the Kothri Kalan–Bhopal trip 4 times a month:
- **Solo cost:** ₹280–₹550 × 4 = **₹1,120–₹2,200/month**
- **Pooled cost (3 students):** ~₹100–₹185 × 4 = **₹400–₹740/month**

This is a potential **saving of ₹700–₹1,500 per month** — meaningful money for a hostel student.

### Environmental Impact
Fewer vehicles on a 60 km round-trip route means lower fuel consumption and carbon emissions, contributing to more sustainable campus mobility.

### Social Impact
The act of sharing a ride also creates organic peer connections between students from different departments who might not otherwise interact. This is a subtle but real community-building mechanism.

### Problem Generalisation
While built for VIT Bhopal, this exact problem exists at virtually every campus located away from a major city: NIT Hamirpur, IIT Mandi, IIT Jodhpur, VIT Vellore, and dozens more. The solution is easily adaptable.

---

## 3. Proposed Solution

A **web-based ride pool bulletin board** where:
- Students post their destination and departure time
- The system automatically groups them with others heading the same way within a flexible time window
- The split fare is calculated and displayed instantly
- A ready-made share message is generated for WhatsApp coordination

The key design philosophy was **simplicity first** — a clean, fast, zero-friction interface that requires no login, no account creation, and no app download. Just open a browser and go.

---

## 4. System Design & Architecture

Since this is a frontend-only prototype, the architecture is deliberately minimal:

```
User Browser
    │
    ▼
React App (Vite dev server / static build)
    │
    ├── App.jsx           ← State machine (idle / loading / results)
    │       │
    │       ├── RideForm.jsx     ← Collects user input
    │       ├── MatchBoard.jsx   ← Displays results
    │       └── LiveBoard.jsx    ← Shows pool activity
    │
    └── data/mockData.js  ← In-memory "database" + matching algorithm
```

In a real-world deployment, `mockData.js` would be replaced by:
- A REST API or WebSocket connection to a Node.js/Go backend
- A real database (PostgreSQL or Firebase Firestore)
- Authentication via college email (to verify VIT students)

---

## 5. Technical Approach

### Framework: React with Vite

React was chosen for its component model, which maps cleanly to the UI structure (a form, a match card, a fare card, etc.). Vite was chosen over Create React App for its dramatically faster hot-module replacement (HMR), which made development much more enjoyable.

### State Management: React Hooks Only

No Redux or Zustand was used. The entire application state fits in two `useState` calls inside `App.jsx`:
- `phase`: a string enum (`'idle'`, `'loading'`, `'results'`) acting as a simple state machine
- `result`: the computed match data object

This was intentional. Reaching for a state management library for an app of this scope would be over-engineering.

### Styling: Tailwind CSS + Custom Properties

Tailwind CSS handled layout, spacing, and responsive design. For design-system-level tokens (brand colors, font stacks, animation keyframes), raw CSS custom properties in `index.css` were used. This hybrid approach kept the code clean without sacrificing design control.

The visual direction chosen was a **transit ticket / departure board** aesthetic — warm amber tones, Space Mono for monospaced "terminal" feel in timestamps and labels, and Syne for bold display headings. This directly references the travel/logistics context of the app.

### Matching Algorithm

The core matching logic in `findMatches()` (in `mockData.js`) works as follows:

```
1. Convert the user's requested time to total minutes (e.g., "08:30" → 510)
2. For each student in the pool:
   a. Check if their destination matches the user's destination exactly
   b. Convert their time to total minutes
   c. Check if |student_minutes - user_minutes| ≤ 45 (window)
3. Return up to 3 matched students (so total group size ≤ 4, fitting a cab)
```

This is an O(n) linear scan, which is perfectly fine for the simulated pool size. A real system would use a database query with indexed time ranges.

---

## 6. Key Decisions Made

### Decision 1: ±45 Minute Matching Window
**Why 45?** Through informal discussion with hostel batchmates, it became clear that students are willing to adjust their departure by up to 45 minutes if it means saving ₹150–₹200. A window smaller than this would result in too many "no matches" states; larger would feel imprecise.

### Decision 2: No Login Required
The prototype does not ask for student credentials. This reduces friction to near-zero for testing. In a production version, login via VIT email ID (@vitbhopal.ac.in) would be mandatory to keep the pool student-only and safe.

### Decision 3: Show Both Vehicle Options Always
When results are displayed, both auto and cab fare splits are shown — not just the one the user selected. This was a UX decision: a student might prefer an auto but reconsider if the cab split is only ₹20 more for more comfort.

### Decision 4: Simulated 1.5s Loading State
The loading spinner is backed by a `setTimeout` of 1500ms to simulate a real API call. This was a deliberate UX choice: an instantaneous result feels like the app didn't "work" for the user. A brief wait communicates that "something is happening," increasing perceived credibility.

### Decision 5: Fare Table as a Constant
Fare estimates are stored as constants rather than computed from a formula. This is pragmatic — auto fares in Bhopal are negotiated, not metered, so approximations per destination are more realistic than any formula would be.

---

## 7. Component Breakdown

| Component | File | Responsibility |
|-----------|------|----------------|
| App | `App.jsx` | Phase state machine, top-level layout |
| RideForm | `RideForm.jsx` | Form validation, user input collection |
| MatchBoard | `MatchBoard.jsx` | Results orchestration: group + fares + share |
| StudentCard | `StudentCard.jsx` | Single student tile, handles "you" vs others |
| FareCard | `FareCard.jsx` | One vehicle's fare breakdown with savings |
| LiveBoard | `LiveBoard.jsx` | Bulletin board showing pool activity |
| mockData | `data/mockData.js` | Data, constants, matching & fare functions |

---

## 8. Challenges Faced

### Challenge 1: Designing the Match Window Logic
The initial instinct was to match only students at the exact same time. This returned zero results for most test cases since the simulated pool doesn't have dense coverage. Moving to a ±window approach required rethinking the UX — I had to add a note saying "±45 min window used for matching" so users understand why their 8:00 AM request might match a 7:50 AM student.

### Challenge 2: Responsive Layout Without Sacrificing Design
The design called for a two-column layout on desktop (form on left, live board on right) that collapses to a single column on mobile. Getting this to feel natural with Tailwind's `lg:grid-cols-5` and `lg:col-span-3 / lg:col-span-2` split took several iterations to balance.

### Challenge 3: Making Mock Data Feel Real
A bulletin board with 5 placeholder names feels empty and fake. Populating 23 diverse fictional students with names, branches, years, and times — spread across all destinations — required care. The names were chosen to reflect the actual demographic diversity of VIT Bhopal's student population.

### Challenge 4: The "No Matches" UX
Empty states are notoriously difficult to design. Simply showing "No results found" is discouraging. The solution was to show the user as the first entry in the group, display open seat slots, and present the fare for solo travel — reframing "no matches" as "you're first in the pool."

### Challenge 5: CSS Animation Coordination
Several animations run simultaneously (page load fade-in, match card stagger, scan line effect, pulse glow on the submit button). Getting these to feel cohesive without being distracting required careful use of `animation-delay` and restricting animations to one focal point at a time.

---

## 9. What I Learned

**React component decomposition**: Starting with one giant component and breaking it down into purpose-built pieces (StudentCard, FareCard, LiveBoard) made the code dramatically easier to reason about. This taught me the Single Responsibility Principle applied to UI components.

**State machine thinking**: Modelling the UI as `idle → loading → results` instead of juggling multiple boolean flags (`isLoading`, `hasResults`, `showForm`) eliminated an entire class of bugs where two flags could get into conflicting states.

**The value of constraints**: Deciding upfront that this would be frontend-only, no auth, no backend, focused every technical decision. Constraints are creative tools, not limitations.

**Simulating async behaviour**: Using `setTimeout` to fake API latency taught me that the *shape* of an async call (loading, success, error states) matters as much as the actual network call. Designing for this pattern prepares the app for when a real backend is added.

**Typography as UX**: Choosing Space Mono for timestamps and badges (because monospace text doesn't jitter as numbers change) and Syne for headings (strong weight, distinctive character) was a functional decision, not just aesthetic. Font choices communicate the *nature* of information.

**Writing documentation first clarifies thinking**: Writing `README.md` and this report revealed two gaps in my original design — the "no matches" empty state and the need to explain the time window to users. Both were fixed because documentation forced me to explain the app as if to a stranger.

---

## 10. Future Scope

If this project were to be developed into a real product:

1. **Backend API (Node.js + Express + PostgreSQL)**: Persist real student requests, auto-expire postings after the departure time passes.
2. **Real-time updates (WebSockets / Firebase)**: The live board would actually update in real time as students post requests.
3. **VIT Email Authentication**: Restrict access to `@vitbhopal.ac.in` accounts for safety.
4. **Push notifications**: Alert matched students via browser notifications or SMS when a new match joins their pool.
5. **In-app group chat**: Remove the WhatsApp dependency by providing a minimal in-app thread per ride group.
6. **Ride history & reputation**: Simple thumbs-up/down ratings to build trust within the community.
7. **Admin dashboard**: For campus transport authorities to see demand patterns and potentially arrange shuttle services for high-demand routes.

---

## 11. Conclusion

The Campus-to-City Ride Pooler is a focused solution to a real, daily problem experienced by thousands of VIT Bhopal students. While the current implementation is a frontend-only prototype powered by mock data, it demonstrates the complete user journey — from posting a ride request to seeing matched companions and a calculated split fare.

The project reinforced the importance of starting with a clearly defined, personally experienced problem; keeping the technical scope appropriate to the stage of the project; and building something that could realistically evolve into a production tool with a clearly articulated growth path.

The app also serves as a foundation for exploring full-stack development — every piece of mock logic in `mockData.js` has a direct real-world API equivalent waiting to replace it.

---

*Report prepared for the BYOP Capstone assessment.*  
*Nilesh | 25BCE10316 | VIT Bhopal*
