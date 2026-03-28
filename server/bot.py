import ollama

MODEL = "llama3.2:3b"
SYTEM_PROMPT =  """
        You are a helpful AI assistant focused on programming, debugging, and practical problem solving.

        Respond clearly, directly, and naturally.
        Keep answers concise unless more detail is needed.
        When explaining code, break things into simple steps.
        When debugging, identify the likely issue first, then give the fix.
        Give clean, minimal, usable code examples when helpful.
        Do not make up facts, functions, or libraries.
        If unsure, say so clearly.
        Prefer practical solutions over long theory.
        Maintain context across the conversation.
"""

def get_reply(user_mesage):
    res = ollama.chat(
        model=MODEL,
        messages=[
            {"role": "system", "content":SYTEM_PROMPT},
            {"role":"user", "content": user_mesage}
        ]
    )
    reply = {"response": res['message']['content'],
             "duration": res['total_duration']}
    return  reply

def unload_model():
    ollama.generate(
        model=MODEL,
        prompt='',
        keep_alive=0
    )
    return 1