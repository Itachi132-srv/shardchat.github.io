let currentUser = {
    email: "",
    name: "",
    bio: "",
    pfp: ""
};

function handleLogin() {
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();
    const name = document.getElementById('username-input').value.trim();
    const bio = document.getElementById('bio-input').value.trim();
    const pfp = document.getElementById('pfp-input').value.trim();

    if (!email || !password || !name) {
        alert("Please fill in at least Email, Password, and Username!");
        return;
    }

    currentUser.email = email;
    currentUser.name = name;
    currentUser.bio = bio || "Available";
    currentUser.pfp = pfp || "https://via.placeholder.com/70";

    document.getElementById('display-name').innerText = currentUser.name;
    document.getElementById('display-bio').innerText = currentUser.bio;
    document.getElementById('display-pfp').src = currentUser.pfp;

    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('chat-screen').style.display = 'flex';
}

function sendMessage() {
    const inputField = document.getElementById('message-input');
    const text = inputField.value.trim();

    if (text === "") return;

    const messagesBox = document.getElementById('messages');

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');

    msgDiv.innerHTML = `
        <div class="sender-name">${currentUser.name}</div>
        <div>${text}</div>
    `;

    messagesBox.appendChild(msgDiv);

    inputField.value = "";
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function handleLogout() {
    document.getElementById('chat-screen').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('messages').innerHTML = '';
}
