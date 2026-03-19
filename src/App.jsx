import { useState, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { TIERS, TIER_COLORS, VALUATION_GAPS } from './data.js'

Chart.register(...registerables)

function PEBar({ value }) {
  if (!value) return <span style={{color:'var(--t4)',fontSize:10}}>N/M</span>
  const w = Math.min((value/60)*100,100)
  const color = value<=18?'var(--green)':value<=30?'var(--gray)':'var(--red)'
  return <div className="pe-bar">
    <div className="pe-track"><div className="pe-fill" style={{width:`${w}%`,background:color}}/></div>
    <span className="pe-val" style={{color}}>{value}x</span>
  </div>
}

function Tier({tier,isOpen,toggle}) {
  const peColor = v => v<=18?'var(--green)':v<=30?'var(--gray)':'var(--red)'
  const fcfColor = v => v>=10?'var(--green)':v>=0?'var(--gray)':'var(--red)'
  return <div style={{width:'100%',transition:'width 0.3s'}}>
    <div className={`tier-bar ${isOpen?'open':''}`} onClick={toggle}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 200px',minWidth:0,display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:16,lineHeight:1,flexShrink:0}}>{tier.icon}</span>
          <div className="mono" style={{fontSize:12,fontWeight:700,color:'var(--t1)',letterSpacing:'0.01em'}}>{tier.label}</div>
          {!isOpen && <div style={{fontSize:10,color:'var(--t4)',marginTop:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
            {tier.cos.map(c=>c.t).filter(t=>t!=='—').join(' · ')}
          </div>}
        </div>
        <div style={{display:'flex',gap:14,alignItems:'center',flexShrink:0}}>
          {[
            {l:'Med P/E',v:tier.medPE,f:v=>v+'x',c:peColor(tier.medPE)},
            {l:'Med EV/EBITDA',v:tier.medEV,f:v=>v+'x',c:'var(--t2)'},
            {l:'Med FCF',v:tier.medFCF,f:v=>(v>0?'+':'')+v+'%',c:fcfColor(tier.medFCF)},
          ].map(m=><div key={m.l} style={{textAlign:'center'}}>
            <div style={{fontSize:8,color:'var(--t4)',textTransform:'uppercase',letterSpacing:'0.06em'}}>{m.l}</div>
            <div className="mono" style={{fontSize:15,fontWeight:700,color:m.c}}>{m.f(m.v)}</div>
          </div>)}
          <span style={{color:'var(--t4)',fontSize:14,transition:'transform 0.2s',display:'inline-block',transform:isOpen?'rotate(180deg)':'none'}}>▾</span>
        </div>
      </div>
    </div>
    {isOpen && <div className="tier-body">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:14}}>
        <div className="info-box"><div className="info-label">What they do</div><div className="info-text">{tier.what}</div></div>
        <div className="info-box"><div className="info-label">Industry structure</div><div className="info-text">{tier.industry}</div></div>
        <div className="info-box value-box"><div className="info-label">Value assessment</div><div className="value-text">{tier.value}</div></div>
      </div>

      {/* Per-tier valuation bar chart */}
      {(()=>{
        const withPE = tier.cos.filter(c=>c.pe!=null).sort((a,b)=>a.pe-b.pe);
        const max = Math.max(...withPE.map(c=>c.pe),1);
        return withPE.length > 0 && <div style={{marginBottom:14}}>
          <div style={{fontSize:9,color:'var(--t4)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Forward P/E comparison</div>
          <div style={{display:'flex',flexDirection:'column',gap:3}}>
            {withPE.map(c=><div key={c.t} style={{display:'flex',alignItems:'center',gap:6}}>
              <div className="mono" style={{width:70,fontSize:9,color:'var(--t3)',textAlign:'right',flexShrink:0}}>{c.n.length>10?c.t:c.n}</div>
              <div style={{flex:1,height:14,background:'var(--bg)',borderRadius:3,overflow:'hidden'}}>
                <div style={{width:`${(c.pe/max)*100}%`,height:'100%',background:TIER_COLORS[tier.id],borderRadius:3,opacity:0.5}}/>
              </div>
              <div className="mono" style={{fontSize:10,fontWeight:600,color:peColor(c.pe),width:30,textAlign:'right'}}>{c.pe}x</div>
            </div>)}
          </div>
        </div>;
      })()}

      {/* Company profile cards */}
      <div className="profile-grid">
        {tier.cos.map((c,i)=><div key={i} className="profile-card">
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
            <span className="mono" style={{fontSize:10,fontWeight:700,color:TIER_COLORS[tier.id]}}>{c.t}</span>
            <span style={{fontSize:11,fontWeight:600,color:'var(--t1)'}}>{c.n}</span>
            <span className="mono" style={{fontSize:9,color:'var(--t4)',marginLeft:'auto'}}>{c.mc}</span>
          </div>
          <div style={{fontSize:10,color:'var(--t2)',marginBottom:3}}>{c.desc}</div>
          <div style={{fontSize:9,color:'var(--t3)'}}><strong style={{color:'var(--t2)'}}>Products:</strong> {c.products}</div>
          <div style={{fontSize:9,color:'var(--t3)'}}><strong style={{color:'var(--t2)'}}>Clients:</strong> {c.clients}</div>
        </div>)}
      </div>

      <div style={{overflowX:'auto'}}>
      <table>
        <thead><tr>
          <th>Ticker</th><th>Company</th><th>Price</th><th>Fwd P/E</th>
          <th>EV/EBITDA</th><th>Beta</th><th>FCF Yld</th><th>Mkt Cap</th><th>Source</th>
        </tr></thead>
        <tbody>{tier.cos.map((c,i)=><tr key={i}>
          <td className="mono" style={{fontWeight:600,color:TIER_COLORS[tier.id],fontSize:10}}>{c.t}</td>
          <td>{c.n}</td>
          <td className="mono" style={{color:'var(--t2)'}}>{c.px}</td>
          <td><PEBar value={c.pe}/></td>
          <td className="mono" style={{color:'var(--t3)'}}>{c.ev?c.ev+'x':'N/A'}</td>
          <td className="mono" style={{color:c.beta?c.beta>1.5?'var(--red)':c.beta>1?'var(--gray)':'var(--green)':'var(--t4)',fontSize:10}}>{c.beta??'—'}</td>
          <td className="mono" style={{color:c.fcf!=null?c.fcf>3?'var(--green)':c.fcf>0?'var(--gray)':'var(--red)':'var(--t4)',fontSize:10}}>{c.fcf!=null?c.fcf+'%':'—'}</td>
          <td className="mono" style={{color:'var(--t2)',fontSize:10}}>{c.mc}</td>
          <td style={{fontSize:8,color:'var(--t5)'}}>{c.v}</td>
        </tr>)}</tbody>
      </table>
      </div>
    </div>}
  </div>
}

function BubbleChart() {
  const ref = useRef(null)
  const chartRef = useRef(null)
  useEffect(()=>{
    if(chartRef.current) chartRef.current.destroy()
    // Stream colors: upstream=#4ade80, midstream=#60a5fa, downstream=#fbbf24, demand=#fb923c
    const up='#4ade80',mid='#60a5fa',dn='#fbbf24',dem='#fb923c';
    const tiers = {
      Subsystems:{c:up,d:[{x:1.5,y:28,r:10,l:'MKS'},{x:1.8,y:22,r:5,l:'Ichor'},{x:1.4,y:32,r:10,l:'Entegris'},{x:1.3,y:40,r:9,l:'VAT'},{x:1.4,y:22,r:6,l:'Adv Energy'},{x:1.8,y:20,r:5,l:'UCTT'},{x:1.1,y:12,r:5,l:'Ferrotec'}]},
      Materials:{c:up,d:[{x:1.3,y:22,r:7,l:'Soitec'},{x:1.1,y:20,r:6,l:'Corning'},{x:0.9,y:14,r:6,l:'Sumitomo'}]},
      Foundry:{c:mid,d:[{x:1.1,y:22,r:14,l:'TSMC'},{x:1.1,y:12,r:12,l:'Samsung'},{x:0.9,y:14,r:6,l:'UMC'}]},
      'WFE OEMs':{c:mid,d:[{x:1.2,y:32,r:14,l:'ASML'},{x:1.7,y:34,r:13,l:'AMAT'},{x:1.4,y:25,r:10,l:'Lam'},{x:1.3,y:35,r:12,l:'KLA'},{x:1.4,y:38,r:8,l:'ASM'},{x:1.5,y:27,r:7,l:'ONTO'}]},
      Testing:{c:mid,d:[{x:1.5,y:35,r:12,l:'Advantest'},{x:1.3,y:42,r:11,l:'Teradyne'},{x:1.5,y:26,r:7,l:'FormFactor'},{x:1.2,y:18,r:5,l:'MJC'},{x:1.3,y:16,r:5,l:'WinWay'},{x:1.2,y:14,r:4,l:'ISC'},{x:1.1,y:15,r:4,l:'LEENO'}]},
      Packaging:{c:mid,d:[{x:1.6,y:54,r:8,l:'BESI'},{x:1.3,y:16,r:6,l:'ASMPT'},{x:1.5,y:26,r:9,l:'Amkor'},{x:1.2,y:14,r:7,l:'Powertech'}]},
      Photonics:{c:mid,d:[{x:1.5,y:35,r:8,l:'Lumentum'},{x:1.6,y:28,r:10,l:'Coherent'},{x:1.4,y:38,r:8,l:'MACOM'},{x:1.3,y:30,r:8,l:'Fabrinet'},{x:1.4,y:18,r:5,l:'Himax'}]},
      Memory:{c:dn,d:[{x:1.4,y:8,r:28,l:'SK Hynix'},{x:1.3,y:7,r:16,l:'Micron'},{x:1.5,y:18,r:6,l:'Nanya'},{x:1.3,y:22,r:5,l:'Winbond'},{x:1.2,y:20,r:5,l:'Macronix'},{x:1.4,y:15,r:4,l:'ESMT'}]},
      Compute:{c:dn,d:[{x:1.7,y:35,r:30,l:'NVDA'},{x:1.3,y:32,r:18,l:'AVGO'},{x:1.6,y:28,r:13,l:'AMD'}]},
      Networking:{c:dn,d:[{x:1.2,y:20,r:7,l:'Ciena'},{x:0.9,y:15,r:8,l:'Nokia'},{x:0.9,y:16,r:14,l:'Cisco'},{x:1.1,y:35,r:12,l:'Amphenol'},{x:1.2,y:18,r:7,l:'Tower Semi'}]},
      Power:{c:dn,d:[{x:1.5,y:35,r:10,l:'Vertiv'},{x:1.4,y:42,r:9,l:'MPWR'},{x:1.0,y:30,r:13,l:'Eaton'},{x:1.6,y:18,r:8,l:'ON Semi'},{x:1.3,y:16,r:10,l:'Infineon'}]},
      Demand:{c:dem,d:[{x:1.15,y:35,r:20,l:'Amazon'},{x:1.05,y:22,r:20,l:'Alphabet'},{x:1.25,y:24,r:18,l:'Meta'},{x:0.9,y:32,r:22,l:'Microsoft'},{x:1.1,y:28,r:10,l:'Oracle'}]},
    }
    chartRef.current = new Chart(ref.current,{
      type:'bubble',
      data:{datasets:Object.entries(tiers).map(([n,{c,d}])=>({label:n,data:d,backgroundColor:c+'80',borderColor:c,borderWidth:0.5}))},
      options:{responsive:true,maintainAspectRatio:false,layout:{padding:20},
        scales:{x:{title:{display:true,text:'Beta →',color:'#777',font:{size:11}},min:0.8,max:2.2,grid:{color:'#ffffff0a'},ticks:{color:'#777',stepSize:0.2}},
                y:{title:{display:true,text:'Forward P/E →',color:'#777',font:{size:11}},min:0,max:60,grid:{color:'#ffffff0a'},ticks:{color:'#777'}}},
        plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>{const p=ctx.raw;return `${p.l}: ${p.y}x fwd PE, ${p.x}β`}}}}}
    })
    return ()=>{ if(chartRef.current) chartRef.current.destroy() }
  },[])
  return <div className="chart-wrap">
    <div className="chart-title">Forward P/E vs beta — risk-adjusted valuation</div>
    <div style={{position:'relative',height:420}}><canvas ref={ref}/></div>
    <div className="legend">
      {Object.entries({'Upstream (Materials, Subsystems)':'#4ade80','Midstream (WFE, Foundry, Packaging, Testing, Photonics)':'#60a5fa','Downstream (Memory, Compute, Networking, Power)':'#fbbf24','End Demand (Hyperscalers, AI Labs)':'#fb923c'}).map(([n,c])=>
        <span key={n} style={{display:'flex',alignItems:'center',gap:4}}><span className="legend-dot" style={{background:c}}/>{n}</span>
      )}
      <span style={{color:'var(--t4)',fontSize:10,marginLeft:8}}>Bubble size = market cap. Bottom-left = safest value.</span>
    </div>
    <div style={{marginTop:20,padding:'16px 20px',background:'#ffffff06',borderRadius:8,border:'1px solid #ffffff0a'}}>
      <div style={{fontFamily:'var(--mono)',fontSize:12,fontWeight:700,color:'var(--t2)',marginBottom:10}}>How to read this chart</div>
      <div style={{fontSize:12,color:'var(--t3)',lineHeight:1.7}}>
        <p style={{margin:'0 0 8px'}}>This chart plots every company's <strong style={{color:'var(--t2)'}}>forward P/E</strong> (what investors pay per dollar of future earnings) against its <strong style={{color:'var(--t2)'}}>beta</strong> (how much the stock moves relative to the market). A beta of 1.0 means the stock tracks the S&P 500; above 1.5 means it swings 50% harder in both directions.</p>
        <p style={{margin:'0 0 8px'}}>The <strong style={{color:'var(--t2)'}}>bottom-left quadrant</strong> is the sweet spot: low valuation and low volatility. Companies here offer the most defensive risk-adjusted value. The <strong style={{color:'var(--t2)'}}>top-right quadrant</strong> is the opposite: you are paying a premium multiple for a stock that whips around aggressively.</p>
        <p style={{margin:'0 0 8px'}}>Bubble size represents market capitalisation, so the largest circles are the megacaps that anchor each tier. Notice that <strong style={{color:'#fbbf24'}}>downstream</strong> names (memory, compute) tend to cluster with high beta because their earnings are directly tied to the AI capex cycle. <strong style={{color:'#60a5fa'}}>Midstream</strong> equipment and packaging names carry high P/Es because the market prices in long equipment upgrade cycles. <strong style={{color:'#4ade80'}}>Upstream</strong> materials sit lower on both axes since they are smaller, less liquid, and often overlooked by institutional investors, which is precisely where mispricing tends to hide.</p>
        <p style={{margin:0}}>If a small green bubble sits in the bottom-left while its downstream customers sit in the top-right, that upstream supplier may be undervalued relative to the demand it enables.</p>
      </div>
    </div>
  </div>
}

