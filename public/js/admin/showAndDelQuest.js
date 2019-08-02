document.addEventListener("click", async function (e) {
    e.preventDefault()
    if(e.target.id === "btn-show"){
        console.log(e.target.id)
        const formData = {
            link: e.target.getAttribute('data-id')
        }
        console.log(formData)
        const resp = await fetch("/admin/test", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await resp.json()
        console.log(data)
        const div = document.getElementById('forShow')
        div.innerHTML = quest(data)
    }
    if(e.target.id === "btn-del"){
            console.log(e.target.id)
            const main = document.getElementById("main")
            const formData = {
                linkDel: e.target.getAttribute('data-id')
            }
            console.log(formData)
            const resp = await fetch("/admin/test", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await resp.json()
            console.log(data.tests)
        main.innerHTML = tests(data)
    }
})