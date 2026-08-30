# Technical Stack Considerations

## Preferred direction
A simple but robust MVP using modern web development practices.

## Frontend
- React
- Suitable for a responsive, interactive single-page application
- Good fit for triage flow and chatbot interface

## Backend
- Python
- FastAPI recommended for speed and simplicity
- Easy integration with AI and decision logic

## AI / RAG layer
Options considered:
- OpenAI/ChatGPT API
- Claude API
- Open-source LLM via Ollama

## Recommended approach for this project
Because funds are limited and the project is time-sensitive, the best practical option is likely:
- local or open-source LLM if possible
- otherwise use a lightweight cloud model selectively

## Data sources for the chatbot
- Ada College T-Level information
- Government guidance on T-Levels
- Labour market information
- Careers and skills resources
- Structured content about teaching methods, pathways, and outcomes

## Storage
For MVP, avoid heavy persistence. A simple file-based or in-memory approach is sufficient.

## Deployment
- Frontend: static hosting or Vercel-style deployment
- Backend: lightweight API hosting
- Keep deployment simple to fit deadline