function FCFChart({tiers}) {
  const ref = useRef(null)
  const chartRef = useRef(null)
  useEffect(()=>{
    if(chartRef.current) chartRef.current.destroy()
    const all = tiers.flatMap(t=>t.cos.filter(c=>c.fcf!=null&&c.fcf>0).map(c=>({n:c.n,v:c.fcf,c:STREAM_COLORS[t.stream]||TIER_COLORS[t.id]})))
    all.sort((a,b)=>b.v-a.v)
    const top = all.slice(0,25)
    chartRef.current = new Chart(ref.current,{
      type:'bar',
      data:{labels:top.map(d=>d.n),datasets:[{data:top.map(d=>d.v),backgroundColor:top.map(d=>d.c+'88'),borderColor:top.map(d=>d.c),borderWidth:0.5,borderRadius:2}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
        scales:{x:{title:{display:true,text:'FCF Yield %',color:'#777',font:{size:11}},grid:{color:'#ffffff08'},ticks:{color:'#777',callback:v=>v+'%'}},
                y:{ticks:{color:'#999',font:{size:10}},grid:{display:false}}},
        plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`${ctx.raw.toFixed(1)}% FCF yield`}}}}
    })
    return ()=>{ if(chartRef.current) chartRef.current.destroy() }
  },[tiers])
  return <div className="chart-wrap">
    <div className="chart-title">FCF yield — who's generating cash (top 25)</div>
    <div style={{position:'relative',height:520}}><canvas ref={ref}/></div>
  </div>
}

