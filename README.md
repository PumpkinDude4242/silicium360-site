# Silicium 360 — Site vitrine (Vite + React + Tailwind)

## Déploiement local
```bash
npm install
npm run dev
```
→ http://localhost:5173

## Build
```bash
npm run build
```
Le site statique est généré dans `dist/`.

## Déploiement Vercel
- Importer ce repo sur Vercel
- Build command: `npm run build`
- Output directory: `dist`
- Le fichier `vercel.json` gère la réécriture SPA vers `index.html`.
