console.log(3)
document.addEventListener("click", async function (ev) {

    if (ev.target.className == "addButton") {


        let boxName = document.getElementById("boxName")
        if (boxName) {
            data = {
                input: boxName.value
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
    if(ev.target.id == "save"){
        let quArr = document.getElementsByClassName("qu")
        let ansArr = document.getElementsByClassName("ans")
        let wrArr = document.getElementsByClassName("wr")
        let caArr = document.getElementsByClassName("ca")
        console.log(quArr, ansArr, wrArr, caArr)
    }
})