function GrowthChart({tiers}) {
  const ref = useRef(null)
  const chartRef = useRef(null)
  useEffect(()=>{
    if(chartRef.current) chartRef.current.destroy()
    const all = tiers.flatMap(t=>t.cos.filter(c=>c.revGr!=null&&c.revGr>0).map(c=>({n:c.n,v:c.revGr,c:STREAM_COLORS[t.stream]||TIER_COLORS[t.id]})))
    all.sort((a,b)=>b.v-a.v)
    const top = all.slice(0,30)
    chartRef.current = new Chart(ref.current,{
      type:'bar',
      data:{labels:top.map(d=>d.n),datasets:[{data:top.map(d=>d.v),backgroundColor:top.map(d=>d.c+'88'),borderColor:top.map(d=>d.c),borderWidth:0.5,borderRadius:2}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
        scales:{x:{title:{display:true,text:'Est. NTM Rev Growth %',color:'#777',font:{size:11}},grid:{color:'#ffffff08'},ticks:{color:'#777',callback:v=>v+'%'},max:200},
                y:{ticks:{color:'#999',font:{size:9}},grid:{display:false}}},
        plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`+${ctx.raw}% est. revenue growth`}}}}
    })
    return ()=>{ if(chartRef.current) chartRef.current.destroy() }
  },[tiers])
  return <div className="chart-wrap">
    <div className="chart-title">Forward revenue growth — who's accelerating</div>
    <div style={{position:'relative',height:560}}><canvas ref={ref}/></div>
  </div>
}

