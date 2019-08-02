document.addEventListener("click", async function (e) {
    ;
    if(e.target.id == "start"){
        // console.log("hi")
        let testName = document.getElementById("testName")
        // console.log(testName)
        let data = {
            test: testName.innerText
        }
        const resp = await fetch(`/user/test/final/${testName.innerText}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let numberOfQ = await resp.json();
        // console.log(numberOfQ)
        let mt = document.getElementById("mt")
        mt.innerHTML = theTest(numberOfQ)
        window.app = {};
        let app = window.app;
        app.num = numberOfQ.quastions
        app.index = 1
        app.counter = 0
        // console.log(app.num.length)
        let testSh = document.getElementById("testSh")
        console.log(numberOfQ)
        testSh.innerHTML = myTest({
            filter: numberOfQ.filter,
            answer: numberOfQ.answer,
            qua: numberOfQ.qua
        })
    } 
    if(e.target.id == "next"){
        let arr = []
        let elements = Array.from(document.getElementsByName("answer"))
        elements.forEach(el => {
            if(el.checked) {
                arr.push(el.value)
            }
        })
        console.log(arr)
        // console.log(app.num.length > app.index)
        if(app.num.length > app.index){
        let data6 = {
            num: app.index,
            last: arr
        }
        console.log(data6)
        let testName = document.getElementById("testName")
        const resp6 = await fetch(`/user/test/final/start/${testName.innerText}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data6)
        })
        let numberOfQ = await resp6.json();
        console.log(numberOfQ)
        app.index += 1
        let testSh = document.getElementById("testSh")
        console.log(numberOfQ)
        app.counter += numberOfQ.counter
        console.log(app.counter)
        testSh.innerHTML = myTest({
            filter: numberOfQ.filter,
            answer: numberOfQ.answer,
            qua: numberOfQ.qua
        })
    }
    else{
        console.log(app.counter)
        let data1 = {
            num: app.index,
            last: arr,
            count: app.counter
        }
        const resp1 = await fetch(`/user/test/final/count/${testName.innerText}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data1)
        })
        st = await resp1.json()
        let testSh = document.getElementById("testSh")
        // console.log(st.static.counter)
        testSh.innerHTML = scoreHBS({counter:st.static.counter})
    }
    }     
})
