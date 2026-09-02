import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative grid min-h-svh place-items-center bg-[#09090b] overflow-hidden px-6">
      {/* Ambient Orange Glow */}
      <div className="pointer-events-none absolute top-[-120px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full " />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {/* WHOIZ Logo */}
        <div className="relative">
          <Image
            src="/logos/logo2.svg"
            alt="WHOIZ"
            width={80}
            height={80}
            className="w-20 h-20 "
            priority
          />
        </div>

        {/* 404 */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-white">
            4
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              0
            </span>
            4
          </h1>

          <p className="text-base sm:text-lg text-gray-400 font-medium">
            This page doesn&apos;t exist.
          </p>
        </div>

        {/* Back Home Button */}
        <Link
          href="/"
          className="group relative mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 px-7 py-3 text-sm font-semibold text-white  transition hover:scale-[1.04]  active:scale-[0.98]"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
}
