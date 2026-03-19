# AI Memory Supply Chain — Valuation Pyramid

Interactive dashboard mapping the AI semiconductor supply chain from hyperscaler capex to upstream materials chokepoints. 150+ companies across 12 supply chain tiers, with live Yahoo Finance data refreshed daily.

## Live Dashboard

Deployed on Vercel with automatic daily data refresh at 10:35 AM ET on weekdays.

## Features

### Valuation Views
- **Pyramid** — Expandable tiers showing industry structure, moat quality, median valuations, company profiles, and full metrics tables
- **Supply Chain Flow** — Upstream to downstream diagram with EBITDA margin vs P/E hypothesis test and actionable investment interpretation by tier
- **PE vs Beta** — Risk-adjusted valuation bubble chart (x = beta, y = forward P/E, bubble size = market cap) with interpretation guide
- **FCF Yield** — Top 25 companies ranked by free cash flow yield
- **Revenue Growth** — Top 30 companies by estimated forward revenue growth
- **Valuation Gaps** — Side-by-side analysis of mispriced peer pairs across the supply chain

### Alpha Tools (Relative Value Tab)
- **Supply Chain Valuation Ratios** — Compares median P/E across upstream, midstream, downstream, and demand tiers to identify when an entire supply chain layer is trading cheap relative to its customers
- **Supplier vs Customer Pairs** — 28 explicit supplier-to-customer relationships (e.g. TSMC to NVIDIA, SK Hynix to Google) with P/E ratio comparisons sorted by dislocation
- **Asymmetry Score** — Composite ranking of every public company using (RevGr / PE) x (EBITDA Margin / 20) x Size Factor, where smaller companies receive a higher multiplier to surface overlooked names with the best risk/reward
- **Supply Chain Lag Detector** — Compares 50-day momentum between each supplier-customer pair to flag when downstream names have rallied but upstream suppliers have not yet followed

## Supply Chain Tiers (12)

| Stream | Tier | Examples |
|--------|------|----------|
| Upstream | Materials | AXT, IQE, Soitec, Corning, Sumitomo |
| Upstream | Subsystems | MKS, Entegris, VAT Group, Ferrotec |
| Midstream | WFE OEMs | ASML, Applied Materials, Lam Research, KLA |
| Midstream | Foundry | TSMC, Samsung, Intel, GlobalFoundries |
| Midstream | Packaging | BESI, ASMPT, Amkor, Powertech |
| Midstream | Testing | Advantest, Teradyne, FormFactor |
| Midstream | Photonics | Lumentum, Coherent, MACOM, Fabrinet |
| Downstream | Compute | NVIDIA, Broadcom, AMD, Marvell |
| Downstream | Memory | SK Hynix, Micron, Nanya, Winbond |
| Downstream | Networking | Ciena, Amphenol, Cisco, Tower Semi |
| Downstream | Power and Thermal | Vertiv, Monolithic Power, Eaton, ON Semi |
| End Demand | Hyperscalers | Amazon, Google, Meta, Microsoft, Oracle |

## Data Sources

- **Live data**: Prices, forward P/E, EV/EBITDA, beta, FCF yield, EBITDA margins, and 50-day/200-day momentum from Yahoo Finance via yahoo-finance2
- **Coverage**: Approximately 75 tickers across US (NYSE/NASDAQ), Korea (KRX), Taiwan (TWSE), Japan (TSE), Europe (AMS/SWX/EPA/LSE), and Hong Kong (HKEX)
- **Refresh**: Vercel cron job runs weekdays at 10:35 AM ET, cached at the edge for 24 hours
- **Fallback**: Static data from March 2026 used when API is unavailable

## Stack

- React 18 + Vite
- Chart.js 4 (via react-chartjs-2)
- yahoo-finance2 for market data
- Vercel (serverless API + edge caching + cron)

## Local Development

```bash
npm install
npm run dev
```

The API endpoint at /api/market-data fetches live data from Yahoo Finance. In local development, the dashboard falls back to static data unless you run the API separately.

## Project Structure

```
src/
  App.jsx        - Main component with all tabs and visualizations
  data.js        - Static company data, tier definitions, supply chain pairs
  index.css      - Dark theme styling
api/
  market-data.js - Vercel serverless function for Yahoo Finance data
vercel.json      - Deployment config with cron schedule
```

## Disclaimer

Not investment advice. All data is point-in-time and should be independently verified.
