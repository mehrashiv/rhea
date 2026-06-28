import { createBrowserClient } from "@insforge/sdk/ssr";

// createBrowserClient stores the session in first-party cookies on this
// app's own domain and refreshes it via /api/auth/refresh (see that route
// and lib/auth-actions.ts). The plain createClient() relied on a cookie set
// by the InsForge backend's own (different) domain, which browsers treat as
// a third-party cookie and drop — that's why sessions didn't survive a
// refresh.
export const insforge = createBrowserClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
});
