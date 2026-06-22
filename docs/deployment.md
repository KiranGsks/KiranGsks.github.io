# Deployment guide

Use this when you are ready to put the app on your hosted website.

## 1. Build

```bash
cd unipdi-app
npm install
npm run build
```

Output folder: **`dist/`** (upload these files only).

## 2. Choose your URL shape

### Root domain

- URL: `https://example.com/`
- `vite.config.ts`: keep default `base: '/'` (or omit `base`)
- Upload `dist/*` to the web root

### Subfolder

- URL: `https://example.com/my-app/`
- In `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/my-app/',
})
```

- Run `npm run build` again
- Upload into the host’s `my-app` directory

## 3. SPA routing (required)

This app uses **client-side routes** (`/new/year`, `/existing/registration`, etc.). The server must return `index.html` for unknown paths so React Router can run.

### Netlify

Create `public/_redirects` before building:

```text
/*    /index.html   200
```

Vite copies `public/` into `dist/` on build.

### Vercel

Connect the Git repo or deploy the `dist` folder. Vercel usually detects Vite; if needed, add `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Apache (.htaccess in same folder as index.html)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

If using a subfolder, set `RewriteBase /my-app/`.

### nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 4. HTTPS

Use your host’s free SSL (Let’s Encrypt). The app has no special HTTPS requirements.

## 5. Verify after deploy

- [ ] Home page loads
- [ ] New vehicle: complete year → trim → confirm → air setup
- [ ] Registration lookup: `ABC123` works
- [ ] Refresh on `/new/year` does not 404
- [ ] Tablet / phone layout looks acceptable

## 6. Future: API on another domain

When you add a backend:

- Configure CORS on the API for your site origin
- Replace `src/data/*.ts` with `fetch` in `src/api/`
- Keep the same `Vehicle` type in `src/types/vehicle.ts`

No deployment change is required for a separate API URL unless you use environment variables (e.g. `VITE_API_URL` in `.env.production`).
