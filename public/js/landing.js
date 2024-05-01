var buttons = document.getElementsByClassName('btn');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        window.location.href = "http://localhost:5000/login";
    };
}

document.getElementById('forms').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = {
    name: document.getElementById("helpName").value,
    email: document.getElementById("helpEmail").value,
    message: document.getElementById("helpMessage").value
  };
  console.log(data);
  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      alert('Message sent successfully!');
    } else {
      alert('Failed to send message. Please try again later.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }
});

const myForm = document.querySelector('form[name="responses"]');
myForm.addEventListener("submit", function(event) {
  event.preventDefault();
 myForm.reset();
});