import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let initialized = false;

export function initPostHog() {
  if (typeof window === "undefined" || !POSTHOG_KEY || initialized) return;
  initialized = true;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: {
      dom_event_allowlist: ["click", "submit"],
      url_allowlist: [".*"],
    },
    session_recording: false,
    bootstrap: {
      distinctID: "anonymous",
    },
  });
}

export default posthog;
