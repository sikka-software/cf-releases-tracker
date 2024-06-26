## Prerequisites

- Cloudflare Account [Learn More](https://dash.cloudflare.com/)
- Cloudflare KV Namespace [Learn More](https://developers.cloudflare.com/workers/runtime-apis/kv)
- Cloudflare Worker [Learn More](https://workers.cloudflare.com/)
- Discord Webhook URL [Learn More](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

## Get Started

1. Update `wrangler.toml`
- Replace the worker name in line 1
- Replace `YOUR_DISCORD_WEBHOOK_URL` with your Discord Webhook URL in `wrangler.toml` file.
- Replace `YOUR_KV_HERE` with the KV id optained from Cloudflare KV Namespace

2. Update `src/index.js`
- Update the `WATCHING` array to include list of repos to be notified about. In the form of `username/repo` or `org/repo`
