from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

class ChatRequest(BaseModel):
    messages: list
    mode: str


def get_system_prompt(mode):
    if mode == "explain":
        return "You are a helpful teacher. Explain clearly with simple examples."
    elif mode == "summarize":
        return "Summarize the user's input into concise bullet points."
    elif mode == "quiz":
        return "You are a quiz master. Ask a question instead of answering. Wait for the user to respond before giving the answer."
    return "You are a helpful assistant."


@app.post("/chat")
def chat(req: ChatRequest):
    system_prompt = get_system_prompt(req.mode)

    full_prompt = system_prompt + "\n\n"

    for msg in req.messages:
        role = msg.get("role")
        content = msg.get("content")
        full_prompt += f"{role}: {content}\n"

    response = model.generate_content(full_prompt)

    return {"reply": response.text}