const sendBtn = document.getElementById('sendBtn');
const welcome = document.getElementById('welcome');
const clearBtn = document.getElementById('clearBtn');
const chatHistory = document.getElementById('chatHistory');
const qiuckPrompts = document.getElementById('quickPrompts');

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

function sendChat() {
    const input = document.getElementById('input');
    const prompt = input.value.trim();
    if (!prompt) return;
    addMessage("user", prompt)
    input.value = ''
    qiuckPrompts.style.display = 'none'
    chatHistory.style.display = 'flex'
    sendPrompt(prompt)
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

async function clearChat() {
    const response = await fetch("http://127.0.0.1:8000/end", {
        method: "POST"
    });

    const data = await response.json();
    if (data.status === "success") {
        console.log("Chat cleared successfully.")
        chatHistory.innerHTML = ''
        chatHistory.style.display = 'none'
        qiuckPrompts.style.display = 'flex'
    } else {
        alert("Failed to clear chat. Please try again.")
    }
}