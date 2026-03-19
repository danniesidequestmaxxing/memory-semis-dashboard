import { useState, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { TIERS, TIER_COLORS, VALUATION_GAPS, SUPPLY_CHAIN_PAIRS } from './data.js'

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
    <div className="legend" style={{marginBottom:8}}>
      {Object.entries({'Upstream':'#4ade80','Midstream':'#60a5fa','Downstream':'#fbbf24','End Demand':'#fb923c'}).map(([n,c])=>
        <span key={n} style={{display:'flex',alignItems:'center',gap:4}}><span className="legend-dot" style={{background:c}}/>{n}</span>
      )}
    </div>
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
    <div className="legend" style={{marginBottom:8}}>
      {Object.entries({'Upstream':'#4ade80','Midstream':'#60a5fa','Downstream':'#fbbf24','End Demand':'#fb923c'}).map(([n,c])=>
        <span key={n} style={{display:'flex',alignItems:'center',gap:4}}><span className="legend-dot" style={{background:c}}/>{n}</span>
      )}
    </div>
    <div style={{position:'relative',height:560}}><canvas ref={ref}/></div>
  </div>
}

function MedianBars({tiers}) {
  const sorted = [...tiers].sort((a,b)=>(a.medPE||99)-(b.medPE||99))
  const max = Math.max(...sorted.map(t=>t.medPE||0))
  const peColor = v => v<=18?'var(--green)':v<=30?'var(--gray)':'var(--red)'
  return <div className="chart-wrap">
    <div className="chart-title">Median forward P/E by supply chain layer</div>
    <div className="legend" style={{marginBottom:8}}>
      {Object.entries({'Upstream':'#4ade80','Midstream':'#60a5fa','Downstream':'#fbbf24','End Demand':'#fb923c'}).map(([n,c])=>
        <span key={n} style={{display:'flex',alignItems:'center',gap:4}}><span className="legend-dot" style={{background:c}}/>{n}</span>
      )}
    </div>
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
                return <div key={t.id} className="flow-tier-box" style={{borderColor:STREAM_COLORS[stream]+'40'}}>
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

    {/* Actionable investment interpretation */}
    <div className="chart-wrap">
      <div className="chart-title">Investment interpretation: where is the best risk-adjusted value?</div>
      <p style={{fontSize:11,color:'var(--t3)',marginBottom:14,lineHeight:1.6}}>
        A portfolio manager screening for value, growth, and free cash flow certainty should focus on tiers where EBITDA margins
        are structurally high but forward P/E multiples have not yet priced that in. The wider the gap between margin quality and
        valuation, the more potential upside remains.
      </p>

      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {/* Tier 1: Best value */}
        <div style={{padding:'14px 16px',background:'rgba(74,222,128,0.06)',borderRadius:8,borderLeft:'3px solid #4ade80'}}>
          <div className="mono" style={{fontSize:11,fontWeight:700,color:'#4ade80',marginBottom:6}}>HIGHEST CONVICTION: Upstream materials & foundries</div>
          <div style={{fontSize:11,color:'var(--t3)',lineHeight:1.7}}>
            <strong style={{color:'var(--t2)'}}>Foundry (35% EBITDA, 18x P/E)</strong> offers the best margin-to-multiple ratio in the entire supply chain.
            TSMC and its peers generate semiconductor-grade margins but trade at multiples typically reserved for cyclical industrials.
            Capacity is sold out through 2027 with limited new entrants. <strong style={{color:'var(--t2)'}}>Materials (17% EBITDA, 20x P/E)</strong> are
            small-cap and illiquid but sit at the most fragile chokepoint: InP substrates have a two-company duopoly with
            18-month qualification cycles, meaning supply cannot scale quickly even when demand surges.
          </div>
        </div>

        {/* Tier 2: Growth at reasonable price */}
        <div style={{padding:'14px 16px',background:'rgba(96,165,250,0.06)',borderRadius:8,borderLeft:'3px solid #60a5fa'}}>
          <div className="mono" style={{fontSize:11,fontWeight:700,color:'#60a5fa',marginBottom:6}}>GROWTH AT REASONABLE PRICE: Midstream equipment & photonics</div>
          <div style={{fontSize:11,color:'var(--t3)',lineHeight:1.7}}>
            <strong style={{color:'var(--t2)'}}>WFE OEMs (32% EBITDA, 32x P/E)</strong> are fairly valued for their margin quality but offer
            strong FCF visibility because equipment orders are booked 12-18 months ahead. <strong style={{color:'var(--t2)'}}>Photonics (18% EBITDA, 30x P/E)</strong> trades
            at a premium relative to current margins, but the market is pricing in explosive growth as AI data centers shift from
            electrical to optical interconnects. The risk here is execution, not demand. <strong style={{color:'var(--t2)'}}>Testing (22% EBITDA, 26x P/E)</strong> is
            the most defensive midstream play: consumables-driven revenue with recurring demand regardless of capex cycles.
          </div>
        </div>

        {/* Tier 3: Fully priced but essential */}
        <div style={{padding:'14px 16px',background:'rgba(251,191,36,0.06)',borderRadius:8,borderLeft:'3px solid #fbbf24'}}>
          <div className="mono" style={{fontSize:11,fontWeight:700,color:'#fbbf24',marginBottom:6}}>FULLY VALUED BUT ESSENTIAL: Downstream compute & memory</div>
          <div style={{fontSize:11,color:'var(--t3)',lineHeight:1.7}}>
            <strong style={{color:'var(--t2)'}}>Compute (38% EBITDA, 34x P/E)</strong> commands the highest multiples for good reason: NVIDIA
            and Broadcom are the direct beneficiaries of every hyperscaler dollar spent. However, at 34x forward earnings, most of
            the near-term upside is priced in. <strong style={{color:'var(--t2)'}}>Memory (24% EBITDA, 17x P/E)</strong> looks optically cheap but is deeply
            cyclical. The current HBM supercycle has pushed margins to peak levels that are unlikely to sustain through a
            correction, so the low P/E reflects the market discounting mean reversion rather than offering genuine value.
          </div>
        </div>

        {/* Tier 4: Catalyst, not the trade */}
        <div style={{padding:'14px 16px',background:'rgba(251,146,60,0.06)',borderRadius:8,borderLeft:'3px solid #fb923c'}}>
          <div className="mono" style={{fontSize:11,fontWeight:700,color:'#fb923c',marginBottom:6}}>THE CATALYST, NOT THE TRADE: End demand hyperscalers</div>
          <div style={{fontSize:11,color:'var(--t3)',lineHeight:1.7}}>
            <strong style={{color:'var(--t2)'}}>Demand (42% EBITDA, 28x P/E)</strong> generates the highest margins in the chain because
            hyperscalers operate software-driven business models at massive scale. Their capex announcements move every upstream
            ticker on this dashboard. They are essential context for the thesis but are not where the asymmetric upside lives.
            The value is in what they buy, not in their own stock.
          </div>
        </div>
      </div>

      <div style={{marginTop:14,padding:'10px 14px',background:'#ffffff06',borderRadius:6,fontSize:10,color:'var(--t4)',lineHeight:1.6}}>
        <strong style={{color:'var(--t3)'}}>Summary:</strong> The highest margin-to-multiple dislocation sits in foundries and upstream materials.
        Midstream equipment offers the most predictable FCF streams. Compute and memory are consensus trades where the upside
        is largely reflected in price. A barbell strategy combining upstream value with midstream FCF compounders provides the
        best risk-adjusted exposure to the AI buildout without paying peak multiples.
      </div>
    </div>
  </>;
}

