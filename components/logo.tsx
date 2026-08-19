// components/logo.tsx
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({
  href = "/",
  width = 100,
  height = 40,
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="WHOIZ"
      className={`inline-flex items-center ${className}`}
    >
      <Image
  src="/logos/logo-extended.svg"
  alt="WHOIZ"
  width={180}
  height={50}
  className="h-8 w-auto sm:h-10 lg:h-12 object-contain"
/>
    </Link>
  );
}