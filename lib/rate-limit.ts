interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * Returns true if the request is allowed, false if it exceeds
 * `limit` requests within `windowMs`. State lives in the process
 * memory, so it is per-instance and resets on restart — sufficient
 * for single-instance deployments.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}