function RelativeValueTab({tiers}) {
  // Build ticker → company+stream lookup
  const coMap = {}
  tiers.forEach(tier => {
    tier.cos.forEach(co => {
      if (co.t !== '—') coMap[co.t] = { ...co, stream: tier.stream, tierLabel: tier.label.split(' — ')[0] }
    })
  })

  // Calculate stream median P/Es
  const streamMedian = {}
  for (const stream of ['upstream','midstream','downstream','demand']) {
    const pes = tiers.filter(t=>t.stream===stream).flatMap(t=>t.cos.filter(c=>c.pe!=null).map(c=>c.pe))
    pes.sort((a,b)=>a-b)
    const m = Math.floor(pes.length/2)
    streamMedian[stream] = pes.length ? (pes.length%2 ? pes[m] : Math.round((pes[m-1]+pes[m])/2)) : null
  }

  // Stream-level ratios
  const streamRatios = [
    {label:'Upstream / Downstream',num:'upstream',den:'downstream',desc:'Materials & subsystems vs memory, compute, networking, and power'},
    {label:'Upstream / Demand',num:'upstream',den:'demand',desc:'Materials & subsystems vs hyperscalers and AI labs'},
    {label:'Midstream / Downstream',num:'midstream',den:'downstream',desc:'Equipment, foundry, packaging, testing, and photonics vs finished products'},
    {label:'Midstream / Demand',num:'midstream',den:'demand',desc:'Equipment and manufacturing vs hyperscalers and AI labs'},
  ].map(r => ({...r, ratio: (streamMedian[r.num] && streamMedian[r.den]) ? streamMedian[r.num]/streamMedian[r.den] : null}))

  // Company-level pairs
  const pairs = SUPPLY_CHAIN_PAIRS.map(p => {
    const sup = coMap[p.supplier]
    const cust = coMap[p.customer]
    if (!sup || !cust) return null
    const ratio = (sup.pe != null && cust.pe != null && cust.pe > 0) ? sup.pe / cust.pe : null
    return { ...p, sup, cust, ratio }
  }).filter(Boolean)

  // Sort: valid ratios first (ascending), then null ratios
  const sorted = [...pairs].sort((a,b) => {
    if (a.ratio == null && b.ratio == null) return 0
    if (a.ratio == null) return 1
    if (b.ratio == null) return -1
    return a.ratio - b.ratio
  })

  const top5 = sorted.filter(p => p.ratio != null).slice(0, 5)

  const ratioColor = r => r < 0.6 ? '#4ade80' : r < 0.8 ? '#86efac' : r < 1.0 ? 'var(--gray)' : r < 1.2 ? '#fca5a5' : '#ef4444'
  const ratioLabel = r => r < 0.5 ? 'Deep value' : r < 0.7 ? 'Undervalued' : r < 0.9 ? 'Fair' : r < 1.1 ? 'Parity' : 'Expensive'

  return <>
    {/* Section 1: Stream-level ratios */}
    <div className="chart-wrap">
      <div className="chart-title">Supply chain valuation ratios</div>
      <p style={{fontSize:11,color:'var(--t3)',marginBottom:14,lineHeight:1.7}}>
        These ratios compare the median forward P/E of upstream and midstream tiers against their downstream customers and end-demand hyperscalers.
        A ratio below 1.0x means the supplier tier trades at a discount to its customer tier. Ratios below 0.7x suggest the market is systematically
        underpricing the supplier relative to the demand it enables. This is where the asymmetry lives.
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {streamRatios.map(r => {
          const ratio = r.ratio
          const maxBar = 1.5
          return <div key={r.label}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
              <div style={{width:180,fontSize:10,color:'var(--t3)',textAlign:'right',flexShrink:0}}>{r.label}</div>
              <div style={{flex:1,height:18,background:'var(--bg)',borderRadius:4,overflow:'hidden',position:'relative'}}>
                {/* Parity reference line at 1.0x */}
                <div style={{position:'absolute',left:`${(1.0/maxBar)*100}%`,top:0,bottom:0,width:1,background:'rgba(255,255,255,0.2)',zIndex:2}}/>
                {ratio != null && <div style={{width:`${Math.min(ratio/maxBar,1)*100}%`,height:'100%',background:ratioColor(ratio),borderRadius:4,opacity:0.6}}/>}
              </div>
              <div className="mono" style={{fontSize:13,fontWeight:700,color:ratio!=null?ratioColor(ratio):'var(--t4)',width:44,textAlign:'right'}}>
                {ratio != null ? ratio.toFixed(2)+'x' : 'N/M'}
              </div>
            </div>
            <div style={{fontSize:9,color:'var(--t4)',marginLeft:188}}>{r.desc}</div>
          </div>
        })}
      </div>
      <div style={{marginTop:10,fontSize:9,color:'var(--t4)'}}>
        Dashed line at 1.0x = parity. Green = supplier cheap. Red = supplier expensive.
      </div>
    </div>

    {/* Section 2: Company-level pairs */}
    <div className="chart-wrap">
      <div className="chart-title">Supplier vs customer valuation pairs</div>
      <p style={{fontSize:11,color:'var(--t3)',marginBottom:14,lineHeight:1.7}}>
        Each row compares a specific supplier's forward P/E to its direct customer. Sorted by ratio ascending, so the most
        dislocated pairs (where the supplier trades cheapest relative to its customer) appear at the top. These are the relationships
        where the market has not yet priced in the supplier's importance to the customer's revenue.
      </p>
      <div style={{display:'flex',gap:4,padding:'6px 10px',marginBottom:4,fontSize:9,color:'var(--t4)'}}>
        <div style={{width:140}}>SUPPLIER</div>
        <div style={{width:50,textAlign:'right'}}>P/E</div>
        <div style={{width:30,textAlign:'center'}}>→</div>
        <div style={{width:140}}>CUSTOMER</div>
        <div style={{width:50,textAlign:'right'}}>P/E</div>
        <div style={{flex:1}}/>
        <div style={{width:55,textAlign:'right'}}>RATIO</div>
        <div style={{width:80,textAlign:'right'}}>SIGNAL</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:3}}>
        {sorted.map((p,i) => <div key={i} className="rv-pair-row">
          <div style={{width:140,display:'flex',alignItems:'center',gap:4}}>
            <span style={{width:6,height:6,borderRadius:3,background:STREAM_COLORS[p.sup.stream],flexShrink:0}}/>
            <span className="mono" style={{fontSize:10,fontWeight:600,color:'var(--t1)'}}>{p.supplier}</span>
            <span style={{fontSize:9,color:'var(--t3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.sup.n}</span>
          </div>
          <div className="mono" style={{width:50,fontSize:10,textAlign:'right',color:p.sup.pe!=null?'var(--t2)':'var(--t4)'}}>{p.sup.pe!=null?p.sup.pe+'x':'N/M'}</div>
          <div style={{width:30,textAlign:'center',fontSize:10,color:'var(--t4)'}}>→</div>
          <div style={{width:140,display:'flex',alignItems:'center',gap:4}}>
            <span style={{width:6,height:6,borderRadius:3,background:STREAM_COLORS[p.cust.stream],flexShrink:0}}/>
            <span className="mono" style={{fontSize:10,fontWeight:600,color:'var(--t1)'}}>{p.customer}</span>
            <span style={{fontSize:9,color:'var(--t3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.cust.n}</span>
          </div>
          <div className="mono" style={{width:50,fontSize:10,textAlign:'right',color:p.cust.pe!=null?'var(--t2)':'var(--t4)'}}>{p.cust.pe!=null?p.cust.pe+'x':'N/M'}</div>
          <div style={{flex:1,fontSize:9,color:'var(--t4)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',paddingLeft:8}}>{p.rel}</div>
          <div className="mono" style={{width:55,fontSize:11,fontWeight:700,textAlign:'right',color:p.ratio!=null?ratioColor(p.ratio):'var(--t4)'}}>
            {p.ratio != null ? p.ratio.toFixed(2)+'x' : 'N/M'}
          </div>
          <div style={{width:80,textAlign:'right'}}>
            {p.ratio != null && <span style={{fontSize:9,fontWeight:600,padding:'1px 6px',borderRadius:3,background:ratioColor(p.ratio)+'20',color:ratioColor(p.ratio)}}>
              {ratioLabel(p.ratio)}
            </span>}
          </div>
        </div>)}
      </div>
      <div className="legend" style={{marginTop:10}}>
        {Object.entries({'Upstream':'#4ade80','Midstream':'#60a5fa','Downstream':'#fbbf24','End Demand':'#fb923c'}).map(([n,c])=>
          <span key={n} style={{display:'flex',alignItems:'center',gap:4}}><span className="legend-dot" style={{background:c}}/>{n}</span>
        )}
      </div>
    </div>

    {/* Section 3: Top dislocations interpretation */}
    <div className="chart-wrap">
      <div className="chart-title">Largest valuation dislocations in the supply chain</div>
      <p style={{fontSize:11,color:'var(--t3)',marginBottom:14,lineHeight:1.7}}>
        These are the five pairs where a supplier trades at the steepest discount to its direct customer. A low ratio does not
        automatically mean the supplier is a buy, but it flags a relationship where the market may be underpricing the supplier's
        importance to the customer's earnings. The question to ask: can the customer generate its revenue without this supplier?
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {top5.map((p,i) => <div key={i} style={{padding:'12px 16px',background:'rgba(74,222,128,0.05)',borderRadius:8,borderLeft:'3px solid #4ade80'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
            <span className="mono" style={{fontSize:13,fontWeight:700,color:STREAM_COLORS[p.sup.stream]}}>{p.supplier}</span>
            <span style={{fontSize:10,color:'var(--t4)'}}>at {p.sup.pe}x</span>
            <span style={{fontSize:10,color:'var(--t5)'}}>→</span>
            <span className="mono" style={{fontSize:13,fontWeight:700,color:STREAM_COLORS[p.cust.stream]}}>{p.customer}</span>
            <span style={{fontSize:10,color:'var(--t4)'}}>at {p.cust.pe}x</span>
            <span style={{flex:1}}/>
            <span className="mono" style={{fontSize:14,fontWeight:700,color:'#4ade80'}}>{p.ratio.toFixed(2)}x</span>
          </div>
          <div style={{fontSize:11,color:'var(--t3)',lineHeight:1.6}}>
            <strong style={{color:'var(--t2)'}}>{p.sup.n}</strong> trades at {Math.round(p.ratio*100)}% of <strong style={{color:'var(--t2)'}}>{p.cust.n}</strong>'s forward P/E.
            {p.ratio < 0.5 ? ` This means the market values the supplier at less than half the multiple of its customer, despite ${p.sup.n} being a direct input to ${p.cust.n}'s ability to generate revenue. ` :
             p.ratio < 0.7 ? ` The supplier trades at a significant discount to the company it enables, suggesting the market has not fully priced in the demand visibility flowing from ${p.cust.n}. ` :
             ` The supplier trades at a moderate discount to its customer. `}
            Relationship: {p.rel}. {p.sup.mc && `Supplier market cap: ${p.sup.mc}.`}
          </div>
        </div>)}
      </div>

      <div style={{marginTop:14,padding:'10px 14px',background:'#ffffff06',borderRadius:6,fontSize:10,color:'var(--t4)',lineHeight:1.6}}>
        <strong style={{color:'var(--t3)'}}>How to use this:</strong> The lowest ratios flag where the market is pricing the supplier as if it has
        limited leverage over its customer, even when the supplier occupies an irreplaceable position in the customer's BOM. When these ratios
        compress (supplier re-rates toward customer), the supplier's stock outperforms. Watch for earnings catalysts at the customer level
        that confirm demand visibility for the supplier.
      </div>
    </div>
  </>
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
  const tabs = [['pyramid','Pyramid'],['chain','Supply Chain'],['scatter','PE vs Beta'],['fcf','FCF Yield'],['growth','Rev Growth'],['gaps','Valuation Gaps'],['relval','Relative Value']]

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
    {tab==='relval' && <RelativeValueTab tiers={tiers}/>}
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
