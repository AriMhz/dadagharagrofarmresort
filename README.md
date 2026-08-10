# 🌿 Dada Ghar Agro Farm Resort

> Official web application for **Dada Ghar Agro Farm Resort** — a luxury agro-tourism destination and nature retreat combining organic farming, tranquil stays, and rich cultural experiences.

---

## ✨ Features

- 🏡 **Interactive Showcase**: Dynamic landing page featuring resort highlights, agro-tourism experiences, and amenities.
- 🛏️ **Rooms & Cottages**: Comprehensive room details, amenities, pricing, and fast booking inquiry buttons.
- 📸 **Categorized Photo Gallery**: Filterable photo showcase (Rooms, Nature, Farm, Food, Activities) with modal lightbox.
- 🌾 **Agro-Tourism & Activities**: Highlights of organic farming, nature walks, bonfires, farm-to-table dining, and wellness retreats.
- 📍 **Contact & Booking**: Interactive contact form, direct phone/WhatsApp quick actions, location guide, and FAQs.
- 💬 **Floating WhatsApp CTA**: One-click direct booking inquiry for visitors.
- 📱 **Fully Responsive & Modern UI**: Built with Tailwind CSS v4, smooth animations with Motion (Framer Motion), and Lucide icons.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `bun` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dada-ghar-agro-farm-resort.git
   cd dada-ghar-agro-farm-resort
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open `http://localhost:5173` (or the port displayed in your terminal).

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite dev server with hot module replacement |
| `npm run build` | Compiles TypeScript and builds production assets to `/dist` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Type-checks code using TypeScript compiler |

---

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework preset will automatically detect **Vite**.
5. Click **"Deploy"**.

### Deploying to Netlify

1. Go to [netlify.com](https://www.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
2. Connect your GitHub account and select this repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy Site"**.

### Deploying to GitHub Pages

1. In `vite.config.ts`, set `base: '/<repository-name>/'`.
2. Build the project: `npm run build`
3. Deploy the contents of the `dist` folder to your `gh-pages` branch.

---

## 📁 Project Structure

```text
dada-ghar-agro-farm-resort/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── FloatingWhatsApp.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── lib/                # Utility helpers (cn, tailwind merge)
│   │   └── utils.ts
│   ├── pages/              # Page components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Gallery.tsx
│   │   ├── Home.tsx
│   │   └── Rooms.tsx
│   ├── App.tsx             # Root layout & route configuration
│   ├── index.css           # Global Tailwind CSS styles and theme
│   └── main.tsx            # Application entry point
├── index.html              # HTML shell
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
