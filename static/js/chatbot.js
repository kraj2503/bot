$(function() {
    // Get the chatbot conversation history element
    var chatlog = document.getElementById("chatlog");

    // Get the input field and send button
    var input = document.getElementById("chatinput");
    var button = document.getElementById("chatsend");

    // Send message when send button is clicked
    button.onclick = function() {
        // Get user input
        var userinput = input.value;
        // Display user message in chat log
        displayMessage(userinput, "user");
        // Send message to server and get response
        sendMessage(userinput);
        // Clear input field
        input.value = "";
    }

    // Send message when "Enter" key is pressed
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            button.click();
        }
    });

    // Display message in chat log
    function displayMessage(message, sender) {
        // Create message element
        var messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");
        messageElement.classList.add(sender);
        messageElement.innerHTML = message;
        // Add message element to chat log
        chatlog.appendChild(messageElement);
        // Scroll to bottom of chat log
        chatlog.scrollTop = chatlog.scrollHeight;
    }

    // Send message to server and get response
    function sendMessage(message) {
        // Create request object
        var request = new XMLHttpRequest();
        // Set request URL and method
        var url = "{{ url_for('chatbot_api') }}";
        request.open("POST", url);
        // Set request headers
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Define callback function
        request.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Get response from server
                var response = JSON.parse(this.responseText);
                // Display chatbot message in chat log
                displayMessage(response.message, "chatbot");
            }
        };
        // Send request with message as JSON payload
        var data = JSON.stringify({ "message": message });
        request.send(data);
    }
});
