# Momentum Fitness App - Project Documentation

## Project Overview

Momentum is a React Native fitness intelligence dashboard (iOS/Android via Expo) that synthesizes daily tracking data into actionable recommendations: Push, Maintain, or Recover.

**Key Philosophy**: Local-first, no backend required for v1. Fast daily habit (< 30 seconds). Trusted guidance via deterministic recommendation engine.

---

## Architecture

### Layered Design

```
┌─ React Native / Expo (Presentation)
├─ React Hooks & Router (Navigation & State)
├─ Reusable Components (UI Library)
├─ Business Logic (Engines, Hooks)
└─ SQLite (Data Persistence)
```

### Data Flow

1. **Root Layout** (`app/_layout.tsx`) — Checks for user profile, routes to onboarding or main app
2. **Onboarding** (`app/onboarding/*`) — 6-screen flow, saves profile to DB
3. **Dashboard** (`app/(app)/index.tsx`) — Fetches check-ins, computes recommendation, displays trends
4. **Check-In** (`app/(app)/check-in.tsx`) — Quick daily form, upserts to DB
5. **Settings** (`app/(app)/settings/*`) — View/edit profile, history, insights

### Key Dependencies

- **expo-router**: File-based routing
- **expo-sqlite**: Local database
- **expo-notifications**: Daily reminders
- **react-native-chart-kit**: Weight trend visualization
- **zustand** (optional): State management

---

## Folder Structure

```
app/
├── _layout.tsx                  # Root: onboarding redirect logic
├── onboarding/                  # 6-screen onboarding flow
│   ├── _layout.tsx
│   ├── index.tsx (welcome)
│   ├── goal-select.tsx
│   ├── workout-frequency.tsx
│   ├── sleep-baseline.tsx
│   ├── unit-preferences.tsx
│   └── confirmation.tsx
└── (app)/                       # Main app (requires profile)
    ├── _layout.tsx              # Tab navigator
    ├── index.tsx                # Dashboard
    ├── check-in.tsx             # Daily check-in form
    └── settings/                # Settings stack
        ├── _layout.tsx
        ├── index.tsx
        ├── edit-profile.tsx
        ├── history.tsx
        ├── insights.tsx
        └── about.tsx

components/
├── ui/                          # Reusable primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── slider.tsx
│   ├── numeric-input.tsx
│   ├── segmented-control.tsx
│   └── soreness-selector.tsx
├── theme/
│   ├── themed-text.tsx
│   └── themed-view.tsx
├── recommendation/
│   └── recommendation-card.tsx  # Main recommendation display
├── charts/
│   ├── weight-trend-chart.tsx   # 30-day smoothed trend
│   ├── activity-strip.tsx       # 7-day rest/workout
│   └── recovery-score.tsx
├── dashboard/
│   └── (placeholder components)
└── common/
    ├── screen-wrapper.tsx
    └── ...

lib/
├── db/                          # Data layer
│   ├── schema.ts                # SQLite DDL
│   ├── database.ts              # DB initialization
│   ├── user-repo.ts             # User CRUD
│   ├── checkin-repo.ts          # Check-in CRUD
│   └── insight-repo.ts          # Insight CRUD
├── engines/                     # Business logic
│   ├── recommendation-engine.ts # Push/Maintain/Recover algorithm
│   ├── weight-analyzer.ts       # Trend & plateau detection
│   ├── insight-generator.ts     # Weekly insight logic
│   └── constants.ts             # Named constants (magic numbers)
├── hooks/                       # React hooks
│   ├── use-user-profile.ts
│   ├── use-checkins.ts
│   ├── use-recommendation.ts
│   ├── use-insights.ts
│   └── use-notifications.ts
├── utils/                       # Utilities
│   ├── date.ts
│   ├── averages.ts
│   ├── validation.ts
│   ├── formatting.ts
│   └── notification-handler.ts
└── types/
    └── index.ts                 # All TypeScript interfaces

constants/
├── theme.ts                     # Colors (light/dark)
├── typography.ts               # Font scales
├── sizes.ts                     # Spacing, radii, shadows
└── copy.ts                      # User-facing strings

__tests__/
├── engines/
│   ├── recommendation-engine.test.ts
│   └── averages.test.ts
└── fixtures/
    └── (test data)
```

