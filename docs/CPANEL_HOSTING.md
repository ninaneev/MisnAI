# Hosting Misn AI on cPanel

Misn AI is a static Vite app. It does not need Node, a backend server, Vercel, or paid hosting for the first public version.

## Build

```bash
npm install
npm run build
```

Upload the contents of `dist/` to the document root for `misn.ai`.

## DNS and Subdomain

Use the existing Flowity hosting setup:

1. Create the `misn.ai` subdomain in cPanel.
2. Point the DNS record in GoDaddy to the cPanel server, using the A record or CNAME provided by the host.
3. Set the subdomain document root to the folder where the built `dist/` files are uploaded.

## React Router Fallback

The `public/.htaccess` file is copied into `dist/` during the Vite build. It sends direct route visits such as `/settings` or `/templates` back to `index.html` so the React app can handle routing.

## No-Cost Rule

Do not add hosted AI, sync, auth, billing, or server processes to this deployment. Those belong in the private `misn-ai-cloud` repo later.
