import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Elisha Solar collects, uses and protects personal data under the Kenya Data Protection Act 2019.",
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    paragraphs: [
      "Elisha Solar Limited is a solar energy design, installation and maintenance company registered in Kenya, with its head office on Mombasa Road in Nairobi. For the purposes of the Kenya Data Protection Act 2019, we are the data controller for the personal data described in this policy.",
      "Our data protection contact is reachable at hello@elishasolar.co.ke and on +254 112 272 061. If you would prefer to write, use the Nairobi office address published on the contact page.",
    ],
  },
  {
    id: "what-we-collect",
    heading: "Personal data we collect",
    paragraphs: [
      "We collect only what we need to respond to you and to deliver a safe installation. That usually means the following categories.",
    ],
    bullets: [
      "Identity and contact data: your name, phone number, email address and preferred contact method.",
      "Property data: county, building type, number of rooms or facility size, roof details and photographs taken during an assessment.",
      "Usage data: your monthly electricity bill band, consumption figures and any backup requirements you tell us about.",
      "Technical data: IP address, browser type, device type and pages visited, collected through server logs and, where you consent, analytics cookies.",
      "Account data: if you create an account, your name and email address provided through Google sign in, plus your saved quote references.",
      "Payment data: invoices and payment records. Card and mobile money details are processed by our payment providers and are not stored on our servers.",
    ],
  },
  {
    id: "why-we-use-it",
    heading: "Why we use your data",
    paragraphs: [
      "We rely on the following lawful bases under section 30 of the Data Protection Act 2019.",
    ],
    bullets: [
      "To answer your enquiry and prepare a quote, which is processing necessary to take steps at your request before entering a contract.",
      "To design, install, maintain and support a system, which is processing necessary to perform our contract with you.",
      "To meet legal obligations such as tax records, warranty administration and safety documentation.",
      "To improve the website and our services, based on our legitimate interest in running a competent business, using aggregated data wherever possible.",
      "To send you marketing about related services, only where you have opted in. You can withdraw consent at any time.",
    ],
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    paragraphs: [
      "We do not sell personal data. We share it only with processors who help us operate, and only to the extent they need it.",
    ],
    bullets: [
      "Installation and service partners working under our supervision in counties outside Nairobi.",
      "Email and hosting providers that deliver quote confirmations and run this website.",
      "Google, for reCAPTCHA fraud prevention and, if you choose it, account sign in.",
      "Equipment manufacturers and distributors, where a warranty claim or technical escalation requires it.",
      "Professional advisers, auditors or regulators where the law requires disclosure.",
    ],
  },
  {
    id: "transfers",
    heading: "Transfers outside Kenya",
    paragraphs: [
      "Some processors store data on servers outside Kenya, including in the European Union and the United States. Where that happens we rely on appropriate safeguards as required by section 48 of the Act, including standard contractual clauses and providers that publish independently audited security controls.",
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    bullets: [
      "Quote enquiries that do not proceed: 24 months, so we can pick up the conversation when you are ready.",
      "Customer contracts, invoices and warranty records: seven years after the end of the contract, to meet tax and warranty obligations.",
      "Monitoring data for installed systems: for the life of the warranty, in aggregated or pseudonymised form after the first two years.",
      "Website analytics: up to 14 months.",
      "Marketing consent records: until you withdraw consent, plus two years for proof of consent.",
    ],
  },
  {
    id: "security",
    heading: "How we protect it",
    paragraphs: [
      "Access to customer records is limited to staff and contractors who need it, using individual accounts and role based permissions. Data in transit is encrypted with TLS. Physical documents such as signed commissioning reports are held in locked storage at the Nairobi office.",
      "If a personal data breach occurs that is likely to result in a risk to your rights, we will notify the Office of the Data Protection Commissioner and affected individuals without undue delay, as required by section 43.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    paragraphs: [
      "Under the Data Protection Act 2019 you have the right to be informed, to access your data, to correct inaccurate data, to request deletion, to restrict or object to processing, to data portability, and to withdraw consent at any time.",
      "To exercise any of these rights, email hello@elishasolar.co.ke with enough detail for us to identify your record. We respond within seven days and complete requests within 30 days, unless the law allows an extension. There is no fee for a first request.",
      "If you are unhappy with our response you may complain to the Office of the Data Protection Commissioner in Kenya.",
    ],
  },
  {
    id: "children",
    heading: "Children",
    paragraphs: [
      "Our services are sold to adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has submitted data through this site, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    paragraphs: [
      "If we change how we handle personal data we will update this page and revise the date at the top. Material changes affecting existing customers are also communicated by email.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      description="What we collect, why we collect it, how long we keep it and the rights you have under the Kenya Data Protection Act 2019."
      updated="20 October 2026"
      sections={sections}
      crumbs="Privacy policy"
    />
  );
}
