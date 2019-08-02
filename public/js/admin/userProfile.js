document.addEventListener("DOMContentLoaded", event => {
    
    const pos = document.getElementsByClassName("pos")
    const tel = document.getElementsByClassName("tel")
    let b = ""
    document.addEventListener('click', async (e) => {
        if (e.target.id == "kaka") {
            const action = document.getElementById('action')
                e.preventDefault();
                b = e.target.innerText
                 console.log(e.target)
                 let myClass = Array.from(document.getElementsByClassName(`${e.target.className}`))
                 console.log(myClass)
                 action.innerHTML = listHBS({ userBool: 1, name: e.target.innerText, position: myClass[1].innerText, telephone: myClass[2].innerText })
        
        }
    
        if (e.target.classList.contains('edit-button')) {
        e.preventDefault()
        const formData = {
            nameA: b,
            name: document.getElementById("nameProf").value,
            pos: document.getElementById("posProf").value,
            tel: document.getElementById("telProf").value
        }
        const resp = await fetch("/admin/list", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        let data = await resp.json()
        console.log(data)
        const div = document.getElementById("div")
        div.innerHTML = listHBS(data)
    }
})
    })