---

## Key Components & How They Work

### 1. Recommendation Engine

**File**: `lib/engines/recommendation-engine.ts`

Deterministic rule-based system analyzing last 7 days:

- **Soreness**: High soreness → Recover
- **Training streak**: 4+ consecutive days → Recover
- **Sleep**: < 6h penalizes Push, > 7.5h supports Push
- **Energy**: High energy supports Push
- **Rest days**: < 2 per week → nudge Recover

Each factor weighted, scores converted to state (Push > 0.15, Recover < -0.15, else Maintain).

All magic numbers in `lib/engines/constants.ts` for easy tuning.

### 2. Weight Trend Analysis

**File**: `lib/engines/weight-analyzer.ts`

- Requires minimum 5 weight entries
- Calculates 7-day rolling average (smooths daily fluctuations)
- Detects plateau if ±0.5 lbs movement in 14 days
- Compares to 4-week delta
- Returns direction (up/down/stable)

### 3. Recommendation Card

**File**: `components/recommendation/recommendation-card.tsx`

Displays:
- Large emoji + state label (Push/Maintain/Recover)
- 2-3 sentence explanation
- Confidence score
- Contributing factors (collapsible)
- Color-coded by state

### 4. Activity Strip

**File**: `components/charts/activity-strip.tsx`

7 dots representing last 7 days:
- Filled = workout
- Faded = rest
- Empty = no check-in
- Shows count (e.g., "4/7 days")

### 5. Weight Trend Chart

**File**: `components/charts/weight-trend-chart.tsx`

Uses `react-native-chart-kit` LineChart:
- Raw points (faint)
- 7-day smoothed line (prominent)
- Last 30 entries displayed
- Stats: current weight, trend arrow, 4-week delta
- Plateau banner if detected

---

## Data Models

### UserProfile

```typescript
{
  id: 'default-user',
  goal: 'general_fitness', // or fat_loss, muscle_gain, etc.
  weeklyWorkoutFrequency: 3,
  sleepBaseline: 7,
  weightUnit: 'lbs',
  notificationTime: '08:00',
  notificationEnabled: true,
  createdAt: Date,
  updatedAt: Date,
}
```

### CheckIn

```typescript
{
  id: uuid,
  date: '2025-04-16',
  weight: 180.5,         // optional
  sleepHours: 7,
  energy: 4,             // 1-5
  soreness: 'mild',      // none, mild, moderate, high
  workoutStatus: 'completed_workout',
  recommendationOverride: undefined,
  createdAt: Date,
  updatedAt: Date,
}
```

### WeeklyInsight

```typescript
{
  id: uuid,
  weekStart: '2025-04-13',
  insightType: 'on_track',
  summaryText: 'You\'re staying consistent...',
  actionText: 'Keep up the regular check-ins.',
  adherenceValue: '5/7',
  avgSleep: 7.2,
  weightTrendDirection: 'stable',
  createdAt: Date,
}
```

---

## Running the App

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Setup

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Open in iOS Simulator
# Press 'i' in terminal, or run: npx expo run:ios

# Open in Android Emulator
# Press 'a' in terminal, or run: npx expo run:android

# Open in web (browser)
# Press 'w' in terminal
```

### Development

- Hot reload: Save any file to auto-refresh
- Debugger: Open React DevTools or Flipper
- Logs: Check terminal for console.log output

### Reset Project

```bash
npm run reset-project
# Moves app/ to app-example/ and creates a blank app/
```

---

## Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test recommendation-engine.test.ts

# Watch mode
npm test -- --watch
```

**Test files**:
- `__tests__/engines/recommendation-engine.test.ts` — Algorithm correctness
- `__tests__/utils/averages.test.ts` — Rolling averages

