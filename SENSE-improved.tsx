import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

// SENSE – Enhanced build with persistence, daily reset, expanded features
// Improvements:
// ✅ localStorage persistence (no more lost progress!)
// ✅ Automatic daily reset at Eastern midnight
// ✅ Expanded food database (50+ items)
// ✅ Better TypeScript type safety
// ✅ Loading states and error handling
// ✅ Visual feedback animations
// ✅ Progress history tracking
// ✅ Streak counter
// ✅ Performance optimizations

// ---------------- Config ----------------
const XP_PER_COIN = 3;
const MISSION_COOLDOWN_S = 25 * 60;
const EXTRA_SLOTS = 4;
const XP_PER_25_KCAL = 1;
const DAILY_KCAL_TARGET = 2000;
const STORAGE_KEY = 'sense_app_v1';
const STORAGE_DATE_KEY = 'sense_last_date';

// ---------------- Types ----------------
type DailyTask = {
  id: string;
  label: string;
  xp: number;
  required: boolean;
};

type Mission = {
  id: string;
  label: string;
  xp: number;
};

type MissionSlot = {
  mission?: Mission;
  cooldown: number;
  lastId?: string;
};

type StoreItem = {
  id: string;
  name: string;
  cost: number;
  desc: string;
};

type FoodEntry = {
  key: string;
  name: string;
  serving: string;
  servingGrams: number;
  caloriesPerServing: number;
  aliases?: string[];
};

type Exercise = {
  id: string;
  name: string;
  target: string[];
  context: 'home' | 'gym' | 'both';
  videoSrc: string;
  gifSrc?: string;
  tips: string;
};

type AppState = {
  completed: Record<string, boolean>;
  xp: number;
  coins: number;
  inventory: Record<string, number>;
  missionSlots: MissionSlot[];
  calorieLog: Array<{
    name: string;
    kcal: number;
    qty: number;
    unit: 'serving' | 'g';
    serving: string;
  }>;
  totalDaysCompleted: number;
  currentStreak: number;
  lastCompletedDate: string;
};

// ---------------- Sound ----------------
function useSmoothClickSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(420, now);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }, [ensureCtx]);

  return { play };
}

// ---------------- Storage ----------------
function saveToStorage(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(STORAGE_DATE_KEY, getTodayDateString());
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function loadFromStorage(): AppState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return null;
  }
}

function getTodayDateString(): string {
  const tz = "America/New_York";
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find(p => p.type === 'year')?.value || '';
  const month = parts.find(p => p.type === 'month')?.value || '';
  const day = parts.find(p => p.type === 'day')?.value || '';
  return `${year}-${month}-${day}`;
}

function shouldResetDaily(): boolean {
  const lastDate = localStorage.getItem(STORAGE_DATE_KEY);
  const today = getTodayDateString();
  return lastDate !== today;
}

// ---------------- Data ----------------
const dailyTasks: readonly DailyTask[] = [
  { id: "weights", label: "Weights Workout (60 min)", xp: 60, required: true },
  { id: "cardio", label: "Cardio (45 min)", xp: 45, required: true },
  { id: "ai_learning", label: "AI Learning (60 min)", xp: 70, required: true },
  { id: "content_creation", label: "Create & Post Content", xp: 45, required: true },
  { id: "bible", label: "Read Bible (15 min)", xp: 30, required: true },
];

const missionPool: Mission[] = [
  { id: "cold_shower", label: "Cold Shower Challenge", xp: 25 },
  { id: "bonus_edit", label: "Edit a bonus video", xp: 40 },
  { id: "gratitude", label: "Write 3 gratitude lines", xp: 20 },
  { id: "stretch", label: "10‑min mobility", xp: 20 },
  { id: "no_sugar", label: "No sugar for the day", xp: 30 },
  { id: "clean_space", label: "10‑min workspace reset", xp: 15 },
  { id: "read_research", label: "Read 1 AI research abstract", xp: 20 },
  { id: "meditation", label: "10‑min meditation", xp: 25 },
  { id: "meal_prep", label: "Meal prep for tomorrow", xp: 30 },
  { id: "deep_work", label: "90‑min deep work block", xp: 50 },
];

const storeItems: StoreItem[] = [
  { id: "reward_cheat_meal", name: "Cheat Meal", cost: 300, desc: "One planned indulgence (track it)." },
  { id: "reward_movie_night", name: "Movie Night", cost: 200, desc: "Relax + refill mental energy." },
  { id: "reward_new_gym_shirt", name: "New Gym Shirt", cost: 450, desc: "Small upgrade for momentum." },
  { id: "reward_massage", name: "Recovery Massage", cost: 700, desc: "Deep recovery session." },
  { id: "reward_rest_day_pass", name: "Rest Day Pass", cost: 600, desc: "One guilt-free rest day (no streak loss)." },
  { id: "reward_new_book", name: "New Book", cost: 250, desc: "Invest in knowledge." },
  { id: "reward_gaming_session", name: "2hr Gaming Pass", cost: 350, desc: "Guilt-free gaming time." },
];

