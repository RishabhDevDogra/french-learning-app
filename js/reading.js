// Reading page logic for displaying paragraphs, translations, and MCQs

let currentParagraph = null;

// Get paragraph ID from URL
function getParagraphIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load content from JSON file
async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        return data.paragraphs;
    } catch (error) {
        console.error('Error loading content:', error);
        alert('Failed to load content. Please return to the home page.');
        return null;
    }
}

// Find paragraph by ID
function findParagraphById(paragraphs, id) {
    return paragraphs.find(p => p.paragraphId === id);
}

// Initialize page
async function init() {
    const paragraphId = getParagraphIdFromURL();
    
    if (!paragraphId) {
        alert('No paragraph selected. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }
    
    const paragraphs = await loadContent();
    if (!paragraphs) return;
    
    currentParagraph = findParagraphById(paragraphs, paragraphId);
    
    if (!currentParagraph) {
        alert('Paragraph not found. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }
    
    displayParagraph();
    displayMCQs();
}

// Display paragraph content
function displayParagraph() {
    // Set title and level badge
    document.getElementById('paragraph-title').textContent = currentParagraph.title;
    document.getElementById('level-badge').textContent = currentParagraph.level;
    
    // Display image if available
    const readingSection = document.querySelector('.reading-section');
    if (currentParagraph.image) {
        const existingImage = document.querySelector('.paragraph-image');
        if (existingImage) {
            existingImage.remove();
        }
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'paragraph-image mb-12 overflow-hidden';
        
        const img = document.createElement('img');
        img.src = currentParagraph.image;
        img.alt = currentParagraph.title;
        img.className = 'w-full h-96 object-cover';
        
        imageContainer.appendChild(img);
        const firstChild = readingSection.firstChild;
        readingSection.insertBefore(imageContainer, firstChild);
    }
    
    // Display French text with translations
    const frenchTextContainer = document.getElementById('french-text');
    frenchTextContainer.innerHTML = '';
    
    currentParagraph.frenchLines.forEach((frenchLine, index) => {
        const lineDiv = createTextLine(frenchLine, currentParagraph.englishLines[index]);
        frenchTextContainer.appendChild(lineDiv);
    });
}

// Create text line element with French and English
function createTextLine(frenchText, englishText) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'group mb-3 p-6 bg-white/40 hover:bg-white/70 border border-charcoal/0 hover:border-charcoal/20 cursor-pointer transition-all duration-300';
    
    const frenchP = document.createElement('p');
    frenchP.className = 'font-serif text-2xl font-light text-charcoal mb-2 tracking-tight';
    frenchP.textContent = frenchText;
    
    const englishP = document.createElement('p');
    englishP.className = 'font-sans text-sm font-light text-charcoal/40 tracking-wide opacity-0 max-h-0 overflow-hidden transition-all duration-300';
    englishP.textContent = englishText;
    
    lineDiv.appendChild(frenchP);
    lineDiv.appendChild(englishP);
    
    // Toggle translation on click
    lineDiv.addEventListener('click', () => {
        if (lineDiv.classList.contains('revealed')) {
            englishP.classList.remove('opacity-100', 'max-h-20', 'mt-2');
            englishP.classList.add('opacity-0', 'max-h-0');
            lineDiv.classList.remove('revealed');
        } else {
            englishP.classList.remove('opacity-0', 'max-h-0');
            englishP.classList.add('opacity-100', 'max-h-20', 'mt-2');
            lineDiv.classList.add('revealed');
        }
    });
    
    return lineDiv;
}

// Display MCQs
function displayMCQs() {
    const mcqContainer = document.getElementById('mcq-container');
    mcqContainer.innerHTML = '';
    
    currentParagraph.mcqs.forEach((mcq, index) => {
        const mcqItem = createMCQItem(mcq, index);
        mcqContainer.appendChild(mcqItem);
    });
}

// Create MCQ item element
function createMCQItem(mcq, index) {
    const mcqDiv = document.createElement('div');
    mcqDiv.className = 'p-6 bg-white/40 border border-charcoal/10';
    
    const questionP = document.createElement('p');
    questionP.className = 'font-serif text-xl font-light text-charcoal mb-6 tracking-tight';
    questionP.textContent = `${index + 1}. ${mcq.question}`;
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'space-y-3';
    
    mcq.options.forEach((option, optionIndex) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'w-full text-left px-6 py-4 font-sans text-sm font-light text-charcoal/70 bg-white/50 border border-charcoal/10 hover:border-charcoal/30 hover:bg-white transition-all duration-300 tracking-wide';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => {
            handleMCQAnswer(mcqDiv, optionIndex, mcq.correctIndex, optionsDiv);
        });
        optionsDiv.appendChild(optionBtn);
    });
    
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'mt-4 font-sans text-sm font-light tracking-wide opacity-0 transition-opacity duration-300';
    
    mcqDiv.appendChild(questionP);
    mcqDiv.appendChild(optionsDiv);
    mcqDiv.appendChild(feedbackDiv);
    
    return mcqDiv;
}

// Handle MCQ answer selection
function handleMCQAnswer(mcqDiv, selectedIndex, correctIndex, optionsDiv) {
    const buttons = optionsDiv.querySelectorAll('button');
    const feedbackDiv = mcqDiv.querySelector('div:last-child');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Style correct answer
    buttons[correctIndex].classList.remove('border-charcoal/10', 'hover:border-charcoal/30');
    buttons[correctIndex].classList.add('bg-sage/20', 'border-sage');
    
    if (selectedIndex === correctIndex) {
        // Correct answer
        feedbackDiv.textContent = '✓ Correct! Bien joué!';
        feedbackDiv.classList.add('text-sage', 'opacity-100');
    } else {
        // Incorrect answer
        buttons[selectedIndex].classList.remove('border-charcoal/10');
        buttons[selectedIndex].classList.add('bg-terracotta/20', 'border-terracotta');
        feedbackDiv.textContent = '✗ La bonne réponse est mise en évidence ci-dessus.';
        feedbackDiv.classList.add('text-terracotta', 'opacity-100');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
