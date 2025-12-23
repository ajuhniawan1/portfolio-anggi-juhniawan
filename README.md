# vscode-portfolio (Anggi Juhniawan)

A Visual Studio Code themed developer portfolio built with Next.js. This repo contains the source, serverless API endpoints, and helper scripts used to collect visitor logs and send Telegram notifications.

![vscode-portfolio banner](./public/img/banner.png)

## Quick Overview
- Next.js app with serverless API endpoints in `pages/api`.
- Visitor tracking that stores logs to `logs/visitors.json` and sends Telegram notifications.
- Batch notification scripts and Windows Task Scheduler helpers included in the repository.

## Environment variables
Create a `.env.local` (do NOT commit it). The project expects these environment variables:

- `NEXT_PUBLIC_GITHUB_USERNAME` — GitHub username for the GitHub page
- `NEXT_PUBLIC_GITHUB_RAW_URL` — Raw GitHub URL used for external project assets
- `DEV_TO_API_KEY` — (optional) dev.to API key for the Articles page
- `TELEGRAM_BOT_TOKEN` — Bot token from @BotFather
- `TELEGRAM_CHAT_ID` — Your Telegram chat ID (where messages will be sent)
- `BATCH_NOTIFICATION_SECRET` — Secret token protecting the batch endpoint
- `BATCH_NOTIFICATION_INTERVAL_MINUTES` — Interval for automatic batch notifications (in minutes)

See `.env.local.example` for a template.

## Development

Install and start the dev server:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

Pages and components:
- UI components: `components/`
- Pages: `pages/` (including serverless API routes in `pages/api/`)

## Visitor tracking & Telegram notifications

This project includes functionality to track visitor activity and notify you via Telegram.

- `pages/api/track-visitor.ts` — API endpoint that records each visit and (by default) sends a Telegram message for every activity.
- `lib/visitorStorage.ts` — Read/write visitor logs at `logs/visitors.json`.
- `lib/telegramService.ts` — Sends individual and batch Telegram messages.

Helper scripts included:

- `send-visitor-report.ps1` — PowerShell script to trigger a batch report manually.
- `setup-scheduled-task.ps1` — Setup Windows Task Scheduler to run `send-visitor-report.ps1` repeatedly based on `BATCH_NOTIFICATION_INTERVAL_MINUTES` from `.env.local`.
- `clear-visitor-logs.ps1` — Clear `logs/visitors.json`.
- `setup-clear-logs-task.ps1` — Create a scheduled task to clear logs daily at 22:00 (10 PM).

Logs folder:
- `logs/visitors.json` stores per-IP activity. `logs/.gitignore` is set to keep the folder but ignore JSON contents.

## Testing Telegram (local)

1. Create a bot with @BotFather and get the token.
2. Start a chat with the bot and call `https://api.telegram.org/bot<token>/getUpdates` to obtain your chat id (or use @userinfobot).
3. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env.local`.
4. Start dev server and visit pages — the app will POST to `/api/track-visitor` and send messages for activity.

## Deployment to Vercel (recommended)

Vercel expects the source repository (not just the `.next` folder) so it can run the build on deploy. Preferred options:

- GitHub Integration (recommended): push this repo to GitHub and import it into Vercel. Set environment variables in the Vercel Project Settings (copy values from `.env.local`).
- Vercel CLI: run `vercel` from your project directory — Vercel will upload source and run `npm run build`.

Notes:
- Do not commit `.env.local` to Git.
- If you rely on `pages/api/*` (the serverless functions), do NOT export static-only via `next export`.
- **Important:** Vercel serverless environment has a read-only filesystem. The visitor storage automatically falls back to in-memory mode in production, so logs will not persist between function invocations. For persistent logging in production, consider using Vercel KV, Vercel Postgres, or an external database.

### Environment Variables in Vercel

You must manually add ALL environment variables from `.env.local` to your Vercel project:

1. Dashboard → Project → Settings → Environment Variables
2. Add each variable with scope **Production** (and Preview/Development if needed)
3. Mark sensitive values (bot tokens, secrets) as **Sensitive**
4. After adding variables, trigger a **Redeploy** (uncheck "Use existing Build Cache" for first deploy after adding vars)

### Optional: Scheduled batch report on Vercel

1. Use Vercel Cron (if available) or an external cron service (EasyCron, Cron-Job.org) to POST to:

```
POST https://<your-vercel-domain>/api/send-batch-notification
Headers: Authorization: Bearer <BATCH_NOTIFICATION_SECRET>
```

2. Alternatively, use `send-visitor-report.ps1` + `setup-scheduled-task.ps1` on a Windows machine to trigger the endpoint regularly.

## Useful commands

```powershell
# Run locally
npm run dev

# Build for production
npm run build

# Test batch report (local, in PowerShell)
.\send-visitor-report.ps1
```

## Troubleshooting

- If messages don't arrive in Telegram: verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` and check server logs. In production (Vercel), check Function Logs in the Deployments tab.
- If visitor activity isn't recorded locally: ensure `logs/` exists and is writable by the process. In production (Vercel), logs use in-memory storage and don't persist.
- Image fetches from raw GitHub may timeout if GitHub is slow; ensure `NEXT_PUBLIC_GITHUB_RAW_URL` points to a public repository with images uploaded.
- If deployment fails with "Vulnerable version of Next.js detected": run `npm install next@latest` locally, commit, and push to update Next.js to a patched version.

## License / Contributing
Feel free to open issues or pull requests. Do not commit secrets.

## Support
If you'd like to support my work, you can buy me a coffee or make a small donation:

[Support me on Saweria](https://saweria.co/AJuhniawan)
