# NOIR & CREMA — Cafes & Restaurants Master 3D Website Template

Zero-build, static edge WebGL showcase and conversion template engineered by **BNAVAT** (`bnavatdevs@gmail.com`) for specialty cafes, micro-roasteries, and artisanal restaurants.

## Architecture Highlights
- **Zero Build Step:** Pure Vanilla ES Modules + Three.js `r169` via ES Importmap + CSS3 (`index.html` + `vercel.json`).
- **100% Procedural 3D Scene:** Lathe-turned ceramics, dual-group espresso bar, rotating brass roaster drum, instanced bar stools, procedural canvas walnut/stone/brass textures, steam wisps, aroma motes, three-point studio lighting with `ACESFilmicToneMapping`, camera presets, and 3 raycasted hotspots.
- **Instant Conversion Flows:** 1-click WhatsApp Table Reservation Builder (with today's date default), 1-click WhatsApp menu item pre-orders in `₹`, click-to-call `tel:` links, and direct Google Maps directions.
- **Single-File Rebrandability:** Every brand string, color token, menu item, price in `₹`, hotspot note, location detail, and WhatsApp number lives in `config.js`.

---

## 3-Step Client Rebrand & Vercel Deployment SOP

### Step 1 — Update `config.js` (Under 2 Minutes)
Open `config.js` and edit:
1. `brand`: `name`, `tagline`, `shortLabel`, `currency` (`₹`), `whatsappNumber` (digits with country code, e.g., `919876543210`), `phoneDisplay`, `phoneHref`, `email`, and `copyright`.
2. `colors`: `accent` (`#ff6a1a`), `wood`, `stone`, `brass`, `surfaceDark`, `surfaceCard`, `inkLight`, and `inkMuted`.
3. `hero`, `hotspots`, `menu`, `craft`, and `location`: Update headlines, menu categories/items (`₹` amounts and badges), the 3 craft pillars (`01 / Sourcing`, `02 / Kitchen`, `03 / Space`), IST hours, street address, and `googleMapsUrl`.

### Step 2 — Verify Assets, Case Sensitivity & Interactions
1. Serve locally using any static server (e.g., `npx serve .` or VS Code Live Server).
2. Confirm zero console errors, zero `/favicon.ico` 404s, smooth mobile scrolling over the hero overlay, `Escape` key closing the hotspot drawer, and accurate pre-filled `https://wa.me/...` messages for both menu orders and table reservations.
3. Ensure all relative imports (`./`, `../`) keep exact lowercase/camelCase filenames for Linux hosting.

### Step 3 — Deploy to Vercel (`bnavatdevs`)
1. Push the repository to GitHub under `bnavatdevs`.
2. In Vercel, select **Add New Project**, import the GitHub repository, leave **Build Command** empty/default static passthrough, and click **Deploy**.
3. Verify live edge delivery, WebGL rendering, mobile layout, and WhatsApp links on iOS and Android devices.
# bnavat-cafe-roastery-3d-template
