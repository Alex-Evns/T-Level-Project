import { useState, useRef } from 'react'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chatSectionRef = useRef(null)

  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = input.trim()

    if (!trimmed || isSubmitting) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmed
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsSubmitting(true)
    window.setTimeout(scrollToChat, 50)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: trimmed })
      })

      const data = await response.json()
      const answer = data.answer || 'I could not find a clear answer from the official sources.'

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: answer
        }
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 2,
          role: 'bot',
          text: 'I am having trouble connecting to the guidance model. Please try again in a moment.'
        }
      ])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePromptClick = (prompt) => {
    setInput(prompt)
    window.setTimeout(scrollToChat, 50)
  }

  return (
    <div className="ada-page">
      <header className="site-header">
        <div className="site-header-inner">
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
            <a href="https://www.ada.ac.uk/" className="nav-link active" target="_blank" rel="noreferrer">Home</a>
            <a href="https://www.ada.ac.uk/sixth-form/" className="nav-link" target="_blank" rel="noreferrer">Students</a>
            <a href="https://www.ada.ac.uk/sixth-form/learner-services/" className="nav-link" target="_blank" rel="noreferrer">Parents</a>
            <a href="https://www.ada.ac.uk/careers/" className="nav-link" target="_blank" rel="noreferrer">Careers</a>
          </nav>
        </div>
      </header>

      <main className="page-body">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Student futures</p>
            <div className="hero-badges" aria-label="Key benefits">
              <span>Learn</span>
              <span>Compare</span>
              <span>Plan</span>
            </div>
            <h1>Explore T-Levels with confidence.</h1>
            <p className="lead">
              Discover a route that combines technical learning, real industry experience,
              and clear progression into work, apprenticeships, or further study.
            </p>

            <div className="button-row">
              <button type="button" className="primary-button" onClick={scrollToChat}>Ask a question</button>
              <a
                href="https://www.ada.ac.uk/sixth-form/"
                className="secondary-button"
                target="_blank"
                rel="noreferrer"
              >
                Explore pathways
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-kicker">T-Level guidance</div>
            <h2>Find the route that fits your future.</h2>
            <div className="stat-row">
              <div className="stat-item">
                <strong>80%</strong>
                <span>career-focused learning</span>
              </div>
              <div className="stat-item">
                <strong>1</strong>
                <span>industry placement</span>
              </div>
            </div>
            <ul>
              <li>Practical technical learning from day one</li>
              <li>Employer links that build real confidence</li>
              <li>Clear progression into work or study</li>
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

        <section className="chat-layout" ref={chatSectionRef}>
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
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
