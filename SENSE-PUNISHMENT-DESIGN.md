# SENSE - Enhanced Punishment & Notification System

## 🔔 PUSH NOTIFICATION SYSTEM

### Notification Types:

#### 1. Daily Reminders
```
MORNING (8:00 AM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"⚔️ Good morning, Hero! Time to start your quest log!"

AFTERNOON (2:00 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"💪 Halfway through the day! Have you completed your workouts?"

EVENING (7:00 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"⏰ Evening check-in: X tasks remaining before midnight!"
```

#### 2. Urgency Warnings
```
1 HOUR BEFORE MIDNIGHT (11:00 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"⚠️ CRITICAL: Only 1 hour left! X tasks incomplete!"
[Tap to open app]

30 MINUTES WARNING (11:30 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"🚨 URGENT: 30 minutes remaining! Complete your dailies NOW!"
[Action: Open SENSE]

15 MINUTES ALERT (11:45 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"🔥 EMERGENCY: 15 MINUTES! FAILURE = SEVERE PENALTIES!"
[Sound: Urgent beep]
[Vibration: Strong]

5 MINUTES FINAL WARNING (11:55 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"💀 LAST CHANCE: 5 MINUTES OR LOSE YOUR STREAK!"
[Sound: Alarm]
[Vibration: Continuous]
[Badge: Red exclamation]
```

#### 3. Mission Alerts
```
MISSION AVAILABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"⚡ New mission unlocked: [Mission Name]"
"Reward: +X XP • Expires in 25 minutes"

MISSION EXPIRING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"⏳ Mission expiring in 5 minutes!"
```

#### 4. Streak Milestones
```
"🔥 Incredible! 7-day streak achieved!"
"🔥 LEGENDARY! 30-day streak! You're unstoppable!"
"🔥 MYTHIC! 100-day streak! You're in the top 1%!"
```

#### 5. Achievement Unlocks
```
"🏆 Achievement Unlocked: [Name]"
"Reward: +X XP, +X coins"
```

### Notification Settings:
```javascript
NotificationSettings {
  enabled: true,
  morning: { enabled: true, time: '08:00' },
  afternoon: { enabled: true, time: '14:00' },
  evening: { enabled: true, time: '19:00' },

  warnings: {
    hour: true,    // 11:00 PM
    minutes30: true,  // 11:30 PM
    minutes15: true,  // 11:45 PM
    minutes5: true,   // 11:55 PM
  },

  missions: true,
  achievements: true,
  sound: true,
  vibration: true,
}
```

---

## ⚠️ ENHANCED PUNISHMENT SYSTEM

### Current Problem:
Penalties are too weak! Users don't fear failure enough.

### New System: Escalating Consequences

---

## 💀 TIER 1: First Offense (Miss 1 day)

### Standard Penalties:
```
XP LOSS:        -150 XP (was -100)
COIN LOSS:      -75 coins (was -50)
STAT DECAY:     -10 ALL STATS (was -5)
STREAK:         Reset to 0
```

### NEW: Debuff System
```
🔴 WEAKENED STATUS (24 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Effect: -25% XP gain on all tasks
Visual: Character icon grayed out
Warning: Red "WEAKENED" badge on header

Example:
Normal:    Weights = 60 XP
Weakened:  Weights = 45 XP (-25%)
```

### NEW: Visual Shame
```
- Character icon becomes dark/grayed
- Red "FAILED" stamp on character sheet
- Stats display in red for 24 hours
- Countdown timer shows "Recovery: XX:XX:XX"
```

---

## 💀💀 TIER 2: Second Offense (Miss 2 consecutive days)

### Escalated Penalties:
```
XP LOSS:        -300 XP (doubled)
COIN LOSS:      -150 coins (doubled)
STAT DECAY:     -20 ALL STATS (doubled)
STREAK:         Reset to 0
INVENTORY:      Lose 1 RANDOM item
```

### NEW: Severe Debuffs
```
🔴🔴 SEVERELY WEAKENED (48 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Effect: -50% XP gain on all tasks
Duration: 48 hours
Additional: -50% loot drop rate

Mission Penalty:
- Bonus mission slots reduced from 4 to 2
- Duration: 24 hours

Store Penalty:
- All store prices increased by +50%
- Duration: 24 hours
- Example: Streak Shield 800 → 1,200 coins
```

