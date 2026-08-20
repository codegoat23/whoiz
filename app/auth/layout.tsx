import { cn } from "@/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <Link
          href="/"
          className={cn(
            "relative text-sm sm:text-base tracking-wide",
            "text-orange-300 drop-shadow-[0_0_10px_rgba(249,115,22,0.35)]"
          )}
        >
          <Image
  src="/logos/logo3.svg"
  alt="WHOIZ"
  width={180}
  height={50}
  className="h-8 w-auto sm:h-10 lg:h-12 object-contain"
/>
        </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {children}
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/prodill.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}