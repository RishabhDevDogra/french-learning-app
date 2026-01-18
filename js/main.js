// Main page logic for level selection and paragraph display

let allParagraphs = [];
let currentLevel = null;

// Load content from JSON file
async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        allParagraphs = data.paragraphs;
    } catch (error) {
        console.error('Error loading content:', error);
        alert('Failed to load content. Please refresh the page.');
    }
}

// Initialize page
async function init() {
    await loadContent();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Level button listeners
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.getAttribute('data-level');
            showParagraphsForLevel(level);
        });
    });

    // Back button listener
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
        hideParagraphsSection();
    });
}

// Show paragraphs for selected level
function showParagraphsForLevel(level) {
    currentLevel = level;
    
    // Filter paragraphs by level
    const levelParagraphs = allParagraphs.filter(p => p.level === level);
    
    // Show paragraphs section
    const paragraphsSection = document.getElementById('paragraphs-section');
    paragraphsSection.classList.remove('hidden');
    
    // Populate paragraphs list
    const paragraphsList = document.getElementById('paragraphs-list');
    paragraphsList.innerHTML = '';
    
    levelParagraphs.forEach(paragraph => {
        const card = createParagraphCard(paragraph);
        paragraphsList.appendChild(card);
    });
    
    // Scroll to paragraphs section
    paragraphsSection.scrollIntoView({ behavior: 'smooth' });
}

// Create paragraph card element
function createParagraphCard(paragraph) {
    const card = document.createElement('div');
    card.className = 'paragraph-card';
    card.addEventListener('click', () => {
        navigateToReading(paragraph.paragraphId);
    });
    
    const info = document.createElement('div');
    info.className = 'paragraph-info';
    
    const title = document.createElement('h3');
    title.textContent = paragraph.title;
    
    const preview = document.createElement('p');
    preview.className = 'paragraph-preview';
    preview.textContent = paragraph.frenchLines[0];
    
    info.appendChild(title);
    info.appendChild(preview);
    
    const arrow = document.createElement('span');
    arrow.className = 'arrow';
    arrow.textContent = '→';
    
    card.appendChild(info);
    card.appendChild(arrow);
    
    return card;
}

// Hide paragraphs section
function hideParagraphsSection() {
    const paragraphsSection = document.getElementById('paragraphs-section');
    paragraphsSection.classList.add('hidden');
    currentLevel = null;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to reading page
function navigateToReading(paragraphId) {
    window.location.href = `reading.html?id=${paragraphId}`;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
