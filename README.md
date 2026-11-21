# LearnKannada.ai: Frontend

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) ![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?logo=capacitor&logoColor=white)

**Learn Kannada, speak culture.** The web and mobile frontend for LearnKannada.ai, an app for learning Kannada from English, Hindi, Tamil, Telugu and other languages, with AI-powered lessons, interactive quizzes, pronunciation guides and cultural content.

## Features

- Lessons page with structured Kannada lessons
- Interactive quizzes
- Progress tracking
- Welcome screen, user profile and community feed
- Responsive UI that can be packaged as an Android or iOS app with Capacitor

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React, TypeScript, Vite |
| UI | Tailwind CSS, shadcn/ui (Radix UI) |
| Forms | React Hook Form, Zod |
| Mobile | Capacitor (Android and iOS) |

## Getting started

```bash
npm install
npm run dev
```

### Build for mobile

```bash
npm run build
npx cap sync
npx cap open android   # or: npx cap open ios
```

## Related

The backend API (authentication and progress tracking) is in [LearnKannada](https://github.com/shridhar618/LearnKannada).
