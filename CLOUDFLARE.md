# Tech Marketing Club on Cloudflare

The website runs as a Cloudflare Worker, with D1 storing email signups.

## Build and deploy

Use Node.js 22.13 or newer, then run:

```sh
npm ci
npm run build:cloudflare
npx wrangler d1 migrations apply techmarketingclub-subscribers --remote --config wrangler.jsonc
npx wrangler deploy --config dist/server/wrangler.json
```

Before the first deployment, create the `techmarketingclub-subscribers` D1 database and set its returned ID in `wrangler.jsonc`. The placeholder ID is for local development only. Rebuild after changing configuration.

The configured custom domains are `techmarketing.club` and `www.techmarketing.club`. The account must own the active Cloudflare zone.

## Cloudflare Git integration

Connect `kashvi-24/techmarketingclub`, production branch `main`.

- Build command: `npm run build:cloudflare`
- Deploy command: `npx wrangler d1 migrations apply techmarketingclub-subscribers --remote --config wrangler.jsonc && npx wrangler deploy --config dist/server/wrangler.json`
- Root directory: `/`

## Signup data

New signups are stored in the `subscribers` table. Publishing the application does not send welcome emails. Existing signups on the former hosting service need a separate data migration; deploying here does not copy them automatically.

Keep API keys, OAuth credentials, `.env` files, and local database state out of Git.

Member signup v2 collects name, email, workplace, role, city/country and an optional strength. Existing rows remain intact with null profile fields. Duplicate emails are not overwritten by unauthenticated submissions. Access records in Cloudflare dashboard → Storage & databases → D1 → techmarketingclub-subscribers → Studio → subscribers. Data stays in D1; no newsletter or welcome-email integration is configured.
