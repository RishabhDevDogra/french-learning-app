# 🇫🇷 French Learning MVP

A simple, clean French reading comprehension web application built with vanilla HTML, CSS, and JavaScript.

## 📁 Project Structure

```
french-learning-app/
├── index.html          # Landing page with level selector
├── reading.html        # Reading page with paragraphs and MCQs
├── css/
│   └── style.css      # All styling (clean, minimal design)
├── js/
│   ├── main.js        # Landing page logic
│   └── reading.js     # Reading page logic
└── data/
    └── content.json   # French paragraphs with translations and MCQs
```

## ✨ Features

### Landing Page
- **Level Selector**: Choose from 6 CEFR levels (A1, A2, B1, B2, C1, C2)
- **Paragraph List**: See 2 sample paragraphs per level
- **Clean Navigation**: Smooth transitions between sections

### Reading Page
- **Line-by-Line Display**: French text shown one line at a time
- **Interactive Translations**: Click any line to reveal English translation
- **Hover Effects**: Visual feedback on text interaction
- **MCQ Questions**: 3-5 comprehension questions per paragraph
- **Immediate Feedback**: Instant correct/incorrect indication

## 🎨 UX Features

- **Minimal Design**: Clean, distraction-free interface
- **Smooth Transitions**: CSS-based animations (0.3s ease)
- **Hover Highlights**: French text highlights on hover
- **Responsive Layout**: Works on desktop and mobile
- **Color-Coded Feedback**: Green for correct, red for incorrect

## 🗂 Data Structure

The `content.json` file contains:

```json
{
  "paragraphs": [
    {
      "level": "A1",
      "paragraphId": "a1-1",
      "title": "Bonjour!",
      "frenchLines": ["Line 1", "Line 2", ...],
      "englishLines": ["Translation 1", "Translation 2", ...],
      "mcqs": [
        {
          "question": "Question text?",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctIndex": 1
        }
      ]
    }
  ]
}
```

## 🚀 How to Run

1. **Open the project folder**
2. **Open `index.html` in a web browser**
   - Double-click the file, or
   - Use a local server (recommended):
     ```bash
     python -m http.server 8000
     # or
     npx serve
     ```
3. **Navigate** to `http://localhost:8000`

## 📝 Sample Content Included

- **A1 Level**: Beginner paragraphs (introductions, family)
- **A2 Level**: Elementary topics (weekends, restaurants)
- **B1 Level**: Intermediate content (vacations, remote work)
- **B2 Level**: Upper intermediate (social media, ecology)
- **C1 Level**: Advanced topics (AI ethics, globalization)
- **C2 Level**: Proficient content (memory philosophy, absurdism)

## 🎯 What This Project Does NOT Include

- ❌ No authentication/login
- ❌ No progress tracking
- ❌ No backend/database
- ❌ No AI calls
- ❌ No complex state management
- ❌ No build tools or frameworks

## 🛠 Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Fetch API, DOM manipulation
- **JSON**: Static data storage

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: < 480px

## 🎨 Color Scheme

- Primary: #2c3e50 (dark blue)
- Secondary: #3498db (blue)
- Success: #27ae60 (green)
- Error: #e74c3c (red)
- Background: #f8f9fa (light gray)

## 💡 Usage Tips

1. Select your French level from the landing page
2. Choose a paragraph that interests you
3. Click on French lines to reveal English translations
4. Answer the MCQ questions at the bottom
5. Get immediate feedback on your answers

---

**Built as a simple MVP for French language learning** 🇫🇷
