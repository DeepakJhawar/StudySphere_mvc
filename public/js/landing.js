const scriptURL =
  "https://script.google.com/macros/s/AKfycbyaxBxkWaWhg20LyiMQKLuEPm-CW2EV3Gz6__7U4SkplFsu5YVNlOv8bzyZ_s7c5Q5x/exec";
const form = document.forms["responses"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});

var buttons = document.getElementsByClassName('btn');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        window.location.href = "http://localhost:5000/login";
    };
}

const myForm = document.querySelector('form[name="responses"]');
myForm.addEventListener("submit", function(event) {
  event.preventDefault();
 myForm.reset();
});