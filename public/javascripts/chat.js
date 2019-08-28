let theUser = $('.theUser').html();
// console.log(theUser);

var socket = io();
const code = document.getElementById('js')
var messages = document.getElementById("messages");

(function () {
    $("form").submit(function (e) {
        let li = document.createElement("li");
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", $("#message").val());

        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + `${theUser}` + ": " + "just now");

        $("#message").val("");

        return false;
    });



    socket.on("received", data => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");

    });
})();



socket.on('code-message', message => {
    code.append(message)
});


(function () {
    $('#js').on("change", (e) => {
        e.preventDefault()
        let textarea = $('#js')
        let message = textarea.val()
        textarea.html("")
        socket.emit('send-code', message)
    })
})



    // fetching initial chat messages from the database
    (async function () {
        await fetch("/chats")
            .then(data => {
                return data.json();
            })
            .then(json => {
                json.map(data => {
                    let li = document.createElement("li");
                    let span = document.createElement("span");
                    messages.appendChild(li).append(data.message);
                    messages
                        .appendChild(span)
                        .append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
                });
            });
    })

//is typing...

let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
    socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
    typing.innerText = data.user + " " + data.message;
    console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
    socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
    typing.innerText = '';
});