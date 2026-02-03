from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama

app = FastAPI()

app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],
   allow_methods=["*"],
   allow_headers=["*"],
)

class ChatRequest(BaseModel):
   message: str

@app.post("/chat")
def chat(req: ChatRequest):
   response = ollama.chat(
       model="qwen2.5:1.5b",
       messages=[{"role": "user", "content": req.message}]
   )
   return {"response": response["message"]["content"]}

@app.get("/")
def home():
   return {"status": "AI backend running"}
