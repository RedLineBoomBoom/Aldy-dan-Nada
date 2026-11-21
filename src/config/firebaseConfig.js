// Konfigurasi Firebase untuk Real-time Sync (Aldy & Nada)
// Anda bisa menempelkan langsung config dari Firebase Console di bawah ini,
// ATAU menggunakan Environment Variables di .env / Vercel.

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Auto-fallback databaseURL jika projectId terisi tapi databaseURL kosong
if (firebaseConfig.projectId && !firebaseConfig.databaseURL) {
  firebaseConfig.databaseURL = `https://${firebaseConfig.projectId}-default-rtdb.firebaseio.com`;
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && (firebaseConfig.databaseURL || firebaseConfig.projectId)
);
