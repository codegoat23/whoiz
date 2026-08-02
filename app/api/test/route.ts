import { NextResponse } from "next/server";

import { feedbacks } from "@/lib/data";
import { rateLimit } from "@/lib/rate-limit";
import { getApiSessionUser } from "@/lib/session";

const MAX_FEEDBACKS = 500;

// GET FEEDBACKS (internal only)
export async function GET() {
  const user = await getApiSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ feedbacks }, { status: 200 });
}

// CREATE - POST
export async function POST(req: Request) {
  const body = await req.json();

  if (typeof body.email !== "string" || !body.email.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (typeof body.content !== "string" || !body.content.trim()) {
    return NextResponse.json(
      { error: "Feedback is required" },
      { status: 400 }
    );
  }

  if (body.content.length > 2000) {
    return NextResponse.json(
      { error: "Feedback is too long" },
      { status: 400 }
    );
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!rateLimit(`feedback:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const NewFeedback = {
    id: Date.now(),
    email: body.email,
    content: body.content,
  };

  feedbacks.push(NewFeedback);

  if (feedbacks.length > MAX_FEEDBACKS) {
    feedbacks.splice(0, feedbacks.length - MAX_FEEDBACKS);
  }

  return NextResponse.json(
    { message: "FeedBack was sent successfully" },
    { status: 201 }
  );
}