function MedianBars({tiers}) {
  const sorted = [...tiers].sort((a,b)=>(a.medPE||99)-(b.medPE||99))
  const max = Math.max(...sorted.map(t=>t.medPE||0))
  const peColor = v => v<=18?'var(--green)':v<=30?'var(--gray)':'var(--red)'
  return <div className="chart-wrap">
    <div className="chart-title">Median forward P/E by supply chain layer</div>
    <div style={{display:'flex',flexDirection:'column',gap:5}}>
      {sorted.map(t=><div key={t.id} style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:100,fontSize:10,color:'var(--t4)',textAlign:'right',flexShrink:0}}>{t.label.split('—')[0].trim()}</div>
        <div style={{flex:1,height:16,background:'var(--bg)',borderRadius:3,overflow:'hidden'}}>
          <div style={{width:`${(t.medPE/max)*100}%`,height:'100%',background:STREAM_COLORS[t.stream]||TIER_COLORS[t.id],borderRadius:3,opacity:0.6}}/>
        </div>
        <div className="mono" style={{fontSize:13,fontWeight:700,color:peColor(t.medPE),width:36,textAlign:'right'}}>{t.medPE}x</div>
      </div>)}
    </div>
  </div>
}

function Gaps() {
  return <div className="chart-wrap">
    <div className="chart-title">Widest valuation gaps in the AI supply chain</div>
    <p style={{fontSize:11,color:'var(--t3)',marginBottom:14,lineHeight:1.6}}>
      These pairs of companies share similar end-market exposure but trade at dramatically different valuations.
      Understanding why each gap exists, and whether it is justified, is central to identifying mispriced opportunities across the semiconductor supply chain.
    </p>
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      {VALUATION_GAPS.map((g,i)=><div key={i} className="gap-card">
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
          <span className="mono" style={{fontSize:13,fontWeight:700,color:'var(--red)'}}>{g.a} {g.aPE?g.aPE+'x':'N/M'}</span>
          <span style={{fontSize:10,color:'var(--t5)'}}>vs</span>
          <span className="mono" style={{fontSize:13,fontWeight:700,color:'var(--green)'}}>{g.b} {g.bPE?g.bPE+'x':'N/M'}</span>
          <span style={{fontSize:11,color:'var(--t2)',fontWeight:600,marginLeft:8}}>{g.title}</span>
        </div>
        <div style={{fontSize:11,color:'var(--t2)',lineHeight:1.6,marginBottom:6}}>{g.summary}</div>
        <div style={{fontSize:11,color:'var(--t3)',lineHeight:1.6,padding:'8px 10px',background:'var(--bg)',borderRadius:4}}>
          <strong style={{color:'var(--t2)'}}>Investment case: </strong>{g.thesis}
        </div>
      </div>)}
    </div>
  </div>
}

