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
import { ArrowRight, Calculator, TrendingDown } from "lucide-react";
import { calculateSavings, formatKes } from "@/lib/savings";

const MIN_BILL = 3000;
const MAX_BILL = 150000;

function compactKes(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return `${value}`;
}

export default function SavingsCalculator() {
  const [bill, setBill] = useState(18000);
  const result = useMemo(() => calculateSavings(bill), [bill]);

  const progress = ((bill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  return (
    <div className="card-surface overflow-hidden shadow-[0_24px_60px_-48px_rgba(26,42,54,0.8)]">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_1.35fr]">
        <div className="border-b border-[var(--dark)]/10 p-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/12">
              <Calculator className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-[Roboto] text-lg font-bold text-[var(--dark)]">
                Solar savings calculator
              </h3>
              <p className="text-xs text-[var(--dark)]/60">No sign up needed. Instant estimate.</p>
            </div>
          </div>

          <div className="mt-7">
            <label
              htmlFor="monthly-bill"
              className="flex items-baseline justify-between text-sm font-semibold text-[var(--dark)]"
            >
              Monthly KPLC bill
              <span className="font-[Roboto] text-lg font-black text-[#1f8b4a]">
                {formatKes(bill)}
              </span>
            </label>
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
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--light)] accent-[var(--primary)]"
              style={{
                background: `linear-gradient(to right, var(--primary) ${progress}%, #E8ECEE ${progress}%)`,
              }}
            />
            <div className="mt-2 flex justify-between text-[11px] font-medium text-[var(--dark)]/45">
              <span>{formatKes(MIN_BILL)}</span>
              <span>{formatKes(MAX_BILL)}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[6000, 12000, 18000, 35000, 80000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBill(preset)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    bill === preset
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[#1f8b4a]"
                      : "border-[var(--dark)]/12 text-[var(--dark)]/60 hover:border-[var(--primary)]/50"
                  }`}
                >
                  {formatKes(preset)}
                </button>
              ))}
            </div>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[var(--light)] p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-[var(--dark)]/55">
                Estimated monthly saving
              </dt>
              <dd className="mt-1 font-[Roboto] text-xl font-black text-[var(--dark)]">
                {formatKes(result.monthlySavings)}
              </dd>
            </div>
            <div className="rounded-xl bg-[var(--light)] p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-[var(--dark)]/55">
                Payback period
              </dt>
              <dd className="mt-1 font-[Roboto] text-xl font-black text-[var(--dark)]">
                {result.paybackYears} years
              </dd>
            </div>
            <div className="rounded-xl bg-[var(--light)] p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-[var(--dark)]/55">
                Suggested system
              </dt>
              <dd className="mt-1 font-[Roboto] text-xl font-black text-[var(--dark)]">
                {result.systemSizeKw} kW
              </dd>
            </div>
            <div className="rounded-xl bg-[var(--light)] p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-[var(--dark)]/55">
                Installed cost estimate
              </dt>
              <dd className="mt-1 font-[Roboto] text-xl font-black text-[var(--dark)]">
                {formatKes(result.estimatedCost)}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--primary)]/8 px-4 py-3 text-xs font-medium text-[#1f6f3f]">
            <TrendingDown className="h-4 w-4 shrink-0" aria-hidden="true" />
            Ten year saving of {formatKes(result.tenYearSavings)} at a 6 percent annual tariff
            escalation.
          </div>

          <Link href="/quote" className="btn-brand mt-6 w-full justify-center">
            Get this design quoted
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h4 className="font-[Roboto] text-base font-bold text-[var(--dark)]">
                Savings against grid spend, over 10 years
              </h4>
              <p className="mt-1 text-xs text-[var(--dark)]/60">
                Cumulative figures in Kenya shillings.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-[#1f8b4a]">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                Your savings
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--dark)]/60">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1A2A36]/45" aria-hidden="true" />
                Grid cost
              </span>
            </div>
          </div>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.chart} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#32C36C" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#32C36C" stopOpacity={0.03} />
                  </linearGradient>
                  <linearGradient id="gridFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A2A36" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#1A2A36" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="#1A2A36" strokeOpacity={0.08} />
                <XAxis
                  dataKey="year"
                  tickFormatter={(value: number) => `Y${value}`}
                  tick={{ fill: "#536B76", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={compactKes}
                  tick={{ fill: "#536B76", fontSize: 11 }}
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
                    borderRadius: 12,
                    border: "1px solid rgba(26,42,54,0.1)",
                    fontSize: 12,
                    boxShadow: "0 18px 40px -30px rgba(26,42,54,0.8)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="gridCost"
                  stroke="#1A2A36"
                  strokeOpacity={0.5}
                  strokeWidth={2}
                  fill="url(#gridFill)"
                  isAnimationActive
                  animationDuration={900}
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#32C36C"
                  strokeWidth={3}
                  fill="url(#savingsFill)"
                  isAnimationActive
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-[var(--dark)]/8 p-3">
              <p className="text-[11px] uppercase tracking-wide text-[var(--dark)]/50">
                Units offset
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--dark)]">
                {result.monthlyUnits.toLocaleString("en-KE")} kWh
              </p>
            </div>
            <div className="rounded-lg border border-[var(--dark)]/8 p-3">
              <p className="text-[11px] uppercase tracking-wide text-[var(--dark)]/50">
                CO2 avoided
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--dark)]">
                {result.firstYearCo2} t a year
              </p>
            </div>
            <div className="rounded-lg border border-[var(--dark)]/8 p-3">
              <p className="text-[11px] uppercase tracking-wide text-[var(--dark)]/50">
                Payback
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--dark)]">
                {result.paybackMonths} months
              </p>
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-[var(--dark)]/50">
            Estimates use a 24 shilling average unit tariff, 120 kWh generated per installed kW
            each month, and a 72 percent solar share of consumption. Your free site assessment
            replaces these with measured figures.
          </p>
        </div>
      </div>
    </div>
  );
}
