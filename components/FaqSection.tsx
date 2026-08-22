"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { FadeUp } from "@/components/motion-wrapper";

const faqs = [
  {
    question: "What is WHOIZ?",
    answer:
      "WHOIZ is your all-in-one digital identity platform. Create a beautiful profile page that showcases your links, socials, projects, and story — all in one place.",
  },
  {
    question: "Is WHOIZ free to use?",
    answer:
      "Yes. You can create your profile, add links, and customize your theme for free. Premium features may be available in the future.",
  },
  {
    question: "How do I claim my username?",
    answer:
      "Head to the homepage, type your desired username, and hit Create. If it's available, you'll be guided through signup to lock it in.",
  },
  {
    question: "Can I use my own custom background?",
    answer:
      "Absolutely. Go to Dashboard → Themes → Custom and upload your own image. It'll be applied to your public profile card instantly.",
  },
  {
    question: "Will people see my email or personal info?",
    answer:
      "No. Only what you choose to display is public. Your email, password, and account details are always kept private.",
  },
  {
    question: "Can I change my username later?",
    answer:
      "Yes. You can update your username from Dashboard → Settings. Keep in mind your old URL will no longer work after the change.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <FadeUp delay={0} duration={0.6}>
        <h2 className="text-4xl sm:text-7xl font-bold text-center text-white mb-3">
         Questions? Answered
        </h2>
        <p className="text-center text-white/50 text-sm sm:text-base mb-10 max-w-lg mx-auto">
         
        </p>
      </FadeUp>

      <FadeUp delay={0.15} duration={0.6}>
      <Accordion type="single" collapsible className="space-y-3">
  {faqs.map((faq, i) => (
    <AccordionItem
      key={i}
      value={`item-${i}`}
      className="
        group relative overflow-hidden rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-md
        px-5 py-5
        transition-all duration-300
        hover:border-white/20
      "
    >
      {/* Inner black hover layer */}
      <div
        className="
          pointer-events-none absolute inset-1 rounded-[20px]
          bg-black/0
          transition-all duration-300
          group-hover:bg-black/60
        "
      />

      {/* Content stays above hover layer */}
      <div className="relative z-10">
        <AccordionPrimitive.Trigger
          className="
            group/trigger flex w-full items-center justify-between
            gap-4 py-4 text-left
            text-sm sm:text-base font-medium text-white/90
            outline-none transition-colors
            [&[data-state=open]>svg]:rotate-180
          "
        >
          {faq.question}

          <ChevronDown
            className="
              h-4 w-4 shrink-0 text-white/40
              transition-transform duration-300
            "
          />
        </AccordionPrimitive.Trigger>

        <AccordionContent
          className="
            text-sm sm:text-[15px]
            leading-relaxed text-white/55 pb-5
          "
        >
          {faq.answer}
        </AccordionContent>
      </div>
    </AccordionItem>
  ))}
</Accordion>
      </FadeUp>
    </section>
  );
}
