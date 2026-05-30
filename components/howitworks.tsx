import React from "react";

type Step = {
  step: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    step: "01",
    title: "Claim your WHOIZ",
    description:
      "Choose your username and secure your identity. This becomes your one universal link.",
  },
  {
    step: "02",
    title: "Add what matters",
    description:
      "Links, socials, events, contact — build a profile that actually represents you.",
  },
  {
    step: "03",
    title: "Share everywhere",
    description:
      "One link. Anywhere you exist online. Let people understand you instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-neutral-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Build your identity in{" "}
            <span className="text-red-500">minutes</span>
          </h2>
          <p className="mt-4 text-sm text-neutral-400">
            No complexity. No noise. Just you.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative rounded-2xl bg-neutral-900 p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Step number */}
              <span className="absolute -top-4 left-6 rounded-full bg-red-600 px-4 py-1 text-sm font-semibold">
                {step.step}
              </span>

              <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a
            href="/signup"
            className="inline-block rounded-full bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Get started for free →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
