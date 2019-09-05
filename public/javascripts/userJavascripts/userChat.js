
var socket = io();
var messages = document.getElementById("messages");
let theUser = $('.theUser').html();

(function () {
    $("#sendForm").submit(function (e) {
        console.log("The user is " + theUser);
        e.preventDefault();
        let li = document.createElement("li");

        socket.emit("chat message", $("#message").val());
        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + theUser + ": " + "just now");

        $("#message").val("");

        return false;
    })

    socket.on("received", data => {
        console.log(data);
        let li = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + theUser + ": " + "just now");

    });
})();