function mergeLiveData(staticTiers, liveData) {
  return staticTiers.map(tier => {
    const updatedCos = tier.cos.map(co => {
      if (!co.yf || !liveData[co.yf]) return co;
      const live = liveData[co.yf];
      return {
        ...co,
        px: live.px || co.px,
        pe: live.pe ?? co.pe,
        ev: live.ev ?? co.ev,
        beta: live.beta ?? co.beta,
        fcf: live.fcf ?? co.fcf,
        ebitdaMargin: live.ebitdaMargin ?? co.ebitdaMargin,
        mc: live.mc || co.mc,
        v: live.v || co.v,
      };
    });
    // Recalculate tier medians from updated company data
    const withPE = updatedCos.filter(c => c.pe != null);
    const withEV = updatedCos.filter(c => c.ev != null);
    const withFCF = updatedCos.filter(c => c.fcf != null);
    const median = arr => { const s = [...arr].sort((a,b)=>a-b); const m = Math.floor(s.length/2); return s.length%2?s[m]:Math.round((s[m-1]+s[m])/2); };
    return {
      ...tier,
      cos: updatedCos,
      medPE: withPE.length ? median(withPE.map(c=>c.pe)) : tier.medPE,
      medEV: withEV.length ? median(withEV.map(c=>c.ev)) : tier.medEV,
      medFCF: withFCF.length ? median(withFCF.map(c=>c.fcf)) : tier.medFCF,
    };
  });
}

