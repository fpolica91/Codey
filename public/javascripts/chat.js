
var socket = io();
// const code = document.getElementById('js')
var messages = document.getElementById("messages");
let theUser = $('.theUser').html();

(function () {
    $("#sendForm").submit(function (e) {
         // prevents page reloading
        e.preventDefault();
        let li = document.createElement("li");
       
        socket.emit("chat message", $("#message").val());
        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + `${theUser}` + ": " + "just now");

        $("#message").val("");

        return false;
    })

    socket.on("received", data => {
        console.log(data);
        let liReceive = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(liReceive).append(data.message);
        messages.appendChild(span).append("by " + `${theUser}` + ": " + "just now");

    });
})();


socket.on('code-message', message => {
    code.value = message
});



(function () {
    $('#js').change(() => {
        let textarea = $('#js')
        let message = textarea.val()
        // textarea.html("")
        // socket.emit('send-code', message)
        axios.get('/code')
            .then(response => {
                message = response.data.code
            })
        socket.emit("send-code", message)



    })
})



    // fetching initial chat messages from the database
    (function () {
        fetch("/chats")
            .then(data => {
                return data.json();
            })
            .then(json => {
                json.map(data => {
                    let liHisto = document.createElement("li");
                    let span = document.createElement("span");
                    messages.appendChild(liHisto).append(data.message);
                    messages.appendChild(span).append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
                });
            });
    })
// (function () {
//     fetch('/blah')
//         .then(data => {
//             data.map(thing => {
//                 document.write(thing)
//             })
//         })
// })

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