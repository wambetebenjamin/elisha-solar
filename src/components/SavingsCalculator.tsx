"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { calculateSavings, formatKes } from "@/lib/savings";

const MIN_BILL = 3000;
const MAX_BILL = 150000;
const PRESETS = [6000, 12000, 18000, 35000, 80000];

function compactKes(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return `${value}`;
}

export default function SavingsCalculator() {
  const [bill, setBill] = useState(18000);
  const result = useMemo(() => calculateSavings(bill), [bill]);

  const progress = ((bill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  const figures = [
    { label: "Monthly saving", value: formatKes(result.monthlySavings) },
    { label: "Payback period", value: `${result.paybackYears} years` },
    { label: "Suggested system", value: `${result.systemSizeKw} kW` },
    { label: "Installed cost", value: formatKes(result.estimatedCost) },
  ];

  return (
    <div className="card-surface overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1.25fr]">
        <div className="border-b border-line p-7 sm:p-9 lg:border-b-0 lg:border-r">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-[Roboto] text-[1.0625rem] font-bold text-ink">
              Solar savings calculator
            </h3>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
              Instant estimate
            </span>
          </div>

          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="monthly-bill" className="field-label !mb-0">
                Monthly KPLC bill
              </label>
              <span className="tnum font-[Roboto] text-xl font-bold text-brand-ink">
                {formatKes(bill)}
              </span>
            </div>
            <input
              id="monthly-bill"
              type="range"
              min={MIN_BILL}
              max={MAX_BILL}
              step={500}
              value={bill}
              onChange={(event) => setBill(Number(event.target.value))}
              aria-valuemin={MIN_BILL}
              aria-valuemax={MAX_BILL}
              aria-valuenow={bill}
              aria-valuetext={`${formatKes(bill)} per month`}
              className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-none accent-[var(--brand-ink)]"
              style={{
                background: `linear-gradient(to right, var(--brand-ink) ${progress}%, #D8DEE0 ${progress}%)`,
              }}
            />
            <div className="tnum mt-2 flex justify-between text-[11px] font-medium text-faint">
              <span>{formatKes(MIN_BILL)}</span>
              <span>{formatKes(MAX_BILL)}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Bill presets">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBill(preset)}
                  aria-pressed={bill === preset}
                  data-active={bill === preset}
                  className="chip tnum"
                >
                  {formatKes(preset)}
                </button>
              ))}
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
            {figures.map((figure) => (
              <div key={figure.label} className="bg-white p-4">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
                  {figure.label}
                </dt>
                <dd className="tnum mt-1.5 font-[Roboto] text-lg font-bold text-ink">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 border-l-2 border-brand-ink pl-3 text-[12px] leading-[1.6] text-muted">
            Ten year saving of {formatKes(result.tenYearSavings)} at a 6 percent annual tariff
            escalation.
          </p>

          <Link href="/quote" className="btn-brand mt-7 w-full">
            Get this design quoted
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="p-7 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h4 className="font-[Roboto] text-[0.9375rem] font-bold text-ink">
                Savings against grid spend, over 10 years
              </h4>
              <p className="mt-1 text-[12px] text-muted">Cumulative figures in Kenya shillings.</p>
            </div>
            <ul className="flex items-center gap-4 text-[11px] font-semibold text-muted">
              <li className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-4 bg-brand-ink" aria-hidden="true" />
                Your savings
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-4 bg-[#7B8D93]" aria-hidden="true" />
                Grid cost
              </li>
            </ul>
          </div>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.chart} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B6B3A" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#0B6B3A" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gridFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#12222C" stopOpacity={0.14} />
                    <stop offset="100%" stopColor="#12222C" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 6" stroke="#12222C" strokeOpacity={0.1} />
                <XAxis
                  dataKey="year"
                  tickFormatter={(value: number) => `Y${value}`}
                  tick={{ fill: "#46595F", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={compactKes}
                  tick={{ fill: "#46595F", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={54}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    formatKes(value),
                    name === "savings" ? "Your savings" : "Grid cost",
                  ]}
                  labelFormatter={(label: number) => `Year ${label}`}
                  contentStyle={{
                    borderRadius: 3,
                    border: "1px solid rgba(18,34,44,0.2)",
                    fontSize: 12,
                    color: "#12222C",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px -18px rgba(18,34,44,0.6)",
                  }}
                  labelStyle={{ color: "#46595F", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="gridCost"
                  stroke="#7B8D93"
                  strokeWidth={2}
                  fill="url(#gridFill)"
                  isAnimationActive
                  animationDuration={900}
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#0B6B3A"
                  strokeWidth={2.5}
                  fill="url(#savingsFill)"
                  isAnimationActive
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <dl className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line">
            {[
              { label: "Units offset", value: `${result.monthlyUnits.toLocaleString("en-KE")} kWh` },
              { label: "CO2 avoided", value: `${result.firstYearCo2} t a year` },
              { label: "Payback", value: `${result.paybackMonths} months` },
            ].map((item) => (
              <div key={item.label} className="px-3 py-3 first:pl-0 last:pr-0">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
                  {item.label}
                </dt>
                <dd className="tnum mt-1 text-[13px] font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[11px] leading-[1.65] text-muted">
            Estimates use a 24 shilling average unit tariff, 120 kWh generated per installed kW
            each month, and a 72 percent solar share of consumption. Your free site assessment
            replaces these with measured figures.
          </p>
        </div>
      </div>
    </div>
  );
}
