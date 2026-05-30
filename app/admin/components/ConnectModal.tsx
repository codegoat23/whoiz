"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

const ICONS: Record<string, any> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  github: FaGithub,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  x: SiX,
};

type Link = {
  id: string;
  platform: string;
  url: string;
};

export default function ConnectModal({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-full bg-black/60 text-white text-[11px]
        backdrop-blur-md hover:scale-105 active:scale-95 transition"
      >
        🌐 let’s connect
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* 🌫️ BACKDROP (slow dissolve) */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.6 } },
                exit: { opacity: 0, transition: { duration: 0.4 } },
              }}
              onClick={() => setOpen(false)}
            />

            {/* 🫧 PANEL (FLOATING LIQUID ENTRY) */}
            <motion.div
              className="relative w-[340px] rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.92,
                  y: 50,
                  rotateX: 10,
                },
                show: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 18,
                    mass: 1.2,
                  },
                },
                exit: {
                  opacity: 0,
                  scale: 0.94,
                  y: 40,
                  transition: { duration: 0.4 },
                },
              }}
              style={{ transformPerspective: 1000 }}
            >
              {/* 🌊 subtle breathing float */}
              <motion.div
                className="p-6 relative"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* CLOSE */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>

                {/* TITLE */}
                <h2 className="text-white text-sm text-center mb-5 font-light tracking-wide">
                  Connect with me
                </h2>

                {/* ICONS (staggered like bubbles) */}
                <div className="grid grid-cols-3 gap-5">
                  {links.map((link, i) => {
                    const Icon = ICONS[link.platform];
                    if (!Icon) return null;

                    return (
                      <motion.button
                        key={link.id}
                        onClick={() => window.open(link.url, "_blank")}
                        className="flex flex-col items-center gap-1 text-white/90"
                        initial={{ opacity: 0, scale: 0.4, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: i * 0.12,
                          type: "spring",
                          stiffness: 120,
                          damping: 14,
                        }}
                        whileHover={{
                          scale: 1.12,
                          y: -3,
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon size={26} />
                        <span className="text-[10px] opacity-60">
                          {link.platform}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}