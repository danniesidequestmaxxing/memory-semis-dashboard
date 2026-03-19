// DATA — LAST PULL: MARCH 20, 2026
// US: Yahoo Finance 3/18 close. MU updated post-ER (~$420 on 3/20).
// KRX: Investing.com 3/19. TWSE/TSE: estimated. AMS/SWX: 3/17-18.
// Fwd PE: StockAnalysis, GuruFocus, Morningstar. EV/EBITDA: StockAnalysis, Yahoo.
// Broader market down 3/19-20: Fed hold + Iran-Qatar geopolitical.

export const TIERS = [
  {
    id:"demand", label:"DEMAND — Capital deployers", width:30,
    what:"Who's spending the money. $660-690B combined capex 2026. 90% of OpCF consumed. $400B+ debt issuance.",
    industry:"Winner-take-most. Infinite balance sheets. Supply-constrained not demand-constrained.",
    value:"Fully valued. Not the trade — they're the catalyst.",
    medPE:28, medEV:22, medFCF:-10,
    cos:[
      {t:"AMZN",n:"Amazon",px:"$195.50",pe:35,ev:28,mc:"$2.1T",v:"Yahoo 3/18",beta:1.15,fcf:2.1,revGr:12,yf:"AMZN"},
      {t:"GOOG",n:"Alphabet",px:"$175.20",pe:22,ev:18,mc:"$2.2T",v:"Yahoo 3/18",beta:1.05,fcf:3.5,revGr:14,yf:"GOOG"},
      {t:"META",n:"Meta",px:"$665",pe:24,ev:18,mc:"$1.7T",v:"Yahoo 3/18",beta:1.25,fcf:2.5,revGr:18,yf:"META"},
      {t:"MSFT",n:"Microsoft",px:"$395",pe:32,ev:26,mc:"$2.9T",v:"Yahoo 3/18",beta:0.9,fcf:2.8,revGr:15,yf:"MSFT"},
      {t:"ORCL",n:"Oracle",px:"$155",pe:28,ev:22,mc:"$430B",v:"Yahoo 3/18",beta:1.1,fcf:2.0,revGr:16,yf:"ORCL"},
      {t:"CRWV",n:"CoreWeave",px:"$52",pe:null,ev:null,mc:"$35B",v:"Yahoo 3/18",beta:2.5,fcf:-5,revGr:150,yf:"CRWV"},
      {t:"—",n:"OpenAI",px:"Private",pe:null,ev:null,mc:"~$340B",v:"Last round",beta:null,fcf:null,revGr:200,yf:null},
      {t:"—",n:"Anthropic",px:"Private",pe:null,ev:null,mc:"~$150B",v:"Last round",beta:null,fcf:null,revGr:300,yf:null},
      {t:"—",n:"xAI",px:"Private",pe:null,ev:null,mc:"~$75B",v:"Last round",beta:null,fcf:null,revGr:null,yf:null},
    ]
  },
  {
    id:"compute", label:"COMPUTE — GPUs & custom silicon", width:35,
    what:"AI accelerators. Blackwell Ultra = $4k HBM/chip. NVIDIA 80%+ training share. Custom ASICs growing.",
    industry:"Near-monopoly (NVDA). CUDA moat. Revenue = f(hyperscaler capex).",
    value:"Priced for perfection. NVDA sideways 6mo = consolidation setup. Citrini sees upside surprise.",
    medPE:31, medEV:26, medFCF:28,
    cos:[
      {t:"NVDA",n:"NVIDIA",px:"$180.38",pe:35,ev:28,mc:"$4.4T",v:"Yahoo 3/18",beta:1.7,fcf:2.2,revGr:55,yf:"NVDA"},
      {t:"AVGO",n:"Broadcom",px:"$315.93",pe:32,ev:25,mc:"$1.1T",v:"Yahoo 3/18",beta:1.3,fcf:2.8,revGr:22,yf:"AVGO"},
      {t:"AMD",n:"AMD",px:"$199.46",pe:28,ev:22,mc:"$325B",v:"Yahoo 3/18",beta:1.6,fcf:3.0,revGr:25,yf:"AMD"},
      {t:"MRVL",n:"Marvell",px:"$87.62",pe:35,ev:28,mc:"$76B",v:"Yahoo 3/18",beta:1.5,fcf:1.5,revGr:20,yf:"MRVL"},
    ]
  },
  {
    id:"foundry", label:"FOUNDRY — Where chips get made", width:42,
    what:"TSMC 70% leading-edge, $190-200B 3yr capex. CoWoS bottleneck. Intel 18A ramp. GFS/UMC = specialty value.",
    industry:"Natural monopoly (leading). Chinese flooding (trailing). Specialty nodes undervalued.",
    value:"TSMC fair at 22x. GFS 3.2x P/S (vs 13x peer avg). UMC 14x = cheapest foundry.",
    medPE:22, medEV:8, medFCF:15,
    cos:[
      {t:"TSM",n:"TSMC",px:"$339.57",pe:22,ev:15,mc:"$880B",v:"Yahoo 3/18",beta:1.1,fcf:2.0,revGr:25,yf:"TSM"},
      {t:"005930",n:"Samsung Semi",px:"₩57,500",pe:12,ev:6,mc:"$350B",v:"KRX 3/19",beta:1.1,fcf:4.0,revGr:10,yf:"005930.KS"},
      {t:"INTC",n:"Intel",px:"$45.03",pe:null,ev:35,mc:"$195B",v:"Yahoo 3/18",beta:1.6,fcf:-3,revGr:-5,yf:"INTC"},
      {t:"GFS",n:"GlobalFoundries",px:"$41.86",pe:42,ev:8,mc:"$7.5B",v:"Stockopedia 3/18",beta:1.3,fcf:0.5,revGr:5,yf:"GFS"},
      {t:"UMC",n:"UMC",px:"$48.50",pe:14,ev:6,mc:"$18B",v:"Yahoo 3/18",beta:0.9,fcf:5.5,revGr:8,yf:"UMC"},
    ]
  },
  {
    id:"memory", label:"MEMORY — The bottleneck", width:50,
    what:"MU reported 3/18: rev tripled to $23.9B, guided Q3 $33.5B. DDR4 premium to DDR5. Panic buying. MLC NAND -41.7% YoY.",
    industry:"Oligopoly (Big 3 = 95%). AI demand structural. HBM constrained through 2027.",
    value:"SK Hynix 8x, MU ~7x post-ER = cheapest large-cap semis. Legacy (Nanya 18x, ESMT 15x) = cyclical asymmetry.",
    medPE:13, medEV:10, medFCF:25,
    cos:[
      {t:"000660",n:"SK Hynix",px:"₩1,013,000",pe:8,ev:7.5,mc:"$435B",v:"Investing 3/19",beta:1.4,fcf:5.5,revGr:40,yf:"000660.KS"},
      {t:"MU",n:"Micron",px:"~$420",pe:7,ev:6,mc:"~$480B",v:"3/20 est post-ER",beta:1.3,fcf:3.5,revGr:196,yf:"MU"},
      {t:"2408",n:"Nanya Tech",px:"NT$88.5",pe:18,ev:14,mc:"$5.8B",v:"TWSE est",beta:1.5,fcf:2.0,revGr:25,yf:"2408.TW"},
      {t:"2344",n:"Winbond",px:"NT$42.3",pe:22,ev:16,mc:"$3.2B",v:"TWSE est",beta:1.3,fcf:1.5,revGr:20,yf:"2344.TW"},
      {t:"2337",n:"Macronix",px:"NT$46.8",pe:20,ev:12,mc:"$2.1B",v:"TWSE est",beta:1.2,fcf:2.0,revGr:15,yf:"2337.TW"},
      {t:"3006",n:"ESMT",px:"NT$33.5",pe:15,ev:10,mc:"$0.6B",v:"TWSE est",beta:1.4,fcf:3.0,revGr:30,yf:"3006.TW"},
    ]
  },
  {
    id:"wfe", label:"WFE OEMs — Fab equipment makers", width:58,
    what:"Deposition, etch, lithography, inspection. ASML = EUV monopoly. 1,500+ steps at 3nm. Each node +30% fab cost.",
    industry:"Segmented oligopoly. Very high barriers. Upcycle is priced in at OEM level.",
    value:"Mostly fair (30-38x). ONTO 27x PEG 0.86 best value. Lam 25x decent. ASM 38x = premium for ALD shift.",
    medPE:32, medEV:25, medFCF:22,
    cos:[
      {t:"ASML",n:"ASML",px:"€780",pe:32,ev:28,mc:"$315B",v:"AMS 3/18",beta:1.2,fcf:1.8,revGr:20,yf:"ASML"},
      {t:"AMAT",n:"Applied Materials",px:"$354.76",pe:34,ev:29,mc:"$282B",v:"Yahoo 3/18",beta:1.7,fcf:2.2,revGr:20,yf:"AMAT"},
      {t:"LRCX",n:"Lam Research",px:"$975",pe:25,ev:20,mc:"$125B",v:"Yahoo 3/18",beta:1.4,fcf:3.0,revGr:28,yf:"LRCX"},
      {t:"KLAC",n:"KLA Corp",px:"$1,480",pe:35,ev:30,mc:"$194B",v:"PitchBook 3/18",beta:1.3,fcf:2.5,revGr:15,yf:"KLAC"},
      {t:"8035",n:"Tokyo Electron",px:"¥28,500",pe:25,ev:22,mc:"$95B",v:"TSE est",beta:1.2,fcf:2.5,revGr:18,yf:"8035.T"},
      {t:"ASM",n:"ASM International",px:"€681.80",pe:38,ev:32,mc:"$33B",v:"Investing 3/17",beta:1.4,fcf:1.5,revGr:22,yf:"ASM.AS"},
      {t:"ONTO",n:"Onto Innovation",px:"$201.74",pe:27,ev:21,mc:"$10B",v:"Robinhood 3/18",beta:1.5,fcf:3.8,revGr:25,yf:"ONTO"},
    ]
  },
  {
    id:"packaging", label:"PACKAGING — Stacking & bonding", width:68,
    what:"CoWoS, hybrid bonding, TC bonding, OSAT. HBM4E hybrid bonding = key catalyst. BESI has takeover interest.",
    industry:"Duopoly in bonding equip (BESI + ASMPT). Fragmented OSAT. Hanmi at risk from tech shift.",
    value:"BIGGEST GAP: BESI 54x vs ASMPT 16x. ASMPT = clearest asymmetric setup in entire chain.",
    medPE:21, medEV:15, medFCF:15,
    cos:[
      {t:"BESI",n:"BE Semiconductor",px:"€170",pe:54,ev:38,mc:"$15B",v:"GuruFocus fwd",beta:1.6,fcf:1.5,revGr:35,yf:"BESI.AS"},
      {t:"522",n:"ASMPT Limited",px:"HK$98",pe:16,ev:12,mc:"$6B",v:"HKEX est",beta:1.3,fcf:4.0,revGr:18,yf:"0522.HK"},
      {t:"AMKR",n:"Amkor Technology",px:"$47.34",pe:26,ev:15,mc:"$11.7B",v:"Robinhood 3/18",beta:1.5,fcf:1.0,revGr:8,yf:"AMKR"},
      {t:"6239",n:"Powertech Tech",px:"NT$168",pe:14,ev:10,mc:"$8B",v:"TWSE est",beta:1.2,fcf:3.0,revGr:15,yf:"6239.TW"},
      {t:"KLIC",n:"Kulicke & Soffa",px:"$68.50",pe:25,ev:18,mc:"$4.5B",v:"Yahoo est",beta:1.4,fcf:3.5,revGr:15,yf:"KLIC"},
      {t:"042700",n:"Hanmi Semi",px:"₩68,000",pe:20,ev:15,mc:"$2.5B",v:"KRX est",beta:1.5,fcf:3.0,revGr:10,yf:"042700.KS"},
    ]
  },
  {
    id:"testing", label:"TESTING — Quality control & consumables", width:80,
    what:"ATE (Advantest 60-70%), probers, handlers, burn-in. Probe cards & sockets = high-margin recurring. HBM = most complex test.",
    industry:"Oligopoly (ATE). Niche leaders (consumables). Consumables wear out = recurring revenue.",
    value:"Wide spread. FORM 26x (run up +320%). MJC 18x, ISC 14x = cheaper with similar exposure.",
    medPE:22, medEV:15, medFCF:18,
    cos:[
      {t:"6857",n:"Advantest",px:"¥9,200",pe:35,ev:30,mc:"$55B",v:"TSE est",beta:1.5,fcf:1.8,revGr:25,yf:"6857.T"},
      {t:"TER",n:"Teradyne",px:"$290",pe:42,ev:35,mc:"$47B",v:"CompMktCap",beta:1.3,fcf:1.5,revGr:20,yf:"TER"},
      {t:"FORM",n:"FormFactor",px:"$95.93",pe:26,ev:27,mc:"$7.5B",v:"Robinhood 3/18",beta:1.5,fcf:0.2,revGr:32,yf:"FORM"},
      {t:"6871",n:"Micronics JP",px:"¥5,800",pe:18,ev:15,mc:"$1.8B",v:"TSE est",beta:1.2,fcf:3.0,revGr:18,yf:"6871.T"},
      {t:"TPRO",n:"Technoprobe",px:"€10.50",pe:38,ev:32,mc:"$6.5B",v:"MIL est",beta:1.4,fcf:1.5,revGr:20,yf:"TPRO.MI"},
      {t:"COHU",n:"Cohu",px:"$28.00",pe:65,ev:null,mc:"$1.3B",v:"Fintel 3/9",beta:1.6,fcf:0,revGr:12,yf:"COHU"},
      {t:"AEHR",n:"Aehr Test",px:"$36.00",pe:80,ev:null,mc:"$1.1B",v:"StockAnalysis",beta:2.0,fcf:-2,revGr:35,yf:"AEHR"},
      {t:"6515",n:"WinWay",px:"NT$265",pe:16,ev:12,mc:"$1.2B",v:"TWSE est",beta:1.3,fcf:4.0,revGr:22,yf:"6515.TW"},
      {t:"095340",n:"ISC",px:"₩38,000",pe:14,ev:10,mc:"$0.5B",v:"KRX est",beta:1.2,fcf:5.0,revGr:20,yf:"095340.KS"},
      {t:"058470",n:"LEENO",px:"₩178,000",pe:15,ev:11,mc:"$0.8B",v:"KRX est",beta:1.1,fcf:4.5,revGr:18,yf:"058470.KS"},
      {t:"6961",n:"Enplas",px:"¥8,200",pe:16,ev:10,mc:"$0.7B",v:"TSE est",beta:0.9,fcf:4.0,revGr:10,yf:"6961.T"},
    ]
  },
  {
    id:"subsystems", label:"SUBSYSTEMS — Picks & shovels²", width:95,
    what:"Gas, vacuum, plasma, thermal, cleaning. Every WFE tool = hundreds of subcomponents. 1,500+ process steps. HBM +50% wafer starts = 100-200% more content.",
    industry:"Fragmented niche leaders. OEM in-housing overstated. P/S 1-5x vs WFE 7-12x.",
    value:"THE VALUE LAYER. Ferrotec 12x, UCTT 20x (1.1x P/S), Ichor 22x (1.2x P/S) = cheapest in entire ecosystem.",
    medPE:22, medEV:16, medFCF:13,
    cos:[
      {t:"MKSI",n:"MKS Instruments",px:"$262.94",pe:28,ev:18,mc:"$17.7B",v:"PitchBook 2/17",beta:1.5,fcf:3.5,revGr:12,yf:"MKSI"},
      {t:"ENTG",n:"Entegris",px:"$135",pe:32,ev:22,mc:"$18B",v:"Yahoo est",beta:1.4,fcf:2.5,revGr:10,yf:"ENTG"},
      {t:"VACN",n:"VAT Group",px:"CHF 580",pe:40,ev:35,mc:"$14B",v:"SWX est",beta:1.3,fcf:2.0,revGr:12,yf:"VACN.SW"},
      {t:"AEIS",n:"Advanced Energy",px:"$135",pe:22,ev:16,mc:"$5.5B",v:"Yahoo est",beta:1.4,fcf:3.5,revGr:15,yf:"AEIS"},
      {t:"UCTT",n:"Ultra Clean",px:"$42",pe:20,ev:12,mc:"$2.0B",v:"CompMktCap",beta:1.8,fcf:2.5,revGr:15,yf:"UCTT"},
      {t:"ICHR",n:"Ichor Holdings",px:"$48",pe:22,ev:14,mc:"$1.5B",v:"Yahoo est",beta:1.8,fcf:2.0,revGr:18,yf:"ICHR"},
      {t:"6890",n:"Ferrotec",px:"¥4,800",pe:12,ev:8,mc:"$3.5B",v:"TSE est",beta:1.1,fcf:5.0,revGr:10,yf:"6890.T"},
      {t:"6407",n:"CKD Corp",px:"¥3,200",pe:20,ev:14,mc:"$4.5B",v:"TSE est",beta:1.0,fcf:3.0,revGr:10,yf:"6407.T"},
      {t:"COTN",n:"Comet Holding",px:"CHF 380",pe:30,ev:22,mc:"$3.5B",v:"SWX est",beta:1.3,fcf:2.0,revGr:12,yf:"COTN.SW"},
      {t:"ASYS",n:"Amtech Systems",px:"$7.50",pe:25,ev:8,mc:"$0.3B",v:"Yahoo est",beta:1.5,fcf:0,revGr:8,yf:"ASYS"},
      {t:"PDFS",n:"PDF Solutions",px:"$38",pe:50,ev:40,mc:"$1.5B",v:"Yahoo est",beta:1.3,fcf:1.0,revGr:20,yf:"PDFS"},
    ]
  },
];

export const TIER_COLORS = {
  demand:'#fb923c', compute:'#fbbf24', foundry:'#c084fc', memory:'#4ade80',
  wfe:'#5eead4', packaging:'#f472b6', testing:'#60a5fa', subsystems:'#a78bfa'
};

export const VALUATION_GAPS = [
  {a:"BESI",aPE:54,b:"ASMPT",bPE:16,note:"Only true peers in hybrid/TC bonding. Both supply SK Hynix, Samsung, TSMC."},
  {a:"FormFactor",aPE:26,b:"Micronics JP",bPE:18,note:"#1 and #2 probe card makers. Both serve memory. FORM = US premium, MJC = Japan discount."},
  {a:"Advantest",aPE:35,b:"ISC / LEENO",bPE:14,note:"ATE vs sockets. Different products, same end-market. Consumables = recurring."},
  {a:"WFE OEMs",aPE:32,b:"Subsystems",bPE:22,note:"Subsystems go inside WFE tools. Same cycle but 10x valuation gap (P/S 7-12x vs 1-5x)."},
];
