let form = document.getElementById('lobby_form');
let displayName = sessionStorage.getItem('display_name');
if (displayName) {
    form.name.value = displayName;
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    sessionStorage.setItem('display_name', e.target.name.value);
    let inviteCode = e.target.room.value;
    if (!inviteCode) {
        inviteCode = String(Math.floor(Math.random() * 10000));
    }
    fetch('/lobby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: e.target.name.value, room: inviteCode })
    })
    .then(response => {
        if (response.ok) {
            window.location = `/room?room=${inviteCode}`;
        } else {
            console.error('Failed to create or join room.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
