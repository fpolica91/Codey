var socket = io()
let id = $('.chatroomID').html()
var messages = document.getElementById("messages");
let theUser = $('.theUser').html();

(function () {
    $("#sendForm").submit(function (e) {
        socket.emit("connection", id);
        e.preventDefault();
        let li = document.createElement("li");
        li.setAttribute('class', 'senderMsg');
        socket.emit("chat message", $("#message").val(), theUser);
        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + theUser + ": " + "just now");

        $("#message").val("");

        return false;
    })


    socket.on("received", (data) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        li.setAttribute('class', 'receiverMsg');
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + data.sender + ": " + "just now");
    });
})();

(async function () {
    await fetch("/history")
        .then(data => {
            return data.json();
        })
        .then(json => {
            //  console.log(json[0]);
            json.map(data => {
                //   console.log(data);
                let li = document.createElement("li");
                let span = document.createElement("span");
                messages.appendChild(li).append(data.message);
                messages
                    .appendChild(span)
                    .append("by " + data.sender + ": " + formatTime(new Date(data.createdAt)));
                // .append("by " + data.sender + ": " + new Date(data.createdAt).getHours() + ":"  + new Date(data.createdAt).getMinutes());
            })
        }).catch(err => console.log("An error happened fetching ", err));
})();









(function () {
    $('#js').change(() => {
        let textarea = $('#js')
        let da = textarea.val()
        textarea.html("")
        // socket.emit('send-code', message)
        axios.get('/code')
            .then(response => {
                da = response.data.code
            })
        socket.emit("send-code", da)
    })
    socket.on('code-message', data => {
        code.value = data
    });
})();



// fetching initial chat messages from the database

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


//FORMAT TIME
function formatTime(dateStr) {
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let theMonth = dateStr.getMonth();
    theMonth = monthArray[theMonth - 1]
    let theDay = dateStr.getDate();
    let theHours = dateStr.getHours();
    let theMinutes = dateStr.getMinutes();
    if(theHours > 12){
        theHours -= 12;
        return theMonth + ", " + theDay + " " + theHours + ":" + theMinutes + " PM";
    } else if (theHours === 0) {
        theHours = 12
        return theMonth + ", " + theDay + " " + theHours + ":" + theMinutes + " AM";
    }
    return theMonth + ", " + theDay + " " + theHours + ":" + theMinutes + " AM";

};