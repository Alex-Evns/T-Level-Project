# App package

This folder contains the FastAPI backend for the T-Level guidance app.

## Responsibilities
- Expose a `/api/chat` endpoint for T-Level questions
- Serve curated, source-grounded answers from the local knowledge base
- Support frontend integration during local development and demonstrations

## Local run

```bash
cd /Users/alexevans/Documents/T-Level Project/repo
source .venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
