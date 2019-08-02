document.addEventListener("DOMContentLoaded", event => {
    let createButton = document.getElementById("createNew")
    createButton.addEventListener("click", async function (e) {
        console.log("hi")
        let main = document.getElementById("main")
        createButton.remove()
        main.innerHTML += createShield();
        const my_awesome_script = document.createElement('script');    //  заклинание ебанный темплэйт
        my_awesome_script.setAttribute('src', '/js/admin/create_qua.js');
        document.head.appendChild(my_awesome_script);
    })
})