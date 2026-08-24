import { initPostHog, default as posthog } from "@/lib/posthog";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

function capture(event: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY) return;
  initPostHog();
  posthog.capture(event, properties);
}

export function trackSignupCompleted() {
  capture("signup_completed");
}

export function trackOnboardingCompleted() {
  capture("onboarding_completed");
}

export function trackProfileCreated() {
  capture("profile_created");
}

export function trackProfilePublished() {
  capture("profile_published");
}

export function trackThemeSelected(theme: string) {
  capture("theme_selected", { theme });
}

export function trackSocialLinkAdded(platform: string) {
  capture("social_link_added", { platform });
}

export function trackPreviewOpened() {
  capture("profile_preview_opened");
}

export function trackProfileViewed(username: string) {
  capture("profile_viewed", { username });
}

export function trackProfileUpdated() {
  capture("profile_updated");
}

export function trackProfileDeleted() {
  capture("profile_deleted");
}

export function posthogReset() {
  if (!POSTHOG_KEY) return;
  initPostHog();
  posthog.reset();
}
