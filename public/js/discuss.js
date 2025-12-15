// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-undef */

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

        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper';

        const avatar = document.createElement('img');
        avatar.className = 'message-avatar';
        
        const avatarUrl = messageData.userId 
            ? `/user/${messageData.userId}/avatar` 
            : '/user/default/avatar';
        
        console.log('URL avatar construite:', avatarUrl);
        
        avatar.src = avatarUrl;
        avatar.alt = `Avatar de ${messageData.sender}`;
        avatar.width = 50;
        avatar.height = 50;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-body';

        const header = document.createElement('div');
        header.className = 'message-header';
        header.textContent = `${messageData.sender} le ${new Date(messageData.date).toLocaleDateString('fr-FR')} à ${new Date(messageData.date).toLocaleTimeString('fr-FR', { hour12: false })}`;


        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = messageData.content;

        messageContent.appendChild(header);
        messageContent.appendChild(content);

        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(messageContent);

        article.appendChild(messageWrapper);

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