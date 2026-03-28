from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from bot import get_reply, unload_model
from tmp import write_to

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
        "message": 'hello world, server is runing'}

@app.post("/chat")
async def chat(data: ChatRequest):
    reply = get_reply(data.message)
    print("received:", data.message)
    # write_to(reply['response'])
    return {"message": reply['response']}

@app.post("/end")
async def clear_chat():
    return {"status": "success"} if unload_model() else {"status": "failure"}

