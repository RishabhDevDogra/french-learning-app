import { Link } from 'react-router-dom'

function ParagraphCard({ paragraph }) {
  return (
    <Link 
      to={`/reading/${paragraph.paragraphId}`}
      className="group cursor-pointer border border-charcoal/10 hover:border-charcoal/30 transition-all duration-500 overflow-hidden bg-white/30 block"
    >
      {paragraph.image && (
        <div className="h-64 overflow-hidden">
          <img 
            src={paragraph.image} 
            alt={paragraph.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className="p-8">
        <h3 className="font-serif text-3xl font-light text-charcoal mb-3 tracking-tight">
          {paragraph.title}
        </h3>
        <p className="font-sans text-sm font-light text-charcoal/50 italic tracking-wide">
          {paragraph.frenchLines[0]}
        </p>
      </div>
    </Link>
  )
}

export default ParagraphCard
