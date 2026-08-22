"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export default function WhoizFooter() {
  return (
    <footer className="relative w-full mt-24 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-8 sm:gap-10">

        {/* Divider glow line */}
        <FadeUp delay={0} duration={0.6}>
          <div className="h-px w-full" />
        </FadeUp>

        {/* Big brand */}
        <FadeUp delay={0.1} duration={0.6} className="text-center leading-none flex justify-center items-center">
          <Image
            src="/logos/logo3.svg"
            alt="WHOIZ"
            width={500}
            height={80}
            priority
            className="h-30 sm:h-10 md:h-12 lg:h-100 w-auto object-contain"
          />
        </FadeUp>

        {/* Navigation */}
        <StaggerContainer stagger={0.05} delay={0.2} className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-orange-100/70">
          {[
            { label: "Home", href: "/" },
            { label: "FAQ", href: "/#faq" },
            { label: "Login", href: "/auth/login" },
            { label: "Sign up", href: "/auth/signup" },
          ].map((item) => (
            <StaggerItem key={item.label} variant="fadeUp" duration={0.4}>
              <Link className="hover:text-orange-300 transition" href={item.href}>
                {item.label}
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom micro line */}
        <FadeUp delay={0.4} duration={0.5}>
          <div className="mt-6 text-center text-xs text-orange-100/40">
            &copy; {new Date().getFullYear()}
          </div>
        </FadeUp>
      </div>
    </footer>
  );
}
