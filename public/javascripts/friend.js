
document.getElementById('friendsbutton').onclick = function () {
    axios.get('/apiRoute', response => {
        response.data.map(friend => {

        })
    })
}