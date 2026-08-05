function loginUser() {
    const email = document.getElementById('email').value;
    
    if (email.trim() === "") {
        alert("Please enter a valid email address!");
        return;
    }

    // Hide Login Screen and Show Chat Screen
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('chat-screen').style.display = 'flex';

    // Set profile name based on email prefix
    const username = email.split('@')[0];
    document.getElementById('display-name').innerText = username;
}

function sendMessage() {
    const inputField = document.getElementById('message-input');
    const messageText = inputField.value.trim();

    if (messageText === "") return;

    const messagesBox = document.getElementById('messages');
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerText = messageText;

    // Append to chat box
    messagesBox.appendChild(messageDiv);

    // Clear input & scroll to bottom
    inputField.value = "";
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

