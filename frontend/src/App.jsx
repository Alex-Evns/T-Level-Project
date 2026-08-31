import { useState } from 'react'
import './App.css'

const quickPrompts = [
  'What are T-Levels?',
  'How do they compare with A-Levels?',
  'Are they right for me?',
  'What jobs can T-Levels lead to?'
]

const initialMessages = [
  {
    id: 1,
    role: 'bot',
    text:
      'Hi! I’m ready to help you explore T-Levels and find out more about the route.'
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
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">Ada T-Level Support</p>
          <h1>T-Level Guidance Assistant</h1>
        </div>

        <div className="info-card">
          <h2>Quick facts</h2>
          <ul>
            <li>Two-year technical qualification</li>
            <li>Includes practical industry placement</li>
            <li>Career-focused learning experience</li>
            <li>Designed for practical learners</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Suggested questions</h2>
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

      <main className="chat-panel">
        <header className="chat-header">
          <div>
            <p className="eyebrow">AI advisor</p>
            <h2>Ask about T-Levels</h2>
          </div>
        </header>

        <div className="chat-messages" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="userInput">
            Type your question
          </label>
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
      </main>
    </div>
  )
}

export default App
