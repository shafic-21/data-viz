
# Resakss-Data-Viz 📊✨

*(A visual exploration of Africa’s agricultural data, built with Next .js & D3 — and dripping with Tailwind-powered style.)*

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Built with Next.js](https://img.shields.io/static/v1?label=Next.js\&message=app-router\&color=black\&logo=nextdotjs\&logoColor=white)

---

## 🚀  What is this?

**Resakss-Data-Viz** turns raw ReSAKSS Excel sheets into eye-candy: an interactive bubble map + slick line graphs that let you compare up to five regions or countries at once. It’s designed for speed, clarity, and a *chef’s-kiss* developer experience.

*Why should you care?*
Because staring at CSV tables is boring; dragging vibrant bubbles around is not.

---

## ✨  Highlights

| 💎 Feature                   | 🔥 Why it rocks                                                           |
| ---------------------------- | ------------------------------------------------------------------------- |
| **Bubble-force chart**       | Drag-and-drop, physics-based layout for instant context                   |
| **On-the-fly compare mode**  | Flip a switch, add up to five regions/countries, and watch the lines race |
| **Dark-mode first**          | Colors auto-swap thanks to CSS custom-props                               |
| **Radix + shadcn/ui**        | Accessible, headless components that look stellar out of the box          |
| **State handled by Zustand** | Predictable, minimal-boilerplate global stores                            |
| **Sonner toasts**            | Non-intrusive feedback that never clutters your view                      |
| **100 % TypeScript**         | Strong types from the API layer to the last UI pixel                      |

---

## 🏗  Tech stack

* **Next.js (app router)** — React 18, server actions, the works
* **TypeScript** — type-safe from utils to components
* **Tailwind CSS v4** — JIT, arbitrary values, dark-mode class
* **D3 + Recharts** — custom force-simulation meets production-ready charts
* **Radix UI + shadcn/ui** — accessible building blocks
* **Zustand** — ergonomic state management
* **Sonner** — delightful toasts

---

## 📂  Project layout (tl;dr)

````
data-viz/
├─ app/          # Next.js app-router pages & global layout
├─ components/   # Reusable UI (BubbleChart, LineGraph, Sidebar…)
├─ store/        # Zustand stores
├─ constants/    # Shared look-ups and color palettes
└─ utils/        # Data wrangling helpers
``` :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}

---

## 🛠  Getting started

1. **Clone & install**

   ```bash
   git clone https://github.com/your-handle/resakss-data-viz.git
   cd data-viz
   pnpm install # or yarn / npm
````

2. **Run dev server**

   ```bash
   pnpm dev
   # Visit http://localhost:3000
   ```

3. **Import data**

   Drop a ReSAKSS-formatted Excel file via the UI or tweak `constants/resakssData` to point at your sheet.

---

## 📸  Screenshots

| Bubble chart            | Compare mode            |
| ----------------------- | ----------------------- |
| *(add GIF or PNG here)* | *(add GIF or PNG here)* |

---

## 🗺️  Roadmap

* [ ] CSV/JSON drag-and-drop alongside XLSX
* [ ] Mobile pinch-to-zoom gestures
* [ ] Server-side data caching with Edge Functions
* [ ] i18n (EN / FR / PT)

---

## 🤝  Contributing

1. Fork the repo 🍴
2. Create your feature branch (`git checkout -b feat/amazing`)
3. Commit & push (`git commit -m "feat: add amazing"` → `git push origin`)
4. Open a PR — GitHub Actions will lint & type-check automatically.

> **Pro-tip:** keep commits atomic; prettier & ESLint configs are already included.

---

## 📝  License

MIT © 2025 **Shafic Zziwa**.
Pull requests and issues are welcome — just keep them classy. 😉

---

Made with ☕, 💻, and a stubborn refusal to accept boring data.
