
import { User } from "../types";

const DB_NAME = "EtherealTarotDB";
const USER_STORE = "Users";

const openAuthDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.createObjectStore(USER_STORE, { keyPath: "username" });
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.close();
        const upgradeRequest = indexedDB.open(DB_NAME, (db.version || 1) + 1);
        upgradeRequest.onupgradeneeded = () => {
          upgradeRequest.result.createObjectStore(USER_STORE, { keyPath: "username" });
        };
        upgradeRequest.onsuccess = () => resolve(upgradeRequest.result);
      } else {
        resolve(db);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

export const registerUser = async (username: string, password: string): Promise<boolean> => {
  const db = await openAuthDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(USER_STORE, "readwrite");
    const store = transaction.objectStore(USER_STORE);
    const checkRequest = store.get(username);
    checkRequest.onsuccess = () => {
      if (checkRequest.result) {
        resolve(false);
      } else {
        store.add({ 
          username, 
          password,
          joinedDate: Date.now(),
          readingsCount: 0,
          spending: 0,
          isVip: false,
          provider: 'local'
        });
        resolve(true);
      }
    };
  });
};

export const loginUser = async (username: string, password: string): Promise<User | null> => {
  const db = await openAuthDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(USER_STORE, "readonly");
    const store = transaction.objectStore(USER_STORE);
    const request = store.get(username);
    request.onsuccess = () => {
      const user = request.result;
      if (user && user.password === password) {
        const { password: _, ...userSafe } = user;
        resolve(userSafe as User);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => resolve(null);
  });
};

export const googleUpsertUser = async (email: string, displayName: string): Promise<User> => {
  const db = await openAuthDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(USER_STORE, "readwrite");
    const store = transaction.objectStore(USER_STORE);
    const request = store.get(email);

    request.onsuccess = () => {
      if (request.result) {
        const { password: _, ...userSafe } = request.result;
        resolve(userSafe as User);
      } else {
        const newUser = {
          username: email,
          displayName,
          joinedDate: Date.now(),
          readingsCount: 0,
          spending: 0,
          isVip: false,
          provider: 'google'
        };
        store.add({ ...newUser, password: 'GOOGLE_OAUTH_TOKEN' });
        resolve(newUser as User);
      }
    };
  });
};

// --- 新增：更新用戶資料 ---
export const updateUserProfile = async (username: string, updates: Partial<User>): Promise<User> => {
  const db = await openAuthDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(USER_STORE, "readwrite");
    const store = transaction.objectStore(USER_STORE);
    const getReq = store.get(username);
    
    getReq.onsuccess = () => {
      const user = getReq.result;
      const updatedUser = { ...user, ...updates };
      const putReq = store.put(updatedUser);
      putReq.onsuccess = () => {
        const { password: _, ...userSafe } = updatedUser;
        resolve(userSafe as User);
      };
    };
    getReq.onerror = () => reject("Update failed");
  });
};

// --- 新增：增加占卜次數與消費金額 ---
export const recordReadingSession = async (username: string, cost: number): Promise<User> => {
  const db = await openAuthDB();
  return new Promise((resolve) => {
    const transaction = db.transaction(USER_STORE, "readwrite");
    const store = transaction.objectStore(USER_STORE);
    const getReq = store.get(username);
    getReq.onsuccess = () => {
      const user = getReq.result;
      user.readingsCount += 1;
      user.spending += cost;
      store.put(user);
      const { password: _, ...userSafe } = user;
      resolve(userSafe as User);
    };
  });
};

// --- 新增：刪除用戶 ---
export const deleteUserAccount = async (username: string): Promise<void> => {
  const db = await openAuthDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(USER_STORE, "readwrite");
    const store = transaction.objectStore(USER_STORE);
    const req = store.delete(username);
    req.onsuccess = () => resolve();
    req.onerror = () => reject();
  });
};
