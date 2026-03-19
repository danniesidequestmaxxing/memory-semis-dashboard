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
  return <div style={{width:`${tier.width}%`,minWidth:300,transition:'width 0.3s'}}>
    <div className={`tier-bar ${isOpen?'open':''}`} onClick={toggle}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 200px',minWidth:0}}>
          <div className="mono" style={{fontSize:12,fontWeight:700,color:'var(--t1)',letterSpacing:'0.01em'}}>{tier.label}</div>
          {!isOpen && <div style={{fontSize:10,color:'var(--t4)',marginTop:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
            {tier.cos.map(c=>c.t).filter(t=>t!=='—').join(' · ')}
          </div>}
        </div>
        <div style={{display:'flex',gap:14,alignItems:'center',flexShrink:0}}>
          {[
            {l:'Med P/E',v:tier.medPE,f:v=>v+'x',c:peColor(tier.medPE)},
            {l:'Med EV/EB',v:tier.medEV,f:v=>v+'x',c:'var(--t2)'},
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
      <table>
        <thead><tr>{["Ticker","Company","Price","Fwd P/E","EV/EBITDA","Beta","FCF Yld","Mkt Cap","Source"].map(h=>
          <th key={h} style={h==='Company'?{textAlign:'left'}:{}}>{h}</th>
        )}</tr></thead>
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
    </div>}
  </div>
}

function BubbleChart() {
  const ref = useRef(null)
  const chartRef = useRef(null)
  useEffect(()=>{
    if(chartRef.current) chartRef.current.destroy()
    const tiers = {
      Memory:{c:'#4ade80',d:[{x:1.4,y:8,r:28,l:'SK Hynix'},{x:1.3,y:7,r:16,l:'Micron'},{x:1.5,y:18,r:6,l:'Nanya'},{x:1.3,y:22,r:5,l:'Winbond'},{x:1.2,y:20,r:5,l:'Macronix'},{x:1.4,y:15,r:4,l:'ESMT'}]},
      Subsystems:{c:'#a78bfa',d:[{x:1.5,y:28,r:10,l:'MKS'},{x:1.8,y:22,r:5,l:'Ichor'},{x:1.4,y:32,r:10,l:'Entegris'},{x:1.3,y:40,r:9,l:'VAT'},{x:1.4,y:22,r:6,l:'Adv Energy'},{x:1.8,y:20,r:5,l:'UCTT'},{x:1.1,y:12,r:5,l:'Ferrotec'}]},
      Testing:{c:'#60a5fa',d:[{x:1.5,y:35,r:12,l:'Advantest'},{x:1.3,y:42,r:11,l:'Teradyne'},{x:1.5,y:26,r:7,l:'FormFactor'},{x:1.2,y:18,r:5,l:'MJC'},{x:1.3,y:16,r:5,l:'WinWay'},{x:1.2,y:14,r:4,l:'ISC'},{x:1.1,y:15,r:4,l:'LEENO'}]},
      Packaging:{c:'#f472b6',d:[{x:1.6,y:54,r:8,l:'BESI'},{x:1.3,y:16,r:6,l:'ASMPT'},{x:1.5,y:26,r:9,l:'Amkor'},{x:1.2,y:14,r:7,l:'Powertech'}]},
      'WFE OEMs':{c:'#5eead4',d:[{x:1.2,y:32,r:14,l:'ASML'},{x:1.7,y:34,r:13,l:'AMAT'},{x:1.4,y:25,r:10,l:'Lam'},{x:1.3,y:35,r:12,l:'KLA'},{x:1.4,y:38,r:8,l:'ASM'},{x:1.5,y:27,r:7,l:'ONTO'}]},
      Compute:{c:'#fbbf24',d:[{x:1.7,y:35,r:30,l:'NVDA'},{x:1.3,y:32,r:18,l:'AVGO'},{x:1.6,y:28,r:13,l:'AMD'}]},
    }
    chartRef.current = new Chart(ref.current,{
      type:'bubble',
      data:{datasets:Object.entries(tiers).map(([n,{c,d}])=>({label:n,data:d,backgroundColor:c+'80',borderColor:c,borderWidth:0.5}))},
      options:{responsive:true,maintainAspectRatio:false,layout:{padding:20},
        scales:{x:{title:{display:true,text:'Beta →',color:'#777',font:{size:11}},min:0.8,max:2.0,grid:{color:'#ffffff0a'},ticks:{color:'#777',stepSize:0.2}},
                y:{title:{display:true,text:'Forward P/E →',color:'#777',font:{size:11}},min:0,max:60,grid:{color:'#ffffff0a'},ticks:{color:'#777'}}},
        plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>{const p=ctx.raw;return `${p.l}: ${p.y}x fwd PE, ${p.x}β`}}}}}
    })
    return ()=>{ if(chartRef.current) chartRef.current.destroy() }
  },[])
  return <div className="chart-wrap">
    <div className="chart-title">Forward P/E vs beta — risk-adjusted valuation</div>
    <div style={{position:'relative',height:380}}><canvas ref={ref}/></div>
    <div className="legend">
      {Object.entries({Memory:'#4ade80',Subsystems:'#a78bfa',Testing:'#60a5fa',Packaging:'#f472b6','WFE OEMs':'#5eead4',Compute:'#fbbf24'}).map(([n,c])=>
        <span key={n} style={{display:'flex',alignItems:'center',gap:4}}><span className="legend-dot" style={{background:c}}/>{n}</span>
      )}
      <span style={{color:'var(--t4)',fontSize:10,marginLeft:8}}>Bubble size = market cap. Bottom-left = safest value.</span>
    </div>
  </div>
}

