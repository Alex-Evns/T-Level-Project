from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent
KNOWLEDGE_PATH = BASE_DIR / "data" / "t_level_knowledge.json"

app = FastAPI(title="T-Level Guidance API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


def load_knowledge() -> list[dict]:
    with KNOWLEDGE_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def normalise_text(text: str) -> str:
    return " ".join(text.lower().replace("-", " ").split())


def find_best_answer(question: str) -> str:
    knowledge = load_knowledge()
    normalised = normalise_text(question)
    best_match = None
    best_score = 0

    for item in knowledge:
        score = 0
        for keyword in item["keywords"]:
            if keyword in normalised:
                score += 2
        for word in ["t level", "t-level", "t levels", "t-levels"]:
            if word in normalised and "t-level" in item["topic"].lower():
                score += 1

        if score > best_score:
            best_match = item
            best_score = score

    if best_match is not None and best_score > 0:
        return best_match["answer"]

    return (
        "T-Levels are a two-year technical qualification that blends classroom study with "
        "industry experience. They are designed for students who want a practical route into "
        "a technical career or further study."
    )


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "t-level-guidance-api"}


@app.post("/api/chat")
def chat(request: ChatRequest) -> dict[str, str]:
    question = request.message.strip()
    if not question:
        return {"answer": "Please ask a question about T-Levels and I will help explain it."}

    answer = find_best_answer(question)
    return {"answer": answer}
