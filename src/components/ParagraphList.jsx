import ParagraphCard from './ParagraphCard'

function ParagraphList({ level, paragraphs, onBack }) {
  return (
    <section id="paragraphs-section" className="mb-24">
      <div className="h-px bg-charcoal/10 mb-16"></div>
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-serif text-4xl font-light text-charcoal tracking-tight">
          Textes
        </h2>
        <button 
          onClick={onBack}
          className="font-sans text-sm font-light text-charcoal/60 hover:text-charcoal transition-colors tracking-wide"
        >
          ← Retour
        </button>
      </div>
      <div className="space-y-4 max-w-4xl mx-auto">
        {paragraphs.map(paragraph => (
          <ParagraphCard key={paragraph.paragraphId} paragraph={paragraph} />
        ))}
      </div>
    </section>
  )
}

export default ParagraphList
