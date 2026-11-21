// Konfigurasi Firebase untuk Real-time Sync (Aldy & Nada)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBIaDMwezDMak_WD0Yx-n1tpFViypd-7aE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aldy-dan-nada.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://aldy-dan-nada-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aldy-dan-nada",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aldy-dan-nada.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "796589005941",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:796589005941:web:8340f5a9a8a69544ad2c3c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YLTSDN5VLX"
};

// Auto-fallback databaseURL jika projectId terisi tapi databaseURL kosong
if (firebaseConfig.projectId && !firebaseConfig.databaseURL) {
  firebaseConfig.databaseURL = `https://${firebaseConfig.projectId}-default-rtdb.firebaseio.com`;
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && (firebaseConfig.databaseURL || firebaseConfig.projectId)
);
