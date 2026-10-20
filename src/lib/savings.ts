export type SavingsInput = {
  monthlyBill: number;
};

export type SavingsResult = {
  monthlyBill: number;
  monthlyUnits: number;
  systemSizeKw: number;
  estimatedCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackMonths: number;
  paybackYears: number;
  firstYearCo2: number;
  tenYearSavings: number;
  chart: Array<{
    year: number;
    savings: number;
    gridCost: number;
    label: string;
  }>;
};

const TARIFF_PER_KWH = 24;
const KWH_PER_KW_PER_MONTH = 120;
const COST_PER_KW = 145000;
const FIXED_BALANCE_OF_SYSTEM = 60000;
const SOLAR_OFFSET_SHARE = 0.72;
const GRID_ESCALATION = 0.06;
const CO2_TONNES_PER_KW_YEAR = 0.42;

export function calculateSavings(monthlyBill: number): SavingsResult {
  const bill = Math.max(0, Math.min(monthlyBill, 400000));
  const monthlyUnits = bill / TARIFF_PER_KWH;
  const systemSizeKw = Math.round((monthlyUnits / KWH_PER_KW_PER_MONTH) * 10) / 10;
  const estimatedCost = Math.round(
    (systemSizeKw * COST_PER_KW + FIXED_BALANCE_OF_SYSTEM) / 1000,
  ) * 1000;
  const monthlySavings = Math.round(bill * SOLAR_OFFSET_SHARE);
  const annualSavings = monthlySavings * 12;
  const paybackMonths =
    monthlySavings > 0 ? Math.max(1, Math.ceil(estimatedCost / monthlySavings)) : 0;

  const chart = Array.from({ length: 10 }, (_, index) => {
    const year = index + 1;
    let gridCost = 0;
    let savings = 0;
    for (let y = 1; y <= year; y += 1) {
      const escalatedBill = bill * Math.pow(1 + GRID_ESCALATION, y - 1);
      gridCost += escalatedBill * 12;
      savings += escalatedBill * SOLAR_OFFSET_SHARE * 12;
    }
    return {
      year,
      savings: Math.round(savings),
      gridCost: Math.round(gridCost),
      label: `Year ${year}`,
    };
  });

  return {
    monthlyBill: bill,
    monthlyUnits: Math.round(monthlyUnits),
    systemSizeKw,
    estimatedCost,
    monthlySavings,
    annualSavings,
    paybackMonths,
    paybackYears: Math.round((paybackMonths / 12) * 10) / 10,
    firstYearCo2: Math.round(systemSizeKw * CO2_TONNES_PER_KW_YEAR * 10) / 10,
    tenYearSavings: chart[chart.length - 1].savings,
    chart,
  };
}

export function formatKes(value: number): string {
  return `KES ${Math.round(value).toLocaleString("en-KE")}`;
}
