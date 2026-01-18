import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HowItWorks from '../components/HowItWorks'
import LevelSelector from '../components/LevelSelector'
import ParagraphList from '../components/ParagraphList'

function Home() {
  const [paragraphs, setParagraphs] = useState([])
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [filteredParagraphs, setFilteredParagraphs] = useState([])

  useEffect(() => {
    // Load content
    fetch('/data/content.json')
      .then(response => response.json())
      .then(data => setParagraphs(data.paragraphs))
      .catch(error => console.error('Error loading content:', error))
  }, [])

  useEffect(() => {
    if (selectedLevel) {
      const filtered = paragraphs.filter(p => p.level === selectedLevel)
      setFilteredParagraphs(filtered)
    }
  }, [selectedLevel, paragraphs])

  const handleLevelSelect = (level) => {
    setSelectedLevel(level)
    // Smooth scroll to paragraphs
    setTimeout(() => {
      document.getElementById('paragraphs-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
  }

  const handleBackToLevels = () => {
    setSelectedLevel(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Header />
      
      <main>
        <HowItWorks />
        <LevelSelector onSelectLevel={handleLevelSelect} />
        
        {selectedLevel && (
          <ParagraphList 
            level={selectedLevel}
            paragraphs={filteredParagraphs}
            onBack={handleBackToLevels}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Home