const STREAM_COLORS = {upstream:'#4ade80',midstream:'#60a5fa',downstream:'#fbbf24',demand:'#fb923c'};
const STREAM_LABELS = {upstream:'UPSTREAM',midstream:'MIDSTREAM',downstream:'DOWNSTREAM',demand:'END DEMAND'};
const STREAM_DESC = {
  upstream:'Raw materials, substrates, and subcomponents that feed into equipment manufacturing. Highest supply fragility and longest qualification cycles.',
  midstream:'Equipment makers, foundries, packaging houses, and testing providers that transform materials into functional silicon. Capital-intensive with high barriers to entry.',
  downstream:'Finished chips, networking infrastructure, and power systems that go into data center racks. Closest to end-customer revenue cycles.',
  demand:'Hyperscalers and AI labs that deploy the capital. Their spending decisions cascade through every tier above.',
};
const STREAM_ORDER = ['upstream','midstream','downstream','demand'];

function SupplyChainTab({tiers}) {
  const grouped = {};
  for (const s of STREAM_ORDER) grouped[s] = tiers.filter(t=>t.stream===s);

  // Calculate median EBITDA margin per tier
  const tierMargins = tiers.map(t=>{
    const vals = t.cos.map(c=>c.ebitdaMargin).filter(v=>v!=null&&v>0);
    if (!vals.length) return {id:t.id,label:t.label.split(' — ')[0],stream:t.stream,medMargin:null,medPE:t.medPE,icon:t.icon,color:TIER_COLORS[t.id]};
    const s = [...vals].sort((a,b)=>a-b);
    const m = Math.floor(s.length/2);
    const med = s.length%2?s[m]:Math.round((s[m-1]+s[m])/2);
    return {id:t.id,label:t.label.split(' — ')[0],stream:t.stream,medMargin:med,medPE:t.medPE,icon:t.icon,color:TIER_COLORS[t.id]};
  });

  // Sort by stream order then by margin desc within stream
  const sorted = [...tierMargins].sort((a,b)=>{
    const si = STREAM_ORDER.indexOf(a.stream) - STREAM_ORDER.indexOf(b.stream);
    if (si!==0) return si;
    return (b.medMargin||0)-(a.medMargin||0);
  });

  const maxMargin = Math.max(...sorted.map(t=>t.medMargin||0),1);
  const maxPE = Math.max(...sorted.map(t=>t.medPE||0),1);

  return <>
    {/* Flow diagram */}
    <div className="chart-wrap">
      <div className="chart-title">Supply chain flow: upstream to end demand</div>
      <p style={{fontSize:11,color:'var(--t3)',marginBottom:16,lineHeight:1.6}}>
        Capital flows downstream from hyperscalers, but supply constraints propagate upstream.
        The further upstream you go, the more concentrated and fragile the supply base becomes.
      </p>
      <div className="flow-diagram">
        {STREAM_ORDER.map((stream,si)=><div key={stream}>
          <div className="flow-stream" style={{borderColor:STREAM_COLORS[stream]}}>
            <div className="flow-stream-label" style={{color:STREAM_COLORS[stream]}}>{STREAM_LABELS[stream]}</div>
            <div style={{fontSize:10,color:'var(--t3)',marginBottom:8,lineHeight:1.5}}>{STREAM_DESC[stream]}</div>
            <div className="flow-tiers">
              {grouped[stream].map(t=>{
                const margin = tierMargins.find(m=>m.id===t.id);
                return <div key={t.id} className="flow-tier-box" style={{borderColor:TIER_COLORS[t.id]+'60'}}>
                  <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:2}}>
                    <span style={{fontSize:13}}>{t.icon}</span>
                    <span className="mono" style={{fontSize:10,fontWeight:700,color:'var(--t1)'}}>{t.label.split(' — ')[0]}</span>
                  </div>
                  <div style={{display:'flex',gap:10,fontSize:9,color:'var(--t3)'}}>
                    <span>P/E <span className="mono" style={{color:'var(--t2)',fontWeight:600}}>{t.medPE}x</span></span>
                    <span>EBITDA <span className="mono" style={{color:STREAM_COLORS[stream],fontWeight:600}}>{margin?.medMargin!=null?margin.medMargin+'%':'N/A'}</span></span>
                  </div>
                  <div style={{fontSize:8,color:'var(--t4)',marginTop:2}}>{t.cos.length} companies</div>
                </div>;
              })}
            </div>
          </div>
          {si < STREAM_ORDER.length-1 && <div className="flow-arrow">
            <div className="flow-arrow-line"/>
            <div className="flow-arrow-label">{['Materials and subcomponents feed into equipment and fabs','Equipment, fabs, and packaging produce finished silicon','Chips, networking, and power go into hyperscaler racks'][si]}</div>
            <div className="flow-arrow-head">▼</div>
          </div>}
        </div>)}
      </div>
    </div>

    {/* Margin vs P/E analysis */}
    <div className="chart-wrap">
      <div className="chart-title">Hypothesis test: do upstream margins justify higher multiples?</div>
      <p style={{fontSize:11,color:'var(--t3)',marginBottom:14,lineHeight:1.6}}>
        Median EBITDA margin and forward P/E by supply chain tier, ordered from upstream to end demand.
        If the hypothesis holds, upstream tiers should show higher margins that justify premium valuations.
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:4}}>
        {sorted.map(t=><div key={t.id} style={{display:'flex',alignItems:'center',gap:6}}>
          <div style={{width:14,textAlign:'center',fontSize:11}}>{t.icon}</div>
          <div style={{width:90,fontSize:10,color:'var(--t3)',textAlign:'right',flexShrink:0}}>{t.label}</div>
          <div style={{flex:1,display:'flex',gap:2,alignItems:'center'}}>
            {/* EBITDA margin bar */}
            <div style={{flex:1,height:12,background:'var(--bg)',borderRadius:3,overflow:'hidden',position:'relative'}}>
              <div style={{width:`${((t.medMargin||0)/maxMargin)*100}%`,height:'100%',background:STREAM_COLORS[t.stream],borderRadius:3,opacity:0.5}}/>
            </div>
            <div className="mono" style={{fontSize:9,fontWeight:600,color:STREAM_COLORS[t.stream],width:32,textAlign:'right'}}>{t.medMargin!=null?t.medMargin+'%':'--'}</div>
          </div>
          <div style={{width:1,height:12,background:'var(--border)',margin:'0 4px'}}/>
          <div style={{flex:0.6,display:'flex',gap:2,alignItems:'center'}}>
            {/* P/E bar */}
            <div style={{flex:1,height:12,background:'var(--bg)',borderRadius:3,overflow:'hidden'}}>
              <div style={{width:`${((t.medPE||0)/maxPE)*100}%`,height:'100%',background:STREAM_COLORS[t.stream],borderRadius:3,opacity:0.3}}/>
            </div>
            <div className="mono" style={{fontSize:9,fontWeight:600,color:'var(--t2)',width:24,textAlign:'right'}}>{t.medPE}x</div>
          </div>
        </div>)}
      </div>
      <div style={{display:'flex',gap:16,marginTop:10,fontSize:9,color:'var(--t4)'}}>
        <span>Left bars = median EBITDA margin (colored by stream position)</span>
        <span>Right bars = median forward P/E</span>
      </div>
    </div>
  </>;
}

