import { useState } from 'react'
import './App.css'

const quickPrompts = [
  'What are T-Levels?',
  'How do they compare with A-Levels?',
  'Are they right for me?',
  'What jobs can T-Levels lead to?'
]

const featureCards = [
  {
    title: 'Career-ready learning',
    text: 'T-Levels combine classroom learning with real workplace experience, helping students build practical skills from day one.'
  },
  {
    title: 'Technical pathways',
    text: 'Students can explore digital, engineering, health, education, and other hands-on sectors with a clear route into work or further study.'
  },
  {
    title: 'Strong employer links',
    text: 'Industry placements make the learning relevant and help students understand the expectations of real technical roles.'
  },
  {
    title: 'A future-focused route',
    text: 'The qualification is designed to be valued, practical, and connected to progression beyond school.'
  }
]

const initialMessages = [
  {
    id: 1,
    role: 'bot',
    text: 'Hi! I can help you explore T-Levels, compare pathways, and understand what might suit your interests and future goals.'
  }
]

function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = input.trim()

    if (!trimmed) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmed
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
  }

  const handlePromptClick = (prompt) => {
    setInput(prompt)
  }

  return (
    <div className="ada-page">
      <header className="site-header">
        <div className="brand-lockup">
          <img
            className="ada-logo"
            src="https://www.ada.ac.uk/wp-content/themes/bureau-ada-website-2025/assets/img/ada-logo.svg"
            alt="Ada logo"
          />
          <div className="brand-text">
            <span className="brand-subtitle">Ada College</span>
            <span className="brand-title">T-Level Support</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <button type="button" className="nav-link active">Home</button>
          <button type="button" className="nav-link">Students</button>
          <button type="button" className="nav-link">Parents</button>
          <button type="button" className="nav-link">Careers</button>
        </nav>
      </header>

      <main className="page-body">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Student futures</p>
            <h1>Explore T-Levels with confidence.</h1>
            <p className="lead">
              Discover a route that combines technical learning, real industry experience,
              and clear progression into work, apprenticeships, or further study.
            </p>

            <div className="button-row">
              <button type="button" className="primary-button">Ask a question</button>
              <button type="button" className="secondary-button">Explore pathways</button>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-kicker">Student guidance</div>
            <h2>Why T-Levels?</h2>
            <ul>
              <li>Career-focused practical learning</li>
              <li>Employer-linked placement experience</li>
              <li>Strong route into digital and technical careers</li>
            </ul>
          </aside>
        </section>

        <section className="feature-grid" aria-label="Key information about T-Levels">
          {featureCards.map((card) => (
            <article key={card.title} className="feature-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </section>

        <section className="chat-layout">
          <aside className="guidance-panel">
            <div className="panel-header">
              <p className="eyebrow">Quick start</p>
              <h2>Ask about T-Levels</h2>
            </div>

            <div className="prompt-panel">
              <h3>Suggested questions</h3>
              <div className="chip-row">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="chip"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="chat-panel">
            <header className="chat-header">
              <div className="header-topline">
                <span className="status-indicator" aria-hidden="true" />
                <span>Live guidance</span>
              </div>
              <h2>Ask about your future</h2>
            </header>

            <div className="chat-messages" aria-live="polite">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.role}`}>
                  <div className="message-bubble">{message.text}</div>
                </div>
              ))}
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="userInput">Type your question</label>
              <input
                id="userInput"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question about T-Levels..."
                autoComplete="off"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
