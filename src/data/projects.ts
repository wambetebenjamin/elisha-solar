export type Project = {
  slug: string;
  title: string;
  county: string;
  solutionSlug: string;
  solutionLabel: string;
  sizeKw: number;
  sizeLabel: string;
  completed: string;
  image: string;
  imageAlt: string;
  outcome: string;
  clientBackground: string;
  challenge: string;
  solutionDeployed: string;
  systemSpecs: Array<{ label: string; value: string }>;
  results: Array<{ label: string; value: string }>;
  gallery: Array<{ src: string; alt: string }>;
};

export const projects: Project[] = [
  {
    slug: "karen-family-home-6kw",
    title: "Karen family home goes hybrid",
    county: "Nairobi",
    solutionSlug: "residential-solar",
    solutionLabel: "Residential Solar",
    sizeKw: 6,
    sizeLabel: "6 kW",
    completed: "2025-11-14",
    image: "/images/project-nairobi-rooftop.jpg",
    imageAlt: "Aerial view of a family home with solar panels on the roof",
    outcome:
      "78 percent of the home now runs on solar and essential circuits survive every outage.",
    clientBackground:
      "A four bedroom family home in Karen with a home office, two refrigerators, a borehole pump and a teenage household that is home most of the day.",
    challenge:
      "The monthly bill had climbed to KES 21,400 and outages were lasting four to six hours, two or three times a week. The home office lost client calls, and the borehole pump tripped whenever the voltage dipped.",
    solutionDeployed:
      "A 6 kW hybrid rooftop system with 12 panels split across two roof faces to spread generation through the day. A 10 kWh lithium battery carries lighting, internet, the fridge and the home office on an essential loads circuit, while the borehole pump was moved to a soft starter.",
    systemSpecs: [
      { label: "Panels", value: "12 x 550 W monocrystalline, two string layout" },
      { label: "Inverter", value: "6 kW hybrid, 20 ms changeover" },
      { label: "Battery", value: "10 kWh lithium iron phosphate" },
      { label: "Mounting", value: "Aluminium rail on tiled roof, wind rated" },
      { label: "Monitoring", value: "Wi-Fi meter with mobile alerts" },
    ],
    results: [
      { label: "Monthly bill", value: "KES 21,400 to KES 4,700" },
      { label: "Solar share of load", value: "78 percent" },
      { label: "Payback projection", value: "3.4 years" },
      { label: "Outages carried", value: "Up to 9 hours" },
    ],
    gallery: [
      { src: "/images/project-nairobi-rooftop.jpg", alt: "Aerial view of the installed rooftop array" },
      { src: "/images/gallery-roof-tiles.jpg", alt: "Close view of the panel mounting on the roof" },
      { src: "/images/solution-solar-backup.jpg", alt: "Battery and inverter installation indoors" },
    ],
  },
  {
    slug: "thika-road-retail-centre-64kw",
    title: "Retail centre cuts daytime grid demand",
    county: "Nairobi",
    solutionSlug: "commercial-solar",
    solutionLabel: "Commercial Solar",
    sizeKw: 64,
    sizeLabel: "64 kW",
    completed: "2025-08-22",
    image: "/images/solution-commercial-solar.jpg",
    imageAlt: "Aerial view of a large commercial rooftop solar array",
    outcome:
      "Daytime consumption now comes from the roof, saving KES 318,000 a month.",
    clientBackground:
      "A shopping centre on Thika Road with fourteen tenants, two cold rooms and a shared parking deck, open from 7am to 9pm every day.",
    challenge:
      "Demand charges and a heavy daytime load meant KES 410,000 a month, most of it consumed between 9am and 5pm when the roof was in full sun. Generator backup during outages cost a further KES 40,000 in diesel each month.",
    solutionDeployed:
      "A 64 kW ballasted rooftop array across three roof sections, wired into two three phase inverters with export limiting so nothing is pushed back to the grid without approval. Installation ran over five weekends to keep the centre trading.",
    systemSpecs: [
      { label: "Panels", value: "112 x 580 W bifacial modules" },
      { label: "Inverters", value: "2 x 30 kW three phase, export limited" },
      { label: "Mounting", value: "Ballasted frame, no roof penetrations" },
      { label: "Protection", value: "DC surge arrestors and string fusing" },
      { label: "Monitoring", value: "Per string analytics with monthly reporting" },
    ],
    results: [
      { label: "Monthly saving", value: "KES 318,000" },
      { label: "Payback projection", value: "3.9 years" },
      { label: "Diesel spend", value: "Down 92 percent" },
      { label: "Annual CO2 avoided", value: "32 tonnes" },
    ],
    gallery: [
      { src: "/images/solution-commercial-solar.jpg", alt: "Commercial rooftop array from above" },
      { src: "/images/solution-off-grid.jpg", alt: "Rows of panels under a clear sky" },
      { src: "/images/gallery-rooftop-palms.jpg", alt: "Panel edge detail on the commercial roof" },
    ],
  },
  {
    slug: "kajiado-farm-borehole-12kw",
    title: "Kajiado farm moves off diesel pumping",
    county: "Kajiado",
    solutionSlug: "off-grid-systems",
    solutionLabel: "Off-Grid Systems",
    sizeKw: 12,
    sizeLabel: "12 kW",
    completed: "2026-02-06",
    image: "/images/project-kajiado-farm.jpg",
    imageAlt: "Ground mounted solar array in a rural landscape",
    outcome:
      "38,000 litres of water a day with no fuel cost, and a homestead that runs all night.",
    clientBackground:
      "A 40 acre horticultural farm 22 kilometres from the nearest transformer, with a homestead, staff quarters and a borehole that feeds drip irrigation.",
    challenge:
      "A 15 kVA diesel pump ran six hours a day at KES 4,200 in fuel, and there was no household power after sunset. Grid extension quotes came in above KES 3.4 million with no timeline.",
    solutionDeployed:
      "A 12 kW ground mount array with an off grid inverter charger, a 20 kWh lithium bank and a dedicated variable frequency solar pump controller. Panels were set at a fixed 15 degree tilt with theft resistant fixings, and monitoring runs over GSM.",
    systemSpecs: [
      { label: "Panels", value: "22 x 550 W monocrystalline, ground mount" },
      { label: "Inverter", value: "12 kW off grid inverter charger" },
      { label: "Battery", value: "20 kWh lithium iron phosphate" },
      { label: "Pumping", value: "7.5 kW VFD solar pump controller" },
      { label: "Monitoring", value: "GSM remote monitoring and alerting" },
    ],
    results: [
      { label: "Water delivered", value: "38,000 litres a day" },
      { label: "Fuel spend", value: "KES 4,200 a day to zero" },
      { label: "Night supply", value: "24 hour homestead power" },
      { label: "Payback projection", value: "4.2 years" },
    ],
    gallery: [
      { src: "/images/project-kajiado-farm.jpg", alt: "Ground mounted array on the farm" },
      { src: "/images/solution-off-grid.jpg", alt: "Panels angled to the sun" },
      { src: "/images/gallery-roof-tiles.jpg", alt: "Module detail on the array" },
    ],
  },
  {
    slug: "kisumu-guest-house-hot-water",
    title: "Kisumu guest house retires electric heaters",
    county: "Kisumu",
    solutionSlug: "solar-water-heating",
    solutionLabel: "Solar Water Heating",
    sizeKw: 3,
    sizeLabel: "300 litre system",
    completed: "2025-05-30",
    image: "/images/project-kisumu-tiles.jpg",
    imageAlt: "Solar collector installed on a tiled roof",
    outcome:
      "Water heating costs fell from KES 74,000 to KES 9,800 a month.",
    clientBackground:
      "A twelve room guest house near Lake Victoria with en suite bathrooms, a small restaurant kitchen and a laundry.",
    challenge:
      "Twelve immersion heaters and a central boiler ran six hours a day, and the boiler alone accounted for 31 percent of the property's electricity bill. Guests complained about hot water in the early evening.",
    solutionDeployed:
      "A 300 litre split solar water heating system with flat plate collectors on the main roof, an insulated gravity feed and a 2 kW electric boost element on a timer for cloudy evenings. A recirculation loop keeps hot water at the tap.",
    systemSpecs: [
      { label: "Collectors", value: "4 x flat plate panels, selective coating" },
      { label: "Storage", value: "300 litre insulated twin coil tank" },
      { label: "Boost", value: "2 kW element on a timed controller" },
      { label: "Mounting", value: "Ground level split frame with roof collectors" },
      { label: "Service", value: "Bi-annual descale and anodes check" },
    ],
    results: [
      { label: "Water heating cost", value: "KES 74,000 to KES 9,800 a month" },
      { label: "Bill share removed", value: "31 percent" },
      { label: "Guest complaints", value: "Down to zero in six months" },
      { label: "Payback projection", value: "2.1 years" },
    ],
    gallery: [
      { src: "/images/project-kisumu-tiles.jpg", alt: "Collector panels on the guest house roof" },
      { src: "/images/solution-solar-water-heating.jpg", alt: "Roof mounted collectors in daylight" },
      { src: "/images/gallery-rooftop-palms.jpg", alt: "Panel detail against the sky" },
    ],
  },
  {
    slug: "nakuru-dairy-cooler-30kw",
    title: "Nakuru dairy cooperative keeps the cooler running",
    county: "Nakuru",
    solutionSlug: "commercial-solar",
    solutionLabel: "Commercial Solar",
    sizeKw: 30,
    sizeLabel: "30 kW",
    completed: "2026-04-17",
    image: "/images/project-nakuru-home.jpg",
    imageAlt: "Close view of solar panels installed on a tiled roof",
    outcome:
      "Milk cooling now runs through the day without diesel, protecting 4,200 litres of daily intake.",
    clientBackground:
      "A dairy cooperative collecting milk from 180 smallholder farmers, with a bulk cooler, an office and a water pump on site.",
    challenge:
      "The cooler ran 18 hours a day and outages spoiled intake. The cooperative was running a generator three to four hours daily and still losing milk during long outages.",
    solutionDeployed:
      "A 30 kW rooftop array over the collection shed and office, paired with a 15 kWh battery to hold the cooler through short outages and a generator interlock for longer ones. Cooler compressors were fitted with soft starters to reduce surge demand.",
    systemSpecs: [
      { label: "Panels", value: "52 x 580 W monocrystalline" },
      { label: "Inverter", value: "30 kW three phase hybrid" },
      { label: "Battery", value: "15 kWh lithium iron phosphate" },
      { label: "Mounting", value: "Penetration mount on steel truss roof" },
      { label: "Monitoring", value: "SMS alerting to the cooperative manager" },
    ],
    results: [
      { label: "Milk lost to outages", value: "Down 96 percent" },
      { label: "Generator hours", value: "4 hours a day to under 1" },
      { label: "Monthly saving", value: "KES 148,000" },
      { label: "Payback projection", value: "4.6 years" },
    ],
    gallery: [
      { src: "/images/project-nakuru-home.jpg", alt: "Panels on the cooperative roof" },
      { src: "/images/solution-commercial-solar.jpg", alt: "Rooftop array from above" },
      { src: "/images/gallery-roof-tiles.jpg", alt: "Mounting detail on the roof" },
    ],
  },
  {
    slug: "mombasa-clinic-backup-10kw",
    title: "Mombasa clinic never loses the vaccine fridge",
    county: "Mombasa",
    solutionSlug: "solar-backup",
    solutionLabel: "Solar Backup",
    sizeKw: 10,
    sizeLabel: "10 kW and 20 kWh",
    completed: "2026-06-12",
    image: "/images/solution-solar-backup.jpg",
    imageAlt: "Battery and inverter equipment installed indoors",
    outcome:
      "The vaccine cold chain has stayed inside temperature range through every outage since commissioning.",
    clientBackground:
      "A private clinic in Nyali with a vaccine fridge, a laboratory, a small theatre and a records server room.",
    challenge:
      "Frequent outages and voltage swings had damaged a lab analyser and a server, and the vaccine fridge was being moved to a generator that took 40 seconds to start. Fuel and servicing cost KES 31,000 a month.",
    solutionDeployed:
      "A 10 kW hybrid system with a 20 kWh lithium bank dedicated to the cold chain, lab, theatre lighting and server room, plus 18 panels on the clinic roof to recharge the bank each day. A changeover panel isolates essential loads automatically.",
    systemSpecs: [
      { label: "Panels", value: "18 x 550 W monocrystalline" },
      { label: "Inverter", value: "10 kW hybrid with essential loads panel" },
      { label: "Battery", value: "20 kWh lithium iron phosphate" },
      { label: "Protection", value: "Voltage stabiliser and surge arrestors" },
      { label: "Monitoring", value: "Temperature and state of charge alarms" },
    ],
    results: [
      { label: "Outage ride through", value: "Up to 11 hours" },
      { label: "Cold chain excursions", value: "Zero since handover" },
      { label: "Generator spend", value: "Retired completely" },
      { label: "Equipment damage", value: "None reported" },
    ],
    gallery: [
      { src: "/images/solution-solar-backup.jpg", alt: "Battery storage cabinet installation" },
      { src: "/images/gallery-roof-tiles.jpg", alt: "Roof panels feeding the clinic" },
      { src: "/images/gallery-rooftop-palms.jpg", alt: "Panel close-up in coastal light" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectCounties = Array.from(
  new Set(projects.map((project) => project.county)),
).sort();

export const projectSolutionTypes = Array.from(
  new Set(projects.map((project) => project.solutionLabel)),
).sort();
