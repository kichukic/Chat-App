  document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
    const socket = io();
    sendBtn.addEventListener("click", () => {
      const messageText = messageInput.value.trim();
      if (messageText !== "") {
        socket.emit('chat message', messageText);
        appendMessage("You", messageText); // Replace "You" with the sender's name
        messageInput.value = "";
      }
    });

    // socket.on("chat message", (message) => {
    //   appendMessage("Bot", message);
    // })


    function appendMessage(sender, message) {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("chat-message");
      const messageContent = document.createElement("p");
      messageContent.textContent = `${sender}: ${message}`;
      messageContainer.appendChild(messageContent);
      chatMessages.appendChild(messageContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
