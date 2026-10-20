import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that apply to Elisha Solar quotes, installations, maintenance and use of this website.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    heading: "These terms",
    paragraphs: [
      "These terms govern your use of the Elisha Solar website and the supply of solar design, installation and maintenance services by Elisha Solar Limited, a company registered in Kenya.",
      "A contract for installation is formed only when you accept a written quotation and pay any agreed deposit. Information on this website, including calculator output, is indicative and is not an offer.",
    ],
  },
  {
    id: "quotes",
    heading: "Quotations and estimates",
    paragraphs: [
      "Website estimates are generated from standard assumptions: a 24 shilling average unit tariff, 120 kWh generated per installed kW each month, a 72 percent solar share of consumption, and a 6 percent annual tariff escalation. They are illustrative only.",
      "Written quotations are valid for 30 days and are based on the property conditions observed during a site assessment. If hidden conditions emerge, such as roof structural defects, asbestos roofing, or an inadequate distribution board, we will explain the issue and issue a revised quotation before doing additional work.",
    ],
  },
  {
    id: "installation",
    heading: "Installation and access",
    bullets: [
      "You confirm that you own the property or have written authority from the owner to authorise installation.",
      "You provide safe access to the roof, the distribution board and a working power supply during installation.",
      "Any structural strengthening required to carry the array is quoted separately and approved by you in writing.",
      "Installation timelines are estimates. Weather, equipment lead times and grid approval can extend them, and we will tell you as soon as we know.",
      "Work is carried out to IEC standards by technicians holding current EPRA licences.",
    ],
  },
  {
    id: "payment",
    heading: "Payment",
    paragraphs: [
      "Unless a payment plan is agreed in writing, the schedule is 60 percent on order, 30 percent before installation and 10 percent on handover. Payment plans of 12 to 36 months are subject to credit approval and carry the interest rate disclosed in the plan document.",
      "Late payment may pause work and, where the plan provides for it, attract interest at the rate stated in that plan.",
    ],
  },
  {
    id: "warranties",
    heading: "Warranties",
    paragraphs: [
      "Panels carry a 10 year product warranty and a 25 year performance warranty from the manufacturer. Inverters and batteries carry the manufacturer warranty stated in your handover pack, typically 5 to 10 years.",
      "Our workmanship warranty covers installation defects for 24 months from handover. Warranties do not cover damage from lightning where surge protection was bypassed, theft, vandalism, unauthorised modification, or failure to carry out the recommended maintenance schedule.",
    ],
  },
  {
    id: "maintenance",
    heading: "Maintenance and monitoring",
    paragraphs: [
      "Monitoring access is provided for the first year as part of the installation. Continued remote monitoring after that is included in a maintenance plan or available on a subscription basis.",
      "Where you decline recommended maintenance, we may limit warranty support for faults that maintenance would have prevented. We will always say so in writing at the time.",
    ],
  },
  {
    id: "liability",
    heading: "Liability",
    paragraphs: [
      "We are liable for direct loss caused by our negligence or breach of contract, up to the value of the contract for the affected system. We are not liable for indirect or consequential loss, including loss of profit or loss of production, except where the law does not allow that exclusion.",
      "Nothing in these terms limits liability for death or personal injury caused by negligence, or for fraud.",
    ],
  },
  {
    id: "website",
    heading: "Use of this website",
    bullets: [
      "Content is provided for general information and may change without notice.",
      "You may not scrape, copy or republish substantial parts of the site without written permission.",
      "Forms are protected by reCAPTCHA. Automated submissions, attempts to bypass the protection, or submissions of another person's details without authority are prohibited.",
      "Links to third party sites are provided for convenience. We are not responsible for their content.",
    ],
  },
  {
    id: "cancellation",
    heading: "Cancellation",
    paragraphs: [
      "You may cancel before installation begins and receive a refund of the deposit less any design work already completed and equipment already ordered specifically for you. Once equipment has been delivered to site, cancellation is subject to recovery of the equipment cost.",
      "We may cancel if site conditions make safe installation impossible, if access is refused, or if payment terms are not met. In that case we refund amounts paid for work not yet performed.",
    ],
  },
  {
    id: "law",
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of Kenya. The parties will attempt to resolve disputes by discussion first. If that fails, the dispute is referred to mediation and then to the courts of Kenya.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      description="The basis on which we quote, install, warrant and maintain solar systems, and the rules for using this website."
      updated="20 October 2026"
      sections={sections}
      crumbs="Terms of service"
    />
  );
}
