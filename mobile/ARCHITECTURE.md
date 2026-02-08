# MenyAI – Architecture & Improvements

## How the Project Works

### Tech Stack
- **React Native (Expo)** – Cross-platform mobile app
- **Expo Router** – File-based routing (no react-router)
- **TypeScript** – Type safety
- **Mock Data** – `data/mock.ts` holds all content (no backend yet)
- **Firebase** – Placeholder in `lib/firebase.ts` for future auth/database

### Navigation Structure

```
Root (Stack)
├── login          → Phone + PIN login (no tabs)
└── (tabs)         → Main app with bottom tab bar
    ├── index      → Home (Amasomo)
    ├── levels     → Lesson Levels (hidden from tab bar)
    ├── lessons    → Amasomo Yose / All Lessons (hidden)
    ├── learn/[level] → Yiga: lesson list for a level (hidden)
    ├── progress   → Iterambere
    ├── activities → Ibikorwa
    ├── practice   → Iyitoze (matching exercise)
    └── account    → Konti
```

### User Flow
1. **Login** → Enter phone + PIN → Replace to `/(tabs)` (Home)
2. **Home** → "Amasomo" → Levels → tap level → Learn (Yiga) → tap lesson → Practice
3. **Home** → "Amasomo yose" → All Lessons (filtered)
4. **Bottom tabs** → Switch between Home, Progress, Activities, Practice, Account

### Data Flow
- All screens read from `data/mock.ts` (MOCK_USER, MOCK_LESSONS, MOCK_LEVELS, etc.)
- No state management (Redux/Zustand) – local useState only
- No persistence – app state resets on reload

---

## Improvements & New Pages

### Added Pages
1. **Registration** (`/register`) – "Ndumva nshya, tangira kwiyandikisha"
2. **Forgot PIN** (`/forgot-pin`) – "Wibagiwe PIN?" / "Saba indi PIN"
3. **Lesson Detail** (`/lesson/[id]`) – View lesson content before practice
4. **Settings** (`/settings`) – From Account
5. **Help/FAQ** (`/help`) – Ubufasha – FAQ and support
6. **About** (`/about`) – Ibitwerekeye – App info, version, links
7. **Profile** (`/profile`) – Guhindura amakuru – Edit name, phone

### Recommended Future Improvements
- **Firebase** – Auth (phone), Firestore for lessons/progress
- **State** – Zustand or React Context for user/session
- **Audio** – expo-av for pronunciation / instructions
- **Images** – Replace emoji placeholders with real lesson images
- **Error handling** – Loading/error states on screens
- **Auth flow** – Guard routes; redirect to login if not authenticated