function FCFChart() {
  const ref = useRef(null)
  const chartRef = useRef(null)
  useEffect(()=>{
    if(chartRef.current) chartRef.current.destroy()
    const all = TIERS.flatMap(t=>t.cos.filter(c=>c.fcf!=null&&c.fcf>0).map(c=>({n:c.n,v:c.fcf,c:TIER_COLORS[t.id]})))
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
  },[])
  return <div className="chart-wrap">
    <div className="chart-title">FCF yield — who's generating cash (top 25)</div>
    <div style={{position:'relative',height:520}}><canvas ref={ref}/></div>
  </div>
}

function GrowthChart() {
  const ref = useRef(null)
  const chartRef = useRef(null)
  useEffect(()=>{
    if(chartRef.current) chartRef.current.destroy()
    const all = TIERS.flatMap(t=>t.cos.filter(c=>c.revGr!=null&&c.revGr>0).map(c=>({n:c.n,v:c.revGr,c:TIER_COLORS[t.id]})))
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
  },[])
  return <div className="chart-wrap">
    <div className="chart-title">Forward revenue growth — who's accelerating</div>
    <div style={{position:'relative',height:560}}><canvas ref={ref}/></div>
  </div>
}

function MedianBars() {
  const sorted = [...TIERS].sort((a,b)=>(a.medPE||99)-(b.medPE||99))
  const max = Math.max(...sorted.map(t=>t.medPE||0))
  const peColor = v => v<=18?'var(--green)':v<=30?'var(--gray)':'var(--red)'
  return <div className="chart-wrap">
    <div className="chart-title">Median forward P/E by supply chain layer</div>
    <div style={{display:'flex',flexDirection:'column',gap:5}}>
      {sorted.map(t=><div key={t.id} style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:100,fontSize:10,color:'var(--t4)',textAlign:'right',flexShrink:0}}>{t.label.split('—')[0].trim()}</div>
        <div style={{flex:1,height:16,background:'var(--bg)',borderRadius:3,overflow:'hidden'}}>
          <div style={{width:`${(t.medPE/max)*100}%`,height:'100%',background:TIER_COLORS[t.id],borderRadius:3,opacity:0.6}}/>
        </div>
        <div className="mono" style={{fontSize:13,fontWeight:700,color:peColor(t.medPE),width:36,textAlign:'right'}}>{t.medPE}x</div>
      </div>)}
    </div>
  </div>
}

function Gaps() {
  return <div className="chart-wrap">
    <div className="chart-title">Widest valuation gaps — same exposure, different multiples</div>
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      {VALUATION_GAPS.map((g,i)=><div key={i} className="gap-row">
        <div style={{display:'flex',alignItems:'center',gap:4,flex:'1 1 0'}}>
          <span className="mono" style={{fontSize:12,fontWeight:700,color:'var(--red)'}}>{g.a} {g.aPE}x</span>
          <span className="gap-vs">vs</span>
          <span className="mono" style={{fontSize:12,fontWeight:700,color:'var(--green)'}}>{g.b} {g.bPE}x</span>
        </div>
        <div style={{flex:'2 1 0',fontSize:10,color:'var(--t4)',lineHeight:1.4}}>{g.note}</div>
      </div>)}
    </div>
  </div>
}

export default function App() {
  const [tab,setTab] = useState('pyramid')
  const [open,setOpen] = useState('demand')
  const tabs = [['pyramid','Pyramid'],['scatter','PE vs Beta'],['fcf','FCF Yield'],['growth','Rev Growth'],['gaps','Valuation Gaps']]

  return <div className="container">
    <div style={{padding:'20px 0 4px'}}>
      <h1>AI memory supply chain <span>valuation pyramid</span></h1>
      <p className="subtitle">
        {TIERS.reduce((a,t)=>a+t.cos.length,0)} companies across {TIERS.length} layers. Capital flows top→down, valuation efficiency decreases.
        Prices mostly 3/18 close; MU updated for 3/20 post-earnings. Market down 3/19-20 (Fed + geopolitical).
      </p>
    </div>

    <div className="tabs">
      {tabs.map(([k,l])=><button key={k} className={`tab ${tab===k?'active':''}`} onClick={()=>setTab(k)}>{l}</button>)}
    </div>

    {tab==='pyramid' && <>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
        {TIERS.map(t=><Tier key={t.id} tier={t} isOpen={open===t.id} toggle={()=>setOpen(open===t.id?null:t.id)}/>)}
      </div>
      <MedianBars/>
    </>}
    {tab==='scatter' && <BubbleChart/>}
    {tab==='fcf' && <FCFChart/>}
    {tab==='growth' && <GrowthChart/>}
    {tab==='gaps' && <Gaps/>}

    <div className="method">
      <div className="method-title">Data sources & methodology</div>
      <div className="method-text">
        <strong>Prices (3/20/2026):</strong> Most US = Yahoo Finance 3/18 close. MU ~$420 post-ER selloff (reported 3/18: rev $23.9B, guided Q3 $33.5B). KRX from Investing.com 3/19. TWSE/TSE/HKEX/SWX marked "est." Market down 3/19-20 on Fed hold + Iran-Qatar shock — most names 2-5% below shown.
        <strong> Forward P/E:</strong> StockAnalysis (FORM 26.1x, AMAT 33.9x, ONTO 27.0x), GuruFocus (BESI 54.2x), Morningstar (NVDA 37.7x). MU recalculated ~7x on NTM ~$60 EPS.
        <strong> For live data:</strong> Connect S&P Capital IQ, Bloomberg DAPI, or Financial Modeling Prep ($15/mo).
        <strong> Not investment advice.</strong>
      </div>
    </div>
  </div>
}