### Random Item Loss:
```
⚠️ YOU LOST AN ITEM!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The gods have punished your negligence!

Lost: [Random item from inventory]
- Streak Shield (800 coins) ❌
- OR Rest Day Pass (600 coins) ❌
- OR XP Boost (500 coins) ❌

Note: Can't lose your last Streak Shield
```

---

## 💀💀💀 TIER 3: Third Offense (Miss 3+ consecutive days)

### Devastating Penalties:
```
LEVEL REGRESSION: DROP 1 FULL LEVEL
XP LOSS:          -500 XP (+ level drop)
COIN LOSS:        -300 coins
STAT DECAY:       -30 ALL STATS
INVENTORY:        Lose 2 RANDOM items
```

### NEW: Catastrophic Debuffs
```
🔴🔴🔴 DEVASTATED STATUS (72 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Effect: -75% XP gain on all tasks
Duration: 72 hours
Loot: -75% drop rate

Example:
Normal:     Weights = 60 XP
Devastated: Weights = 15 XP (-75%)
```

### Lockouts:
```
MISSION LOCKOUT (48 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- No bonus missions available
- All 4 slots show: "LOCKED - Complete redemption"

STORE LOCKOUT (24 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Cannot purchase items
- Message: "Store closed due to negligence"

CLASS BONUS DISABLED (24 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Warrior +50% STR → DISABLED
- Scholar +50% INT → DISABLED
- All class bonuses removed temporarily
```

### Level Drop Mechanic:
```
LEVEL REGRESSION APPLIED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Previous: Level 15 (1,234/1,500 XP)
Current:  Level 14 (0/1,400 XP)

You've been demoted! All level 15 benefits lost.
Complete the Redemption Quest to recover faster.
```

---

## 🔄 REDEMPTION SYSTEM

### Redemption Quest (Available after Tier 2+)
```
QUEST: PATH OF REDEMPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The gods offer you a chance to redeem yourself.

Objectives:
☐ Complete ALL dailies 3 days in a row
☐ Complete 10 bonus missions
☐ Hit calorie target 3 days in a row
☐ Log 5 workouts

Rewards:
✓ Remove all debuffs immediately
✓ Restore 50% of lost XP
✓ Restore 50% of lost coins
✓ Restore 50% of lost stats
✓ +500 Bonus XP for redemption

Progress: [▓▓▓░░░░░░░] 3/10 missions
Time Limit: 7 days
```

### Forgiveness Token (Store Item)
```
💎 FORGIVENESS TOKEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cost: 2,000 coins (very expensive)

Effect:
- Instantly remove all debuffs
- Restore 25% of penalties
- Does NOT restore streak
- Can only use once per week

Warning: This is a last resort!
It's cheaper to just complete your tasks!
```

---

## 📊 PENALTY COMPARISON

| Offense | XP Loss | Coin Loss | Stat Loss | Debuff | Duration | Other |
|---------|---------|-----------|-----------|--------|----------|-------|
| **1st** | -150 | -75 | -10 | -25% XP | 24h | Visual shame |
| **2nd** | -300 | -150 | -20 | -50% XP | 48h | Lose 1 item, reduced missions, price increase |
| **3rd** | -500 | -300 | -30 | -75% XP | 72h | Drop 1 level, lose 2 items, lockouts, class disabled |

---

## 🧠 PSYCHOLOGY OF PUNISHMENT

### Why This Works:

#### 1. **Escalation = Fear**
- First offense is bad
- Second offense is painful
- Third offense is DEVASTATING
- Users will avoid at all costs

#### 2. **Multi-Dimensional Pain**
- Not just numbers (XP/coins)
- Affects gameplay (debuffs, lockouts)
- Visual shame (grayed out icon)
- Time-based recovery (forces patience)

#### 3. **Loss Aversion**
- Losing items HURTS (spent coins on them)
- Level drop is psychologically devastating
- Debuffs make progress feel slow
- All designed to prevent failure

#### 4. **Recovery Path**
- Not permanent (can redeem)
- Requires effort (Redemption Quest)
- Expensive shortcut (Forgiveness Token)
- Creates comeback narrative

---

## 🎮 USER EXPERIENCE

