import {
  BadgeDollarSign,
  Route,
  ShieldCheck,
  Truck,
  Undo2,
  UserRoundCheck,
} from "lucide-react";

const faq = [
  {
    icon: UserRoundCheck,
    question: "Why did we build Whoiz?",
    answer:
      "Because sharing yourself online shouldn’t feel complicated or messy. Whoiz exists to help you show up confidently with one simple link that truly represents who you are.",
  },
  {
    icon: Route,
    question: "What does having a Whoiz link change for me?",
    answer:
      "It gives you clarity. Instead of sending many links or explaining yourself again and again, you share one link — and people instantly understand who you are and what you do.",
  },
  {
    icon: ShieldCheck,
    question: "Can I trust Whoiz with my identity?",
    answer:
      "Yes. We treat your identity with respect. You stay in control of what you share, how you appear, and when you make changes. Your page is yours — always.",
  },
  {
    icon: Truck,
    question: "What if I’m still figuring myself out?",
    answer:
      "That’s okay. Whoiz is made for growth. You can change your links, your focus, and your story anytime — your page evolves as you do.",
  },
  {
    icon: BadgeDollarSign,
    question: "Do I need to pay to feel professional?",
    answer:
      "No. Whoiz is free to start, because everyone deserves a clean and professional presence online, regardless of where they are in their journey.",
  },
  {
    icon: Undo2,
    question: "Who is Whoiz really for?",
    answer:
      "For creators, builders, dreamers, and anyone who wants to be taken seriously online — even before they feel fully ready.",
  },
];



const FAQ = () => {
  return (
    <section className="w-full py-20">
      <div className="mx-auto w-full max-w-4xl px-6">
        <h2 className="text-4xl md:text-5xl leading-[1.15] font-semibold tracking-[-0.035em] text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-xl text-center text-muted-foreground">
          Quick answers to common questions about our products and services.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div
              key={question}
              className="w-full rounded-xl border p-6 box-border"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 mb-2 text-[1.35rem] font-semibold tracking-[-0.02em]">
                {question}
              </div>
              <p className="text-foreground/70 break-words">
                {answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;