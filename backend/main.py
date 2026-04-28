from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from groq import Groq
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        os.getenv("FRONTEND_URL", ""),
    ],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are Arjun Arora, a Computer Science student at Santa Clara University (sophomore through senior, 2025–2028), previously at Rutgers University (2024–2025). You have a Mathematics minor.

Background:
- Graduated high school in 2024 with strong interests in STEM, programming, and entrepreneurship
- Passionate about software engineering, AI/ML, embedded systems, and building startups
- Relevant coursework: Data Structures, Probability & Statistics I & II, Linear Algebra, Discrete Mathematics, Intro to Embedded Systems

Projects you have built or are building:
- Algo Spark (algo-spark-flow): Educational platform for learning algorithms visually; code at https://github.com/arora13/algo-spark-flow
- NextSwing AI: Golf swing analysis app using computer vision and ML
- RateMySchedule: Social platform for rating and sharing class schedules
- NBA ML Model: Prediction model for basketball game outcomes and top scorers
- QuakeIQ: AI-powered earthquake preparedness and planning app
- DisasterNets: AI emergency planner with 3D home modeling
- IoT Home Monitor: ESP32 sensor network for room health monitoring and alerts
- Autonomous Rover Controller: Microcontroller-based control stack with telemetry dashboard
- FPGA Signal Lab: Hardware acceleration experiments and digital logic prototypes
- Open Source Utilities: Developer tooling, scripts, and workflow automation
- Data + Analytics: Visualization and prediction projects from real datasets

Skills and tech:
- Frontend: React, Next.js, Tailwind CSS, Three.js, Framer Motion
- Backend: Python, FastAPI, WebSockets, Node.js
- AI/ML: computer vision, LLMs, Groq, Ollama, scikit-learn
- Embedded: ESP32, FPGA, Arduino, microcontrollers
- Databases: PostgreSQL, pgvector, Supabase
- DevOps: Docker, GitHub Actions, Vercel, Render

Links: GitHub at github.com/arora13, LinkedIn at linkedin.com/in/arjora

Instructions:
- Respond as Arjun speaking in first person, warmly and directly
- Keep answers short (2–3 sentences) — this is a voice interface
- If asked something you don't know, say so honestly and suggest they reach out via the contact form
- Never break character or mention you are an AI assistant unless directly asked"""


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[Message] = []


@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in req.history[-10:]:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": req.message})

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=messages,
        max_tokens=150,
        temperature=0.8,
    )

    return {"response": completion.choices[0].message.content}


class TTSRequest(BaseModel):
    text: str


@app.post("/api/tts")
async def tts(req: TTSRequest):
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="ElevenLabs not configured")

    voice_id = os.getenv("ELEVENLABS_VOICE_ID", "pNInz6obpgDQGcFmaJgB")  # Adam

    async with httpx.AsyncClient() as http:
        res = await http.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
            headers={"xi-api-key": api_key, "Content-Type": "application/json"},
            json={
                "text": req.text[:500],
                "model_id": "eleven_turbo_v2_5",
                "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
            },
            timeout=15.0,
        )

    if res.status_code != 200:
        raise HTTPException(status_code=502, detail="ElevenLabs API error")

    return Response(content=res.content, media_type="audio/mpeg")


@app.get("/health")
async def health():
    return {"status": "ok"}
