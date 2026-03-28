from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from bot import get_reply, unload_model
from chat_history import write_file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {
        "status": "success",
        "message": 'hello world, server is runing',
        "model": "Llama3.23b"}

@app.post("/chat")
async def chat(data: ChatRequest):
    write_file("user", data.message)
    reply = get_reply(data.message)
    write_file("bot", reply['response'])
    print(reply['duration'])
    return {"message": reply['response'],"duration": reply['duration']}

@app.post("/end")
async def clear_chat():
    return {"status": "success"} if unload_model() else {"status": "failure"}

