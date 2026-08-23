"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, ExternalLink, Paintbrush, Shield, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { isAdminEmail } from "@/lib/admin-utils";

interface UserWithUsername {
  username?: string | null;
}

interface UserWithEmail {
  email?: string | null;
}

// Custom WHOIZ logo mark icon for the 'connect' tab matching screenshot
function WhoizLogoIcon({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 447 447"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5.5 transition-all duration-200", className)}
    >
      <path
        d="M60.9304 0C61.3201 0 61.515 0 61.7014 0.00115967Q63.1627 0.0102402 64.6217 0.0904422Q66.0808 0.170644 67.5342 0.321778Q68.9876 0.472911 70.432 0.694617Q71.8763 0.916324 73.3081 1.20808Q74.74 1.49983 76.1559 1.86094Q77.5719 2.22205 78.9685 2.65166Q80.3652 3.08127 81.7393 3.57836Q83.1134 4.07545 84.4617 4.63884Q85.81 5.20223 87.1292 5.83059Q88.4485 6.45894 89.7356 7.15078Q91.0227 7.84261 92.2746 8.59628Q93.5265 9.34995 94.7402 10.1637Q95.954 10.9774 97.1267 11.8492Q98.2993 12.7211 99.4282 13.6489Q100.557 14.5768 101.639 15.5586Q102.722 16.5403 103.755 17.5736Q104.788 18.6068 105.77 19.6892Q106.752 20.7715 107.68 21.9004Q108.608 23.0292 109.479 24.2019Q110.351 25.3746 111.165 26.5883Q111.979 27.802 112.732 29.0539Q113.486 30.3058 114.178 31.593Q114.87 32.8801 115.498 34.1993Q116.126 35.5186 116.69 36.8669Q117.253 38.2151 117.75 39.5893Q118.247 40.9634 118.677 42.36Q119.107 43.7567 119.468 45.1727Q119.829 46.5886 120.121 48.0204Q120.412 49.4523 120.634 50.8966Q120.856 52.3409 121.007 53.7944Q121.158 55.2478 121.238 56.7068Q121.318 58.1659 121.327 59.6271C121.329 59.8136 121.329 60.0085 121.329 60.3982L121.329 119.464C126.617 91.7314 150.99 70.775 180.264 70.775L181.061 70.775C214.202 70.775 241.061 97.6334 241.061 130.775L241.061 191.571L241.593 191.571C241.593 207.435 238.468 223.143 232.398 237.798C226.327 252.454 217.429 265.77 206.212 276.987C194.995 288.204 181.679 297.102 167.023 303.173C152.368 309.243 136.66 312.368 120.796 312.368C104.933 312.368 89.2253 309.243 74.5696 303.173C59.9139 297.102 46.5975 288.204 35.3805 276.987C24.1635 265.77 15.2657 252.454 9.19507 237.798C3.12447 223.143 0 207.435 0 191.571L0.532143 191.571L0.532143 60.3982C0.532143 60.0085 0.532143 59.8136 0.533302 59.6272Q0.542383 58.1659 0.622585 56.7069Q0.702787 55.2478 0.85392 53.7944Q1.00505 52.341 1.22676 50.8966Q1.44847 49.4523 1.74022 48.0205Q2.03197 46.5886 2.39308 45.1727Q2.75419 43.7567 3.1838 42.3601Q3.61341 40.9634 4.1105 39.5893Q4.60759 38.2152 5.17098 36.8669Q5.73437 35.5186 6.36273 34.1993Q6.99109 32.8801 7.68292 31.593Q8.37475 30.3059 9.12842 29.054Q9.88209 27.8021 10.6958 26.5883Q11.5095 25.3746 12.3814 24.2019Q13.2532 23.0292 14.1811 21.9004Q15.109 20.7716 16.0907 19.6892Q17.0725 18.6069 18.1057 17.5736Q19.139 16.5403 20.2213 15.5586Q21.3037 14.5769 22.4325 13.649Q23.5614 12.7211 24.734 11.8492Q25.9067 10.9774 27.1204 10.1637Q28.3342 9.34996 29.5861 8.59629Q30.838 7.84262 32.1251 7.15079Q33.4122 6.45895 34.7314 5.83059Q36.0507 5.20224 37.399 4.63884Q38.7473 4.07545 40.1214 3.57836Q41.4955 3.08127 42.8922 2.65166Q44.2888 2.22205 45.7048 1.86094Q47.1207 1.49983 48.5526 1.20808Q49.9844 0.916323 51.4287 0.694615Q52.8731 0.472908 54.3265 0.321774Q55.7799 0.170639 57.239 0.0904364Q58.698 0.0102334 60.1593 0.00115204C60.3457 0 60.5406 0 60.9304 0ZM34.0572 178.268C34.0572 166.512 43.5871 156.982 55.3429 156.982C67.0986 156.982 76.6286 166.512 76.6286 178.268C76.6286 190.024 67.0986 199.554 55.3429 199.554C43.5871 199.554 34.0572 190.024 34.0572 178.268ZM188.379 156.982C176.623 156.982 167.093 166.512 167.093 178.268C167.093 190.024 176.623 199.554 188.379 199.554C200.134 199.554 209.664 190.024 209.664 178.268C209.664 166.512 200.134 156.982 188.379 156.982Z"
        fill={isActive ? "#FF6900" : "#4B5563"}
        fillRule="evenodd"
        transform="translate(102.704 67.316)"
      />
    </svg>
  );
}

