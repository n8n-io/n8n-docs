import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

// SENSE – GAMIFIED RPG VERSION 🎮
// Transform your life into an epic video game!
//
// NEW FEATURES:
// ✅ RPG Stats System (STR, INT, DIS, CHA, END, WEA)
// ✅ Character Classes (Warrior, Scholar, Entrepreneur, Creator, Hybrid)
// ✅ Loot Box System (5 rarity tiers)
// ✅ Achievement System (30+ achievements)
// ✅ Quest System (main story + enhanced dailies)
// ✅ Undo Functionality (5-second window)
// ✅ Reward Redemption (USE items from inventory)
// ✅ Manual Calorie Entry
// ✅ Persistent Mission Cooldowns (timestamp-based)
// ✅ Daily History Tracking (30 days)
// ✅ Enhanced UI with game-like feel

// ---------------- Config ----------------
const XP_PER_COIN = 3;
const MISSION_COOLDOWN_MS = 25 * 60 * 1000; // 25 minutes in milliseconds
const EXTRA_SLOTS = 4;
const XP_PER_25_KCAL = 1;
const DAILY_KCAL_TARGET = 2000;
const STORAGE_KEY = 'sense_gamified_v1';
const STORAGE_DATE_KEY = 'sense_last_date_v1';
const UNDO_WINDOW_MS = 5000; // 5 seconds to undo

// ---------------- Types ----------------
type CharacterClass = 'warrior' | 'scholar' | 'entrepreneur' | 'creator' | 'hybrid' | null;

type RPGStats = {
  strength: number;      // Physical fitness
  endurance: number;     // Stamina and cardio
  intelligence: number;  // Learning and knowledge
  charisma: number;      // Content creation, social
  discipline: number;    // Consistency, streaks
  wealth: number;        // Financial tasks
};

type DailyTask = {
  id: string;
  label: string;
  xp: number;
  required: boolean;
  statGains: Partial<RPGStats>;
};

type Mission = {
  id: string;
  label: string;
  xp: number;
  statGains: Partial<RPGStats>;
};

type MissionSlot = {
  mission?: Mission;
  cooldownEndTime: number; // Unix timestamp
  lastId?: string;
};

type StoreItem = {
  id: string;
  name: string;
  cost: number;
  desc: string;
  type: 'consumable' | 'permanent' | 'cosmetic';
  usable: boolean;
};

type LootRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

type LootItem = {
  id: string;
  name: string;
  rarity: LootRarity;
  type: 'xp' | 'coins' | 'item';
  value?: number;
  itemId?: string;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  requirement: (state: AppState) => boolean;
  reward: { xp: number; coins: number };
  icon: string;
  hidden?: boolean;
};

type DailyHistory = {
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  xpEarned: number;
  allCompleted: boolean;
};

type UndoAction = {
  type: 'complete_task' | 'complete_mission' | 'buy_item' | 'use_item';
  timestamp: number;
  previousState: Partial<AppState>;
  description: string;
};

