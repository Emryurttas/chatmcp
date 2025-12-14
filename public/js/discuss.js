// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-undef */
import escapeHtml from 'escape-html';

const socket = io(window.location.origin);

socket.on('info', (message) => {
    console.log('Info reçue du serveur :', message);

    const chatDiv = document.getElementById('chat');
    if (chatDiv) {
        const article = document.createElement('article');
        article.className = 'info-message';
        article.textContent = message;
        chatDiv.appendChild(article);
    }
});

socket.on('message', (messageData) => {
    console.log('Message reçu :', messageData);

    const chatDiv = document.getElementById('chat');
    if (chatDiv) {
        const article = document.createElement('article');
        article.className = 'user-message';

        const header = document.createElement('div');
        header.className = 'message-header';
        header.textContent = `${messageData.sender} - ${new Date(messageData.date).toLocaleString()}`;

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = escapeHtml(messageData.content);

        article.appendChild(header);
        article.appendChild(content);

        chatDiv.appendChild(article);

    }
});

const sendButton = document.getElementById('send');
const messageInput = document.getElementById('prompt');

if (sendButton && messageInput) {
    sendButton.addEventListener('click', (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message !== '') {
            socket.emit('message', message);
            messageInput.value = '';
        }
    });
}