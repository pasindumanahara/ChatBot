const sendBtn = document.getElementById('sendBtn');
const msgs = document.getElementById('messages');
const welcome = document.getElementById('welcome');
const clearBtn = document.getElementById('clearBtn');
const chips = document.querySelectorAll('.chip');
const chatHistory = document.getElementById('chatHistory'); 

msgs.style.display='block'
// clear the display
clearBtn.addEventListener('click', ()=>{
    msgs.style.display='block'
    chatHistory.style.display='none'
});

function addMessage(type, text) {
    const wrapper = document.createElement("div");
    wrapper.className = type;

    const chatCard = document.createElement("div");
    chatCard.className = "chat-card";
    chatCard.textContent = text;

    wrapper.appendChild(chatCard);
    chatHistory.appendChild(wrapper);

    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function sendChat(){
    const input = document.getElementById('input');
    const prompt = input.value.trim();
    if (!prompt) return;
    addMessage("user",prompt)
    input.value=''
    msgs.style.display='none'
    sendPrompt(prompt) 
    alert(prompt)  
}

async function sendPrompt(prompt) {
    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: prompt })
        });

        const data = await response.json();
        addMessage("computer", data.message)
    } catch (error) {
        console.error(error);
    }
}
// async function sendPrompt() {
//     try {
//         const response = await fetch("http://127.0.0.1:8000/")
//         const data = await response.json();
//         addMessage("computer", data.message)
//     } catch (error) {
//         console.error(error);
//     }
// }
