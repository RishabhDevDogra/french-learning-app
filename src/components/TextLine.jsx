import { useState } from 'react'

function TextLine({ french, english }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div 
      onClick={() => setRevealed(!revealed)}
      className="group mb-3 p-6 bg-white/40 hover:bg-white/70 border border-charcoal/0 hover:border-charcoal/20 cursor-pointer transition-all duration-300"
    >
      <p className="font-serif text-2xl font-light text-charcoal mb-2 tracking-tight">
        {french}
      </p>
      <p className={`font-sans text-sm font-light text-charcoal/40 tracking-wide transition-all duration-300 overflow-hidden ${
        revealed ? 'opacity-100 max-h-20 mt-2' : 'opacity-0 max-h-0'
      }`}>
        {english}
      </p>
    </div>
  )
}

export default TextLine
