document.addEventListener('DOMContentLoaded', (event) => {
  const button = document.getElementsByClassName('btnCreate')[0];
  const button2 = document.getElementById('fooh');
  const container = document.getElementById('container');
  const text = document.getElementById('text');
  
  button && button.addEventListener("click", async (e) => {
    e.preventDefault();
    container.innerHTML = cardboxTemplate();
  });


  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains('fooh')) {
      e.preventDefault();
      const cardboxId = e.target.getAttribute('data-id')
      container.innerHTML = newcardTemplate({ boxId: cardboxId });
    }
    if (e.target.classList.contains('foo')) {
      e.preventDefault();

      const formData = {
        title: document.getElementById('cardbox-title').value,
        position: document.getElementById('user-position').value
      }

      const resp = await fetch("/admin/createCardbox", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      let cardbox = await resp.json();
      let list = document.getElementById("cards");
      list.innerHTML = cardboxListTemplate({ cardbox });
      container.innerHTML = buttonTemplate()
    }
    if (e.target.classList.contains('delete')) {
      e.preventDefault();

      const formData = {
        id: e.target.getAttribute('data-id')
      }

      const resp = await fetch(`/admin/${formData.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await resp.json();
      if (data.deleted === true) {
        const deleteCardbox = document.getElementById(`${formData.id}`);
        deleteCardbox.remove()
      }
    }
    if (e.target.classList.contains('description')) {
      e.preventDefault();
      let arr = window.location.href.split("/");
      // console.log(arr);
      const formData = {
        title: document.getElementById('card-title').value,
        content: document.getElementById('card-content').value,
        // cardBox: arr[arr.length-1]
        cardBox: document.getElementById('ghost').value

      }

      const resp = await fetch("/admin/createCard", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      let cards = await resp.json();
      container.innerHTML = buttonTemplate();
    }
    if (e.target.classList.contains('a')) {
      const b = document.getElementById('b');
      e.preventDefault();
      // const cardboxId = e.target.getAttribute('data-id')
      console.log(newcardTemplate())
      b.innerHTML = newcardTemplate();
      container.innerHTML = newcardTemplate();
    }
  })
})
