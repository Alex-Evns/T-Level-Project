from __future__ import annotations

import json
import math
import os
import re
from functools import lru_cache
from pathlib import Path
from typing import Any
from urllib import request

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent
KNOWLEDGE_PATH = BASE_DIR / "data" / "t_level_knowledge.json"
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11434")
EMBED_MODEL = os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text")
GENERATE_MODEL = os.getenv("OLLAMA_GENERATE_MODEL", "llama3.2:3b")

app = FastAPI(title="T-Level Guidance API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


def _http_json(url: str, payload: dict[str, Any], method: str = "POST") -> dict[str, Any]:
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = request.Request(url, data=data, headers={"Content-Type": "application/json"}, method=method)
    with request.urlopen(req, timeout=180) as response:
        return json.loads(response.read().decode("utf-8"))


def normalise_text(text: str) -> str:
    return " ".join(re.sub(r"[^a-z0-9]+", " ", text.lower()).split())


def chunk_text(text: str, max_chars: int = 500) -> list[str]:
    sentences = [part.strip() for part in re.split(r"(?<=[.!?])\s+", text) if part.strip()]
    chunks: list[str] = []
    current = ""

    for sentence in sentences:
        if len(current) + len(sentence) <= max_chars:
            current = f"{current} {sentence}".strip()
            continue

        if current:
            chunks.append(current)
        current = sentence

    if current:
        chunks.append(current)

    return chunks or [text.strip()]


@lru_cache(maxsize=1)
def load_knowledge() -> list[dict[str, str]]:
    with KNOWLEDGE_PATH.open("r", encoding="utf-8") as file:
        raw_documents = json.load(file)

    chunks: list[dict[str, str]] = []
    for document in raw_documents:
        text = (document.get("content") or "").strip()
        for index, chunk in enumerate(chunk_text(text)):
            chunks.append(
                {
                    "id": f"{document['id']}-{index}",
                    "title": document.get("title", "T-Level guidance"),
                    "source_name": document.get("source_name", "Official source"),
                    "source_url": document.get("source_url", ""),
                    "text": chunk,
                }
            )

    return chunks


def ollama_available() -> bool:
    try:
        _http_json(f"{OLLAMA_HOST}/api/tags", {}, method="GET")
        return True
    except Exception:
        return False


def embed_text(text: str) -> list[float]:
    payload = {"model": EMBED_MODEL, "input": text}
    result = _http_json(f"{OLLAMA_HOST}/api/embed", payload)
    embeddings = result.get("embeddings")

    if not embeddings:
        raise ValueError("No embeddings returned from Ollama.")

    first = embeddings[0]
    if isinstance(first, list):
        return [float(value) for value in first]

    return [float(value) for value in embeddings]


def cosine_similarity(left: list[float], right: list[float]) -> float:
    if len(left) != len(right):
        raise ValueError("Embedding lengths do not match.")

    dot_product = sum(a * b for a, b in zip(left, right))
    left_norm = math.sqrt(sum(value * value for value in left))
    right_norm = math.sqrt(sum(value * value for value in right))

    if left_norm == 0 or right_norm == 0:
        return 0.0

    return dot_product / (left_norm * right_norm)


def retrieve_relevant_documents(question: str, top_k: int = 4) -> list[dict[str, Any]]:
    query_vector = embed_text(question)
    documents = load_knowledge()

    scored_documents: list[tuple[float, dict[str, Any]]] = []
    for document in documents:
        document_vector = embed_text(document["text"])
        score = cosine_similarity(query_vector, document_vector)
        scored_documents.append((score, document))

    scored_documents.sort(key=lambda item: item[0], reverse=True)
    top_matches = [document for _, document in scored_documents[:top_k]]

    if not top_matches:
        return []

    return top_matches


def build_prompt(question: str, documents: list[dict[str, Any]]) -> str:
    context_text = "\n\n".join(
        f"Source: {document['source_name']} ({document['source_url']})\n{document['text']}"
        for document in documents
    )

    return (
        "You are a helpful T-Level guidance assistant. "
        "Answer using only the official source excerpts provided below. "
        "If the answer is not supported by the sources, say that you cannot confirm it from official sources. "
        "Keep the answer clear, factual, and suitable for students and parents.\n\n"
        f"Question: {question}\n\n"
        f"Official source excerpts:\n{context_text}\n\n"
        "Answer:"
    )


def generate_answer(question: str) -> str:
    documents = retrieve_relevant_documents(question)
    if not documents:
        return (
            "I could not find enough trusted T-Level material from the official source set to answer that question. "
            "Please ask about T-Levels, their structure, progression, or suitability for students."
        )

    prompt = build_prompt(question, documents)
    payload = {
        "model": GENERATE_MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.2,
            "top_p": 0.9,
            "num_ctx": 4096,
        },
    }
    result = _http_json(f"{OLLAMA_HOST}/api/generate", payload)
    return (result.get("response") or "").strip()


@app.get("/api/health")
def health_check() -> dict[str, Any]:
    return {
        "status": "ok",
        "service": "t-level-guidance-api",
        "ollama_available": ollama_available(),
        "model": GENERATE_MODEL,
    }


@app.post("/api/chat")
def chat(request: ChatRequest) -> dict[str, Any]:
    question = request.message.strip()
    if not question:
        return {"answer": "Please ask a question about T-Levels and I will help explain it."}

    if not ollama_available():
        return {
            "answer": "The local Ollama model is not available yet. Please start the model server and retry."
        }

    answer = generate_answer(question)
    relevant_documents = retrieve_relevant_documents(question)
    source_links = [
        {"title": document["title"], "url": document["source_url"]}
        for document in relevant_documents[:3]
    ]

    return {
        "answer": answer,
        "sources": source_links,
    }
