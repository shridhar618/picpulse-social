# LearnKannada.ai: Frontend

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
