// GitHub API base URL
const GITHUB_API = 'https://api.github.com/repos/';

async function checkForNewReleases(env) {
	// Array of GitHub repositories to monitor
	const repositories = [
		'vercel/next.js',
		// Add more repositories as needed
	];

	// Fetch latest releases for all repositories
	for (const repo of repositories) {
		const response = await fetch(`${GITHUB_API}${repo}/releases/latest`, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				'User-Agent': 'Cloudflare-Worker',
			},
		});

		if (response.ok) {
			const release = await response.json();
			const latestVersion = release.tag_name;

			// Check if we have a new release
			const lastKnownVersion = await env.REPO_VERSIONS.get(repo);
			if (latestVersion !== lastKnownVersion) {
				// Update KV store with the new version
				await env.REPO_VERSIONS.put(repo, latestVersion);

				// Send message to Discord
				await sendDiscordNotification(env, repo, release);
			}
		}
	}
}

async function sendDiscordNotification(env, repo, release) {
	const message = {
		content: `New release for ${repo}: ${release.name} (${release.tag_name})\n${release.html_url}`,
	};

	await fetch(env.DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(message),
	});
}

export default {
	async fetch(request, env) {
		// This can be used for manual triggers or other HTTP requests
		// await checkForNewReleases(env);
		return new Response('OK', { status: 200 });
	},
	async scheduled(event, env, ctx) {
		// This function is triggered by cron schedules
		await checkForNewReleases(env);
		ctx.waitUntil(event);
	},
};