// Rounded square icon for the 'showcase' tab matching screenshot
function ShowcaseIcon({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isActive ? "#FF6900" : "#4B5563"}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5 transition-colors duration-200", className)}
    >
      <rect width="18" height="18" x="3" y="3" rx="4" />
    </svg>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as UserWithUsername & UserWithEmail | undefined;
  const username = user?.username;

  if (pathname.startsWith("/admin/monitoring")) {
    return null;
  }

  const isAdmin = user?.email ? isAdminEmail(user.email) : false;

  const isConnectActive =
    pathname === "/admin/connect" ||
    pathname.startsWith("/admin/connect");

  const isLinksActive =
    pathname === "/admin/links" || pathname.startsWith("/admin/links");

  const isShowcaseActive =
    pathname === "/admin/showcase" || pathname.startsWith("/admin/showcase");

  const isDesignActive =
    pathname === "/admin/themes" || pathname.startsWith("/admin/themes");

  return (
    <>
      {/* Admin/Profile Toggle - floating above bottom nav */}
      {isAdmin && (
        <div className="fixed bottom-[80px] left-0 right-0 z-50 flex justify-center px-3 pointer-events-none sm:bottom-[88px] sm:px-4">
          <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-white/90 backdrop-blur-xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            <Link
              href="/admin/monitoring"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 text-zinc-500 hover:text-zinc-800"
            >
              <Shield className="size-3" />
              Admin
            </Link>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#FF5800] text-white shadow-md shadow-orange-500/25">
              <Home className="size-3" />
              Profile
            </span>
          </div>
        </div>
      )}

      <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none md:hidden sm:bottom-4 sm:px-4">
        <nav
          role="navigation"
          aria-label="Mobile Navigation"
          className="pointer-events-auto flex items-center justify-between w-full max-w-[420px] h-[64px] rounded-full bg-white px-2.5 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-neutral-100/90 sm:h-[72px] sm:px-3.5 sm:py-2"
        >
          {/* Navigation Tabs Container */}
          <div className="flex items-center justify-around flex-1 gap-0.5 pr-1 sm:gap-1 sm:pr-1.5">
            {/* Tab 1: Connect */}
            <Link
              href="/admin/connect"
              aria-label="Connect"
              aria-current={isConnectActive ? "page" : undefined}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all duration-200 active:scale-90 sm:gap-1"
            >
              <WhoizLogoIcon isActive={isConnectActive} />
              <span
                className={cn(
                  "text-[9px] tracking-tight transition-colors duration-200 leading-tight sm:text-[10.5px]",
                  isConnectActive
                    ? "text-black font-semibold"
                    : "text-zinc-500 font-medium"
                )}
              >
                connect
              </span>
            </Link>

            {/* Tab 2: Links */}
            <Link
              href="/admin/links"
              aria-label="Links"
              aria-current={isLinksActive ? "page" : undefined}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all duration-200 active:scale-90 sm:gap-1"
            >
              <Link2
                className={cn(
                  "size-4.5 transition-colors duration-200 sm:size-5",
                  isLinksActive ? "text-[#FF6900]" : "text-zinc-600"
                )}
                strokeWidth={2.4}
              />
              <span
                className={cn(
                  "text-[9px] tracking-tight transition-colors duration-200 leading-tight sm:text-[10.5px]",
                  isLinksActive
                    ? "text-black font-semibold"
                    : "text-zinc-500 font-medium"
                )}
              >
                Links
              </span>
            </Link>

            {/* Tab 3: Showcase */}
            <Link
              href="/admin/showcase"
              aria-label="Showcase"
              aria-current={isShowcaseActive ? "page" : undefined}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all duration-200 active:scale-90 sm:gap-1"
            >
              <ShowcaseIcon isActive={isShowcaseActive} />
              <span
                className={cn(
                  "text-[9px] tracking-tight transition-colors duration-200 leading-tight sm:text-[10.5px]",
                  isShowcaseActive
                    ? "text-black font-semibold"
                    : "text-zinc-500 font-medium"
                )}
              >
                showcase
              </span>
            </Link>

            {/* Tab 4: Design */}
            <Link
              href="/admin/themes"
              aria-label="Design"
              aria-current={isDesignActive ? "page" : undefined}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all duration-200 active:scale-90 sm:gap-1"
            >
              <Paintbrush
                className={cn(
                  "size-4.5 transition-colors duration-200 sm:size-5",
                  isDesignActive ? "text-[#FF6900]" : "text-zinc-600"
                )}
                strokeWidth={2.4}
              />
              <span
                className={cn(
                  "text-[9px] tracking-tight transition-colors duration-200 leading-tight sm:text-[10.5px]",
                  isDesignActive
                    ? "text-black font-semibold"
                    : "text-zinc-500 font-medium"
                )}
              >
                Design
              </span>
            </Link>
          </div>

          {/* Right Action: Live Preview CTA Button */}
          <a
            href={username ? `/${username}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live profile preview in a new tab"
            className="flex items-center justify-center gap-1 rounded-full bg-[#FF5800] hover:bg-[#ff6900] active:scale-[0.96] text-white px-3 py-2.5 h-10 shadow-md shadow-orange-500/25 transition-all duration-200 ml-1 shrink-0 sm:gap-1.5 sm:px-4.5 sm:py-3 sm:h-12"
          >
            <span className="text-[11px] font-semibold text-white tracking-tight whitespace-nowrap sm:text-[12px]">
              preview
            </span>
            <ExternalLink className="size-3.5 text-white stroke-[2.2] shrink-0 sm:size-4" />
          </a>
        </nav>
      </div>
    </>
  );
}
