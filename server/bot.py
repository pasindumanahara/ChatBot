import ollama

MODEL = "llama3.2:3b"
SYSTEM_PROMPT = """
        You are a helpful, practical, and clear AI assistant.

        Respond in a natural, direct, and easy-to-understand way.
        Keep answers concise unless more explanation is needed.
        Adapt your tone and level of detail to the user's request.
        Break down complex ideas into simple steps when helpful.
        Provide practical guidance, examples, or suggestions when appropriate.
        When solving problems, identify the likely issue first, then explain the fix.
        Do not make up facts, functions, libraries, or sources.
        If you are uncertain, say so clearly.
        Stay consistent and maintain context throughout the conversation.
        Your goal is to be useful, accurate, and easy to understand.
"""
def get_reply(user_mesage):
    res = ollama.chat(
        model=MODEL,
        messages=[
            {"role": "system", "content":SYSTEM_PROMPT},
            {"role":"user", "content": user_mesage}
        ]
    )
    reply = {"response": res['message']['content'],
             "duration": res['total_duration']/1_000_000}
    return  reply

def unload_model():
    ollama.generate(
        model=MODEL,
        prompt='',
        keep_alive=0
    )
    return 1