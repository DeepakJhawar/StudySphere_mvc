document.addEventListener("DOMContentLoaded", function () {
    const editProfileForm = document.getElementById("editProfileForm");
  
    editProfileForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      var occupation = document.getElementById("occupation").value;
      var phnumber = document.getElementById("phnumber").value;
      var address = document.getElementById("address").value;
  
      fetch("/UpdateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          occupation: occupation,
          phnumber: phnumber,
          address: address,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Data updated successfully");
          window.location.href = "/profile"; 
        })
        .catch((error) => console.error("Error:", error));
    });
  });
  