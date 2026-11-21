import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { firebaseConfig, isFirebaseConfigured } from '../config/firebaseConfig';

// Initialize Firebase App & Realtime Database instance
let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getDatabase(app);
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
  }
}

export { isFirebaseConfigured };

/* ==========================================================================
   1. KAPSUL WAKTU (TIME CAPSULE WISHES)
   ========================================================================== */
export const WISHES_STORAGE_KEY = 'anniversary_time_capsule_wishes';

export const DEFAULT_WISHES = [
  {
    id: 'default_1',
    author: 'Aldy',
    text: 'Semoga di tahun ke-5 dan seterusnya, kita bisa traveling ke tempat impian kita bareng, makin saling ngerti, dan selalu jadi tempat pulang paling nyaman untuk satu sama lain. I love you, Nada ❤️',
    date: '22 November 2026',
  },
];

/**
 * Subscribe to real-time wishes from Firebase and cache to localStorage.
 * Calls callback immediately with local data, then updates when cloud data syncs.
 */
export function subscribeWishes(callback) {
  // 1. Instant local read for 0ms delay
  try {
    const local = localStorage.getItem(WISHES_STORAGE_KEY);
    if (local) {
      callback(JSON.parse(local));
    } else {
      callback(DEFAULT_WISHES);
    }
  } catch {
    callback(DEFAULT_WISHES);
  }

  // 2. If Firebase is active, listen to live cloud updates
  if (!db) return () => {};

  const wishesRef = ref(db, 'anniversary/wishes');
  const unsubscribe = onValue(
    wishesRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data && data.items) {
          list = Array.isArray(data.items) ? data.items : Object.values(data.items);
        } else if (data && typeof data === 'object') {
          list = Object.values(data);
        }
        const finalList = list.length > 0 ? list : DEFAULT_WISHES;
        callback(finalList);
        try {
          localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(finalList));
        } catch {}
      } else {
        // Initialize cloud database with default wish if empty
        set(wishesRef, { items: DEFAULT_WISHES, updatedAt: Date.now() });
      }
    },
    (err) => {
      console.warn('Cloud sync error (wishes):', err);
    }
  );

  return unsubscribe;
}

/**
 * Save new wish to cloud and localStorage.
 */
export async function saveNewWish(newWish, currentWishes = []) {
  const updated = [newWish, ...currentWishes];
  try {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  if (db) {
    try {
      const wishesRef = ref(db, 'anniversary/wishes');
      await set(wishesRef, {
        items: updated,
        updatedAt: Date.now(),
      });
    } catch (err) {
      console.warn('Error saving wish to cloud:', err);
    }
  }
  return updated;
}

/* ==========================================================================
   2. PAPAN STIKER (BUCIN STICKER BOARD)
   ========================================================================== */
export const STICKERS_STORAGE_KEY = 'anniversary_custom_stickers';

export const DEFAULT_STICKERS = [
  { id: 1, stickerId: 'bubu_hug', x: 15, y: 20, rotation: -4, note: 'Aldy ❤️ Nada' },
  { id: 2, stickerId: 'bear_kiss', x: 55, y: 15, rotation: 6, note: '4 Tahun Selamanya!' }
];

/**
 * Subscribe to real-time stickers from Firebase and cache to localStorage.
 */
export function subscribeStickers(callback) {
  try {
    const local = localStorage.getItem(STICKERS_STORAGE_KEY);
    if (local) {
      callback(JSON.parse(local));
    } else {
      callback(DEFAULT_STICKERS);
    }
  } catch {
    callback(DEFAULT_STICKERS);
  }

  if (!db) return () => {};

  const stickersRef = ref(db, 'anniversary/stickers');
  const unsubscribe = onValue(
    stickersRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data && data.items) {
          list = Array.isArray(data.items) ? data.items : Object.values(data.items);
        } else if (data && typeof data === 'object') {
          list = data.items ? (Array.isArray(data.items) ? data.items : Object.values(data.items)) : [];
        }
        callback(list);
        try {
          localStorage.setItem(STICKERS_STORAGE_KEY, JSON.stringify(list));
        } catch {}
      } else {
        set(stickersRef, { items: DEFAULT_STICKERS, updatedAt: Date.now() });
      }
    },
    (err) => {
      console.warn('Cloud sync error (stickers):', err);
    }
  );

  return unsubscribe;
}

/**
 * Save sticker board items to cloud and localStorage.
 */
export async function saveStickers(stickers) {
  try {
    localStorage.setItem(STICKERS_STORAGE_KEY, JSON.stringify(stickers));
  } catch {}

  if (db) {
    try {
      const stickersRef = ref(db, 'anniversary/stickers');
      await set(stickersRef, {
        items: stickers && stickers.length > 0 ? stickers : false,
        updatedAt: Date.now(),
      });
    } catch (err) {
      console.warn('Error saving stickers to cloud:', err);
    }
  }
}

/**
 * Reset sticker board to default.
 */
export async function resetStickers() {
  try {
    localStorage.setItem(STICKERS_STORAGE_KEY, JSON.stringify(DEFAULT_STICKERS));
  } catch {}

  if (db) {
    try {
      const stickersRef = ref(db, 'anniversary/stickers');
      await set(stickersRef, {
        items: DEFAULT_STICKERS,
        updatedAt: Date.now(),
      });
    } catch (err) {
      console.warn('Error resetting stickers on cloud:', err);
    }
  }
  return DEFAULT_STICKERS;
}
