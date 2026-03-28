import ollama
MODEL = "llama3.2:3b"

def get_reply():
    res = ollama.chat(
        model=MODEL,
        messages=[
            {"role": "system", "content":"assistent"},
            {"role":"user", "content": 'hello'}
        ]
    )
    print(res['message']['content'])
def unload_model():
    ollama.generate(
        model=MODEL,
        prompt='',
        keep_alive=0
    )
    

if __name__ == "__main__":
    unload_model()