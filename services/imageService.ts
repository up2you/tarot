
import { GoogleGenAI } from "@google/genai";
import { AppTheme } from "../types";

const DB_NAME = "EtherealTarotVaultV4";
const STORE_NAME = "CardArtCache";
const DB_VERSION = 6;

let dbInstance: IDBDatabase | null = null;

const getDB = (): Promise<IDBDatabase> => {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    request.onerror = () => reject(request.error);
  });
};

export const getCachedArt = async (key: string): Promise<string | null> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

export const cacheArt = async (key: string, data: string): Promise<void> => {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error("Vault failed:", e);
  }
};

export const clearAllArt = async (): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const isThemeComplete = async (theme: AppTheme, cardList: { nameZh: string }[]): Promise<{ complete: boolean, missing: string[] }> => {
  const missing: string[] = [];
  const results = await Promise.all(cardList.map(async (card) => {
    const cached = await getCachedArt(`${theme}_${card.nameZh}`);
    return cached ? null : card.nameZh;
  }));

  results.forEach(res => { if (res) missing.push(res); });

  const backCached = await getCachedArt(`${theme}_BACK_IMAGE`);
  if (!backCached) missing.push("Back");

  return { complete: missing.length === 0, missing };
};

export async function generateThemedCardArt(theme: AppTheme, cardName: string, isBack: boolean = false): Promise<string> {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Skipping AI generation: No GEMINI_API_KEY found.");
    return ""; // Return empty string to trigger fallback in UI
  }

  const cacheKey = `${theme}_${isBack ? "BACK_IMAGE" : cardName}`;
  const ai = new GoogleGenAI({ apiKey });

  let prompt = "";
  if (isBack) {
    prompt = `Tarot card back, 9:16 aspect ratio, Ornate Baroque style. Deep crimson velvet, heavy golden embossed lace, alchemical symbols, 8k oil painting texture.`;
  } else {
    prompt = `Extreme Baroque masterpiece tarot: '${cardName}'. Caravaggio chiaroscuro, heavy golden embossed frame, dramatic lighting, 17th-century divine oil painting texture. Ultra-detailed vertical composition.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: prompt }] }],
      config: { imageConfig: { aspectRatio: "9:16" } }
    });

    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (part?.inlineData) {
      const base64Data = `data:image/png;base64,${part.inlineData.data}`;
      await cacheArt(cacheKey, base64Data);
      return base64Data;
    }
    throw new Error("API Limit Reached");
  } catch (error: any) {
    console.error("AI Generation failed:", error);
    return ""; // Graceful fallback
  }
}
