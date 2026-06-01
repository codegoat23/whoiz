import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}