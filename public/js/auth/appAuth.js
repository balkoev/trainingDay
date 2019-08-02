document.addEventListener("DOMContentLoaded", function (e) {
  let sendBtn = document.getElementById('send-sms');
  let confirmBtn = document.getElementById('confirm-sms');

  sendBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    let mobile = document.getElementById('icon_telephone').value;
    const resp = await fetch('/auth/send-sms', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobile
      })
    })
    let deleteElem = document.querySelector('.mobile').remove();
    let addElem = document.querySelector('.sms').style = "visibility: visible"
  })

  confirmBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    let smsCode = document.getElementById('icon_telephone').value;
    const resp = await fetch('/auth/confirm-sms', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        smsCode
      })
    })
    let data = await resp.json();
    if (data.smsCode) {
      window.location = '/user'
    } else {
      console.log('error')
    }
  })
});