
document.addEventListener('click', function (e) {
    if (e.target.id === "createNew") {
        console.log("hi")
        let main = document.getElementById("main")
        e.target.remove()
        main.innerHTML += createShield();
        const my_awesome_script = document.createElement('script');    //  заклинание ебанный темплэйт
        my_awesome_script.setAttribute('src', '/js/admin/create_qua.js');
        document.head.appendChild(my_awesome_script);
    }
})