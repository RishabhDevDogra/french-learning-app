function HowItWorks() {
  const steps = [
    { number: 1, text: 'Choisissez votre niveau' },
    { number: 2, text: 'Sélectionnez un texte' },
    { number: 3, text: 'Découvrez les traductions' },
    { number: 4, text: 'Testez votre compréhension' }
  ]

  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {steps.map(step => (
          <div key={step.number} className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-charcoal/5 flex items-center justify-center font-serif text-2xl text-charcoal/40 group-hover:bg-charcoal/10 transition-all duration-500">
              {step.number}
            </div>
            <p className="font-sans text-sm font-light text-charcoal/70 tracking-wide">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
