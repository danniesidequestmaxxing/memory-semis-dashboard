// DATA — LAST PULL: MARCH 20, 2026
// US: Yahoo Finance 3/18 close. MU updated post-ER (~$420 on 3/20).
// KRX: Investing.com 3/19. TWSE/TSE: estimated. AMS/SWX: 3/17-18.
// Fwd PE: StockAnalysis, GuruFocus, Morningstar. EV/EBITDA: StockAnalysis, Yahoo.
// Broader market down 3/19-20: Fed hold + Iran-Qatar geopolitical.

export const TIERS = [
  {
    id:"demand", label:"DEMAND — Capital deployers", icon:"☁️",
    what:"Who's spending the money. $660-690B combined capex 2026. 90% of OpCF consumed. $400B+ debt issuance.",
    industry:"Winner-take-most. Infinite balance sheets. Supply-constrained not demand-constrained.",
    value:"Fully valued. Not the trade — they're the catalyst.",
    medPE:28, medEV:22, medFCF:-10,
    cos:[
      {t:"AMZN",n:"Amazon",px:"$195.50",pe:35,ev:28,mc:"$2.1T",v:"Yahoo 3/18",beta:1.15,fcf:2.1,revGr:12,yf:"AMZN",desc:"Largest cloud provider (AWS). Building custom Trainium chips.",products:"AWS, Trainium, Inferentia, data centers",clients:"Enterprises, startups, government"},
      {t:"GOOG",n:"Alphabet",px:"$175.20",pe:22,ev:18,mc:"$2.2T",v:"Yahoo 3/18",beta:1.05,fcf:3.5,revGr:14,yf:"GOOG",desc:"Search + cloud + AI lab. Custom TPUs for training & inference.",products:"Google Cloud, TPU v5, Gemini, Search",clients:"Enterprises, developers, advertisers"},
      {t:"META",n:"Meta",px:"$665",pe:24,ev:18,mc:"$1.7T",v:"Yahoo 3/18",beta:1.25,fcf:2.5,revGr:18,yf:"META",desc:"Social media + massive AI infra buildout. Custom MTIA chips.",products:"Facebook, Instagram, WhatsApp, MTIA, Llama",clients:"Advertisers, developers, consumers"},
      {t:"MSFT",n:"Microsoft",px:"$395",pe:32,ev:26,mc:"$2.9T",v:"Yahoo 3/18",beta:0.9,fcf:2.8,revGr:15,yf:"MSFT",desc:"Azure cloud + OpenAI partnership. Copilot across Office suite.",products:"Azure, Copilot, Office 365, Windows",clients:"Enterprises, governments, consumers"},
      {t:"ORCL",n:"Oracle",px:"$155",pe:28,ev:22,mc:"$430B",v:"Yahoo 3/18",beta:1.1,fcf:2.0,revGr:16,yf:"ORCL",desc:"Enterprise database + fast-growing OCI cloud for AI workloads.",products:"OCI, Oracle DB, Fusion Apps, Cerner",clients:"Enterprises, healthcare, governments"},
      {t:"CRWV",n:"CoreWeave",px:"$52",pe:null,ev:null,mc:"$35B",v:"Yahoo 3/18",beta:2.5,fcf:-5,revGr:150,yf:"CRWV",desc:"GPU cloud provider. Pure-play NVIDIA H100/B200 infrastructure.",products:"GPU cloud instances, HPC clusters",clients:"AI labs, MSFT, enterprises"},
      {t:"—",n:"OpenAI",px:"Private",pe:null,ev:null,mc:"~$340B",v:"Last round",beta:null,fcf:null,revGr:200,yf:null,desc:"Leading AI lab. GPT-4/5, ChatGPT. Largest capex consumer.",products:"ChatGPT, GPT API, DALL-E, Sora",clients:"Developers, enterprises, consumers"},
      {t:"—",n:"Anthropic",px:"Private",pe:null,ev:null,mc:"~$150B",v:"Last round",beta:null,fcf:null,revGr:300,yf:null,desc:"AI safety lab. Claude models. Amazon/Google cloud partnerships.",products:"Claude API, Claude.ai",clients:"AWS customers, enterprises, developers"},
      {t:"—",n:"xAI",px:"Private",pe:null,ev:null,mc:"~$75B",v:"Last round",beta:null,fcf:null,revGr:null,yf:null,desc:"Elon Musk's AI lab. Grok models. Memphis supercluster.",products:"Grok, X.ai API",clients:"X/Twitter, enterprises"},
    ]
  },
  {
    id:"compute", label:"COMPUTE — GPUs & custom silicon", icon:"⚡",
    what:"AI accelerators. Blackwell Ultra = $4k HBM/chip. NVIDIA 80%+ training share. Custom ASICs growing.",
    industry:"Near-monopoly (NVDA). CUDA moat. Revenue = f(hyperscaler capex).",
    value:"Priced for perfection. NVDA sideways 6mo = consolidation setup. Citrini sees upside surprise.",
    medPE:31, medEV:26, medFCF:28,
    cos:[
      {t:"NVDA",n:"NVIDIA",px:"$180.38",pe:35,ev:28,mc:"$4.4T",v:"Yahoo 3/18",beta:1.7,fcf:2.2,revGr:55,yf:"NVDA",desc:"GPU monopoly for AI training. Blackwell architecture. CUDA moat.",products:"H100, B200, GB200 NVL72, CUDA, DGX",clients:"Hyperscalers, AI labs, enterprises"},
      {t:"AVGO",n:"Broadcom",px:"$315.93",pe:32,ev:25,mc:"$1.1T",v:"Yahoo 3/18",beta:1.3,fcf:2.8,revGr:22,yf:"AVGO",desc:"Custom AI chips (XPUs) for Google, Meta + networking silicon.",products:"TPU XPUs, Memory ASIC, Tomahawk switches, VMware",clients:"Google, Meta, hyperscalers"},
      {t:"AMD",n:"AMD",px:"$199.46",pe:28,ev:22,mc:"$325B",v:"Yahoo 3/18",beta:1.6,fcf:3.0,revGr:25,yf:"AMD",desc:"#2 GPU for AI (MI300X). CPUs for data centers and PCs.",products:"MI300X, EPYC, Ryzen, Instinct",clients:"MSFT, Meta, cloud providers, OEMs"},
      {t:"MRVL",n:"Marvell",px:"$87.62",pe:35,ev:28,mc:"$76B",v:"Yahoo 3/18",beta:1.5,fcf:1.5,revGr:20,yf:"MRVL",desc:"Custom silicon + networking for cloud AI infrastructure.",products:"Custom ASICs, PAM4 DSPs, DPUs, switches",clients:"Amazon, Google, Microsoft, hyperscalers"},
    ]
  },
  {
    id:"foundry", label:"FOUNDRY — Where chips get made", icon:"🏭",
    what:"TSMC 70% leading-edge, $190-200B 3yr capex. CoWoS bottleneck. Intel 18A ramp. GFS/UMC = specialty value.",
    industry:"Natural monopoly (leading). Chinese flooding (trailing). Specialty nodes undervalued.",
    value:"TSMC fair at 22x. GFS 3.2x P/S (vs 13x peer avg). UMC 14x = cheapest foundry.",
    medPE:22, medEV:8, medFCF:15,
    cos:[
      {t:"TSM",n:"TSMC",px:"$339.57",pe:22,ev:15,mc:"$880B",v:"Yahoo 3/18",beta:1.1,fcf:2.0,revGr:25,yf:"TSM",desc:"World's #1 foundry. 70%+ leading-edge. CoWoS packaging bottleneck.",products:"3nm/5nm wafers, CoWoS, InFO, SoIC",clients:"NVIDIA, Apple, AMD, Qualcomm"},
      {t:"005930",n:"Samsung Semi",px:"₩57,500",pe:12,ev:6,mc:"$350B",v:"KRX 3/19",beta:1.1,fcf:4.0,revGr:10,yf:"005930.KS",desc:"Memory + foundry. #2 in DRAM/NAND, #2 foundry. HBM3E ramp.",products:"HBM3E, DDR5, NAND, 3nm GAA foundry",clients:"Qualcomm, NVIDIA, hyperscalers"},
      {t:"INTC",n:"Intel",px:"$45.03",pe:null,ev:35,mc:"$195B",v:"Yahoo 3/18",beta:1.6,fcf:-3,revGr:-5,yf:"INTC",desc:"CPU incumbent. 18A foundry ramp. Restructuring under turnaround.",products:"Xeon, Core Ultra, Intel 18A foundry, Gaudi",clients:"PC OEMs, cloud, enterprises, government"},
      {t:"GFS",n:"GlobalFoundries",px:"$41.86",pe:42,ev:8,mc:"$7.5B",v:"Stockopedia 3/18",beta:1.3,fcf:0.5,revGr:5,yf:"GFS",desc:"Specialty foundry. Auto, IoT, RF. Not competing in leading-edge.",products:"22nm FDX, 12nm FinFET, SiGe, SOI",clients:"Auto OEMs, Qualcomm, ST Micro"},
      {t:"UMC",n:"UMC",px:"$48.50",pe:14,ev:6,mc:"$18B",v:"Yahoo 3/18",beta:0.9,fcf:5.5,revGr:8,yf:"UMC",desc:"Taiwan specialty foundry. Mature nodes. Cheapest foundry by P/E.",products:"28nm, 22nm, specialty CMOS",clients:"Qualcomm, MediaTek, auto, industrial"},
    ]
  },
  {
    id:"memory", label:"MEMORY — The bottleneck", icon:"💾",
    what:"MU reported 3/18: rev tripled to $23.9B, guided Q3 $33.5B. DDR4 premium to DDR5. Panic buying. MLC NAND -41.7% YoY.",
    industry:"Oligopoly (Big 3 = 95%). AI demand structural. HBM constrained through 2027.",
    value:"SK Hynix 8x, MU ~7x post-ER = cheapest large-cap semis. Legacy (Nanya 18x, ESMT 15x) = cyclical asymmetry.",
    medPE:13, medEV:10, medFCF:25,
    cos:[
      {t:"000660",n:"SK Hynix",px:"₩1,013,000",pe:8,ev:7.5,mc:"$435B",v:"Investing 3/19",beta:1.4,fcf:5.5,revGr:40,yf:"000660.KS",desc:"World's #2 DRAM maker. HBM market leader (~50% share).",products:"HBM3E, DDR5, LPDDR5X, NAND",clients:"NVIDIA, Apple, hyperscalers"},
      {t:"MU",n:"Micron",px:"~$420",pe:7,ev:6,mc:"~$480B",v:"3/20 est post-ER",beta:1.3,fcf:3.5,revGr:196,yf:"MU",desc:"US memory champion. #3 DRAM, #4 NAND. HBM3E 12-hi ramp.",products:"HBM3E, DDR5, CXL, NAND SSDs",clients:"NVIDIA, data centers, Apple, auto"},
      {t:"2408",n:"Nanya Tech",px:"NT$88.5",pe:18,ev:14,mc:"$5.8B",v:"TWSE est",beta:1.5,fcf:2.0,revGr:25,yf:"2408.TW",desc:"Taiwan DRAM specialist. Legacy DDR4 premium beneficiary.",products:"DDR4, DDR5, LPDDR4X",clients:"Module makers, PC OEMs, consumer"},
      {t:"2344",n:"Winbond",px:"NT$42.3",pe:22,ev:16,mc:"$3.2B",v:"TWSE est",beta:1.3,fcf:1.5,revGr:20,yf:"2344.TW",desc:"Specialty memory. NOR flash + niche DRAM for IoT/auto.",products:"NOR flash, specialty DRAM, SPI NAND",clients:"Auto Tier 1s, IoT, industrial"},
      {t:"2337",n:"Macronix",px:"NT$46.8",pe:20,ev:12,mc:"$2.1B",v:"TWSE est",beta:1.2,fcf:2.0,revGr:15,yf:"2337.TW",desc:"NOR flash leader for auto and industrial applications.",products:"NOR flash, ROM, NAND",clients:"Automotive, industrial, consumer electronics"},
      {t:"3006",n:"ESMT",px:"NT$33.5",pe:15,ev:10,mc:"$0.6B",v:"TWSE est",beta:1.4,fcf:3.0,revGr:30,yf:"3006.TW",desc:"Small-cap Taiwan DRAM. Mobile & consumer memory.",products:"DDR3/4 DRAM, mobile DRAM, SDRAM",clients:"Consumer electronics, module makers"},
    ]
  },
  {
    id:"wfe", label:"WFE OEMs — Fab equipment makers", icon:"🔧",
    what:"Deposition, etch, lithography, inspection. ASML = EUV monopoly. 1,500+ steps at 3nm. Each node +30% fab cost.",
    industry:"Segmented oligopoly. Very high barriers. Upcycle is priced in at OEM level.",
    value:"Mostly fair (30-38x). ONTO 27x PEG 0.86 best value. Lam 25x decent. ASM 38x = premium for ALD shift.",
    medPE:32, medEV:25, medFCF:22,
    cos:[
      {t:"ASML",n:"ASML",px:"€780",pe:32,ev:28,mc:"$315B",v:"AMS 3/18",beta:1.2,fcf:1.8,revGr:20,yf:"ASML",desc:"Sole EUV lithography maker. Monopoly on leading-edge patterning.",products:"EUV scanners, DUV immersion, metrology",clients:"TSMC, Samsung, Intel, SK Hynix"},
      {t:"AMAT",n:"Applied Materials",px:"$354.76",pe:34,ev:29,mc:"$282B",v:"Yahoo 3/18",beta:1.7,fcf:2.2,revGr:20,yf:"AMAT",desc:"Largest WFE company. Deposition, etch, CMP, inspection.",products:"Endura, Centura, Producer, SEMVision",clients:"TSMC, Samsung, Intel, memory fabs"},
      {t:"LRCX",n:"Lam Research",px:"$975",pe:25,ev:20,mc:"$125B",v:"Yahoo 3/18",beta:1.4,fcf:3.0,revGr:28,yf:"LRCX",desc:"Etch & deposition leader. Critical for 3D NAND and HBM.",products:"Kiyo, Striker, SABRE, Altus",clients:"Memory fabs (SK Hynix, MU), TSMC"},
      {t:"KLAC",n:"KLA Corp",px:"$1,480",pe:35,ev:30,mc:"$194B",v:"PitchBook 3/18",beta:1.3,fcf:2.5,revGr:15,yf:"KLAC",desc:"Process control & inspection monopoly. Finds defects in wafers.",products:"Wafer inspection, overlay metrology, reticle inspection",clients:"All leading fabs worldwide"},
      {t:"8035",n:"Tokyo Electron",px:"¥28,500",pe:25,ev:22,mc:"$95B",v:"TSE est",beta:1.2,fcf:2.5,revGr:18,yf:"8035.T",desc:"Japan's #1 WFE. Coater/developer, etch, deposition.",products:"CLEAN TRACK, Triase, TRIAS",clients:"TSMC, Samsung, all major fabs"},
      {t:"ASM",n:"ASM International",px:"€681.80",pe:38,ev:32,mc:"$33B",v:"Investing 3/17",beta:1.4,fcf:1.5,revGr:22,yf:"ASM.AS",desc:"ALD (atomic layer deposition) leader. Critical for GAA transistors.",products:"ALD systems, PEALD, epitaxy",clients:"TSMC, Samsung, Intel"},
      {t:"ONTO",n:"Onto Innovation",px:"$201.74",pe:27,ev:21,mc:"$10B",v:"Robinhood 3/18",beta:1.5,fcf:3.8,revGr:25,yf:"ONTO",desc:"Inspection & metrology for advanced packaging and lithography.",products:"Dragonfly, Atlas, JetStep",clients:"TSMC, OSAT, memory fabs"},
    ]
  },
  {
    id:"packaging", label:"PACKAGING — Stacking & bonding", icon:"📦",
    what:"CoWoS, hybrid bonding, TC bonding, OSAT. HBM4E hybrid bonding = key catalyst. BESI has takeover interest.",
    industry:"Duopoly in bonding equip (BESI + ASMPT). Fragmented OSAT. Hanmi at risk from tech shift.",
    value:"BIGGEST GAP: BESI 54x vs ASMPT 16x. ASMPT = clearest asymmetric setup in entire chain.",
    medPE:21, medEV:15, medFCF:15,
    cos:[
      {t:"BESI",n:"BE Semiconductor",px:"€170",pe:54,ev:38,mc:"$15B",v:"GuruFocus fwd",beta:1.6,fcf:1.5,revGr:35,yf:"BESI.AS",desc:"#1 in hybrid bonding & TC bonding equipment. HBM4E catalyst.",products:"Hybrid bonding, TC bonding, die attach",clients:"SK Hynix, Samsung, TSMC, ASE"},
      {t:"522",n:"ASMPT Limited",px:"HK$98",pe:16,ev:12,mc:"$6B",v:"HKEX est",beta:1.3,fcf:4.0,revGr:18,yf:"0522.HK",desc:"#2 in bonding equipment. TC bonder competitor to BESI. Undervalued.",products:"TC bonding, die bonding, SMT placement",clients:"SK Hynix, Samsung, OSAT, EMS"},
      {t:"AMKR",n:"Amkor Technology",px:"$47.34",pe:26,ev:15,mc:"$11.7B",v:"Robinhood 3/18",beta:1.5,fcf:1.0,revGr:8,yf:"AMKR",desc:"#2 OSAT globally. Advanced packaging for Apple, AI chips.",products:"2.5D/3D packaging, SiP, FC-BGA, FOWLP",clients:"Apple, NVIDIA, Qualcomm, AMD"},
      {t:"6239",n:"Powertech Tech",px:"NT$168",pe:14,ev:10,mc:"$8B",v:"TWSE est",beta:1.2,fcf:3.0,revGr:15,yf:"6239.TW",desc:"Taiwan OSAT. Memory packaging specialist for HBM.",products:"Memory packaging, bumping, testing",clients:"SK Hynix, Micron, memory fabs"},
      {t:"KLIC",n:"Kulicke & Soffa",px:"$68.50",pe:25,ev:18,mc:"$4.5B",v:"Yahoo est",beta:1.4,fcf:3.5,revGr:15,yf:"KLIC",desc:"Wire bonding leader + advanced packaging. Transitioning to TC bonding.",products:"Wire bonders, wedge bonders, advanced packaging",clients:"OSAT, IDMs, auto Tier 1s"},
      {t:"042700",n:"Hanmi Semi",px:"₩68,000",pe:20,ev:15,mc:"$2.5B",v:"KRX est",beta:1.5,fcf:3.0,revGr:10,yf:"042700.KS",desc:"Korea bonding equipment. At risk from hybrid bonding shift.",products:"Flip chip bonding, die bonding, molding",clients:"Samsung, SK Hynix, Korea OSAT"},
    ]
  },
  {
    id:"testing", label:"TESTING — Quality control & consumables", icon:"🔬",
    what:"ATE (Advantest 60-70%), probers, handlers, burn-in. Probe cards & sockets = high-margin recurring. HBM = most complex test.",
    industry:"Oligopoly (ATE). Niche leaders (consumables). Consumables wear out = recurring revenue.",
    value:"Wide spread. FORM 26x (run up +320%). MJC 18x, ISC 14x = cheaper with similar exposure.",
    medPE:22, medEV:15, medFCF:18,
    cos:[
      {t:"6857",n:"Advantest",px:"¥9,200",pe:35,ev:30,mc:"$55B",v:"TSE est",beta:1.5,fcf:1.8,revGr:25,yf:"6857.T",desc:"ATE leader (60-70% share). Dominant in HBM testing.",products:"V93000, T2000 ATE platforms",clients:"SK Hynix, Samsung, MU, TSMC OSAT"},
      {t:"TER",n:"Teradyne",px:"$290",pe:42,ev:35,mc:"$47B",v:"CompMktCap",beta:1.3,fcf:1.5,revGr:20,yf:"TER",desc:"#2 ATE. SOC + memory test. Also owns Universal Robots.",products:"UltraFLEX, J750, Magnum ATE, cobots",clients:"Apple supply chain, IDMs, OSAT"},
      {t:"FORM",n:"FormFactor",px:"$95.93",pe:26,ev:27,mc:"$7.5B",v:"Robinhood 3/18",beta:1.5,fcf:0.2,revGr:32,yf:"FORM",desc:"#1 probe card maker. Critical for wafer-level HBM test.",products:"MEMS probe cards, probe stations",clients:"SK Hynix, Samsung, MU, Intel"},
      {t:"6871",n:"Micronics JP",px:"¥5,800",pe:18,ev:15,mc:"$1.8B",v:"TSE est",beta:1.2,fcf:3.0,revGr:18,yf:"6871.T",desc:"#2 probe card maker (Japan). HBM probe card beneficiary.",products:"MEMS probe cards, cantilever probes",clients:"Memory fabs, Japan IDMs"},
      {t:"TPRO",n:"Technoprobe",px:"€10.50",pe:38,ev:32,mc:"$6.5B",v:"MIL est",beta:1.4,fcf:1.5,revGr:20,yf:"TPRO.MI",desc:"Italian probe card maker. Growing in advanced logic testing.",products:"Vertical probe cards, MEMS probes",clients:"Intel, TSMC, Samsung"},
      {t:"COHU",n:"Cohu",px:"$28.00",pe:65,ev:null,mc:"$1.3B",v:"Fintel 3/9",beta:1.6,fcf:0,revGr:12,yf:"COHU",desc:"Test handlers + contactors. Picks & places chips during test.",products:"Handlers, contactors, thermal solutions",clients:"OSAT, IDMs, auto test"},
      {t:"AEHR",n:"Aehr Test",px:"$36.00",pe:80,ev:null,mc:"$1.1B",v:"StockAnalysis",beta:2.0,fcf:-2,revGr:35,yf:"AEHR",desc:"Wafer-level burn-in. SiC + GaN testing for EV/power.",products:"FOX-XP, FOX-NP burn-in systems",clients:"SiC/GaN chipmakers, auto, EV"},
      {t:"6515",n:"WinWay",px:"NT$265",pe:16,ev:12,mc:"$1.2B",v:"TWSE est",beta:1.3,fcf:4.0,revGr:22,yf:"6515.TW",desc:"Taiwan test socket maker. HBM test socket beneficiary.",products:"Test sockets, burn-in sockets",clients:"Memory fabs, OSAT, ATE users"},
      {t:"095340",n:"ISC",px:"₩38,000",pe:14,ev:10,mc:"$0.5B",v:"KRX est",beta:1.2,fcf:5.0,revGr:20,yf:"095340.KS",desc:"Korea test socket specialist. High-margin consumable for HBM.",products:"IC test sockets, burn-in sockets",clients:"SK Hynix, Samsung, Korea OSAT"},
      {t:"058470",n:"LEENO",px:"₩178,000",pe:15,ev:11,mc:"$0.8B",v:"KRX est",beta:1.1,fcf:4.5,revGr:18,yf:"058470.KS",desc:"Korea test pin & socket maker. Recurring revenue from consumables.",products:"Test pins, sockets, spring probes",clients:"SK Hynix, Samsung, OSAT"},
      {t:"6961",n:"Enplas",px:"¥8,200",pe:16,ev:10,mc:"$0.7B",v:"TSE est",beta:0.9,fcf:4.0,revGr:10,yf:"6961.T",desc:"Japan test socket maker. Also optics and engineering plastics.",products:"IC test sockets, LED lenses, precision plastics",clients:"Memory/logic fabs, auto, LED"},
    ]
  },
  {
    id:"subsystems", label:"SUBSYSTEMS — Picks & shovels²", icon:"⚙️",
    what:"Gas, vacuum, plasma, thermal, cleaning. Every WFE tool = hundreds of subcomponents. 1,500+ process steps. HBM +50% wafer starts = 100-200% more content.",
    industry:"Fragmented niche leaders. OEM in-housing overstated. P/S 1-5x vs WFE 7-12x.",
    value:"THE VALUE LAYER. Ferrotec 12x, UCTT 20x (1.1x P/S), Ichor 22x (1.2x P/S) = cheapest in entire ecosystem.",
    medPE:22, medEV:16, medFCF:13,
    cos:[
      {t:"MKSI",n:"MKS Instruments",px:"$262.94",pe:28,ev:18,mc:"$17.7B",v:"PitchBook 2/17",beta:1.5,fcf:3.5,revGr:12,yf:"MKSI",desc:"Lasers, optics, gas/vacuum subsystems for WFE tools.",products:"Lasers, power supplies, pressure controllers, Atotech PCB",clients:"AMAT, Lam, TEL, ASML"},
      {t:"ENTG",n:"Entegris",px:"$135",pe:32,ev:22,mc:"$18B",v:"Yahoo est",beta:1.4,fcf:2.5,revGr:10,yf:"ENTG",desc:"Specialty chemicals & filtration for chip fabs. Purity matters.",products:"CMP slurries, photoresists, filters, carriers",clients:"TSMC, Samsung, Intel, all fabs"},
      {t:"VACN",n:"VAT Group",px:"CHF 580",pe:40,ev:35,mc:"$14B",v:"SWX est",beta:1.3,fcf:2.0,revGr:12,yf:"VACN.SW",desc:"Vacuum valve monopoly (~50% share). Inside every WFE tool.",products:"Vacuum valves, multi-valve modules, transfer valves",clients:"AMAT, Lam, TEL, ASM, all WFE OEMs"},
      {t:"AEIS",n:"Advanced Energy",px:"$135",pe:22,ev:16,mc:"$5.5B",v:"Yahoo est",beta:1.4,fcf:3.5,revGr:15,yf:"AEIS",desc:"Precision power supplies for plasma etch & deposition tools.",products:"RF power supplies, DC-DC converters, thermal",clients:"AMAT, Lam, TEL, flat panel, industrial"},
      {t:"UCTT",n:"Ultra Clean",px:"$42",pe:20,ev:12,mc:"$2.0B",v:"CompMktCap",beta:1.8,fcf:2.5,revGr:15,yf:"UCTT",desc:"Gas delivery & cleaning systems for WFE. Value play at 1.1x P/S.",products:"Gas panels, weldments, chemical delivery, cleaning",clients:"AMAT, Lam, Tokyo Electron"},
      {t:"ICHR",n:"Ichor Holdings",px:"$48",pe:22,ev:14,mc:"$1.5B",v:"Yahoo est",beta:1.8,fcf:2.0,revGr:18,yf:"ICHR",desc:"Gas & chemical delivery subsystems. Critical plumbing for fabs.",products:"Gas delivery systems, weldments, fluid delivery",clients:"Lam Research, AMAT, other WFE OEMs"},
      {t:"6890",n:"Ferrotec",px:"¥4,800",pe:12,ev:8,mc:"$3.5B",v:"TSE est",beta:1.1,fcf:5.0,revGr:10,yf:"6890.T",desc:"Thermoelectric modules + silicon parts. Cheapest in subsystems at 12x.",products:"Thermoelectric coolers, quartz, silicon parts, vacuum seals",clients:"WFE OEMs, auto, industrial"},
      {t:"6407",n:"CKD Corp",px:"¥3,200",pe:20,ev:14,mc:"$4.5B",v:"TSE est",beta:1.0,fcf:3.0,revGr:10,yf:"6407.T",desc:"Japan pneumatic/flow control components for semiconductor fabs.",products:"Pneumatic valves, flow controllers, vacuum components",clients:"WFE OEMs, fab direct, auto"},
      {t:"COTN",n:"Comet Holding",px:"CHF 380",pe:30,ev:22,mc:"$3.5B",v:"SWX est",beta:1.3,fcf:2.0,revGr:12,yf:"COTN.SW",desc:"Swiss RF power & vacuum capacitor maker for plasma tools.",products:"RF generators, vacuum capacitors, X-ray sources",clients:"Lam, AMAT, industrial, security"},
      {t:"ASYS",n:"Amtech Systems",px:"$7.50",pe:25,ev:8,mc:"$0.3B",v:"Yahoo est",beta:1.5,fcf:0,revGr:8,yf:"ASYS",desc:"Thermal processing & wafer handling equipment. Micro-cap.",products:"Diffusion furnaces, PECVD, wafer handling",clients:"Solar, semiconductor, LED fabs"},
      {t:"PDFS",n:"PDF Solutions",px:"$38",pe:50,ev:40,mc:"$1.5B",v:"Yahoo est",beta:1.3,fcf:1.0,revGr:20,yf:"PDFS",desc:"Yield analytics software + test chips for process control.",products:"Exensio platform, CV test chips, DFI",clients:"TSMC, Samsung, Intel, GlobalFoundries"},
    ]
  },
  {
    id:"photonics", label:"PHOTONICS — Lasers, transceivers & CPO", icon:"🔴",
    what:"EML/CW DFB lasers sold out to 2028. CPO rotation 2027-28. Transceivers = bottleneck as 1.6T ramps. Every AI rack needs 10-50x more optical bandwidth.",
    industry:"Oligopoly in lasers (LITE 40%+). Transceivers fragmenting. CPO emerging. InP laser qualification = 12-18mo barrier.",
    value:"LITE 316% run but 1000%+ thesis. AAOI 10x rev ramp. SIVE micro-cap CW DFB play. COHR full vertical.",
    medPE:30, medEV:20, medFCF:8,
    cos:[
      {t:"LITE",n:"Lumentum",px:"$105",pe:35,ev:22,mc:"$7.2B",v:"Yahoo est",beta:1.5,fcf:3.0,revGr:25,yf:"LITE",desc:"Hidden monopoly in OCS lasers. #1 EML supplier. Google BOM critical.",products:"EML lasers, CW DFB, ROADMs, 3D sensing",clients:"Google, Meta, MSFT, Cisco, Apple"},
      {t:"COHR",n:"Coherent",px:"$92",pe:28,ev:18,mc:"$14B",v:"Yahoo est",beta:1.6,fcf:2.5,revGr:20,yf:"COHR",desc:"Full vertical: InP substrates → lasers → transceivers. Finisar legacy.",products:"800G/1.6T transceivers, VCSEL, InP lasers, SiC substrates",clients:"Hyperscalers, telecom, industrial"},
      {t:"AAOI",n:"Applied Optoelectronics",px:"$32",pe:null,ev:null,mc:"$1.2B",v:"Yahoo est",beta:2.2,fcf:-3,revGr:80,yf:"AAOI",desc:"Made-in-America lasers & transceivers. 10x rev ramp. Buyout target.",products:"EML lasers, 400G/800G transceivers",clients:"Hyperscalers, MSFT, Meta"},
      {t:"SIVEF",n:"Sivers Semiconductors",px:"SEK 45",pe:null,ev:null,mc:"$0.3B",v:"OMX est",beta:2.0,fcf:-10,revGr:100,yf:"SIVE.ST",desc:"Upstream CW DFB lasers for CPO. Mini-LITE at $300M MC. Jabil 1.6T validated.",products:"CW DFB lasers, InP photonic ICs",clients:"POET, Ayar Labs, Jabil, hyperscalers"},
      {t:"POET",n:"POET Technologies",px:"$4.50",pe:null,ev:null,mc:"$0.5B",v:"Yahoo est",beta:2.5,fcf:-15,revGr:null,yf:"POET",desc:"Optical interposer platform. Captive Marvell/Celestial relationship.",products:"Optical interposers, CPO engines",clients:"Marvell/Celestial, hyperscalers"},
      {t:"MTSI",n:"MACOM Technology",px:"$125",pe:38,ev:28,mc:"$8.5B",v:"Yahoo est",beta:1.4,fcf:2.0,revGr:18,yf:"MTSI",desc:"Analog/mixed-signal + laser drivers for optical. EML multi-source.",products:"Laser drivers, TIAs, analog ICs, InP HBTs",clients:"Transceiver makers, telecom, defense"},
      {t:"FN",n:"Fabrinet",px:"$250",pe:30,ev:22,mc:"$9B",v:"Yahoo est",beta:1.3,fcf:3.5,revGr:15,yf:"FN",desc:"Precision optical manufacturing. Makes transceivers for LITE, COHR.",products:"Optical assembly, transceiver packaging, precision OEM",clients:"Lumentum, Coherent, NVIDIA, hyperscalers"},
      {t:"HIMX",n:"Himax Technologies",px:"$11",pe:18,ev:10,mc:"$2B",v:"Yahoo est",beta:1.4,fcf:4.0,revGr:12,yf:"HIMX",desc:"Micro-lens & fiber arrays for CPO. Display IC pivot to photonics.",products:"WLO micro-lens arrays, display drivers, LCOS",clients:"CPO integrators, AR/VR, auto"},
      {t:"LWLG",n:"Lightwave Logic",px:"$5",pe:null,ev:null,mc:"$0.4B",v:"Yahoo est",beta:2.0,fcf:-20,revGr:null,yf:"LWLG",desc:"Speculative electro-optic polymer modulators. Pre-revenue R&D.",products:"Polymer modulators (R&D stage)",clients:"Pre-commercial"},
    ]
  },
  {
    id:"materials", label:"MATERIALS — InP substrates & upstream", icon:"💎",
    what:"InP duopoly (AXTI + Sumitomo = 65%+). SiPh substrates (Soitec monopoly). Qualification cycles 12-18mo. Physics limits on crystal growth.",
    industry:"Extreme concentration. Export control risk. Capacity additions take 2-3 years. Biggest fragility in entire AI chain.",
    value:"AXTI 30-35% InP share at ~$200M MC = massive asymmetry. SOI premium but monopoly. IQE high-risk pivot.",
    medPE:25, medEV:14, medFCF:5,
    cos:[
      {t:"AXTI",n:"AXT Inc",px:"$6.50",pe:null,ev:8,mc:"$0.2B",v:"Yahoo est",beta:1.8,fcf:0,revGr:15,yf:"AXTI",desc:"InP substrate duopolist (30-35% share). Vital precursor tie-in. If AXTI goes down, photonic buildout goes down.",products:"InP, GaAs, Ge substrates, Vital precursor JV",clients:"Lumentum, Coherent, II-VI, laser fabs"},
      {t:"IQE",n:"IQE plc",px:"£0.28",pe:null,ev:null,mc:"$0.2B",v:"LSE est",beta:2.0,fcf:-5,revGr:10,yf:"IQE.L",desc:"Western InP epitaxy. LITE supplier. High-risk restructuring pivot.",products:"InP epiwafers, GaAs epi, GaN epi",clients:"Lumentum, Broadcom, Skyworks"},
      {t:"SOI",n:"Soitec",px:"€95",pe:22,ev:14,mc:"$6B",v:"EPA est",beta:1.3,fcf:3.0,revGr:12,yf:"SOI.PA",desc:"SiPh/SOI substrate monopoly. Every SiPh chip needs Soitec wafers.",products:"SOI wafers, FD-SOI, piezoelectric substrates",clients:"GlobalFoundries, TSMC, STMicro, Tower Semi"},
      {t:"GLW",n:"Corning",px:"$45",pe:20,ev:12,mc:"$37B",v:"Yahoo est",beta:1.1,fcf:4.0,revGr:8,yf:"GLW",desc:"Optical fiber + specialty glass. AI data center fiber demand surging.",products:"Optical fiber, Gorilla Glass, ceramic substrates, GenAI glass",clients:"Hyperscalers, telecom, Apple, auto"},
      {t:"SMTOY",n:"Sumitomo Electric",px:"¥2,400",pe:14,ev:8,mc:"$18B",v:"TSE est",beta:0.9,fcf:3.5,revGr:6,yf:"5802.T",desc:"InP co-duopolist (35%+ share). Also optical fiber & power cables.",products:"InP substrates, optical fiber, GaN, compound semi",clients:"Laser fabs, telecom, auto, infrastructure"},
    ]
  },
  {
    id:"networking", label:"NETWORKING — Optical interconnects & connectors", icon:"🌐",
    what:"800G→1.6T→3.2T transition. Every AI cluster = thousands of optical links. DCO modules, coherent DSPs, high-speed connectors.",
    industry:"Oligopoly in coherent (CIEN, NOK, CSCO). Connectors concentrated (APH, TEL). Modules fragmenting.",
    value:"CIEN 20x reasonable. APH premium justified (25x) — connector monopoly. TSEM = pure-play SiPh foundry.",
    medPE:22, medEV:14, medFCF:10,
    cos:[
      {t:"CIEN",n:"Ciena",px:"$72",pe:20,ev:12,mc:"$10B",v:"Yahoo est",beta:1.2,fcf:4.0,revGr:10,yf:"CIEN",desc:"Coherent optical networking leader. WaveLogic DSPs dominate DCI.",products:"WaveLogic 6, coherent transceivers, packet switches",clients:"Hyperscalers, AT&T, Verizon, enterprises"},
      {t:"NOK",n:"Nokia",px:"€4.50",pe:15,ev:8,mc:"$25B",v:"HEL est",beta:0.9,fcf:5.0,revGr:5,yf:"NOK",desc:"Optical networking + 5G infrastructure. PSE-6s coherent DSP.",products:"Coherent DSPs, optical transport, 5G RAN",clients:"Telecom operators, hyperscalers"},
      {t:"CSCO",n:"Cisco",px:"$58",pe:16,ev:12,mc:"$235B",v:"Yahoo est",beta:0.9,fcf:5.5,revGr:6,yf:"CSCO",desc:"Network switches + optics. Silicon One + Acacia coherent.",products:"Nexus switches, Silicon One, Acacia coherent, ThousandEyes",clients:"Enterprises, hyperscalers, telecom"},
      {t:"APH",n:"Amphenol",px:"$75",pe:35,ev:28,mc:"$90B",v:"Yahoo est",beta:1.1,fcf:3.0,revGr:15,yf:"APH",desc:"High-speed connector monopoly. In every AI rack and GPU tray.",products:"High-speed connectors, fiber optic, power, sensors",clients:"NVIDIA, hyperscalers, auto, defense"},
      {t:"TEL",n:"TE Connectivity",px:"$155",pe:22,ev:16,mc:"$50B",v:"Yahoo est",beta:1.0,fcf:4.0,revGr:8,yf:"TEL",desc:"Connectors & sensors for data centers, auto, industrial.",products:"Data center connectors, sensors, fiber optics, auto harnesses",clients:"Hyperscalers, auto OEMs, industrial"},
      {t:"TSEM",n:"Tower Semiconductor",px:"$55",pe:18,ev:10,mc:"$6B",v:"Yahoo est",beta:1.2,fcf:3.0,revGr:12,yf:"TSEM",desc:"Pure-play SiPh foundry. 70%+ capacity booked. The TSMC of photonics.",products:"SiPh, RF-SOI, SiGe BiCMOS, power BCD",clients:"Broadcom, Marvell, photonics IC designers"},
      {t:"VIAV",n:"VIAV Solutions",px:"$10",pe:null,ev:12,mc:"$2.2B",v:"Yahoo est",beta:1.3,fcf:2.0,revGr:5,yf:"VIAV",desc:"Optical test & measurement. Filters for WDM optical networking.",products:"Optical filters, test instruments, anti-counterfeiting",clients:"Telecom, hyperscalers, government"},
      {t:"KEYS",n:"Keysight Technologies",px:"$170",pe:28,ev:20,mc:"$30B",v:"Yahoo est",beta:1.1,fcf:3.5,revGr:8,yf:"KEYS",desc:"Test & measurement for RF, photonics, high-speed digital.",products:"Oscilloscopes, network analyzers, photonics test, 5G test",clients:"Chip designers, telecom, defense, auto"},
    ]
  },
  {
    id:"power", label:"POWER & THERMAL — Data center infrastructure", icon:"🔌",
    what:"Each AI rack = 50-120kW (vs 10kW traditional). Grid, cooling, power conversion all undersized. Hidden limiter on AI buildout.",
    industry:"Oligopoly in power semis (ON, IFNNY). Vertiv/Eaton dominate cooling/UPS. Data center power demand up 3-5x by 2028.",
    value:"VRT 35x for dominant position. MPWR premium (40x) for AI power module share. VICR niche but expensive.",
    medPE:28, medEV:20, medFCF:12,
    cos:[
      {t:"VRT",n:"Vertiv",px:"$115",pe:35,ev:25,mc:"$43B",v:"Yahoo est",beta:1.5,fcf:2.5,revGr:15,yf:"VRT",desc:"#1 in data center cooling & power distribution. Liquid cooling leader.",products:"CDUs, CRAHs, UPS, PDUs, busways",clients:"Hyperscalers, colocation, enterprise DC"},
      {t:"MPWR",n:"Monolithic Power",px:"$720",pe:42,ev:38,mc:"$34B",v:"Yahoo est",beta:1.4,fcf:2.0,revGr:20,yf:"MPWR",desc:"AI power modules. Winning GPU VRM sockets on NVIDIA boards.",products:"Power modules, PMICs, VRMs, DC-DC converters",clients:"NVIDIA, hyperscalers, auto, industrial"},
      {t:"VICR",n:"Vicor",px:"$55",pe:null,ev:null,mc:"$2.5B",v:"Yahoo est",beta:1.6,fcf:0,revGr:25,yf:"VICR",desc:"48V power architecture for AI racks. FPA modules in GPU trays.",products:"48V FPA modules, BCMs, voltage regulators",clients:"NVIDIA, hyperscalers, defense"},
      {t:"ETN",n:"Eaton",px:"$320",pe:30,ev:22,mc:"$128B",v:"Yahoo est",beta:1.0,fcf:3.0,revGr:10,yf:"ETN",desc:"Electrical infrastructure. UPS, switchgear, PDUs for data centers.",products:"UPS, switchgear, PDUs, transformers, circuit breakers",clients:"Hyperscalers, utilities, industrial"},
      {t:"NVT",n:"nVent Electric",px:"$72",pe:25,ev:18,mc:"$12B",v:"Yahoo est",beta:1.2,fcf:3.5,revGr:12,yf:"NVT",desc:"Enclosures, cooling, and liquid thermal management for DC.",products:"Rack enclosures, liquid cooling, cable management",clients:"Data centers, industrial, infrastructure"},
      {t:"MOD",n:"Modine Mfg",px:"$115",pe:22,ev:14,mc:"$6B",v:"Yahoo est",beta:1.5,fcf:3.0,revGr:18,yf:"MOD",desc:"Thermal management for data centers. Liquid cooling systems.",products:"CDUs, heat exchangers, precision cooling",clients:"Hyperscalers, colocation, auto"},
      {t:"ON",n:"ON Semiconductor",px:"$55",pe:18,ev:12,mc:"$24B",v:"Yahoo est",beta:1.6,fcf:4.0,revGr:8,yf:"ON",desc:"Power semis + SiC for EV and data center. Fab-liter model.",products:"SiC MOSFETs, IGBTs, power ICs, image sensors",clients:"Auto OEMs, data centers, industrial"},
      {t:"IFNNY",n:"Infineon",px:"€32",pe:16,ev:10,mc:"$42B",v:"XETRA est",beta:1.3,fcf:4.5,revGr:6,yf:"IFX.DE",desc:"Europe's #1 power semi. SiC + GaN for auto and DC power.",products:"SiC, GaN, IGBTs, MCUs, sensors",clients:"Auto OEMs, industrial, data centers"},
      {t:"SBGSY",n:"Schneider Electric",px:"€255",pe:28,ev:18,mc:"$145B",v:"EPA est",beta:0.9,fcf:3.5,revGr:8,yf:"SU.PA",desc:"Electrical distribution + DC infrastructure. Galaxy UPS dominant.",products:"UPS, switchgear, BMS, EcoStruxure, cooling",clients:"Hyperscalers, enterprise, industrial, utilities"},
    ]
  },
];

