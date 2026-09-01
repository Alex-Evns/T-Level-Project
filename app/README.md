# App package

This folder contains the FastAPI backend for the T-Level guidance app.

## Responsibilities
- Expose a `/api/chat` endpoint for T-Level questions
- Retrieve relevant official-source content from the local knowledge base
- Use Ollama for embedding and generation in a real RAG workflow
- Support frontend integration during local development and demonstrations

## Local run

```bash
cd /Users/alexevans/Documents/T-Level Project/repo
ollama serve
ollama pull llama3.2:3b
ollama pull nomic-embed-text
source .venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