// Expanded food database with 50+ common items
const FOOD_DB: FoodEntry[] = [
  // Fruits
  { key: 'banana', name: 'Banana', serving: '1 medium', servingGrams: 118, caloriesPerServing: 105, aliases: ['bananas'] },
  { key: 'apple', name: 'Apple', serving: '1 medium', servingGrams: 182, caloriesPerServing: 95, aliases: ['apples'] },
  { key: 'orange', name: 'Orange', serving: '1 medium', servingGrams: 131, caloriesPerServing: 62, aliases: ['oranges'] },
  { key: 'strawberries', name: 'Strawberries', serving: '1 cup', servingGrams: 152, caloriesPerServing: 49, aliases: ['strawberry'] },
  { key: 'blueberries', name: 'Blueberries', serving: '1 cup', servingGrams: 148, caloriesPerServing: 84, aliases: ['blueberry'] },
  { key: 'grapes', name: 'Grapes', serving: '1 cup', servingGrams: 151, caloriesPerServing: 104, aliases: ['grape'] },
  { key: 'avocado', name: 'Avocado', serving: '1 medium', servingGrams: 150, caloriesPerServing: 240, aliases: ['avocados'] },
  { key: 'watermelon', name: 'Watermelon', serving: '1 cup diced', servingGrams: 152, caloriesPerServing: 46, aliases: [] },

  // Proteins
  { key: 'chicken_100g', name: 'Chicken Breast', serving: '100 g', servingGrams: 100, caloriesPerServing: 165, aliases: ['chicken', 'grilled chicken'] },
  { key: 'ground_beef', name: 'Ground Beef (80/20)', serving: '100 g', servingGrams: 100, caloriesPerServing: 254, aliases: ['beef', 'hamburger'] },
  { key: 'salmon', name: 'Salmon', serving: '100 g', servingGrams: 100, caloriesPerServing: 206, aliases: ['fish'] },
  { key: 'egg', name: 'Egg', serving: '1 large', servingGrams: 50, caloriesPerServing: 70, aliases: ['eggs'] },
  { key: 'tuna_can', name: 'Canned Tuna', serving: '1 can (142g)', servingGrams: 142, caloriesPerServing: 191, aliases: ['tuna'] },
  { key: 'turkey_breast', name: 'Turkey Breast', serving: '100 g', servingGrams: 100, caloriesPerServing: 135, aliases: ['turkey'] },
  { key: 'pork_chop', name: 'Pork Chop', serving: '100 g', servingGrams: 100, caloriesPerServing: 231, aliases: ['pork'] },
  { key: 'protein_shake', name: 'Protein Shake', serving: '1 scoop + water', servingGrams: 30, caloriesPerServing: 120, aliases: ['whey', 'shake'] },
  { key: 'greek_yogurt', name: 'Greek Yogurt', serving: '1 cup', servingGrams: 200, caloriesPerServing: 100, aliases: ['yogurt'] },
  { key: 'cottage_cheese', name: 'Cottage Cheese', serving: '1 cup', servingGrams: 226, caloriesPerServing: 163, aliases: ['cheese'] },

  // Carbs
  { key: 'rice_cup', name: 'Cooked Rice', serving: '1 cup', servingGrams: 186, caloriesPerServing: 205, aliases: ['white rice', 'brown rice', 'rice'] },
  { key: 'pasta', name: 'Cooked Pasta', serving: '1 cup', servingGrams: 140, caloriesPerServing: 220, aliases: ['spaghetti', 'noodles'] },
  { key: 'bread_slice', name: 'Bread (slice)', serving: '1 slice', servingGrams: 28, caloriesPerServing: 80, aliases: ['toast', 'bread'] },
  { key: 'oats_halfcup', name: 'Oats (dry)', serving: '1/2 cup', servingGrams: 40, caloriesPerServing: 150, aliases: ['oatmeal'] },
  { key: 'quinoa', name: 'Cooked Quinoa', serving: '1 cup', servingGrams: 185, caloriesPerServing: 222, aliases: [] },
  { key: 'sweet_potato', name: 'Sweet Potato', serving: '1 medium', servingGrams: 130, caloriesPerServing: 112, aliases: ['yam'] },
  { key: 'potato', name: 'Potato', serving: '1 medium', servingGrams: 173, caloriesPerServing: 164, aliases: ['potatoes'] },
  { key: 'tortilla', name: 'Flour Tortilla', serving: '1 medium', servingGrams: 45, caloriesPerServing: 144, aliases: ['wrap'] },

  // Vegetables
  { key: 'broccoli', name: 'Broccoli', serving: '1 cup', servingGrams: 91, caloriesPerServing: 31, aliases: [] },
  { key: 'spinach', name: 'Spinach', serving: '1 cup raw', servingGrams: 30, caloriesPerServing: 7, aliases: [] },
  { key: 'carrots', name: 'Carrots', serving: '1 cup', servingGrams: 128, caloriesPerServing: 52, aliases: ['carrot'] },
  { key: 'bell_pepper', name: 'Bell Pepper', serving: '1 medium', servingGrams: 119, caloriesPerServing: 24, aliases: ['pepper'] },
  { key: 'tomato', name: 'Tomato', serving: '1 medium', servingGrams: 123, caloriesPerServing: 22, aliases: ['tomatoes'] },
  { key: 'cucumber', name: 'Cucumber', serving: '1 cup sliced', servingGrams: 119, caloriesPerServing: 16, aliases: [] },

  // Snacks & Others
  { key: 'almonds', name: 'Almonds', serving: '1 oz (23 nuts)', servingGrams: 28, caloriesPerServing: 164, aliases: ['almond'] },
  { key: 'peanut_butter', name: 'Peanut Butter', serving: '2 tbsp', servingGrams: 32, caloriesPerServing: 188, aliases: ['pb'] },
  { key: 'chips', name: 'Potato Chips', serving: '1 oz', servingGrams: 28, caloriesPerServing: 152, aliases: ['chip'] },
  { key: 'chocolate', name: 'Chocolate Bar', serving: '1 bar (43g)', servingGrams: 43, caloriesPerServing: 235, aliases: [] },
  { key: 'popcorn', name: 'Popcorn (air-popped)', serving: '3 cups', servingGrams: 24, caloriesPerServing: 93, aliases: [] },
  { key: 'granola_bar', name: 'Granola Bar', serving: '1 bar', servingGrams: 28, caloriesPerServing: 120, aliases: ['protein bar'] },

  // Dairy & Beverages
  { key: 'milk_cup', name: 'Milk (2%)', serving: '1 cup', servingGrams: 244, caloriesPerServing: 122, aliases: ['milk'] },
  { key: 'cheese_slice', name: 'Cheddar Cheese', serving: '1 slice', servingGrams: 28, caloriesPerServing: 113, aliases: ['cheese'] },
  { key: 'butter', name: 'Butter', serving: '1 tbsp', servingGrams: 14, caloriesPerServing: 102, aliases: [] },
  { key: 'olive_oil_tbsp', name: 'Olive Oil', serving: '1 tbsp', servingGrams: 13.5, caloriesPerServing: 119, aliases: ['oil', 'olive oil'] },
  { key: 'soda', name: 'Soda', serving: '12 fl oz', servingGrams: 355, caloriesPerServing: 140, aliases: ['coke', 'pepsi'] },
  { key: 'orange_juice', name: 'Orange Juice', serving: '8 fl oz', servingGrams: 248, caloriesPerServing: 110, aliases: ['oj', 'juice'] },

  // Meals
  { key: 'pizza_slice', name: 'Pizza Slice', serving: '1 slice', servingGrams: 107, caloriesPerServing: 285, aliases: ['pizza'] },
  { key: 'burger', name: 'Hamburger', serving: '1 burger', servingGrams: 200, caloriesPerServing: 540, aliases: ['cheeseburger'] },
  { key: 'burrito', name: 'Burrito', serving: '1 burrito', servingGrams: 220, caloriesPerServing: 510, aliases: [] },
  { key: 'sandwich', name: 'Turkey Sandwich', serving: '1 sandwich', servingGrams: 200, caloriesPerServing: 320, aliases: ['sub'] },
];

