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
    lineDiv.className = 'text-line';
    
    const frenchP = document.createElement('p');
    frenchP.className = 'french';
    frenchP.textContent = frenchText;
    
    const englishP = document.createElement('p');
    englishP.className = 'english';
    englishP.textContent = englishText;
    
    lineDiv.appendChild(frenchP);
    lineDiv.appendChild(englishP);
    
    // Toggle translation on click
    lineDiv.addEventListener('click', () => {
        lineDiv.classList.toggle('revealed');
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
    mcqDiv.className = 'mcq-item';
    
    const questionP = document.createElement('p');
    questionP.className = 'mcq-question';
    questionP.textContent = `${index + 1}. ${mcq.question}`;
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'mcq-options';
    
    mcq.options.forEach((option, optionIndex) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => {
            handleMCQAnswer(mcqDiv, optionIndex, mcq.correctIndex, optionsDiv);
        });
        optionsDiv.appendChild(optionBtn);
    });
    
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'mcq-feedback';
    
    mcqDiv.appendChild(questionP);
    mcqDiv.appendChild(optionsDiv);
    mcqDiv.appendChild(feedbackDiv);
    
    return mcqDiv;
}

// Handle MCQ answer selection
function handleMCQAnswer(mcqDiv, selectedIndex, correctIndex, optionsDiv) {
    const buttons = optionsDiv.querySelectorAll('.option-btn');
    const feedbackDiv = mcqDiv.querySelector('.mcq-feedback');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Mark correct and incorrect answers
    buttons[correctIndex].classList.add('correct');
    
    if (selectedIndex === correctIndex) {
        // Correct answer
        feedbackDiv.textContent = '✓ Correct! Bien joué!';
        feedbackDiv.classList.add('correct', 'show');
    } else {
        // Incorrect answer
        buttons[selectedIndex].classList.add('incorrect');
        feedbackDiv.textContent = '✗ Incorrect. La bonne réponse est mise en évidence ci-dessus.';
        feedbackDiv.classList.add('incorrect', 'show');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
