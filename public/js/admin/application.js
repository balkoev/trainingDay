const button = document.getElementsByClassName('btnCreate')[0];
const button2 = document.getElementById('fooh');
const container = document.getElementById('container');
const text = document.getElementById('text');

button.addEventListener("click", async (e) => {
  e.preventDefault();
  container.innerHTML = cardboxTemplate();
});


document.addEventListener('DOMContentLoaded', (event) => {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains('fooh')) {
      e.preventDefault();
      const cardboxId = e.target.getAttribute('data-id')
      container.innerHTML = newcardTemplate({boxId : cardboxId});
    }
  })
})


document.addEventListener('DOMContentLoaded', (event) => {

  document.addEventListener("click", async (e) => {
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
  })
})

document.addEventListener('DOMContentLoaded', (event) => {

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains('description')) {
      e.preventDefault();

      const formData = {
        title: document.getElementById('card-title').value,
        content: document.getElementById('card-content').value,
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
      // console.log(cards)
      container.innerHTML = buttonTemplate();
    }
  })
})




