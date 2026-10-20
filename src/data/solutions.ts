export type Solution = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  suits: string[];
  typicalSize: string;
  costRange: string;
  benefits: string[];
  specs: {
    panels: string;
    battery: string;
    inverter: string;
    mounting: string;
    monitoring: string;
  };
  caseStudy: {
    title: string;
    location: string;
    size: string;
    summary: string;
    result: string;
  };
};

export const solutions: Solution[] = [
  {
    slug: "residential-solar",
    title: "Residential Solar",
    shortDescription:
      "Grid tied rooftop solar that cuts your monthly KPLC bill without changing how you live.",
    description:
      "A residential system turns your own roof into a power station. We size the array against your last six KPLC bills, so daytime lighting, refrigeration, entertainment and home office loads run on sunshine first and the grid second. Installation takes two to four days, and your supply stays on throughout. Every system is commissioned with surge protection, proper earthing and a monitoring link so you can see generation from your phone.",
    image: "/images/solution-residential-solar.jpg",
    imageAlt: "Rooftop solar panels on a residential home",
    suits: [
      "Homeowners with a monthly bill above KES 6,000",
      "Families building or renovating a house",
      "Home offices and rental properties with steady daytime load",
    ],
    typicalSize: "3 kW to 10 kW",
    costRange: "KES 380,000 to KES 1,250,000",
    benefits: [
      "Cut 60 to 80 percent of your monthly electricity bill",
      "Protection from future tariff increases",
      "Quiet, fuel free backup when the grid drops",
      "Adds resale value to your property",
    ],
    specs: {
      panels: "Tier one monocrystalline half cut, 550 W per panel, 10 year product warranty",
      battery: "Optional 5 kWh lithium iron phosphate, expandable to 15 kWh",
      inverter: "Hybrid string inverter, 5 kW or 8 kW, with grid export ready output",
      mounting: "Anodised aluminium rails with stainless fixings, wind rated to 120 km/h",
      monitoring: "Wi-Fi energy meter with mobile dashboard and fault alerts",
    },
    caseStudy: {
      title: "Karen family home",
      location: "Nairobi County",
      size: "6 kW hybrid",
      summary:
        "A four bedroom home with a home office was spending KES 21,400 a month on electricity and losing power two to three times a week.",
      result:
        "The system now covers 78 percent of the home's consumption and carries essential circuits through every outage. Savings average KES 16,700 a month.",
    },
  },
  {
    slug: "commercial-solar",
    title: "Commercial Solar",
    shortDescription:
      "Rooftop and ground mount arrays for offices, retail, schools and light industry.",
    description:
      "Commercial electricity is a controllable operating cost. We model your load profile, identify the daytime demand that solar can serve, and design a system that pays back inside four to six years. Installations are staged around your operating hours, with weekend and night work where needed. Larger sites can export surplus to the grid or add storage for peak shaving.",
    image: "/images/solution-commercial-solar.jpg",
    imageAlt: "Aerial view of a large solar panel array on a commercial rooftop",
    suits: [
      "Offices, retail centres and warehouses",
      "Schools, clinics and hotels",
      "Factories and cold storage running heavy daytime loads",
    ],
    typicalSize: "15 kW to 250 kW",
    costRange: "KES 1,900,000 to KES 28,000,000",
    benefits: [
      "Predictable energy costs across the year",
      "Fast payback on heavy daytime consumption",
      "Reduced diesel spend on generator backup",
      "Documented carbon reduction for ESG reporting",
    ],
    specs: {
      panels: "Bifacial monocrystalline modules, 580 W, 12 year product warranty",
      battery: "Optional commercial lithium cabinet from 30 kWh, stackable",
      inverter: "Three phase commercial inverters with export limiting",
      mounting: "Ballasted or penetration mount, engineered for the roof structure",
      monitoring: "Multi string monitoring with per array yield and alert escalation",
    },
    caseStudy: {
      title: "Thika Road retail centre",
      location: "Nairobi County",
      size: "64 kW",
      summary:
        "A shopping centre with cold rooms and 14 tenants was spending KES 410,000 a month, most of it between 9am and 5pm.",
      result:
        "Daytime consumption now comes from the roof. The centre saves KES 318,000 a month and pays back in 3.9 years.",
    },
  },
  {
    slug: "solar-water-heating",
    title: "Solar Water Heating",
    shortDescription:
      "Thermosiphon and pumped systems that deliver hot water without the electric heater bill.",
    description:
      "An electric immersion heater is one of the hungriest appliances in a Kenyan home. A solar water heating system replaces most of that load with direct thermal collection, which is far more efficient than converting sunlight to electricity and back to heat. We install both thermosiphon units for pitched roofs and split pumped systems where the tank must sit at ground level.",
    image: "/images/solution-solar-water-heating.jpg",
    imageAlt: "Solar panels close up on a tiled roof",
    suits: [
      "Homes with two or more bathrooms",
      "Guest houses, hostels and small hotels",
      "Clinics, kitchens and staff quarters with daily hot water demand",
    ],
    typicalSize: "150 litre to 500 litre tank",
    costRange: "KES 95,000 to KES 420,000",
    benefits: [
      "Remove 30 to 40 percent of a typical household bill",
      "Hot water available even during grid outages",
      "Low maintenance with no compressor or gas refill",
      "Service life of 15 years or more",
    ],
    specs: {
      panels: "Evacuated tube or flat plate collector, selective coating, hail rated glass",
      battery: "Not applicable. Thermal storage in an insulated tank",
      inverter: "Not required. Optional 2 kW electric boost element",
      mounting: "Roof frame for pitched roofs, ground frame for split systems",
      monitoring: "Tank thermostat and temperature gauge, annual service inspection",
    },
    caseStudy: {
      title: "Nakuru guest house",
      location: "Nakuru County",
      size: "300 litre split system",
      summary:
        "Twelve rooms with electric heaters were running the boiler for six hours a day, costing KES 74,000 a month.",
      result:
        "Hot water now comes from a 300 litre solar system with an evening boost. Water heating costs fell to KES 9,800 a month.",
    },
  },
  {
    slug: "solar-backup",
    title: "Solar Backup and Battery Storage",
    shortDescription:
      "Lithium storage that keeps your lights, internet and fridge running through any outage.",
    description:
      "Solar backup is about reliability first. We install lithium battery banks with a hybrid inverter that switches over in under 20 milliseconds, so computers and sensitive equipment never notice the grid going down. You can start with a small essential loads panel and expand the battery later without replacing the inverter.",
    image: "/images/solution-solar-backup.jpg",
    imageAlt: "Technician installing a home solar battery and inverter system",
    suits: [
      "Homes with frequent outages or voltage dips",
      "Clinics, labs and data rooms needing clean continuous power",
      "Businesses replacing noisy diesel generators",
    ],
    typicalSize: "5 kWh to 40 kWh storage",
    costRange: "KES 320,000 to KES 2,600,000",
    benefits: [
      "Seamless changeover with no reboot of equipment",
      "No fuel, noise or exhaust fumes",
      "Time of use shifting to cut peak tariff charges",
      "Modular expansion as your needs grow",
    ],
    specs: {
      panels: "Paired with 4 kW to 20 kW of monocrystalline panels for recharge",
      battery: "Lithium iron phosphate with battery management system, 6,000 cycles",
      inverter: "Hybrid inverter with 20 ms transfer and essential loads output",
      mounting: "Wall mounted cabinet with fire rated backing and ventilation clearance",
      monitoring: "State of charge, cycle count and outage log in the mobile app",
    },
    caseStudy: {
      title: "Lavington home office",
      location: "Nairobi County",
      size: "8 kW with 10 kWh storage",
      summary:
        "A consultant lost two working days a month to outages and unstable voltage that damaged networking gear twice in a year.",
      result:
        "Essential circuits now ride through outages of up to nine hours. The client retired a 6 kVA generator and its fuel budget.",
    },
  },
  {
    slug: "off-grid-systems",
    title: "Off-Grid Systems",
    shortDescription:
      "Standalone solar power for homes, farms, schools and boreholes beyond the grid.",
    description:
      "Where a grid connection is distant or unreliable, an off grid system delivers full independence. We design around your daily energy needs rather than monthly bills, then size generation and storage with a two day autonomy buffer. Solar water pumping for farms and boreholes is a common starting point, with household supply added later.",
    image: "/images/solution-off-grid.jpg",
    imageAlt: "Solar panel array under a clear sky",
    suits: [
      "Rural homes more than 600 metres from a transformer",
      "Farms needing borehole pumping and irrigation",
      "Rural schools, dispensaries and conservancies",
    ],
    typicalSize: "2 kW to 30 kW with 10 kWh to 60 kWh storage",
    costRange: "KES 450,000 to KES 4,800,000",
    benefits: [
      "Complete independence from grid availability",
      "No monthly electricity bill or standing charge",
      "Solar pumping replaces diesel pumps and fuel runs",
      "Two day autonomy designed in for cloudy spells",
    ],
    specs: {
      panels: "High yield monocrystalline modules with dust and shade tolerant strings",
      battery: "Lithium iron phosphate bank sized for two days of autonomy",
      inverter: "Off grid inverter charger with generator input for backup",
      mounting: "Ground mount frames with adjustable tilt and theft resistant fixings",
      monitoring: "Remote monitoring over GSM where there is no fixed internet",
    },
    caseStudy: {
      title: "Kajiado farm and borehole",
      location: "Kajiado County",
      size: "12 kW with 20 kWh storage",
      summary:
        "A 40 acre farm ran a diesel pump for six hours a day and had no reliable household power after sunset.",
      result:
        "The solar pump now delivers 38,000 litres a day with no fuel cost, and the homestead runs fully off grid through the night.",
    },
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export const solutionTypes = solutions.map((solution) => solution.slug);
