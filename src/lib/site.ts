export const site = {
  name: "Elisha Solar",
  tagline: "Power your home. Power your future.",
  description:
    "Elisha Solar designs, installs and maintains solar power systems for homes, businesses and farms across Kenya. Free site assessment, certified installers and flexible payment plans.",
  headquarters: "Nairobi, Kenya",
  address: "Mwangaza Plaza, 4th Floor, Mombasa Road, Nairobi",
  phone: "+254112272061",
  phoneDisplay: "+254 112 272 061",
  email: "hello@elishasolar.co.ke",
  whatsappNumber: "254112272061",
  whatsappMessage:
    "Hello Elisha Solar, I would like a solar quote or to book a free site assessment.",
  consentKey: "elisha_solar_consent",
  hours: "Mon to Fri, 8:00am to 5:30pm. Saturday, 9:00am to 1:00pm.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://elishasolar.co.ke",
} as const;

export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { label: "Homes and businesses powered", value: 2480, suffix: "+" },
  { label: "Solar panels installed", value: 18600, suffix: "+" },
  { label: "Years in operation", value: 12, suffix: "" },
  { label: "CO2 offset in tonnes", value: 9750, suffix: "t" },
] as const;

export const processSteps = [
  {
    title: "Free site assessment",
    description:
      "We visit your property, measure usable roof or ground space, review your KPLC bills and check shading through the day.",
  },
  {
    title: "Custom system design",
    description:
      "Our engineers size the array, inverter and battery bank, then send you a written design with a fixed price.",
  },
  {
    title: "Professional installation",
    description:
      "Certified crews mount panels, run conduit and cabling, and protect every circuit with surge and earthing protection.",
  },
  {
    title: "Testing and handover",
    description:
      "We commission the system, test every string and circuit, then walk you through the monitoring app and warranties.",
  },
  {
    title: "Ongoing maintenance",
    description:
      "Scheduled cleaning, performance checks and remote monitoring keep your system producing at its rated output.",
  },
] as const;

export const whyElisha = [
  {
    title: "Kenyan owned and operated",
    description:
      "A Nairobi based team that answers the phone, visits your site and stands behind the work for years.",
    icon: "home",
  },
  {
    title: "Certified installers",
    description:
      "Every crew lead holds an EPRA solar technician licence and works to IEC installation standards.",
    icon: "shield",
  },
  {
    title: "10 year panel warranty",
    description:
      "Tier one panels with a 10 year product warranty and a 25 year performance guarantee.",
    icon: "warranty",
  },
  {
    title: "24/7 monitoring support",
    description:
      "Remote monitoring flags underperformance early, and our support line stays open around the clock.",
    icon: "monitor",
  },
  {
    title: "Flexible payment plans",
    description:
      "Pay in full, spread the cost over 12 to 36 months, or use our solar lease option for businesses.",
    icon: "wallet",
  },
] as const;

export const partners = [
  { name: "SunVolt Kenya", note: "Monocrystalline panels" },
  { name: "Rift Valley Inverters", note: "Hybrid inverters" },
  { name: "HeliosCell", note: "Bifacial modules" },
  { name: "Mwangaza Batteries", note: "Lithium storage" },
  { name: "KiliMount Racking", note: "Mounting systems" },
  { name: "Savannah Solar Pumps", note: "Water pumping" },
] as const;