export const TIER_COLORS = {
  demand:'#fb923c', compute:'#fbbf24', foundry:'#c084fc', memory:'#4ade80',
  wfe:'#5eead4', packaging:'#f472b6', testing:'#60a5fa', subsystems:'#a78bfa',
  photonics:'#f97316', materials:'#a3e635', networking:'#38bdf8', power:'#e879f9'
};

export const VALUATION_GAPS = [
  {a:"BESI",aPE:54,b:"ASMPT",bPE:16,note:"Only true peers in hybrid/TC bonding. Both supply SK Hynix, Samsung, TSMC."},
  {a:"FormFactor",aPE:26,b:"Micronics JP",bPE:18,note:"#1 and #2 probe card makers. Both serve memory. FORM = US premium, MJC = Japan discount."},
  {a:"Advantest",aPE:35,b:"ISC / LEENO",bPE:14,note:"ATE vs sockets. Different products, same end-market. Consumables = recurring."},
  {a:"WFE OEMs",aPE:32,b:"Subsystems",bPE:22,note:"Subsystems go inside WFE tools. Same cycle but 10x valuation gap (P/S 7-12x vs 1-5x)."},
  {a:"LITE",aPE:35,b:"AAOI",bPE:null,note:"Both make AI transceivers/lasers. LITE = incumbent monopoly. AAOI = challenger at 1/6th the market cap."},
  {a:"AXTI",aPE:null,b:"SOI",bPE:22,note:"Both supply critical substrates. AXTI = InP duopolist at $200M MC. SOI = SiPh monopolist at $6B."},
];