function DataStatus({isLive, updated}) {
  return <span style={{fontSize:9,padding:'2px 6px',borderRadius:4,marginLeft:8,
    background:isLive?'rgba(74,222,128,0.15)':'rgba(239,68,68,0.15)',
    color:isLive?'var(--green)':'var(--red)',fontWeight:600,letterSpacing:'0.04em'}}>
    {isLive ? `LIVE ${updated}` : 'STATIC'}
  </span>;
}

export default function App() {
  const [tab,setTab] = useState('pyramid')
  const [open,setOpen] = useState('demand')
  const [tiers,setTiers] = useState(TIERS)
  const [dataStatus,setDataStatus] = useState({isLive:false,updated:null})
  const tabs = [['pyramid','Pyramid'],['chain','Supply Chain'],['scatter','PE vs Beta'],['fcf','FCF Yield'],['growth','Rev Growth'],['gaps','Valuation Gaps']]

  useEffect(()=>{
    fetch('/api/market-data')
      .then(r=>r.ok?r.json():Promise.reject())
      .then(({updated,data})=>{
        setTiers(mergeLiveData(TIERS, data));
        setDataStatus({isLive:true,updated});
      })
      .catch(()=>setDataStatus({isLive:false,updated:null}));
  },[])

  return <div className="container">
    <div style={{padding:'20px 0 4px'}}>
      <h1>AI memory supply chain <span>valuation pyramid</span> <DataStatus {...dataStatus}/></h1>
      <p className="subtitle">
        {tiers.reduce((a,t)=>a+t.cos.length,0)} companies across {tiers.length} layers. Capital flows top→down, valuation efficiency decreases.
        {dataStatus.isLive
          ? ` Prices via Yahoo Finance, updated ${dataStatus.updated}. Refreshed daily.`
          : ' Prices mostly 3/18 close; MU updated for 3/20 post-earnings. Market down 3/19-20 (Fed + geopolitical).'}
      </p>
    </div>

    <div className="tabs">
      {tabs.map(([k,l])=><button key={k} className={`tab ${tab===k?'active':''}`} onClick={()=>setTab(k)}>{l}</button>)}
    </div>

    {tab==='pyramid' && <>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
        {tiers.map(t=><Tier key={t.id} tier={t} isOpen={open===t.id} toggle={()=>setOpen(open===t.id?null:t.id)}/>)}
      </div>
      <MedianBars tiers={tiers}/>
    </>}
    {tab==='scatter' && <BubbleChart/>}
    {tab==='fcf' && <FCFChart tiers={tiers}/>}
    {tab==='growth' && <GrowthChart tiers={tiers}/>}
    {tab==='gaps' && <Gaps/>}
    {tab==='chain' && <SupplyChainTab tiers={tiers}/>}

    <div className="method">
      <div className="method-title">Data sources & methodology</div>
      <div className="method-text">
        {dataStatus.isLive
          ? <><strong>Live data ({dataStatus.updated}):</strong> Prices, P/E, EV/EBITDA, beta, FCF yield, and market cap from Yahoo Finance. Refreshed daily at 6:35 AM ET via Vercel cron. Some international tickers may fall back to static data if unavailable.</>
          : <><strong>Prices (3/20/2026):</strong> Most US = Yahoo Finance 3/18 close. MU ~$420 post-ER selloff (reported 3/18: rev $23.9B, guided Q3 $33.5B). KRX from Investing.com 3/19. TWSE/TSE/HKEX/SWX marked "est." Market down 3/19-20 on Fed hold + Iran-Qatar shock — most names 2-5% below shown.
        <strong> Forward P/E:</strong> StockAnalysis (FORM 26.1x, AMAT 33.9x, ONTO 27.0x), GuruFocus (BESI 54.2x), Morningstar (NVDA 37.7x). MU recalculated ~7x on NTM ~$60 EPS.</>}
        <strong> Not investment advice.</strong>
      </div>
    </div>
  </div>
}
