/**
 * mockData.js
 * -----------
 * Simulated student pool for VIT Bhopal campus ride pooler.
 * In a real app, this would come from a backend API / database.
 * Each entry represents a student who has already posted a ride request.
 */

export const DESTINATIONS = [
  { id: 'bhopal_junction', label: 'Bhopal Junction', shortLabel: 'BJN' },
  { id: 'isbt_nadra',      label: 'ISBT Nadra Bus Stand', shortLabel: 'ISBT' },
  { id: 'habibganj',       label: 'Habibganj (Rani Kamalapati)', shortLabel: 'HBJ' },
  { id: 'mp_nagar',        label: 'MP Nagar', shortLabel: 'MPN' },
  { id: 'airport',         label: 'Raja Bhoj Airport', shortLabel: 'BHO' },
];

// Fare table: base fare (₹) for the whole auto/cab, by destination
export const FARE_TABLE = {
  bhopal_junction: { auto: 280, cab: 420 },
  isbt_nadra:      { auto: 260, cab: 390 },
  habibganj:       { auto: 300, cab: 450 },
  mp_nagar:        { auto: 240, cab: 360 },
  airport:         { auto: 380, cab: 550 },
};

// Max passengers per vehicle type
export const CAPACITY = { auto: 3, cab: 4 };

// Pool of fictional students already in the system
export const STUDENT_POOL = [
  // --- Bhopal Junction ---
  { id: 's01', name: 'Priya Sharma',    branch: 'CSE',  year: '1st', destination: 'bhopal_junction', time: '08:00', avatar: '👩' },
  { id: 's02', name: 'Arjun Mehta',     branch: 'ECE',  year: '2nd', destination: 'bhopal_junction', time: '08:15', avatar: '👦' },
  { id: 's03', name: 'Kavya Nair',      branch: 'MECH', year: '1st', destination: 'bhopal_junction', time: '07:45', avatar: '👩' },
  { id: 's04', name: 'Rohan Verma',     branch: 'IT',   year: '3rd', destination: 'bhopal_junction', time: '09:00', avatar: '🧑' },
  { id: 's05', name: 'Sneha Gupta',     branch: 'CSE',  year: '1st', destination: 'bhopal_junction', time: '08:30', avatar: '👩' },
  { id: 's06', name: 'Aditya Kumar',    branch: 'EEE',  year: '2nd', destination: 'bhopal_junction', time: '14:00', avatar: '👦' },
  { id: 's07', name: 'Pooja Singh',     branch: 'BIO',  year: '1st', destination: 'bhopal_junction', time: '14:30', avatar: '👩' },
  // --- ISBT Nadra ---
  { id: 's08', name: 'Vikram Patel',    branch: 'CSE',  year: '2nd', destination: 'isbt_nadra',      time: '10:00', avatar: '🧑' },
  { id: 's09', name: 'Ananya Rao',      branch: 'MBA',  year: '1st', destination: 'isbt_nadra',      time: '10:15', avatar: '👩' },
  { id: 's10', name: 'Deepak Tiwari',   branch: 'MECH', year: '3rd', destination: 'isbt_nadra',      time: '10:30', avatar: '👦' },
  { id: 's11', name: 'Meera Joshi',     branch: 'IT',   year: '1st', destination: 'isbt_nadra',      time: '16:00', avatar: '👩' },
  { id: 's12', name: 'Rahul Sharma',    branch: 'ECE',  year: '2nd', destination: 'isbt_nadra',      time: '16:15', avatar: '🧑' },
  // --- Habibganj ---
  { id: 's13', name: 'Simran Kaur',     branch: 'CSE',  year: '1st', destination: 'habibganj',       time: '09:30', avatar: '👩' },
  { id: 's14', name: 'Nikhil Pandey',   branch: 'CE',   year: '2nd', destination: 'habibganj',       time: '09:45', avatar: '👦' },
  { id: 's15', name: 'Tanvi Desai',     branch: 'ECE',  year: '1st', destination: 'habibganj',       time: '10:00', avatar: '👩' },
  { id: 's16', name: 'Suresh Babu',     branch: 'IT',   year: '3rd', destination: 'habibganj',       time: '17:00', avatar: '🧑' },
  // --- MP Nagar ---
  { id: 's17', name: 'Ishaan Malhotra', branch: 'CSE',  year: '1st', destination: 'mp_nagar',        time: '11:00', avatar: '👦' },
  { id: 's18', name: 'Riya Choudhary',  branch: 'MECH', year: '2nd', destination: 'mp_nagar',        time: '11:15', avatar: '👩' },
  { id: 's19', name: 'Aman Kapoor',     branch: 'EEE',  year: '1st', destination: 'mp_nagar',        time: '11:30', avatar: '🧑' },
  // --- Airport ---
  { id: 's20', name: 'Divya Menon',     branch: 'MBA',  year: '2nd', destination: 'airport',         time: '06:00', avatar: '👩' },
  { id: 's21', name: 'Karan Bhatt',     branch: 'CSE',  year: '3rd', destination: 'airport',         time: '06:30', avatar: '👦' },
  { id: 's22', name: 'Preethi Reddy',   branch: 'IT',   year: '1st', destination: 'airport',         time: '12:00', avatar: '👩' },
  { id: 's23', name: 'Manav Saxena',    branch: 'ECE',  year: '2nd', destination: 'airport',         time: '12:30', avatar: '🧑' },
];

/**
 * findMatches
 * -----------
 * Finds students from the pool heading to the same destination
 * within ±45 minutes of the requested departure time.
 *
 * @param {string} destinationId  - e.g. 'bhopal_junction'
 * @param {string} timeStr        - e.g. '08:30'
 * @param {number} windowMins     - tolerance window in minutes (default 45)
 * @returns {Array}               - up to 3 matched students (excluding the user)
 */
export function findMatches(destinationId, timeStr, windowMins = 45) {
  const [h, m] = timeStr.split(':').map(Number);
  const requestMinutes = h * 60 + m;

  return STUDENT_POOL
    .filter(s => {
      if (s.destination !== destinationId) return false;
      const [sh, sm] = s.time.split(':').map(Number);
      const studentMinutes = sh * 60 + sm;
      return Math.abs(studentMinutes - requestMinutes) <= windowMins;
    })
    .slice(0, 3); // cap at 3 (user is 4th, max cab capacity)
}

/**
 * calculateFare
 * -------------
 * Splits the base fare across group size.
 * Always shows both auto and cab options.
 *
 * @param {string} destinationId
 * @param {number} groupSize  - including the current user
 * @returns {{ auto: {total, perPerson}, cab: {total, perPerson} }}
 */
export function calculateFare(destinationId, groupSize) {
  const fares = FARE_TABLE[destinationId] || { auto: 300, cab: 450 };
  return {
    auto: {
      total: fares.auto,
      perPerson: Math.ceil(fares.auto / Math.min(groupSize, CAPACITY.auto)),
      capacity: CAPACITY.auto,
    },
    cab: {
      total: fares.cab,
      perPerson: Math.ceil(fares.cab / Math.min(groupSize, CAPACITY.cab)),
      capacity: CAPACITY.cab,
    },
  };
}
