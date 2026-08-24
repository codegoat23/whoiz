# PostHog Data Warehouse — Setup Report

## Summary

Three data sources were detected in this project. Credential collection was cancelled, so all three sources need to be connected manually via the PostHog app. No source code changes were made.

## Sources

### PostgreSQL

- **Status:** Needs browser setup (credentials not provided)
- **Detected via:** `pg` in `package.json`; `DATABASE_URL` present in `.env`
- **Connect URL:** https://us.i.posthog.com/project/573936/data-warehouse/new-source?kind=Postgres&utm_source=wizard&utm_campaign=warehouse-source

**Pre-flight notes:**
- The host must be publicly reachable from the internet — `localhost` and private IPs (10.x, 192.168.x, 172.16–31.x) will be rejected by PostHog.
- If using Supabase, use the **Session pooler** host (`aws-0-<region>.pooler.supabase.com`), port `6543`, and username `postgres.<project-ref>`. The password is the database password (Settings → Database), not the anon/service_role JWT key.
- If the database is not publicly reachable, enable the SSH tunnel option in the setup form.

---

### Resend

- **Status:** Needs browser setup (credentials not provided)
- **Detected via:** `resend` in `package.json`; `RESEND_API_KEY` present in `.env`
- **Connect URL:** https://us.i.posthog.com/project/573936/data-warehouse/new-source?kind=Resend&utm_source=wizard&utm_campaign=warehouse-source

**Pre-flight notes:**
- The `RESEND_API_KEY` in your `.env` is likely a send-only key. The data warehouse import requires a **full-access API key** with read access to Audiences, Broadcasts, Contacts, Domains, and Emails.
- Create a full-access key at [resend.com/api-keys](https://resend.com/api-keys) before connecting.

---

### MailerSend

- **Status:** Needs browser setup (credentials not provided)
- **Detected via:** `MAILERSEND_SMTP_HOST` in `.env` (no API token found)
- **Connect URL:** https://us.i.posthog.com/project/573936/data-warehouse/new-source?kind=MailerSend&utm_source=wizard&utm_campaign=warehouse-source

**Pre-flight notes:**
- You need a MailerSend **API token** (not the SMTP credentials). Create one at [app.mailersend.com/api-tokens](https://app.mailersend.com/api-tokens).
- Grant the token read access to: Email (for activity events), Domains, Recipients, and Templates.
- Note: MailerSend retains email activity for 1–30 days depending on your plan, so the activity table only backfills as far as that retention window on first sync.

---

## Files Modified or Created

| File | Action |
|------|--------|
| `posthog-warehouse-report.md` | Created (this report) |

No application source files were modified.

## Next Steps

1. **Open each Connect URL** above in your browser while logged into PostHog.
2. **Enter the credentials** for each source in the PostHog UI.
3. **Select the tables** you want to sync and choose a sync schedule.
4. PostHog will begin importing data; the first sync may take several minutes depending on table size.
