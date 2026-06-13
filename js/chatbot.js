const WORKER_URL = 'https://chatbot-normas.eddymamy2306.workers.dev';

let chatHistory = [];
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-window').style.display = chatOpen ? 'flex' : 'none';
  if (chatOpen && chatHistory.length === 0) {
    appendMessage('bot', 'Olá! Sou o assistente jurídico da Plataforma de Normas Legais. Como posso ajudá-lo hoje?');
  }
}

function appendMessage(role, text) {
  const list = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg-${role}`;
  div.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
}

function appendTyping() {
  const list = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg chat-msg-bot chat-typing';
  div.id = 'chat-typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('chat-typing');
  if (t) t.remove();
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  appendMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  appendTyping();

  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });

    const data = await response.json();
    removeTyping();

    if (data.content && data.content[0]) {
      const reply = data.content[0].text;
      chatHistory.push({ role: 'assistant', content: reply });
      appendMessage('bot', reply);
    } else {
      appendMessage('bot', 'Não foi possível obter resposta. Tente novamente.');
    }

  } catch (err) {
    removeTyping();
    appendMessage('bot', 'Ocorreu um erro de ligação. Tente novamente.');
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.activeElement.id === 'chat-input') {
    sendMessage();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const html = `
    <div id="chat-bubble" onclick="toggleChat()">
      <i class="fa-solid fa-scale-balanced"></i>
    </div>
    <div id="chat-window">
      <div id="chat-header">
        <div>
          <strong>Assistente Jurídico</strong>
          <p>Plataforma de Normas Legais</p>
        </div>
        <button onclick="toggleChat()">✕</button>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-footer">
        <input type="text" id="chat-input" placeholder="Escreva a sua questão jurídica..."/>
        <button onclick="sendMessage()">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
});