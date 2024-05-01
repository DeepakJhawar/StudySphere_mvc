document.addEventListener("DOMContentLoaded", function () {
    const editProfileForm = document.getElementById("editProfileForm");

    editProfileForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form values
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;

        // Send data to backend
        fetch("/UpdateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, email: email })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle response from backend
                alert(data.message);
            })
            .catch(error => console.error("Error:", error));
    });
});