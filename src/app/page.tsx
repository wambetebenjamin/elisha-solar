import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Banknote, ShieldCheck } from "lucide-react";
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
  home: HomeIcon,
  shield: ShieldIcon,
  warranty: BadgeIcon,
  monitor: MonitorIcon,
  wallet: WalletIcon,
} as const;

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M10 21v-5.5h4V21" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4.5 6v6c0 4.5 3 7.6 7.5 9 4.5-1.4 7.5-4.5 7.5-9V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-2 7 5.5-2.8L17.5 21l-2-7" />
      <path d="m9.8 9 1.6 1.6L14.4 7.6" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
      <path d="m6.5 12 3-3 2.5 2.5L15.5 7l2 2" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="13" rx="2" />
      <path d="M2.5 10h19" />
      <circle cx="17" cy="14.5" r="1.2" />
    </svg>
  );
}

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:pb-20 lg:pt-16">
          <div>
            <p className="eyebrow">Kenya wide, Nairobi based</p>
            <h1 className="mt-6 font-[Roboto] text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[3.4rem] lg:text-[3.9rem]">
              Power your home.
              <br />
              Power your future.
            </h1>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-[1.7] text-muted">
              Solar systems designed around your real electricity bill, installed by certified
              Kenyan engineers, and monitored long after handover. Start with a free site
              assessment anywhere in the country.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/quote" className="btn-brand !px-6 !py-3.5">
                Get a free quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/solutions" className="btn-ghost !px-6 !py-3.5">
                View packages
              </Link>
            </div>

            <ul className="mt-12 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
              {[
                { icon: BadgeCheck, label: "EPRA licensed installers" },
                { icon: ShieldCheck, label: "10 year panel warranty" },
                { icon: Banknote, label: "12 to 36 month plans" },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
                  <span className="text-[12.5px] leading-snug text-muted">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-line sm:aspect-[16/11] lg:aspect-[4/4.35]">
              <HeroParallax
                src="/images/hero-rooftop-solar-kenya.jpg"
                alt="Solar panels installed on a Kenyan home rooftop under a clear sky"
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
            <div className="absolute bottom-4 left-4 max-w-[15rem] border border-line border-l-2 border-l-brand-ink bg-white px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-ink">
                Live systems
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-ink">
                Monitored across 31 counties, every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20" id="solutions">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our solutions"
            index="01"
            title="Five ways Elisha Solar powers a property"
            description="Every system is sized against your own consumption, roof space and backup needs. Nothing is sold off a shelf."
          />
          <Link href="/solutions" className="link-rule text-[13px]">
            All solutions
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.slug} solution={solution} index={index} />
          ))}
        </div>
      </section>

      <section className="section-tint border-y border-line py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="How it works"
            index="02"
            title="From first call to a working system in five steps"
            description="A typical home installation takes two to four weeks from assessment to handover. Nothing starts before you approve a fixed quote."
          />

          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.06}>
                <div className="border-t-2 border-ink pt-4">
                  <span className="tnum font-[Roboto] text-[13px] font-bold tracking-[0.1em] text-brand-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-[Roboto] text-[0.9375rem] font-bold leading-snug text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Why Elisha Solar"
          index="03"
          title="Built by a Kenyan team that stays after handover"
          description="We have installed across 31 counties since 2014, and every system is supported by the same crew that designed it."
        />
        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {whyElisha.map((item, index) => {
            const Icon = whyIcons[item.icon as keyof typeof whyIcons] ?? BadgeIcon;
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="border-t border-line pt-5">
                  <Icon className="h-6 w-6 text-brand-ink" />
                  <h3 className="mt-4 font-[Roboto] text-[1.0625rem] font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.7] text-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
          <div className="flex flex-col justify-between border-t-2 border-brand-ink bg-brand-soft p-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink">
                Free assessment
              </p>
              <p className="mt-3 font-[Roboto] text-[1.0625rem] font-bold leading-snug text-ink">
                We will visit, measure and quote. No obligation, no charge.
              </p>
            </div>
            <Link href="/quote" className="link-rule mt-6 self-start text-[13px]">
              Book a visit
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tint border-y border-line py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Savings calculator"
            index="04"
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
            index="05"
            title="Recent installs across Kenya"
            description="Homes, farms and businesses that now run on their own roofs."
          />
          <Link href="/projects" className="link-rule text-[13px]">
            All projects
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-light py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Testimonials"
            index="06"
            title="What clients say after the first year"
            description="Measured outcomes, not marketing promises. Names are shortened at our clients' request."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.06} className="h-full">
                <figure className="card-surface flex h-full flex-col p-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    Verified client
                  </div>
                  <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-[1.75] text-ink">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="text-sm font-bold text-ink">{testimonial.name}</p>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {testimonial.role}, {testimonial.location}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
            Equipment we install and support
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-line py-5">
            {partners.map((partner) => (
              <li key={partner.name} className="flex items-baseline gap-2">
                <p className="font-[Roboto] text-sm font-bold tracking-[-0.01em] text-ink">
                  {partner.name}
                </p>
                <p className="text-[11px] uppercase tracking-[0.1em] text-faint">{partner.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t-2 border-brand-ink bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow eyebrow-on-dark">Next step</p>
              <h2 className="mt-5 max-w-2xl font-[Roboto] text-[1.9rem] font-bold leading-[1.1] text-white sm:text-[2.5rem]">
                Ready to see your own numbers?
              </h2>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.7] text-[#DCE5E8]">
                Book a free assessment in {site.headquarters} or anywhere we cover. We will
                measure your roof, read your bills and give you a fixed price in writing.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link href="/quote" className="btn-brand !px-6 !py-3.5">
                Get a free quote
              </Link>
              <a href={`tel:${site.phone}`} className="btn-on-dark !px-6 !py-3.5">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
