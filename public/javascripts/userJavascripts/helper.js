
// function getId() {
//     return document.getElementById('helper').innerHTML
// }
let id = document.getElementById('helper')

module.exports = {
    getId: function () {
        return id.innerHTML
    }
}