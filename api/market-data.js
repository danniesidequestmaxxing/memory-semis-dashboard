// Vercel serverless function — fetches live market data from Yahoo Finance
// Cached at the edge for 24 hours. Warmed daily by Vercel cron.

import yahooFinance from 'yahoo-finance2';

// Yahoo Finance ticker format:
// US: AMZN, KRX: 000660.KS, TWSE: 2408.TW, TSE Japan: 6857.T
// Amsterdam: BESI.AS, Swiss: VACN.SW, HKEX: 0522.HK, Milan: TPRO.MI

const TICKERS = [
  'AMZN','GOOG','META','MSFT','ORCL','CRWV',
  'NVDA','AVGO','AMD','MRVL',
  'TSM','005930.KS','INTC','GFS','UMC',
  '000660.KS','MU','2408.TW','2344.TW','2337.TW','3006.TW',
  'ASML','AMAT','LRCX','KLAC','8035.T','ASM.AS','ONTO',
  'BESI.AS','0522.HK','AMKR','6239.TW','KLIC','042700.KS',
  '6857.T','TER','FORM','6871.T','TPRO.MI','COHU','AEHR','6515.TW','095340.KS','058470.KS','6961.T',
  'MKSI','ENTG','VACN.SW','AEIS','UCTT','ICHR','6890.T','6407.T','COTN.SW','ASYS','PDFS',
  'LITE','COHR','AAOI','SIVE.ST','POET','MTSI','FN','HIMX','LWLG',
  'AXTI','IQE.L','SOI.PA','GLW','5802.T',
  'CIEN','NOK','CSCO','APH','TEL','TSEM','VIAV','KEYS',
  'VRT','MPWR','VICR','ETN','NVT','MOD','ON','IFX.DE','SU.PA',
];

const CURRENCY_MAP = {
  KRW: '₩', TWD: 'NT$', JPY: '¥', EUR: '€', CHF: 'CHF ', HKD: 'HK$', USD: '$',
  GBP: '£', SEK: 'SEK ', GBp: '£',
};

function formatPrice(price, currency) {
  if (!price) return null;
  const prefix = CURRENCY_MAP[currency] || '$';
  if (price > 10000) return `${prefix}${Math.round(price).toLocaleString()}`;
  if (price > 100) return `${prefix}${Math.round(price)}`;
  return `${prefix}${price.toFixed(2)}`;
}

function formatMarketCap(mc) {
  if (!mc) return null;
  if (mc >= 1e12) return `$${(mc / 1e12).toFixed(1)}T`;
  if (mc >= 1e9) return `$${(mc / 1e9).toFixed(0)}B`;
  if (mc >= 1e6) return `$${(mc / 1e6).toFixed(0)}M`;
  return `$${mc}`;
}

export default async function handler(req, res) {
  try {
    const results = {};
    const now = new Date().toISOString().split('T')[0];

    // Fetch quotes in parallel batches to stay within rate limits
    const batchSize = 15;
    for (let i = 0; i < TICKERS.length; i += batchSize) {
      const batch = TICKERS.slice(i, i + batchSize);
      const promises = batch.map(async (ticker) => {
        try {
          const quote = await yahooFinance.quote(ticker);
          if (!quote) return;

          const currency = quote.currency || 'USD';
          const rawPrice = quote.regularMarketPrice;
          const avg50 = quote.fiftyDayAverage;
          const avg200 = quote.twoHundredDayAverage;
          // For non-USD market caps, Yahoo already gives USD marketCap
          results[ticker] = {
            px: formatPrice(rawPrice, currency),
            pe: quote.forwardPE ? Math.round(quote.forwardPE) : (quote.trailingPE ? Math.round(quote.trailingPE) : null),
            ev: null, // will fill from quoteSummary
            beta: quote.beta ? parseFloat(quote.beta.toFixed(2)) : null,
            mc: formatMarketCap(quote.marketCap),
            fcf: null, // will fill from quoteSummary
            mom50d: (rawPrice && avg50) ? parseFloat(((rawPrice - avg50) / avg50 * 100).toFixed(1)) : null,
            mom200d: (rawPrice && avg200) ? parseFloat(((rawPrice - avg200) / avg200 * 100).toFixed(1)) : null,
            v: `Yahoo ${now}`,
          };
        } catch (e) {
          console.warn(`Failed to fetch quote for ${ticker}:`, e.message);
        }
      });
      await Promise.all(promises);
    }

    // Fetch detailed financials for EV/EBITDA and FCF yield
    // Only for tickers we got quotes for
    const detailTickers = Object.keys(results);
    for (let i = 0; i < detailTickers.length; i += batchSize) {
      const batch = detailTickers.slice(i, i + batchSize);
      const promises = batch.map(async (ticker) => {
        try {
          const summary = await yahooFinance.quoteSummary(ticker, {
            modules: ['defaultKeyStatistics', 'financialData'],
          });
          const stats = summary?.defaultKeyStatistics;
          const fin = summary?.financialData;

          if (stats?.enterpriseToEbitda) {
            results[ticker].ev = Math.round(stats.enterpriseToEbitda);
          }
          if (fin?.freeCashflow && fin?.marketCap) {
            results[ticker].fcf = parseFloat(((fin.freeCashflow / fin.marketCap) * 100).toFixed(1));
          }
          if (fin?.ebitdaMargins) {
            results[ticker].ebitdaMargin = parseFloat((fin.ebitdaMargins * 100).toFixed(1));
          }
          // Beta fallback from defaultKeyStatistics
          if (!results[ticker].beta && stats?.beta) {
            results[ticker].beta = parseFloat(stats.beta.toFixed(2));
          }
        } catch (e) {
          // Some tickers may not have detailed financials — that's okay
          console.warn(`Failed to fetch details for ${ticker}:`, e.message);
        }
      });
      await Promise.all(promises);
    }

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    return res.status(200).json({ updated: now, data: results });
  } catch (err) {
    console.error('Yahoo Finance fetch error:', err);
    return res.status(500).json({ error: 'Failed to fetch market data' });
  }
}
