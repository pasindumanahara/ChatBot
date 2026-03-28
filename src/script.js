const sendBtn = document.getElementById('sendBtn');
const welcome = document.getElementById('welcome');
const clearBtn = document.getElementById('clearBtn');
const chatHistory = document.getElementById('chatHistory');
const qiuckPrompts = document.getElementById('quickPrompts');
const modelName = document.getElementById('model-name');
const statusDot = document.getElementById('status-dot');

// onlaod, server status and model info
window.onload = async () => {
    try {
        clearChat() // TODO:: Additional work and requests, rewrite speceficly for this
        const response = await fetch("http://127.0.0.1:8000/");
        const data = await response.json();
        modelName.textContent = `MODEL: ${data.model}`;
    } catch (error) {
        statusDot.style.backgroundColor = 'red';
        console.error("Error fetching server status:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    input.focus();
    if (input.value.trim()==='') {
        sendBtn.disabled = true;
    }
});

// press enter to send message
const input = document.getElementById("input");
input.addEventListener("keydown", handleEnter);

function handleEnter(event) {
    sendBtn.disabled = !input.value.trim();
    if (event.key === "Enter") {
        event.preventDefault();
        sendChat();
    }
}

// smarter response formatting, supports code blocks, inline code, bold text and line breaks
function formatMessage(text) {
    const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    let formatted = escaped;

    // triple backtick code blocks
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

    // bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // line breaks outside code blocks
    formatted = formatted.replace(/\n/g, '<br>');

    // fix line breaks inside code blocks
    formatted = formatted.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, function (_, code) {
        const restored = code.replace(/<br>/g, '\n');
        return `<pre><code>${restored}</code></pre>`;
    });

    return formatted;
}
function addMessage(type, text, duration) {
    const wrapper = document.createElement("div");
    wrapper.className = type;

    const chatCard = document.createElement("div");
    chatCard.className = "chat-card";
    chatCard.innerHTML = formatMessage(text);

    if (type==='computer') {
        const timestamp = document.createElement("div");
        timestamp.className = "timestamp";
        timestamp.textContent = Number(duration)>10000 ? `${(Number(duration)/1000).toFixed(2)} s` : `${Number(duration).toFixed(2)} ms`;
        chatCard.appendChild(timestamp);
    }

    wrapper.appendChild(chatCard);
    chatHistory.appendChild(wrapper);

    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function sendChat() {
    const input = document.getElementById('input');
    const prompt = input.value.trim();
    if (!prompt) return;
    addMessage("user", prompt,0)
    input.value = ''
    qiuckPrompts.style.display = 'none'
    chatHistory.style.display = 'flex'
    sendPrompt(prompt)
}

async function sendPrompt(prompt) {
    try {
        sendBtn.disabled = true;
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: prompt })
        });

        const data = await response.json();
        addMessage("computer", data.message, data.duration)
        sendBtn.disabled = false;
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
        input.focus()
    } else {
        alert("Failed to clear chat. Please try again.")
    }
}

function quickPrompt(type) {
    
    let prompt = ''

    if (type === 'summery') {
        prompt = 'Summarise the topic of quantum computing in simple terms ';
    } else if (type === 'code') {
        prompt = 'Write a code segment about ';
    } else if (type === 'email') {
        prompt = 'Draft an email to my manager about ';
    } else if (type === 'concept') {
        prompt = 'Explain the concept of ';
    }

    const input = document.getElementById('input');
    prompt = prompt + ' ' + input.value.trim()
    if (!input.value.trim()) {
        return
    }
    addMessage("user", prompt)
    input.value = ''
    qiuckPrompts.style.display = 'none'
    chatHistory.style.display = 'flex'
    sendPrompt(prompt)
}