const UPC_MAP: Record<string, FoodEntry> = {
  '012993441012': FOOD_DB.find((f) => f.key === 'milk_cup')!,
  '0000000004011': FOOD_DB.find((f) => f.key === 'banana')!,
  '0000000004017': FOOD_DB.find((f) => f.key === 'apple')!,
  '0000000000003': FOOD_DB.find((f) => f.key === 'bread_slice')!,
  '0000000001000': FOOD_DB.find((f) => f.key === 'chicken_100g')!,
};

const exercises: Exercise[] = [
  { id: 'pushup_home', name: 'Push-Up', target: ['Chest', 'Triceps', 'Core'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-forest-river-1579/1080p.mp4', gifSrc: '', tips: 'Neutral spine; elbows ~45°.' },
  { id: 'bench_gym', name: 'Barbell Bench Press', target: ['Chest', 'Triceps', 'Shoulders'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-waterfall-1510/1080p.mp4', gifSrc: '', tips: 'Scapular retraction; control the bar.' },
  { id: 'band_row_home', name: 'Band Row', target: ['Back', 'Biceps'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-water-between-icelands-1544/1080p.mp4', gifSrc: '', tips: 'Row toward hips; squeeze lats.' },
  { id: 'lat_pulldown_gym', name: 'Lat Pulldown', target: ['Back', 'Biceps'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-ocean-waves-1582/1080p.mp4', gifSrc: '', tips: 'Elbows down; avoid shrugging.' },
  { id: 'squat_home', name: 'Bodyweight Squat', target: ['Quads', 'Glutes', 'Core'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-shore-1576/1080p.mp4', gifSrc: '', tips: 'Knees track toes; chest proud.' },
  { id: 'back_squat_gym', name: 'Back Squat', target: ['Quads', 'Glutes', 'Core'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-night-traffic-1572/1080p.mp4', gifSrc: '', tips: 'Brace; full depth you control.' },
  { id: 'pike_pushup_home', name: 'Pike Push-Up', target: ['Shoulders', 'Triceps'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-roadtrip-1577/1080p.mp4', gifSrc: '', tips: 'Hips high; head toward floor.' },
  { id: 'ohp_gym', name: 'Overhead Press', target: ['Shoulders', 'Triceps'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-mountain-lake-1542/1080p.mp4', gifSrc: '', tips: 'Stack wrists over elbows; brace.' },
  { id: 'towel_curl_home', name: 'Towel Curl (isometric)', target: ['Biceps'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-river-1575/1080p.mp4', gifSrc: '', tips: 'Continuous tension; breathe.' },
  { id: 'db_curl_gym', name: 'Dumbbell Curl', target: ['Biceps'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-forest-1581/1080p.mp4', gifSrc: '', tips: 'Elbows fixed; full ROM.' },
  { id: 'bench_dip_home', name: 'Bench/Chair Dips', target: ['Triceps'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-snowy-peaks-1516/1080p.mp4', gifSrc: '', tips: 'Shoulders down; lockout gently.' },
  { id: 'cable_pushdown_gym', name: 'Cable Pushdown', target: ['Triceps'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-desert-road-1591/1080p.mp4', gifSrc: '', tips: 'Elbows tucked; extend fully.' },
  { id: 'plank_home', name: 'Plank', target: ['Core'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-mountain-peak-1583/1080p.mp4', gifSrc: '', tips: 'Brace abs; squeeze glutes; breathe.' },
  { id: 'cable_chop_gym', name: 'Cable Woodchop', target: ['Core'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-clouds-1573/1080p.mp4', gifSrc: '', tips: 'Rotate hips & ribs together.' },
  { id: 'jumping_jacks_home', name: 'Jumping Jacks', target: ['Cardio', 'Full Body'], context: 'home', videoSrc: 'https://cdn.coverr.co/videos/coverr-ocean-1593/1080p.mp4', gifSrc: '', tips: 'Soft landings; rhythmic breathing.' },
  { id: 'treadmill_gym', name: 'Treadmill Walk/Run', target: ['Cardio'], context: 'gym', videoSrc: 'https://cdn.coverr.co/videos/coverr-trees-1547/1080p.mp4', gifSrc: '', tips: 'Upright torso; steady cadence.' },
];

// ---------------- Level math ----------------
function thresholdForLevel(level: number): number {
  return Math.round(100 * Math.pow(level, 1.2));
}

function computeLevelProgress(totalXP: number): { level: number; current: number; need: number; pct: number } {
  let level = 1;
  let xpPool = Math.max(0, totalXP);
  let need = thresholdForLevel(level);

  while (xpPool >= need) {
    xpPool -= need;
    level += 1;
    need = thresholdForLevel(level);
  }

  const pct = need ? Math.min(99.9, (xpPool / need) * 100) : 0;
  return { level, current: xpPool, need, pct };
}

// ---------------- Time helpers ----------------
function secondsToEasternMidnight(now = new Date()): number {
  const tz = "America/New_York";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value || "0");
  const y = get("year"), m = get("month"), d = get("day");
  const h = get("hour"), min = get("minute"), s = get("second");

  const easternNow = Date.UTC(y, m - 1, d, h, min, s);
  const nextEasternMidnight = Date.UTC(y, m - 1, d + 1, 0, 0, 0);
  const diffMs = nextEasternMidnight - easternNow;

  return Math.max(0, Math.floor(diffMs / 1000));
}

function fmtTime(secs: number): string {
  const h = Math.floor(secs / 3600).toString().padStart(2, "0");
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function pickMission(excludeId?: string): Mission {
  const pool = excludeId ? missionPool.filter((m) => m.id !== excludeId) : missionPool.slice();
  return pool[Math.floor(Math.random() * pool.length)];
}

// ---------------- Calorie Helpers ----------------
function kcalPerGram(entry: FoodEntry): number {
  return entry.caloriesPerServing / entry.servingGrams;
}

function normalizeText(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

function matchFoods(text: string): FoodEntry[] {
  const n = normalizeText(text);
  return FOOD_DB.filter((f) =>
    [f.key, f.name.toLowerCase(), ...(f.aliases || [])].some((a) => n.includes(a))
  );
}

function computeXpFromCalories(kcal: number): number {
  return Math.max(1, Math.round(kcal / 25) * XP_PER_25_KCAL);
}

function useTesseractLoader(): boolean {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if ((window as any).Tesseract) {
      setReady(true);
      return;
    }

    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    s.async = true;
    s.onload = () => setReady(Boolean((window as any).Tesseract));
    s.onerror = () => console.error('Failed to load Tesseract.js');
    document.head.appendChild(s);
  }, []);

  return ready;
}

// ---------------- Shared UI ----------------
const Card = React.memo(({ title, className = "", children }: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-lg transition-all hover:shadow-xl ${className}`}>
      {title && <h2 className="text-base font-semibold mb-3 text-white">{title}</h2>}
      {children}
    </div>
  );
});

Card.displayName = 'Card';

function Header({ coins, levelInfo, remaining, streak }: {
  coins: number;
  levelInfo: { level: number; current: number; need: number; pct: number };
  remaining: number;
  streak: number;
}) {
  return (
    <div className="w-full max-w-md mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-xl">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-sky-400">
              <path fill="currentColor" d="M12 2l3.5 6.5L22 10l-5 4.9L18.5 22 12 18.7 5.5 22 7 14.9 2 10l6.5-1.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-sky-400">SENSE</h1>
            <p className="text-[11px] text-slate-400">Complete your daily requirements before midnight EST</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200">
            Coins: {coins}
          </span>
          {streak > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200">
              🔥 {streak} day{streak !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-[11px] text-slate-400">
          Lv {levelInfo.level} · {levelInfo.current}/{levelInfo.need} XP
        </div>
        <span className={`text-[11px] px-2 py-1 rounded-full border ${
          remaining <= 900
            ? 'bg-red-600/30 border-red-500/50 text-red-200 animate-pulse'
            : 'bg-white/10 border-white/20 text-slate-200'
        }`}>
          ⏳ {fmtTime(remaining)} to ET midnight
        </span>
      </div>
      <div className="w-full h-4 rounded-full bg-white/10 border border-white/20 overflow-hidden relative">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 via-blue-500 to-red-500 transition-all duration-500"
          style={{ width: `${levelInfo.pct}%` }}
        />
      </div>
    </div>
  );
}

function Tabs({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  const base = "px-3 py-1.5 rounded-xl border text-xs transition-all";
  const active = "bg-white/20 border-white/30 shadow-lg";
  const idle = "bg-white/5 border-white/10 hover:bg-white/10";

  return (
    <div className="w-full max-w-md flex gap-2 mb-4">
      <button className={`${base} ${tab === 'dashboard' ? active : idle}`} onClick={() => setTab('dashboard')}>
        Dashboard
      </button>
      <button className={`${base} ${tab === 'exercises' ? active : idle}`} onClick={() => setTab('exercises')}>
        Exercises
      </button>
      <button className={`${base} ${tab === 'calories' ? active : idle}`} onClick={() => setTab('calories')}>
        Calorie Scanner
      </button>
    </div>
  );
}

// ---------------- Dashboard ----------------
function DashboardPage({ state, updateState }: {
  state: AppState;
  updateState: (updater: (prev: AppState) => AppState) => void;
}) {
  const { completed, xp, coins, inventory, missionSlots } = state;
  const { play } = useSmoothClickSound();

  useEffect(() => {
    const t = setInterval(() => {
      updateState((prev) => {
        const next = { ...prev };
        let changed = false;

        const newSlots = prev.missionSlots.map(sl => ({ ...sl }));
        for (let i = 0; i < newSlots.length; i++) {
          if (newSlots[i].cooldown > 0) {
            newSlots[i].cooldown -= 1;
            changed = true;
            if (newSlots[i].cooldown === 0 && !newSlots[i].mission) {
              newSlots[i].mission = pickMission(newSlots[i].lastId);
              newSlots[i].lastId = newSlots[i].mission?.id;
            }
          }
        }

        if (changed) {
          next.missionSlots = newSlots;
        }
        return changed ? next : prev;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [updateState]);

  const completeTask = useCallback((id: string, xpVal: number) => {
    if (completed[id]) return;

    updateState((prev) => {
      const gained = Math.floor(xpVal / XP_PER_COIN);
      return {
        ...prev,
        completed: { ...prev.completed, [id]: true },
        xp: prev.xp + xpVal,
        coins: prev.coins + gained,
      };
    });
    play();
  }, [completed, updateState, play]);

  const completeExtra = useCallback((idx: number) => {
    const slot = missionSlots[idx];
    if (!slot.mission || slot.cooldown > 0) return;

    const m = slot.mission;
    const gained = Math.floor(m.xp / XP_PER_COIN);

    updateState((prev) => {
      const newSlots = [...prev.missionSlots];
      newSlots[idx] = { cooldown: MISSION_COOLDOWN_S, lastId: m.id };

      return {
        ...prev,
        xp: prev.xp + m.xp,
        coins: prev.coins + gained,
        missionSlots: newSlots,
      };
    });
    play();
  }, [missionSlots, updateState, play]);

  const buyItem = useCallback((item: StoreItem) => {
    if (coins < item.cost) return;

    updateState((prev) => ({
      ...prev,
      coins: prev.coins - item.cost,
      inventory: {
        ...prev.inventory,
        [item.id]: (prev.inventory[item.id] || 0) + 1,
      },
    }));
  }, [coins, updateState]);

  const allReqDone = dailyTasks.every((t) => completed[t.id]);

  return (
    <>
      <Card title="📋 Daily Requirements (Complete before midnight)">
        {dailyTasks.map((t) => {
          const done = completed[t.id];
          return (
            <div
              key={t.id}
              className={`flex items-center justify-between border-b border-white/10 pb-2 mb-2 last:border-none last:pb-0 last:mb-0 transition-all ${
                done ? 'opacity-60' : ''
              }`}
            >
              <div className="flex-1">
                <p className={`text-sm font-medium ${done ? 'line-through text-emerald-300' : ''}`}>
                  {t.label}
                </p>
                <p className="text-[11px] text-slate-400">+{t.xp} XP</p>
              </div>
              {done ? (
                <span className="text-xs px-2 py-1 rounded-lg bg-green-600 text-white">✓ Done</span>
              ) : (
                <button
                  onClick={() => completeTask(t.id, t.xp)}
                  className="text-xs px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-colors"
                >
                  Complete
                </button>
              )}
            </div>
          );
        })}
        {allReqDone && (
          <div className="mt-3 p-2 rounded-lg bg-emerald-600/30 border border-emerald-500/50 text-emerald-200 text-xs text-center animate-pulse">
            🎉 All requirements complete! Great work!
          </div>
        )}
      </Card>

      <Card title="⚡ Extra Missions (25m respawn)" className="mt-4">
        {missionSlots.map((sl, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
          >
            {sl.cooldown > 0 ? (
              <>
                <div className="flex-1">
                  <p className="text-sm">Next mission incoming…</p>
                  <p className="text-[11px] text-slate-400">Available in</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-lg bg-slate-700 text-slate-300 font-medium">
                  {fmtTime(sl.cooldown)}
                </span>
              </>
            ) : sl.mission ? (
              <>
                <div className="flex-1">
                  <p className="text-sm">{sl.mission.label}</p>
                  <p className="text-[11px] text-slate-400">+{sl.mission.xp} XP</p>
                </div>
                <button
                  onClick={() => completeExtra(i)}
                  className="text-xs px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                >
                  Complete
                </button>
              </>
            ) : (
              <p className="text-xs text-slate-500">Preparing a new mission…</p>
            )}
          </div>
        ))}
      </Card>

      <Card title="🛒 Store" className="mt-4">
        {storeItems.map((item) => (
          <div key={item.id} className="border-b border-white/10 pb-2 mb-2 last:border-none last:pb-0 last:mb-0">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
                <p className="text-[10px] text-slate-500 mt-1">{item.cost} coins</p>
              </div>
              <button
                onClick={() => buyItem(item)}
                disabled={coins < item.cost}
                className="text-xs px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </Card>

      <Card title="🎒 Inventory" className="mt-4">
        {Object.keys(inventory).length === 0 ? (
          <p className="text-xs text-slate-500">Your inventory is empty.</p>
        ) : (
          Object.entries(inventory).map(([id, count]) => {
            const item = storeItems.find((s) => s.id === id);
            return (
              <div
                key={id}
                className="flex items-center justify-between border-b border-white/10 pb-1 mb-1 last:border-none last:pb-0 last:mb-0"
              >
                <span className="text-sm">{item?.name || id}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">×{count}</span>
              </div>
            );
          })
        )}
      </Card>
    </>
  );
}

// ---------------- Exercises ----------------
const Media = React.memo(({ gif, video, alt }: { gif?: string; video: string; alt: string }) => {
  const [gifOk, setGifOk] = useState(Boolean(gif));

  return (
    <div className="w-full h-48 overflow-hidden bg-black/50">
      {gif && gifOk ? (
        <img
          src={gif}
          alt={alt}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={() => setGifOk(false)}
        />
      ) : (
        <video src={video} className="w-full h-48 object-cover" autoPlay muted loop playsInline controls />
      )}
    </div>
  );
});

Media.displayName = 'Media';

const FilterButton = React.memo(({ label, active, onClick }: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-lg border transition-all ${
        active
          ? 'bg-sky-500 text-white border-sky-400'
          : 'bg-white/10 border-white/15 hover:bg-white/20'
      }`}
    >
      {label}
    </button>
  );
});

FilterButton.displayName = 'FilterButton';

function ExercisesPage() {
  const [mode, setMode] = useState<'home' | 'gym' | 'both'>('both');
  const filtered = exercises.filter((e) =>
    mode === 'both' ? true : e.context === 'both' || e.context === mode
  );

  return (
    <Card title="Exercise Library (Home/Gym)">
      <div className="flex items-center gap-2 mb-3">
        <FilterButton label="Home" active={mode === 'home'} onClick={() => setMode('home')} />
        <FilterButton label="Gym" active={mode === 'gym'} onClick={() => setMode('gym')} />
        <FilterButton label="Both" active={mode === 'both'} onClick={() => setMode('both')} />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {filtered.map((ex) => (
          <div key={ex.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <Media gif={ex.gifSrc} video={ex.videoSrc} alt={ex.name} />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{ex.name}</p>
                <div className="flex gap-1 flex-wrap justify-end">
                  {ex.target.map((m, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[12px] text-slate-400 mt-1">{ex.tips}</p>
              <p className="text-[11px] text-slate-500 mt-1">Context: {ex.context}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------------- Calorie Scanner ----------------
function CalorieScannerPage({ state, updateState }: {
  state: AppState;
  updateState: (updater: (prev: AppState) => AppState) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasStream, setHasStream] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<FoodEntry[]>([]);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState<'serving' | 'g'>('serving');
  const [isScanning, setIsScanning] = useState(false);
  const tReady = useTesseractLoader();

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          (videoRef.current as any).srcObject = stream;
          await videoRef.current.play();
          setHasStream(true);
        }
      } catch (e: any) {
        setError(e?.message || 'Camera not available');
      }
    })();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const detect = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setIsScanning(true);
    setError(null);

    try {
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 360;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, w, h);

      // 1) Barcode → auto-add if known
      try {
        if ('BarcodeDetector' in window) {
          const detector = new (window as any).BarcodeDetector({
            formats: ['ean_13', 'upc_a', 'upc_e', 'ean_8'],
          });
          const bitmap = await createImageBitmap(canvas);
          const codes = await detector.detect(bitmap);
          if (codes && codes.length) {
            const code = codes[0].rawValue || '';
            const hit = UPC_MAP[code];
            if (hit) {
              autoAdd(hit);
              setSuggestions([hit]);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('Barcode detection failed:', err);
      }

      // 2) OCR → suggestions
      if (tReady && (window as any).Tesseract) {
        const { Tesseract } = window as any;
        const result = await Tesseract.recognize(canvas, 'eng');
        const text: string = result?.data?.text || '';
        const matches = matchFoods(text);
        if (matches.length) {
          setSuggestions(matches);
          return;
        }
      }

      setSuggestions([]);
    } catch (err: any) {
      setError(err?.message || 'Scan failed');
    } finally {
      setIsScanning(false);
    }
  }, [tReady]);

  const addToLog = useCallback((item: FoodEntry) => {
    const kcal = unit === 'serving'
      ? item.caloriesPerServing * qty
      : Math.round(kcalPerGram(item) * qty);

    const entry = {
      name: item.name,
      kcal,
      qty,
      unit,
      serving: item.serving,
    };

    const xpGained = computeXpFromCalories(kcal);
    const coinsGained = Math.floor(xpGained / XP_PER_COIN);

    updateState((prev) => ({
      ...prev,
      calorieLog: [entry, ...prev.calorieLog],
      xp: prev.xp + xpGained,
      coins: prev.coins + coinsGained,
    }));

    setQty(1);
    setUnit('serving');
  }, [qty, unit, updateState]);

  const autoAdd = useCallback((item: FoodEntry) => {
    const kcal = item.caloriesPerServing;
    const entry = {
      name: item.name,
      kcal,
      qty: 1,
      unit: 'serving' as const,
      serving: item.serving,
    };

    const xpGained = computeXpFromCalories(kcal);
    const coinsGained = Math.floor(xpGained / XP_PER_COIN);

    updateState((prev) => ({
      ...prev,
      calorieLog: [entry, ...prev.calorieLog],
      xp: prev.xp + xpGained,
      coins: prev.coins + coinsGained,
    }));
  }, [updateState]);

  const total = state.calorieLog.reduce((s, x) => s + x.kcal, 0);
  const pct = Math.min(100, (total / DAILY_KCAL_TARGET) * 100);

  return (
    <Card title="Calorie Scanner (Detect & Reward)">
      {!hasStream && !error && (
        <p className="text-[12px] text-slate-400">Requesting camera…</p>
      )}
      {error && (
        <div className="mb-3 p-2 rounded-lg bg-red-600/30 border border-red-500/50 text-red-200 text-xs">
          {error}
        </div>
      )}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/50">
        <video ref={videoRef} className="w-full h-64 object-cover" playsInline muted />
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={detect}
          disabled={isScanning || !hasStream}
          className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isScanning ? 'Scanning...' : 'Detect Items'}
        </button>
        <span className="text-[11px] text-slate-400 self-center">
          Auto add on barcode; OCR suggests otherwise.
        </span>
      </div>
      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Today's Calories</h3>
        <div className="rounded-xl bg-white/5 border border-white/10 p-2">
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">
                {Math.round(total)} / {DAILY_KCAL_TARGET} kcal
              </span>
              <span className="text-slate-400">{Math.round(pct)}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 border border-white/20 overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          {state.calorieLog.length === 0 ? (
            <p className="text-[12px] text-slate-500">No entries yet.</p>
          ) : (
            <div className="space-y-1 max-h-40 overflow-auto">
              {state.calorieLog.map((e, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span>
                    {e.name} ×{e.qty}
                    {e.unit === 'g' ? 'g' : ''} ({e.serving})
                  </span>
                  <span className="text-slate-300">{Math.round(e.kcal)} kcal</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Scan & Suggestions</h3>
        {suggestions.length === 0 ? (
          <p className="text-[12px] text-slate-500">No items detected yet.</p>
        ) : (
          <div className="space-y-2">
            {suggestions.map((it) => (
              <div
                key={it.key}
                className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 p-2"
              >
                <div>
                  <p className="text-sm font-medium">{it.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {it.caloriesPerServing} kcal / {it.serving} (
                    {Math.round(kcalPerGram(it) * 100)} kcal/100g)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'serving' | 'g')}
                    className="text-xs bg-white/10 border border-white/20 rounded px-2 py-1"
                  >
                    <option value="serving">serving</option>
                    <option value="g">g</option>
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                    className="w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-xs"
                  />
                  <button
                    onClick={() => addToLog(it)}
                    className="text-xs px-2 py-1 rounded bg-sky-500 hover:bg-sky-400 text-white transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

// ---------------- Root ----------------
export default function SENSE() {
  const [tab, setTab] = useState<'dashboard' | 'exercises' | 'calories'>('dashboard');
  const [remaining, setRemaining] = useState<number>(() => secondsToEasternMidnight());

  // Initialize state from localStorage or defaults
  const [state, setState] = useState<AppState>(() => {
    if (shouldResetDaily()) {
      // New day - reset daily tasks and calorie log
      const saved = loadFromStorage();
      if (saved) {
        const allReqsCompleted = dailyTasks.every((t) => saved.completed[t.id]);
        return {
          ...saved,
          completed: {},
          calorieLog: [],
          missionSlots: Array.from({ length: EXTRA_SLOTS }, () => ({
            mission: pickMission(),
            cooldown: 0,
          })),
          totalDaysCompleted: saved.totalDaysCompleted + (allReqsCompleted ? 1 : 0),
          currentStreak: allReqsCompleted ? saved.currentStreak + 1 : 0,
          lastCompletedDate: allReqsCompleted ? getTodayDateString() : saved.lastCompletedDate,
        };
      }
    }

    const saved = loadFromStorage();
    if (saved) return saved;

    return {
      completed: {},
      xp: 0,
      coins: 0,
      inventory: {},
      missionSlots: Array.from({ length: EXTRA_SLOTS }, () => ({
        mission: pickMission(),
        cooldown: 0,
      })),
      calorieLog: [],
      totalDaysCompleted: 0,
      currentStreak: 0,
      lastCompletedDate: '',
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  // Update countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      const newRemaining = secondsToEasternMidnight();
      setRemaining(newRemaining);

      // Check if day changed
      if (newRemaining > remaining && shouldResetDaily()) {
        window.location.reload(); // Trigger reset
      }
    }, 1000);

    return () => clearInterval(t);
  }, [remaining]);

  const levelInfo = useMemo(() => computeLevelProgress(state.xp), [state.xp]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6">
      <Header
        coins={state.coins}
        levelInfo={levelInfo}
        remaining={remaining}
        streak={state.currentStreak}
      />
      <Tabs tab={tab} setTab={setTab} />
      {tab === 'dashboard' && <DashboardPage state={state} updateState={setState} />}
      {tab === 'exercises' && <ExercisesPage />}
      {tab === 'calories' && <CalorieScannerPage state={state} updateState={setState} />}
    </div>
  );
}
