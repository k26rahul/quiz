# Tangy Quiz Hub 🍊

A minimal, professional, and fresh quiz application designed for rapid learning and concept verification.

## Features

- **Data-Driven**: Quizzes and guides are dynamically loaded from a manifest system.
- **Consistent Design**: A unified layout across home, quiz, and guide pages.
- **Learning Mode**: Interactive quiz engine with real-time feedback.
- **Fresh & Tangy**: A vibrant yet professional aesthetic.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## Structure

- `public/data/`: JSON files containing quiz/guide content.
- `src/data/manifest.json`: The central registry for all content.
- `src/pages/`: Core page components (Home, Quiz, Guide).
- `src/components/`: Reusable UI components and logic engines.

## Contributing

To add a new quiz or guide:
1. Add your JSON data file to `public/data/`.
2. Add a new entry to `src/data/manifest.json`.
3. The app will automatically render the new content on the Hub.

---

*Stay fresh, stay tangy.*