**Test fixtures** in `__tests__/fixtures/`:
- `minimal-checkins.ts` — 3 entries (minimal data)
- `full-month-checkins.ts` — 30 entries with patterns
- `overtraining-scenario.ts` — 5+ consecutive training days
- `plateau-scenario.ts` — Static weight over 14 days

### Manual Testing Checklist

- [ ] Onboarding flow completes (all 6 screens)
- [ ] Onboarding data persists (check Settings)
- [ ] Dashboard loads with placeholder if < 3 check-ins
- [ ] Daily check-in form opens and saves
- [ ] Recommendation updates after new check-in
- [ ] Weight chart renders with 5+ entries
- [ ] Activity strip shows 7 days
- [ ] Manual override changes state
- [ ] Settings displays profile correctly
- [ ] Notifications can be scheduled
- [ ] App works offline (no internet)
- [ ] Theme switches light/dark on device

---

## Customization & Tuning

### Recommendation Algorithm

All thresholds in `lib/engines/constants.ts`:

```typescript
ENGINE_CONSTANTS = {
  CONSECUTIVE_TRAINING_THRESHOLD: 4,  // Days before suggesting recover
  SORENESS_WEIGHT: 0.3,               // Impact weight
  MIN_REST_DAYS_PER_WEEK: 2,          // Minimum for balance
  CRITICAL_SLEEP_HOURS: 6,            // Below = penalize push
  GOOD_SLEEP_HOURS: 7.5,              // Above = support push
  // ... more
}
```

To tune: Modify constants, run tests, verify with manual check-ins.

### UI Styling

- **Colors**: `constants/theme.ts` (light/dark)
- **Spacing**: `constants/sizes.ts` (Spacing.sm, Spacing.lg, etc.)
- **Typography**: `constants/typography.ts` (headingM, body, etc.)
- **Reusable components**: `components/ui/*`

---

## Known Limitations (v1)

- ❌ No cloud sync or account system
- ❌ No wearable integrations (Apple Health, Fitbit, etc.)
- ❌ No meal tracking or macros
- ❌ No workout plan generation
- ❌ No social/community features
- ❌ No ML-based pattern detection
- ⚠️ Recovery score placeholder (not fully implemented)

---

## Next Steps (Post-MVP)

1. **Pattern Detection**: Detect user-specific correlations (e.g., "energy higher after rest")
2. **Connected Apps**: Apple Health, Renpho scale, MyFitnessPal import
3. **Recovery Suggestions**: Smart suggestions on Recover days (yoga, walks, etc.)
4. **Backend Sync**: Optional cloud backup with sign-in
5. **Advanced Analytics**: Heatmaps, cycles, performance trends
6. **Wearable Metrics**: Heart rate variability, resting heart rate, HRV trends

---

## Troubleshooting

### Database Issues

**Symptoms**: Check-ins not saving, profile data gone

**Solution**:
```typescript
// In app/_layout.tsx, clear DB for testing:
import { clearDatabase } from '@/lib/db/database';
await clearDatabase();
```

### Notification Not Firing

**Symptoms**: No daily reminders

**Solution**:
- Check permission granted: Settings → Notifications
- Ensure notification time is in future
- Test with manual notification:
```typescript
import * as Notifications from 'expo-notifications';
await Notifications.presentNotificationAsync({
  content: { title: 'Test', body: 'Notification test' },
});
```

### App Crashes on Start

**Symptoms**: White screen, immediate crash

**Solution**:
- Clear cache: `npm start -- --clear`
- Reinstall: `rm -rf node_modules && npm install`
- Check logs: `adb logcat` (Android) or Xcode console (iOS)

---

## Performance Notes

- **Database**: Indexed on `date` and `week_start` for fast queries
- **Charts**: Limit to 30 days of weight data (not 365)
- **Hooks**: Memoize recommendation computation after 3+ check-ins
- **Storage**: SQLite is local; ~1MB for 1 year of daily data

---

## License & Credits

Built with Expo, React Native, SQLite. See package.json for all deps.

---

## Questions or Issues?

- Check this README first
- Review test files for usage examples
- Run unit tests to verify algorithms
- Enable React DevTools for state debugging
