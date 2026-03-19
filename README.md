# Memory Semiconductor Supply Chain — Valuation Pyramid

Interactive dashboard mapping the AI memory supercycle from $600B+ hyperscaler capex to micro-cap subsystem vendors. 65+ companies across 8 supply chain tiers.

Based on Citrini Research's "Muscle Memory" semis memo (Jan 2026).

## Features

- **Pyramid view** — expandable tiers showing industry structure, moat quality, median valuations, and full company tables
- **PE vs Beta scatter** — risk-adjusted valuation bubble chart (size = market cap)  
- **FCF yield ranking** — who's generating cash relative to valuation
- **Revenue growth chart** — forward growth estimates sorted by acceleration
- **Valuation gaps** — side-by-side comparisons of mispriced peers (BESI 54x vs ASMPT 16x)

## Data Sources

- US prices: Yahoo Finance (3/18/2026 close)
- KRX: Investing.com (3/19/2026)
- Forward PE: StockAnalysis, GuruFocus, Morningstar
- MU updated for post-earnings (reported 3/18: rev $23.9B, guided Q3 $33.5B)
- TWSE/TSE/HKEX/SWX: Estimated from recent data

**For live data integration**, connect: S&P Capital IQ API, Bloomberg DAPI, or Financial Modeling Prep ($15/mo).

## Stack

- React 18 + Vite
- Chart.js 4 (via react-chartjs-2)
- Deployed on Vercel

## Local Development

```bash
npm install
npm run dev
```

## Deploy

```bash
# Via Vercel CLI
npx vercel --prod

# Or connect GitHub repo to Vercel dashboard
```

## Disclaimer

Not investment advice. All data is point-in-time and should be independently verified.
