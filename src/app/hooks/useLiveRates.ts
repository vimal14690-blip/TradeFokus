import { useState, useEffect } from 'react'

interface Rate {
  sym: string;
  name: string;
  base: number;
  unit: string;
  cat: string;
  icon: string;
  exchange: string;
  price: number;
  prev: number;
  change: number;
  changePct: number;
  history: number[];
}

/* Base commodity prices with realistic values */
const BASE = [
  { sym:'GOLD',     name:'Gold',       base:2342,   unit:'USD/oz',   cat:'Metals',    icon:'🥇', exchange:'LME' },
  { sym:'SILVER',   name:'Silver',     base:29.45,  unit:'USD/oz',   cat:'Metals',    icon:'🥈', exchange:'LME' },
  { sym:'COPPER',   name:'Copper',     base:9785,   unit:'USD/t',    cat:'Metals',    icon:'🔩', exchange:'LME' },
  { sym:'ALUM',     name:'Aluminium',  base:2448,   unit:'USD/t',    cat:'Metals',    icon:'⚙️', exchange:'LME' },
  { sym:'ZINC',     name:'Zinc',       base:2890,   unit:'USD/t',    cat:'Metals',    icon:'🔗', exchange:'LME' },
  { sym:'CRUDE',    name:'Crude Oil',  base:82.4,   unit:'USD/bbl',  cat:'Energy',    icon:'🛢️', exchange:'MCX' },
  { sym:'RICE',     name:'Rice',       base:3845,   unit:'₹/qtl',    cat:'Agri',      icon:'🌾', exchange:'NCDEX' },
  { sym:'WHEAT',    name:'Wheat',      base:2240,   unit:'₹/qtl',    cat:'Agri',      icon:'🌿', exchange:'NCDEX' },
  { sym:'MAIZE',    name:'Maize',      base:1980,   unit:'₹/qtl',    cat:'Agri',      icon:'🌽', exchange:'NCDEX' },
  { sym:'SOYA',     name:'Soybean',    base:4185,   unit:'₹/qtl',    cat:'Oilseeds',  icon:'🌻', exchange:'NCDEX' },
  { sym:'SUGAR',    name:'Sugar',      base:3648,   unit:'₹/qtl',    cat:'Agri',      icon:'🍬', exchange:'NCDEX' },
  { sym:'COTTON',   name:'Cotton',     base:58200,  unit:'₹/candy',  cat:'Cash Crops',icon:'☁️', exchange:'MCX'   },
  { sym:'PEPPER',   name:'Pepper',     base:64000,  unit:'₹/qtl',    cat:'Spices',    icon:'🌶️', exchange:'NCDEX' },
  { sym:'TURMERIC', name:'Turmeric',   base:18450,  unit:'₹/qtl',    cat:'Spices',    icon:'🟡', exchange:'NCDEX' },
  { sym:'CASTOR',   name:'Castor',     base:6320,   unit:'₹/qtl',    cat:'Oilseeds',  icon:'🌱', exchange:'NCDEX' },
  { sym:'IRONORE',  name:'Iron Ore',   base:118,    unit:'USD/t',    cat:'Minerals',  icon:'⛏️', exchange:'MCX'   },
]

/* Realistic micro-fluctuation per commodity */
const VOLATILITY: { [key: string]: number } = {
  GOLD:0.08, SILVER:0.15, COPPER:0.2, ALUM:0.18, ZINC:0.22,
  CRUDE:0.25, RICE:0.05, WHEAT:0.06, MAIZE:0.07, SOYA:0.10,
  SUGAR:0.08, COTTON:0.12, PEPPER:0.3, TURMERIC:0.35,
  CASTOR:0.15, IRONORE:0.2,
}

function fluctuate(price: number, sym: string): number {
  const vol = VOLATILITY[sym] || 0.1
  const delta = price * (vol / 100) * (Math.random() * 2 - 1)
  return parseFloat((price + delta).toFixed(price > 1000 ? 1 : 2))
}

function buildHistory(base: number, len = 20): number[] {
  const arr = [base]
  for (let i = 1; i < len; i++) {
    const prev = arr[i - 1]
    const sym = BASE.find(b => b.base === base)?.sym
    const vol  = VOLATILITY[sym!] || 0.1
    arr.push(parseFloat((prev + prev * (vol / 100) * (Math.random() * 2 - 1)).toFixed(2)))
  }
  return arr
}

export function useLiveRates() {
  const [rates, setRates] = useState<Rate[]>(() =>
    BASE.map((r) => ({
      ...r,
      price:   r.base,
      prev:    r.base,
      change:  0,
      changePct: 0,
      history: buildHistory(r.base),
    }))
  )
  const [lastUpdated, setLastUpdated] = useState(new Date())

  /* Tick every 12 seconds */
  useEffect(() => {
    const tick = () => {
      setRates(prev => prev.map(r => {
        const newPrice = fluctuate(r.price, r.sym)
        const changePct = parseFloat(((newPrice - r.base) / r.base * 100).toFixed(2))
        return {
          ...r,
          prev:      r.price,
          price:     newPrice,
          change:    parseFloat((newPrice - r.base).toFixed(2)),
          changePct,
          history:   [...r.history.slice(1), newPrice],
        }
      }))
      setLastUpdated(new Date())
    }
    const id = setInterval(tick, 12000)
    return () => clearInterval(id)
  }, [])

  return { rates, lastUpdated }
}
