import { useState } from 'react'

function MCQItem({ mcq, index }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (optionIndex) => {
    if (answered) return
    setSelectedIndex(optionIndex)
    setAnswered(true)
  }

  const isCorrect = selectedIndex === mcq.correctIndex

  return (
    <div className="p-6 bg-white/40 border border-charcoal/10">
      <p className="font-serif text-xl font-light text-charcoal mb-6 tracking-tight">
        {index + 1}. {mcq.question}
      </p>
      
      <div className="space-y-3">
        {mcq.options.map((option, optionIndex) => {
          const isThisCorrect = optionIndex === mcq.correctIndex
          const isSelected = optionIndex === selectedIndex
          
          let buttonClass = 'w-full text-left px-6 py-4 font-sans text-sm font-light tracking-wide transition-all duration-300 '
          
          if (answered) {
            if (isThisCorrect) {
              buttonClass += 'bg-sage/20 border-sage text-charcoal/70 border'
            } else if (isSelected) {
              buttonClass += 'bg-terracotta/20 border-terracotta text-charcoal/70 border'
            } else {
              buttonClass += 'text-charcoal/40 bg-white/50 border border-charcoal/10'
            }
          } else {
            buttonClass += 'text-charcoal/70 bg-white/50 border border-charcoal/10 hover:border-charcoal/30 hover:bg-white'
          }

          return (
            <button
              key={optionIndex}
              onClick={() => handleAnswer(optionIndex)}
              disabled={answered}
              className={buttonClass}
            >
              {option}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`mt-4 font-sans text-sm font-light tracking-wide transition-opacity duration-300 ${
          isCorrect ? 'text-sage' : 'text-terracotta'
        }`}>
          {isCorrect 
            ? '✓ Correct! Bien joué!' 
            : '✗ La bonne réponse est mise en évidence ci-dessus.'
          }
        </div>
      )}
    </div>
  )
}

export default MCQItem
