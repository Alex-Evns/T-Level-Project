# T-Level Project

This repository contains project planning, technical notes, and the MVP implementation for the Student Recruitment Portal.

## Project context
- Client: Ada College
- Pathway: Software Developer
- Objective: Help students and parents understand whether T-Levels are a suitable route and improve recruitment outcomes.

## Documentation
- [Project overview](docs/project-overview.md)
- [Assignment brief summary](docs/assignment-brief-summary.md)
- [Product brief](docs/product-brief.md)
- [MVP scope](docs/mvp-scope.md)
- [Technical stack](docs/technical-stack.md)
- [Research sources](docs/research-sources.md)
- [Development roadmap](docs/development-roadmap.md)
- [Development tracker](docs/development-tracker.md)
- [Development log](docs/development-log.md)
- [Implementation tracker](docs/implementation-tracker.md)
- [Commit record](docs/commit-record.md)
- [Design brand reference](docs/design-brand-reference.md)
- [Decisions and assumptions](docs/decisions-and-assumptions.md)

## Current status
Repository has been prepared and project notes are organised for future development work.

## Local development

From the repo root:

- Start Ollama:
  `ollama serve`
- Pull the models used by the RAG pipeline:
  `ollama pull llama3.2:3b`
  `ollama pull nomic-embed-text`
- Start the backend:
  `source .venv/bin/activate && uvicorn app.main:app --host 127.0.0.1 --port 8000`
- Start the frontend:
  `cd frontend && npm run dev -- --host 0.0.0.0`

The frontend dev server proxies `/api` requests to the FastAPI backend. The Python backend uses local official-source documents and Ollama to perform retrieval-augmented generation rather than returning static preset answers.