### Scenario 1: First Miss
```
DAY 1 (12:01 AM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PENALTY MODAL APPEARS]

⚠️ FAILURE DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You failed to complete your dailies!

Penalties Applied:
- Lost 150 XP
- Lost 75 coins
- All stats -10
- Streak reset to 0
- WEAKENED status (24 hours)

Effects:
🔴 -25% XP gain for 24 hours
🔴 Character icon grayed out

Warning: Missing 2 days in a row = SEVERE penalties!
Get back on track NOW!

[I Understand] [View Redemption Quest]
```

User thinks: "Okay, that hurt. Not doing that again!"

---

### Scenario 2: Second Miss (Oh no!)
```
DAY 2 (12:01 AM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SEVERE PENALTY MODAL]

💀 SEVERE FAILURE DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You failed AGAIN! This is getting serious!

Penalties Applied:
- Lost 300 XP
- Lost 150 coins
- All stats -20
- Streak reset to 0
- Lost item: Streak Shield ❌
- SEVERELY WEAKENED (48 hours)

Effects:
🔴🔴 -50% XP gain for 48 hours
🔴 Bonus missions reduced to 2 slots
🔴 Store prices +50% higher
🔴 Loot drop rate -50%

CRITICAL WARNING:
Missing 3 days in a row will cause LEVEL DROP
and devastating lockouts!

[I Won't Fail Again] [Start Redemption Quest]
```

User thinks: "OH NO. I need to get back on track immediately!"

---

### Scenario 3: Third Miss (Catastrophe!)
```
DAY 3 (12:01 AM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[CATASTROPHIC PENALTY MODAL]

💀💀💀 CATASTROPHIC FAILURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You have FAILED your quest three times!
The gods are displeased!

Penalties Applied:
- DROPPED 1 LEVEL (15 → 14) 📉
- Lost 500 XP
- Lost 300 coins
- All stats -30
- Lost 2 items: XP Boost, Rest Pass ❌❌
- DEVASTATED status (72 hours)

Effects:
🔴🔴🔴 -75% XP gain for 72 hours
🔴 NO bonus missions for 48 hours
🔴 Store LOCKED for 24 hours
🔴 Class bonus DISABLED for 24 hours
🔴 Loot drop rate -75%

Your character is in shambles.
Complete the Redemption Quest to recover!

[View Redemption Quest] [I've Learned My Lesson]
```

User thinks: "NEVER AGAIN. I'm completing my dailies EVERY DAY from now on!"

---

## 💪 PREVENTION IS BETTER THAN CURE

### Notification Schedule (Prevents Failure):
```
8:00 AM:  Morning reminder
2:00 PM:  Afternoon check-in
7:00 PM:  Evening status update
11:00 PM: 1-hour warning
11:30 PM: 30-minute alert
11:45 PM: 15-minute URGENT
11:55 PM: 5-minute EMERGENCY
```

**With 7 reminders throughout the day, failure is nearly impossible!**

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1: Notifications (TODAY)
```javascript
// 1. Request permission
if ('Notification' in window) {
  Notification.requestPermission();
}

// 2. Schedule based on countdown
function checkAndNotify() {
  const remaining = secondsToEasternMidnight();
  const tasksLeft = dailyTasks.filter(t => !completed[t.id]).length;

  if (remaining === 3600 && tasksLeft > 0) {
    showNotification('⏰ 1 hour left!', `${tasksLeft} tasks remaining!`);
  }
  // ... more conditions
}

// 3. Run every second
setInterval(checkAndNotify, 1000);
```

### Phase 2: Enhanced Penalties (TODAY)
```javascript
function applyEnhancedPenalty(state) {
  const consecutiveMisses = calculateConsecutiveMisses(state);

  if (consecutiveMisses === 1) {
    return applyTier1Penalty(state);
  } else if (consecutiveMisses === 2) {
    return applyTier2Penalty(state);
  } else if (consecutiveMisses >= 3) {
    return applyTier3Penalty(state);
  }
}
```

---

## 📋 SUMMARY

### What Changes:
✅ Push notifications (7+ per day)
✅ Escalating punishments (3 tiers)
✅ Debuff system (reduces XP gain)
✅ Item loss (inventory penalties)
✅ Level regression (drop levels)
✅ Lockouts (missions, store, class)
✅ Redemption quest (recovery path)
✅ Visual shame indicators

### What's Removed:
❌ Friends system
❌ Leaderboards
❌ Guilds
❌ Social features

### Result:
**A focused, personal fitness RPG where failure has REAL consequences and success is celebrated!**

Users will FEAR missing a day and NEVER want to lose their streak! 🔥💪
