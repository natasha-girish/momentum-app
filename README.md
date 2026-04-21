# Momentum — Fitness Intelligence Dashboard

A React Native fitness app that analyzes your daily habits and delivers personalized recommendations: **Push**, **Maintain**, or **Recover**.

Momentum synthesizes sleep, energy, soreness, and workout data into actionable guidance. **No backend required—fully local-first on your device.**

## Quick Start

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** or **yarn**
- **Expo CLI** (installed via npm)
- For iOS: Mac with Xcode, or use [Expo Go](https://expo.dev/go)
- For Android: Android Studio/Emulator, or Expo Go

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/momentum-app.git
cd momentum-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

### Running the App

After `npm start`, you'll see a menu with options:

**Web (Browser)** — Fastest way to test:
```bash
# In the terminal, press: w
# Or open http://localhost:8081/web in your browser
```

**iOS Simulator** (Mac only):
```bash
# In the terminal, press: i
# Or run manually: npx expo run:ios
```

**Android Emulator**:
```bash
# In the terminal, press: a
# Or run manually: npx expo run:android
```

**Expo Go** (Phone):
- Download [Expo Go](https://expo.dev/go) on your phone
- Scan the QR code shown in the terminal after `npm start`

## Features

- ✅ **Personalized Recommendations** — Push/Maintain/Recover based on your habits
- ✅ **Weight Tracking** — 30-day trend chart with plateau detection
- ✅ **Sleep & Energy Logging** — Quick daily check-ins (< 30 seconds)
- ✅ **Activity History** — 7-day workout/rest visualization
- ✅ **Weekly Insights** — Patterns and adherence summaries
- ✅ **Local-First Data** — All data stored on your device (SQLite)
- ✅ **Offline-First** — Works completely offline

## Setup & Configuration

**No API keys required.** The app is fully local-first for v1.

### First Launch

1. **Login** — Create an account (credentials stored locally)
2. **Onboarding** — 6-screen setup flow:
   - Fitness goal (general fitness, fat loss, muscle gain, etc.)
   - Weekly workout frequency
   - Sleep baseline
   - Unit preference (lbs/kg)
   - Confirmation
3. **Dashboard** — Start logging daily check-ins

### Data Stored Locally

- User profile (goal, preferences, sleep baseline)
- Daily check-ins (weight, sleep hours, energy, soreness, workout status)
- Weekly insights and trends
- All stored in SQLite on-device; no cloud sync in v1

## Development

### Project Structure

```
app/                    # App screens (file-based routing)
├── _layout.tsx         # Root layout & auth flow
├── login.tsx           # Login screen
├── onboarding/         # 6-screen onboarding
└── (app)/              # Main app (tab navigator)
    ├── index.tsx       # Dashboard
    ├── check-in.tsx    # Daily check-in form
    └── settings/       # Settings & profile

components/            # Reusable UI components
lib/                   # Business logic & database
├── db/                # SQLite schema & repos
├── engines/           # Recommendation algorithm
├── hooks/             # React hooks
└── utils/             # Helpers & formatting

constants/             # Theme, typography, copy
__tests__/             # Unit tests
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Run specific test
npm test recommendation-engine.test.ts
```

### Linting

```bash
npm run lint
```

## Environment Variables

**No required environment variables.** For web deployment, optional config:

```bash
# .env.local (optional)
# EXPO_PUBLIC_API_URL=https://api.example.com  # For future backend
```

## Deployment

### Web (Vercel)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Deploy to Vercel
#    - Go to vercel.com
#    - Click "New Project"
#    - Select your GitHub repo
#    - Click "Deploy"
#    - Live at: momentum-app.vercel.app (example)
```

### iOS & Android (Expo Application Services)

```bash
# Requires EAS account (free tier available, paid for TestFlight/App Store)
npm install -g eas-cli
eas login
eas build --platform all
eas submit    # To App Store / Google Play
```

See [Expo Deployment Docs](https://docs.expo.dev/deploy/build-project/) for details.

## Troubleshooting

### "Port 8081 is already in use"

```bash
# Kill existing Expo process
pkill -f "expo start"

# Or use a different port
npm start -- --port 8083
```

### Database errors or stale data

```bash
# Clear app data and reset database
# Delete the app from your simulator/device and reinstall
# Or run: npm run reset-project
```

### Fonts not loading

```bash
npm start -- --clear
```

### App crashes on launch

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Tech Stack

- **React Native** — Cross-platform mobile framework
- **Expo** — React Native toolchain
- **expo-router** — File-based routing
- **expo-sqlite** — Local database
- **TypeScript** — Type safety
- **Zustand** — State management (optional)
- **react-native-chart-kit** — Weight trend visualization

## Known Limitations (v1)

- ❌ No cloud sync or multi-device support
- ❌ No wearable integrations (Apple Health, Fitbit, etc.)
- ❌ No meal/macro tracking
- ❌ No workout plan generation
- ❌ No social features
- ❌ No ML-based pattern detection

## Next Steps

1. **Wearable Integration** — Apple Health, Renpho scale, MyFitnessPal
2. **Cloud Sync** — Optional backend for multi-device support
3. **Advanced Analytics** — Pattern detection, heatmaps, cycles
4. **Recovery Suggestions** — Smart recommendations on recovery days

## Contributing

See [CLAUDE.md](./CLAUDE.md) for architecture details and project guidelines.

## License

MIT

## Support

- **Stuck?** Check this README or [CLAUDE.md](./CLAUDE.md)
- **Bug report?** Open an issue on GitHub
- **Questions?** Review test files in `__tests__/` for usage examples

---

**Built with Expo. Fully local-first. No account required.**
