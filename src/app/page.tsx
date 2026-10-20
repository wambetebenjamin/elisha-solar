import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  BadgeCheck,
  Banknote,
  ClipboardCheck,
  Home,
  MonitorSmartphone,
  ShieldCheck,
  Sun,
  Wrench,
} from "lucide-react";
import HeroParallax from "@/components/HeroParallax";
import StatCounter from "@/components/StatCounter";
import SolutionCard from "@/components/SolutionCard";
import ProjectCard from "@/components/ProjectCard";
import SavingsCalculator from "@/components/SavingsCalculator";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { partners, processSteps, site, stats, whyElisha } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar installation in Kenya",
  description:
    "Elisha Solar designs, installs and maintains solar power systems for Kenyan homes, businesses and farms. Free site assessment, certified installers, flexible payment plans.",
};

const whyIcons = {
  home: Home,
  shield: ShieldCheck,
  warranty: BadgeCheck,
  monitor: MonitorSmartphone,
  wallet: Banknote,
} as const;

const stepIcons = [ClipboardCheck, Sun, Wrench, BatteryCharging, MonitorSmartphone] as const;

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <section className="relative isolate min-h-[640px] overflow-hidden bg-[var(--dark)]">
        <HeroParallax
          src="/images/hero-rooftop-solar-kenya.jpg"
          alt="Solar panels installed on a Kenyan home rooftop under a clear sky"
          priority
        />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl flex-col justify-center px-6 py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
              <Sun className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
              Kenya wide, Nairobi based
            </span>
            <h1 className="mt-6 font-[Roboto] text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Power your home. Power your future.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Solar systems designed around your real electricity bill, installed by certified
              Kenyan engineers, and monitored long after handover. Start with a free site
              assessment anywhere in the country.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/quote" className="btn-brand !px-7 !py-3.5 text-base">
                Get a free quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10"
              >
                View packages
              </Link>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                EPRA licensed installers
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                10 year panel warranty
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                12 to 36 month payment plans
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--dark)]/5 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" id="solutions">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our solutions"
            title="Five ways Elisha Solar powers a property"
            description="Every system is sized against your own consumption, roof space and backup needs. Nothing is sold off a shelf."
          />
          <Link href="/solutions" className="btn-ghost !py-2.5 text-sm">
            All solutions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.slug} solution={solution} index={index} />
          ))}
        </div>
      </section>

      <section className="section-tint py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="How it works"
            title="From first call to a working system in five steps"
            description="A typical home installation takes two to four weeks from assessment to handover. Nothing starts before you approve a fixed quote."
            align="center"
          />

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = stepIcons[index] ?? Sun;
              return (
                <Reveal as="li" key={step.title} delay={index * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[var(--dark)]/8 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/12">
                        <Icon className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                      </span>
                      <span className="font-[Roboto] text-2xl font-black text-[var(--dark)]/12">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-[Roboto] text-base font-bold text-[var(--dark)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--dark)]/65">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Why Elisha Solar"
          title="Built by a Kenyan team that stays after handover"
          description="We have installed across 31 counties since 2014, and every system is supported by the same crew that designed it."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyElisha.map((item, index) => {
            const Icon = whyIcons[item.icon as keyof typeof whyIcons] ?? Sun;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="card-surface h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/12">
                    <Icon className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-[Roboto] text-base font-bold text-[var(--dark)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--dark)]/65">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
          <div className="flex flex-col justify-between rounded-2xl bg-[var(--dark)] p-6 text-white">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                Free assessment
              </p>
              <p className="mt-3 font-[Roboto] text-xl font-bold leading-snug">
                We will visit, measure and quote. No obligation, no charge.
              </p>
            </div>
            <Link href="/quote" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
              Book a visit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tint py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Savings calculator"
            title="See what your bill could become"
            description="Move the slider to your average KPLC bill. The estimate updates instantly using our standard design assumptions."
          />
          <div className="mt-10">
            <SavingsCalculator />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Project showcase"
            title="Recent installs across Kenya"
            description="Homes, farms and businesses that now run on their own roofs."
          />
          <Link href="/projects" className="btn-ghost !py-2.5 text-sm">
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say after the first year"
            description="Measured outcomes, not marketing promises. Names are shortened at our clients' request."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08} className="h-full">
                <figure className="card-surface flex h-full flex-col p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#1f8b4a]">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Verified client
                  </span>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--dark)]/75">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-[var(--dark)]/8 pt-4">
                    <p className="text-sm font-bold text-[var(--dark)]">{testimonial.name}</p>
                    <p className="text-xs text-[var(--dark)]/55">
                      {testimonial.role}, {testimonial.location}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[var(--dark)]/45">
            Equipment we install and support
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-full border border-[var(--dark)]/10 bg-white px-5 py-3 text-center"
              >
                <p className="font-[Roboto] text-sm font-bold text-[var(--dark)]">
                  {partner.name}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-[var(--dark)]/45">
                  {partner.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-4">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--dark)] px-8 py-14 text-center text-white">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-[Roboto] text-3xl font-black leading-tight sm:text-4xl">
              Ready to see your own numbers?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              Book a free assessment in {site.headquarters} or anywhere we cover. We will measure
              your roof, read your bills and give you a fixed price in writing.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/quote" className="btn-brand !px-7 !py-3.5 text-base">
                Get a free quote
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <Image
            src="/images/gallery-rooftop-palms.jpg"
            alt=""
            width={500}
            height={375}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-0 hidden w-72 rounded-2xl opacity-20 lg:block"
          />
        </div>
      </section>
    </>
  );
}
