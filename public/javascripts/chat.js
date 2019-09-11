var socket = io()
let id = $('.chatroomID').html()
var messages = document.getElementById("messages");
let theUser = $('.theUser').html();
let theSocketAttach = $('.theActualSockey');
let button = document.getElementsByClassName('removeBtn');
let theSockedId = $('.theActualSockey').html();

(function () {
    // let myData = {name: theUser, userId: socket.id};
    console.log("CLIENT SIDE");
    socket.emit('set-user', theUser);
  
    $("#sendForm").submit(function (e) {
        // socket.emit("connection");
        e.preventDefault();
        let li = document.createElement("li");
        li.setAttribute('class', 'senderMsg');
        socket.emit("chat message", { msg: $("#message").val(), sender: theUser});
        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + theUser + ": " + "just now");
        $("#message").val("");

        return false;
    })
    // socket.on('setSocketId', function(data) {
    //     console.log(data);
    //     theSocketAttach.text(data.theId);
    // });

    $('.removeBtn').click(()=> {
console.log("IM WORKING");
    })

    socket.on("received", (data) => {
        // console.log(JSON.stringify(data));
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
                if(data.sender === theUser){
                    li.setAttribute('class', 'senderMsg');
                }else{
                    li.setAttribute('class', 'receiverMsg');
                }
                messages.appendChild(li).append(data.message);
                messages
                    .appendChild(span)
                    .append("by " + data.sender + ": " + formatTime(new Date(data.createdAt)));
                // .append("by " + data.sender + ": " + new Date(data.createdAt).getHours() + ":"  + new Date(data.createdAt).getMinutes());
            })
        }).catch(err => console.log("An error happened fetching ", err));
})();


//BUTTON TO DELETE
socket.on('setSocketId', function (data) {
    console.log(data)
    for (let i = 0; i < button.length; i++) {
        if (button[i].value === data.name) {
            button[i].setAttribute("name", data.theId)
        }
    }
});
// for (let i = 0; i < button.length; i++) {
//     button[i].addEventListener("click", () => {
//         e.preventDefault();
//         console.log(button[i].value)
//         socket.emit("kicked", { theUserId: theSockedId});
//     })
// }