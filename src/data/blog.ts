export type BlogCategory = "Tips" | "News" | "Case Studies" | "How It Works";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readMinutes: number;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: Array<{ heading?: string; paragraphs: string[]; bullets?: string[] }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-read-your-kplc-bill-before-going-solar",
    title: "How to read your KPLC bill before you go solar",
    category: "How It Works",
    date: "2026-09-18",
    readMinutes: 6,
    excerpt:
      "The unit count, the fixed charge and the fuel cost adjustment each tell you something different about what solar can actually replace.",
    image: "/images/gallery-roof-tiles.jpg",
    imageAlt: "Close view of solar panels on a tiled roof",
    body: [
      {
        paragraphs: [
          "Almost every solar quote starts with one number, the monthly bill. That number is useful, but it is not the whole story. A bill of KES 15,000 could come from a large house with modest consumption or a small house running an immersion heater and three air conditioners. The difference decides what the system should look like.",
        ],
      },
      {
        heading: "Separate units from charges",
        paragraphs: [
          "Look for the consumption figure in kWh. That is the energy you actually used. Then look at the fixed charge, which you will keep paying whether or not you install solar, and any fuel or forex adjustment, which moves with national costs. Solar offsets units, not fixed charges, so subtract the fixed charge before you estimate savings.",
        ],
      },
      {
        heading: "Check when you use power",
        paragraphs: [
          "Solar generates between roughly 7am and 6pm. If most of your consumption happens in that window, a grid tied system with no battery will already cut your bill sharply. If your household is empty all day and busy at night, you need either storage or a smaller daytime focused system plus load shifting.",
        ],
        bullets: [
          "Water heating, pumping and ironing are daytime loads you can move.",
          "Air conditioning and refrigeration run when the sun is up, which suits solar well.",
          "Night time security lighting is a good candidate for a small battery.",
        ],
      },
      {
        heading: "Look at the last six months, not one",
        paragraphs: [
          "Seasonal variation is real. A home with air conditioning will spike in February and March, while a home with electric water heating will spike in the cooler months. Six bills give us a reliable average, which is what we size against during a free assessment.",
        ],
      },
      {
        heading: "What we do with the numbers",
        paragraphs: [
          "We take the unit count, the load profile and the roof area, then model a system that covers the majority of your daytime consumption without overbuilding. Oversized arrays waste money. Undersized ones disappoint. The right size is the one that pays back in under five years on your own usage pattern.",
        ],
      },
    ],
  },
  {
    slug: "solar-battery-or-generator-for-kenyan-homes",
    title: "Solar battery or generator: which backup suits a Kenyan home",
    category: "Tips",
    date: "2026-08-30",
    readMinutes: 7,
    excerpt:
      "Diesel is cheap to buy and expensive to run. A battery is the reverse. Here is how to choose for your outage pattern.",
    image: "/images/solution-solar-backup.jpg",
    imageAlt: "Solar battery and inverter installation",
    body: [
      {
        paragraphs: [
          "Both a generator and a battery will keep your lights on. They fail in different ways, cost in different ways and suit different outages. The right choice comes down to how long your outages last and what you need to keep running.",
        ],
      },
      {
        heading: "Short outages favour batteries",
        paragraphs: [
          "If power usually returns within two to four hours and your priority is the fridge, internet, lights and a home office, a lithium battery with a hybrid inverter is the cleaner answer. Changeover is instant, there is no fuel run and no servicing, and the same battery stores your solar generation every afternoon.",
        ],
      },
      {
        heading: "Long outages favour a hybrid approach",
        paragraphs: [
          "Outages that stretch past eight hours, or scheduled maintenance windows, can outlast any battery you can justify buying. A small battery for the essentials plus a correctly sized generator for long events is often the most economical combination. The battery carries the first two hours silently, and the generator starts only when the battery reaches its reserve.",
        ],
      },
      {
        heading: "Do the arithmetic on runtime",
        paragraphs: [
          "Take your essential load in kilowatts and multiply by the hours you need. A fridge, lights, router and laptop charger add up to roughly 0.6 kW. Eight hours is therefore about 5 kWh, which a 5 kWh battery covers when you leave a 20 percent reserve and recharge daily.",
        ],
        bullets: [
          "A 5 kWh lithium battery is realistic for essential circuits of 4 to 6 hours.",
          "A 10 kWh battery usually covers a full evening and overnight outage.",
          "Above 20 kWh, review whether a generator is a cheaper answer for rare long outages.",
        ],
      },
      {
        heading: "Think about the fuel you are avoiding",
        paragraphs: [
          "A 6 kVA generator using about 2 litres an hour costs a meaningful amount per outage day, before servicing and the inconvenience of storing fuel. Against that, a lithium battery has a service life of 6,000 cycles, so the cost per outage is predictable and it doubles as storage for your own solar production.",
        ],
      },
    ],
  },
  {
    slug: "karen-home-solar-case-study-numbers",
    title: "Case study: what 6 kW actually did to one Karen family's bill",
    category: "Case Studies",
    date: "2026-07-21",
    readMinutes: 5,
    excerpt:
      "A four bedroom home, a home office and a borehole pump. The measured results after nine months of monitoring.",
    image: "/images/project-nairobi-rooftop.jpg",
    imageAlt: "Aerial view of a solar powered family home",
    body: [
      {
        paragraphs: [
          "This is the measured outcome of a 6 kW hybrid installation commissioned in Karen, Nairobi, with nine months of monitoring data behind it. Names are withheld at the family's request.",
        ],
      },
      {
        heading: "The starting point",
        paragraphs: [
          "The home was spending an average of KES 21,400 a month, with a peak of KES 26,800 in March. Outages lasted four to six hours and occurred two or three times a week. The borehole pump tripped on low voltage, and the home office lost two or three client calls a month.",
        ],
      },
      {
        heading: "What we installed",
        paragraphs: [
          "Twelve 550 W panels in two strings across two roof faces, a 6 kW hybrid inverter and a 10 kWh lithium battery. The essential loads panel carries lighting, the fridge, the internet router and the home office. The borehole pump was fitted with a soft starter to remove the starting surge.",
        ],
      },
      {
        heading: "The result after nine months",
        paragraphs: [
          "The bill settled at an average of KES 4,700 a month, with solar covering 78 percent of consumption. The battery carried every outage, the longest of which ran nine hours during a storm in April. The pump has not tripped since the soft starter was fitted.",
        ],
        bullets: [
          "Monthly bill down from KES 21,400 to KES 4,700.",
          "Payback tracking at 3.4 years against a modelled 3.6 years.",
          "Generation has held at 94 percent of the design estimate.",
          "One service visit in nine months, for panel cleaning.",
        ],
      },
      {
        heading: "What we would do differently",
        paragraphs: [
          "Nothing on the equipment, but we would add a second monitoring gateway. The single Wi-Fi meter drops off when the home network is rebooted, which creates a gap in the record. A GSM backup gateway is now standard on our hybrid installs.",
        ],
      },
    ],
  },
  {
    slug: "solar-tariff-shift-kenya-2026",
    title: "Why solar payback periods are getting shorter in Kenya",
    category: "News",
    date: "2026-06-05",
    readMinutes: 4,
    excerpt:
      "Rising grid tariffs and falling battery prices are moving the break even point for rooftop solar in the same direction.",
    image: "/images/solution-off-grid.jpg",
    imageAlt: "Solar panels under a clear sky",
    body: [
      {
        paragraphs: [
          "Two curves matter when you evaluate solar: the price you pay for grid electricity, and the price you pay for panels and batteries. Over the last three years the first has moved up and the second has moved down.",
        ],
      },
      {
        heading: "What that means for payback",
        paragraphs: [
          "Our modelling now assumes a six percent annual escalation on grid costs, which is conservative against recent history. On that basis, a residential system that would have paid back in 5.2 years in 2023 now pays back in 3.4 to 4.1 years, depending on daytime load.",
        ],
      },
      {
        heading: "Storage is the biggest change",
        paragraphs: [
          "Lithium iron phosphate pricing has fallen far enough that a battery no longer doubles the cost of a system. That matters in Kenya specifically, because storage is what turns a daytime bill reducer into a genuine reliability solution.",
        ],
      },
      {
        heading: "The catch",
        paragraphs: [
          "Cheaper equipment has also brought unlicensed installers into the market. A poorly designed system can underperform by 40 percent or more and will void panel warranties. Check for an EPRA licence, ask for a design document with string calculations, and insist on a commissioning report.",
        ],
      },
    ],
  },
  {
    slug: "panel-cleaning-and-maintenance-calendar",
    title: "A simple maintenance calendar for Kenyan solar owners",
    category: "Tips",
    date: "2026-05-12",
    readMinutes: 5,
    excerpt:
      "Dust, bird droppings and one loose MC4 connector can quietly cost you a fifth of your generation. Here is the routine that prevents it.",
    image: "/images/gallery-rooftop-palms.jpg",
    imageAlt: "Solar panel close-up against the sky",
    body: [
      {
        paragraphs: [
          "Solar panels have no moving parts, which is why people assume they need no attention. In practice, output depends on keeping the glass clean and the wiring sound. Kenya's dust seasons make this more important than in temperate markets.",
        ],
      },
      {
        heading: "Monthly, five minutes",
        paragraphs: [
          "Open the monitoring app and compare this month's generation with the same month last year. A drop of more than eight percent is worth investigating. Also check the inverter display for any fault code, and confirm the battery is reaching full charge by mid afternoon.",
        ],
      },
      {
        heading: "Every three months",
        paragraphs: [
          "Inspect the array from ground level for cracked glass, lifted clamps or debris trapped under the panels. Clear leaves from gutters above the array so water does not sheet across the glass and leave mineral deposits.",
        ],
      },
      {
        heading: "Twice a year",
        paragraphs: [
          "Clean the panels early in the morning with plain water and a soft brush. Never use abrasive pads or detergent. Have a technician torque check the mounting and inspect DC connectors for discoloration, which signals a hot joint.",
        ],
        bullets: [
          "Clean before the long rains and again after the dusty season.",
          "Never walk on the panels. Use a long handled brush from the edge.",
          "Ask for a thermal scan every two years to catch failing bypass diodes.",
        ],
      },
      {
        heading: "Annually",
        paragraphs: [
          "A full service should cover inverter firmware, battery health, earthing resistance and a string level performance report. Ours includes a written comparison against the commissioning baseline, so you can see exactly how the system is ageing.",
        ],
      },
    ],
  },
  {
    slug: "off-grid-solar-pumping-for-farms",
    title: "Solar pumping: sizing a borehole system for a Kenyan farm",
    category: "How It Works",
    date: "2026-03-27",
    readMinutes: 8,
    excerpt:
      "Head, flow and daily water demand decide the pump. The panels follow. Here is the order that gets it right.",
    image: "/images/project-kajiado-farm.jpg",
    imageAlt: "Ground mounted solar array on a farm",
    body: [
      {
        paragraphs: [
          "A solar pumping system is designed around water, not watts. Get the water numbers right and the electrical design follows. Get them wrong and you end up with an expensive array that cannot lift enough water in the dry season.",
        ],
      },
      {
        heading: "Start with daily demand",
        paragraphs: [
          "Work out how many litres a day you need at peak, then add 20 percent for losses. A drip irrigated acre of vegetables typically needs 15,000 to 25,000 litres a day. Livestock numbers and household use are added on top.",
        ],
      },
      {
        heading: "Measure head, do not guess it",
        paragraphs: [
          "Total head is the static water level plus the drawdown while pumping, plus the vertical lift to the tank, plus friction losses in the pipe run. Friction is often underestimated on long runs. A 200 metre run of 32 mm pipe can add several metres of head at useful flow rates.",
        ],
      },
      {
        heading: "Match the pump to the sun",
        paragraphs: [
          "A variable frequency pump controller lets the pump run at whatever the array can deliver, which is far more efficient than a fixed speed pump with a battery bank. This is why most modern solar pumping systems use no battery at all: water in the tank is the storage.",
        ],
        bullets: [
          "Size the array for the worst month, not the best.",
          "Use a tank sized for two days of demand rather than adding batteries.",
          "Add a float switch and a dry run protection relay without exception.",
        ],
      },
      {
        heading: "Plan for maintenance access",
        paragraphs: [
          "Ground mount arrays on farms need theft resistant fixings, a fence and a service route that a vehicle can reach. We specify stainless fasteners throughout, because galvanised fixings in coastal or acidic soil environments will not last the life of the panels.",
        ],
      },
    ],
  },
];

export const blogCategories: BlogCategory[] = [
  "Tips",
  "News",
  "Case Studies",
  "How It Works",
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