type AppState = {
  // Existing
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

  // New gamification
  characterClass: CharacterClass;
  stats: RPGStats;
  unlockedAchievements: string[];
  dailyHistory: DailyHistory[];
  usedItems: Record<string, number>; // Track redemptions
  lastUndoAction: UndoAction | null;
  totalXPEarned: number; // For achievements
  totalCoinsEarned: number;
  mainQuestProgress: number; // 0-100
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

  const play = useCallback((frequency = 420, type: 'success' | 'level' | 'rare' = 'success') => {
    const ctx = ensureCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    if (type === 'level') {
      // Level up sound (ascending notes)
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    } else if (type === 'rare') {
      // Rare loot sound (sparkly)
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    } else {
      // Default success sound
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    }

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
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
const characterClasses = {
  warrior: {
    name: 'Warrior',
    icon: '🗡️',
    description: 'Master of physical fitness and discipline',
    bonusStat: 'strength',
    bonusMultiplier: 1.5,
  },
  scholar: {
    name: 'Scholar',
    icon: '🧠',
    description: 'Seeker of knowledge and wisdom',
    bonusStat: 'intelligence',
    bonusMultiplier: 1.5,
  },
  entrepreneur: {
    name: 'Entrepreneur',
    icon: '💼',
    description: 'Builder of wealth and empire',
    bonusStat: 'wealth',
    bonusMultiplier: 1.5,
  },
  creator: {
    name: 'Creator',
    icon: '🎨',
    description: 'Artist and content legend',
    bonusStat: 'charisma',
    bonusMultiplier: 1.5,
  },
  hybrid: {
    name: 'Hybrid',
    icon: '⚖️',
    description: 'Jack of all trades, master of balance',
    bonusStat: 'discipline',
    bonusMultiplier: 1.2,
  },
};

const dailyTasks: DailyTask[] = [
  {
    id: "weights",
    label: "Forge Your Body (Weights 60min)",
    xp: 60,
    required: true,
    statGains: { strength: 3, endurance: 1, discipline: 2 }
  },
  {
    id: "cardio",
    label: "Warrior's Endurance (Cardio 45min)",
    xp: 45,
    required: true,
    statGains: { endurance: 3, strength: 1, discipline: 2 }
  },
  {
    id: "ai_learning",
    label: "Study the Craft (AI Learning 60min)",
    xp: 70,
    required: true,
    statGains: { intelligence: 4, discipline: 2 }
  },
  {
    id: "content_creation",
    label: "Share Your Journey (Post Content)",
    xp: 45,
    required: true,
    statGains: { charisma: 3, intelligence: 1, discipline: 1 }
  },
  {
    id: "bible",
    label: "Spiritual Strength (Read Bible 15min)",
    xp: 30,
    required: true,
    statGains: { discipline: 3, intelligence: 2 }
  },
];

const missionPool: Mission[] = [
  { id: "cold_shower", label: "Cold Shower Challenge", xp: 25, statGains: { discipline: 2, endurance: 1 } },
  { id: "bonus_edit", label: "Edit a bonus video", xp: 40, statGains: { charisma: 2, intelligence: 1 } },
  { id: "gratitude", label: "Write 3 gratitude lines", xp: 20, statGains: { discipline: 2 } },
  { id: "stretch", label: "10‑min mobility", xp: 20, statGains: { endurance: 2 } },
  { id: "no_sugar", label: "No sugar for the day", xp: 30, statGains: { discipline: 3 } },
  { id: "clean_space", label: "10‑min workspace reset", xp: 15, statGains: { discipline: 2 } },
  { id: "read_research", label: "Read 1 AI research abstract", xp: 20, statGains: { intelligence: 2 } },
  { id: "meditation", label: "10‑min meditation", xp: 25, statGains: { discipline: 2, intelligence: 1 } },
  { id: "meal_prep", label: "Meal prep for tomorrow", xp: 30, statGains: { discipline: 2 } },
  { id: "deep_work", label: "90‑min deep work block", xp: 50, statGains: { discipline: 3, intelligence: 2 } },
];

const storeItems: StoreItem[] = [
  { id: "reward_cheat_meal", name: "Cheat Meal Pass", cost: 300, desc: "One guilt-free indulgence", type: 'consumable', usable: true },
  { id: "reward_movie_night", name: "Movie Night", cost: 200, desc: "Relax and recharge", type: 'consumable', usable: true },
  { id: "reward_new_gym_shirt", name: "New Gym Shirt", cost: 450, desc: "Fresh gear for motivation", type: 'consumable', usable: true },
  { id: "reward_massage", name: "Recovery Massage", cost: 700, desc: "Deep tissue recovery", type: 'consumable', usable: true },
  { id: "reward_rest_day_pass", name: "Rest Day Pass", cost: 600, desc: "Skip dailies without losing streak", type: 'consumable', usable: true },
  { id: "reward_new_book", name: "New Book", cost: 250, desc: "Invest in knowledge", type: 'consumable', usable: true },
  { id: "reward_gaming_session", name: "2hr Gaming Pass", cost: 350, desc: "Guilt-free gaming", type: 'consumable', usable: true },
  { id: "xp_boost", name: "XP Boost (24h)", cost: 500, desc: "+50% XP for 24 hours", type: 'consumable', usable: true },
  { id: "streak_shield", name: "Streak Shield", cost: 800, desc: "Protects streak for 1 missed day", type: 'consumable', usable: true },
];

// Loot tables
const lootTables: Record<LootRarity, () => LootItem> = {
  common: () => {
    const rolls = [
      { id: 'common_xp_1', name: '+25 Bonus XP', rarity: 'common' as LootRarity, type: 'xp' as const, value: 25 },
      { id: 'common_xp_2', name: '+50 Bonus XP', rarity: 'common' as LootRarity, type: 'xp' as const, value: 50 },
      { id: 'common_coins', name: '+10 Coins', rarity: 'common' as LootRarity, type: 'coins' as const, value: 10 },
    ];
    return rolls[Math.floor(Math.random() * rolls.length)];
  },
  uncommon: () => {
    const rolls = [
      { id: 'uncommon_xp', name: '+100 Bonus XP', rarity: 'uncommon' as LootRarity, type: 'xp' as const, value: 100 },
      { id: 'uncommon_coins', name: '+25 Coins', rarity: 'uncommon' as LootRarity, type: 'coins' as const, value: 25 },
    ];
    return rolls[Math.floor(Math.random() * rolls.length)];
  },
  rare: () => {
    const rolls = [
      { id: 'rare_xp', name: '+250 Bonus XP', rarity: 'rare' as LootRarity, type: 'xp' as const, value: 250 },
      { id: 'rare_coins', name: '+50 Coins', rarity: 'rare' as LootRarity, type: 'coins' as const, value: 50 },
    ];
    return rolls[Math.floor(Math.random() * rolls.length)];
  },
  epic: () => {
    return { id: 'epic_coins', name: '+100 Coins', rarity: 'epic' as LootRarity, type: 'coins' as const, value: 100 };
  },
  legendary: () => {
    return { id: 'legendary_xp', name: '+1000 LEGENDARY XP!', rarity: 'legendary' as LootRarity, type: 'xp' as const, value: 1000 };
  },
};

function rollLoot(): LootItem[] {
  const loot: LootItem[] = [];
  const rolls = [
    { rarity: 'common' as LootRarity, chance: 0.70 },
    { rarity: 'uncommon' as LootRarity, chance: 0.20 },
    { rarity: 'rare' as LootRarity, chance: 0.08 },
    { rarity: 'epic' as LootRarity, chance: 0.018 },
    { rarity: 'legendary' as LootRarity, chance: 0.002 },
  ];

  // Roll 2-3 items
  const numItems = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < numItems; i++) {
    const roll = Math.random();
    let cumulative = 0;
    for (const { rarity, chance } of rolls) {
      cumulative += chance;
      if (roll < cumulative) {
        loot.push(lootTables[rarity]());
        break;
      }
    }
  }

  return loot;
}

// Achievements
const achievements: Achievement[] = [
  {
    id: 'first_task',
    name: 'First Steps',
    description: 'Complete your first task',
    icon: '🎯',
    requirement: (state) => Object.keys(state.completed).length > 0,
    reward: { xp: 100, coins: 10 },
  },
  {
    id: 'level_5',
    name: 'Novice',
    description: 'Reach Level 5',
    icon: '🌱',
    requirement: (state) => computeLevelProgress(state.xp).level >= 5,
    reward: { xp: 200, coins: 20 },
  },
  {
    id: 'level_10',
    name: 'Apprentice',
    description: 'Reach Level 10',
    icon: '⚔️',
    requirement: (state) => computeLevelProgress(state.xp).level >= 10,
    reward: { xp: 500, coins: 50 },
  },
  {
    id: 'level_20',
    name: 'Journeyman',
    description: 'Reach Level 20',
    icon: '🛡️',
    requirement: (state) => computeLevelProgress(state.xp).level >= 20,
    reward: { xp: 1000, coins: 100 },
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7-day streak',
    icon: '🔥',
    requirement: (state) => state.currentStreak >= 7,
    reward: { xp: 300, coins: 30 },
  },
  {
    id: 'streak_30',
    name: 'Iron Will',
    description: '30-day streak',
    icon: '💪',
    requirement: (state) => state.currentStreak >= 30,
    reward: { xp: 1500, coins: 150 },
  },
  {
    id: 'streak_100',
    name: 'Unstoppable',
    description: '100-day streak',
    icon: '🚀',
    requirement: (state) => state.currentStreak >= 100,
    reward: { xp: 5000, coins: 500 },
  },
  {
    id: 'coins_100',
    name: 'First Fortune',
    description: 'Earn 100 coins',
    icon: '💰',
    requirement: (state) => state.totalCoinsEarned >= 100,
    reward: { xp: 200, coins: 20 },
  },
  {
    id: 'coins_1000',
    name: 'Entrepreneur',
    description: 'Earn 1,000 coins',
    icon: '💎',
    requirement: (state) => state.totalCoinsEarned >= 1000,
    reward: { xp: 1000, coins: 100 },
  },
  {
    id: 'perfect_day',
    name: 'Perfect Day',
    description: 'Complete all dailies in one day',
    icon: '🎉',
    requirement: (state) => dailyTasks.every(t => state.completed[t.id]),
    reward: { xp: 250, coins: 25 },
  },
  {
    id: 'xp_1000',
    name: 'Rising Star',
    description: 'Earn 1,000 total XP',
    icon: '⭐',
    requirement: (state) => state.totalXPEarned >= 1000,
    reward: { xp: 500, coins: 50 },
  },
  {
    id: 'xp_10000',
    name: 'Legend in Training',
    description: 'Earn 10,000 total XP',
    icon: '🌟',
    requirement: (state) => state.totalXPEarned >= 10000,
    reward: { xp: 2000, coins: 200 },
  },
  {
    id: 'strength_50',
    name: 'Iron Body',
    description: 'Reach 50 Strength',
    icon: '💪',
    requirement: (state) => state.stats.strength >= 50,
    reward: { xp: 500, coins: 50 },
  },
  {
    id: 'intelligence_50',
    name: 'Sharp Mind',
    description: 'Reach 50 Intelligence',
    icon: '🧠',
    requirement: (state) => state.stats.intelligence >= 50,
    reward: { xp: 500, coins: 50 },
  },
  {
    id: 'discipline_50',
    name: 'Disciplined Warrior',
    description: 'Reach 50 Discipline',
    icon: '🎯',
    requirement: (state) => state.stats.discipline >= 50,
    reward: { xp: 500, coins: 50 },
  },
  {
    id: 'all_stats_25',
    name: 'Well Rounded',
    description: 'All stats at 25+',
    icon: '⚖️',
    requirement: (state) => {
      const stats = state.stats;
      return Object.values(stats).every(v => v >= 25);
    },
    reward: { xp: 1000, coins: 100 },
  },
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

function getRemainingCooldown(endTime: number): number {
  const now = Date.now();
  const remaining = Math.max(0, endTime - now);
  return Math.floor(remaining / 1000); // Convert to seconds
}

// ---------------- Shared UI ----------------
const Card = React.memo(({ title, className = "", children, glowColor }: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  glowColor?: string;
}) => {
  const glowStyle = glowColor ? {
    boxShadow: `0 0 20px ${glowColor}40, inset 0 0 20px ${glowColor}10`
  } : {};

  return (
    <div
      className={`w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-lg transition-all hover:shadow-xl ${className}`}
      style={glowStyle}
    >
      {title && <h2 className="text-base font-semibold mb-3 text-white">{title}</h2>}
      {children}
    </div>
  );
});

Card.displayName = 'Card';

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);

  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{value}/{max}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 border border-white/20 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function LootDisplay({ loot, onClose }: { loot: LootItem[]; onClose: () => void }) {
  const rarityColors = {
    common: 'text-gray-400',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-yellow-400',
  };

  const rarityBg = {
    common: 'bg-gray-500/20',
    uncommon: 'bg-green-500/20',
    rare: 'bg-blue-500/20',
    epic: 'bg-purple-500/20',
    legendary: 'bg-yellow-500/20',
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border-2 border-yellow-500/50 rounded-2xl p-6 max-w-md w-full animate-scaleIn">
        <h2 className="text-2xl font-bold text-center mb-4 text-yellow-400">🎁 LOOT ACQUIRED! 🎁</h2>
        <div className="space-y-2 mb-4">
          {loot.map((item, i) => (
            <div key={i} className={`p-3 rounded-lg ${rarityBg[item.rarity]} border border-white/20`}>
              <div className="flex items-center justify-between">
                <span className={`font-medium ${rarityColors[item.rarity]} uppercase text-xs`}>
                  [{item.rarity}]
                </span>
                <span className="text-white font-semibold">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}

function AchievementToast({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 border-2 border-yellow-300 rounded-lg p-4 shadow-2xl z-50 animate-slideIn max-w-sm">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{achievement.icon}</span>
        <div>
          <h3 className="font-bold text-white text-lg">Achievement Unlocked!</h3>
          <p className="text-white/90 font-semibold">{achievement.name}</p>
          <p className="text-white/70 text-sm">{achievement.description}</p>
          <p className="text-yellow-200 text-xs mt-1">+{achievement.reward.xp} XP, +{achievement.reward.coins} coins</p>
        </div>
      </div>
    </div>
  );
}

function Header({ state, levelInfo, remaining }: {
  state: AppState;
  levelInfo: { level: number; current: number; need: number; pct: number };
  remaining: number;
}) {
  const classInfo = state.characterClass ? characterClasses[state.characterClass] : null;

  return (
    <div className="w-full max-w-md mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 border-2 border-white/15 flex items-center justify-center shadow-xl">
            <span className="text-2xl">{classInfo?.icon || '⭐'}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-sky-400 flex items-center gap-2">
              SENSE
              {classInfo && <span className="text-xs text-slate-400">{classInfo.name}</span>}
            </h1>
            <p className="text-[11px] text-slate-400">Level {levelInfo.level} Hero</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 font-semibold">
            💰 {state.coins}
          </span>
          {state.currentStreak > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200">
              🔥 {state.currentStreak} days
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 mb-1">
        <div>
          {levelInfo.current}/{levelInfo.need} XP
        </div>
        <span className={`px-2 py-1 rounded-full border ${
          remaining <= 900
            ? 'bg-red-600/30 border-red-500/50 text-red-200 animate-pulse'
            : 'bg-white/10 border-white/20 text-slate-200'
        }`}>
          ⏳ {fmtTime(remaining)}
        </span>
      </div>

      <div className="w-full h-4 rounded-full bg-white/10 border border-white/20 overflow-hidden relative mb-2">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${levelInfo.pct}%` }}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-6 gap-1 text-center">
        {Object.entries(state.stats).map(([key, value]) => (
          <div key={key} className="bg-white/5 rounded-lg p-1 border border-white/10">
            <div className="text-[9px] text-slate-400 uppercase">{key.slice(0,3)}</div>
            <div className="text-xs font-bold text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tabs({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  const tabs = [
    { id: 'quests', label: 'Quests', icon: '⚔️' },
    { id: 'character', label: 'Character', icon: '🎯' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'store', label: 'Store', icon: '🛒' },
  ];

  return (
    <div className="w-full max-w-md flex gap-2 mb-4 overflow-x-auto">
      {tabs.map(({ id, label, icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            className={`px-3 py-1.5 rounded-xl border text-xs transition-all whitespace-nowrap ${
              active
                ? 'bg-white/20 border-white/30 shadow-lg'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onClick={() => setTab(id)}
          >
            {icon} {label}
          </button>
        );
      })}
    </div>
  );
}

// Character Class Selection (first time)
function ClassSelection({ onSelect }: { onSelect: (cls: CharacterClass) => void }) {
  const [selected, setSelected] = useState<CharacterClass>(null);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card title="Choose Your Path" className="max-w-2xl" glowColor="#60a5fa">
        <p className="text-sm text-slate-300 mb-4">
          Select your character class. This determines your bonus stats and playstyle. You can change this later.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {Object.entries(characterClasses).map(([key, cls]) => (
            <button
              key={key}
              onClick={() => setSelected(key as CharacterClass)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selected === key
                  ? 'border-sky-400 bg-sky-500/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="text-3xl mb-2">{cls.icon}</div>
              <h3 className="font-bold text-white mb-1">{cls.name}</h3>
              <p className="text-xs text-slate-400">{cls.description}</p>
              <p className="text-[10px] text-sky-400 mt-2">
                +{(cls.bonusMultiplier - 1) * 100}% {cls.bonusStat.toUpperCase()}
              </p>
            </button>
          ))}
        </div>
        <button
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className="w-full py-2 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Begin Your Journey
        </button>
      </Card>
    </div>
  );
}

// Continue with quest, character, and other pages in next edit...
