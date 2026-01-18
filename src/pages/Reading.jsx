import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'
import TextLine from '../components/TextLine'
import MCQItem from '../components/MCQItem'

function Reading() {
  const { id } = useParams()
  const [paragraph, setParagraph] = useState(null)

  useEffect(() => {
    fetch('/data/content.json')
      .then(response => response.json())
      .then(data => {
        const found = data.paragraphs.find(p => p.paragraphId === id)
        if (found) {
          setParagraph(found)
        } else {
          window.location.href = '/'
        }
      })
      .catch(error => {
        console.error('Error loading content:', error)
        window.location.href = '/'
      })
  }, [id])

  if (!paragraph) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center font-serif text-2xl text-charcoal/40">
          Chargement...
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-16">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-5xl font-light text-charcoal tracking-tight">
            Apprendre le Français
          </h1>
          <Link 
            to="/" 
            className="font-sans text-sm font-light text-charcoal/60 hover:text-charcoal transition-colors tracking-wide"
          >
            ← Accueil
          </Link>
        </div>
      </header>

      <main>
        <section className="reading-section">
          <div className="flex justify-between items-start mb-8">
            <h2 className="font-serif text-4xl font-light text-charcoal tracking-tight">
              {paragraph.title}
            </h2>
            <span className="font-serif text-sm px-4 py-1 border border-charcoal/20 text-charcoal/60">
              {paragraph.level}
            </span>
          </div>

          {paragraph.image && (
            <div className="mb-12 overflow-hidden">
              <img 
                src={paragraph.image} 
                alt={paragraph.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="mb-8 p-4 bg-white/50 border-l-2 border-charcoal/20">
            <p className="font-sans text-sm font-light text-charcoal/60 tracking-wide">
              Cliquez sur une ligne pour révéler la traduction
            </p>
          </div>

          <div className="mb-16">
            {paragraph.frenchLines.map((french, index) => (
              <TextLine 
                key={index}
                french={french}
                english={paragraph.englishLines[index]}
              />
            ))}
          </div>

          <div className="quiz-section">
            <div className="h-px bg-charcoal/10 mb-12"></div>
            <h3 className="font-serif text-3xl font-light text-charcoal mb-8 tracking-tight">
              Questions
            </h3>
            <div className="space-y-6">
              {paragraph.mcqs.map((mcq, index) => (
                <MCQItem 
                  key={index}
                  mcq={mcq}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Reading
