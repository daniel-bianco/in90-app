# in90 – Telegram Mini-App

**in90** is a minimalist productivity app that allows you to create sessions with tasks and track their completion with a timer. Supports categories (fields) to organize tasks by activity type.


## Features

- Home page with an overview of all categories and sessions.
- Create new sessions (up to 5 tasks per session).
- Timer for each task.
- Categories (fields) to organize sessions by activity type.
- Dark and light theme, detected automatically.
- Local storage via `localStorage`.



## Project Structure
/pages
├─ index.tsx        # Home page
├─ sessions.tsx     # All sessions page
└─ fields/[id].tsx  # Single category page
/components
└─ Page.tsx         # Page wrapper component
/utils
└─ haptics.ts       # Haptic feedback function


