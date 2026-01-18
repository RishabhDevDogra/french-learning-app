function LevelSelector({ onSelectLevel }) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

  return (
    <section className="mb-24">
      <div className="h-px bg-charcoal/10 mb-16"></div>
      <h2 className="font-serif text-4xl font-light text-charcoal text-center mb-12 tracking-tight">
        Votre Niveau
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
        {levels.map(level => (
          <button
            key={level}
            onClick={() => onSelectLevel(level)}
            className="font-serif text-2xl py-6 border border-charcoal/20 hover:border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
          >
            {level}
          </button>
        ))}
      </div>
    </section>
  )
}

export default LevelSelector
