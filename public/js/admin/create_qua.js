console.log(3)
document.addEventListener("click", async function (ev) {

    if (ev.target.className == "addButton") {


        let boxName = document.getElementById("boxName")
        let positionName = document.getElementById("positionName")
        if (boxName) {
            data = {
                input: boxName.value,
                input2: positionName.value
            }
        }
        else {
            let boxName1 = document.getElementById("nameOfBox")
            data = {
                input: boxName1.innerText
            }
        }
        console.log(data)
        const resp = await fetch("/admin/newtest", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const boxInput = await resp.json()
        let main = document.getElementById("main");
        if (document.getElementById("boxName")) {
            main.innerHTML = createShield(boxInput)
        }
        let quaShield = document.getElementById("quastion")
        // console.log(quaShield.innerHTML)
        quaShield.innerHTML += quastion()
        let newButton = Array.from(document.getElementsByClassName("addButton"))



    }
    if (ev.target.id == "save") {
        let quArr = Array.from(document.getElementsByClassName("qu"))
        let ansArr = Array.from(document.getElementsByClassName("ans"))
        let caArr = Array.from(document.getElementsByClassName("ca"))
        let bo = document.getElementById("nameOfBox").innerText
        quArr.forEach(async (el, i) => {
            console.log(el.value, ansArr[i].value)
            let forms = {
                qu: el.value,
                ans: ansArr[i].value.split(", "),
                ca: caArr[i].value,
                box: bo
            }
            const resp = await fetch("/admin/question", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(forms)
            })
            location = "/admin/test"
            Window.location.reload(true)

        })

    }
})

