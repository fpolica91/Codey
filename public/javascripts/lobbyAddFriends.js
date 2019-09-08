
const ul = document.getElementsByClassName('chatUserList')

// THIS ROUTE GETS ALL THE FRIENDS OF THE USER
function getFriends() {
    axios.get('/friends')
        .then(response => {
            response.data.map(item => {
                console.log(item);
                let li = document.createElement('li')
                let users = item.friend.username
                li.append(users);
                ul.append(li);
            })
        })
}

getFriends();