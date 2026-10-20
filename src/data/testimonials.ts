export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  kind: "homeowner" | "business";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We used to budget for a bill that changed every month and still lost power at dinner time. Elisha Solar measured the house, explained the design in plain language and finished in three days. The lights have not gone out since.",
    name: "Wanjiru M.",
    role: "Homeowner, four bedroom house",
    location: "Karen, Nairobi",
    kind: "homeowner",
  },
  {
    quote:
      "Our cold room was the single biggest line in the accounts. Their team modelled our daytime load before quoting, which no one else did, and the saving landed within four percent of their projection. Installers worked weekends so we never closed.",
    name: "Otieno K.",
    role: "Operations manager, retail centre",
    location: "Thika Road, Nairobi",
    kind: "business",
  },
  {
    quote:
      "The pump has run every day for a year without a single litre of diesel. They came back twice to check the array on their own initiative and sent a written report each time. That is the part I did not expect.",
    name: "Grace N.",
    role: "Farm owner",
    location: "Kajiado County",
    kind: "homeowner",
  },
];
