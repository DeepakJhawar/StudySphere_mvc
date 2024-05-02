let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

document.addEventListener("DOMContentLoaded", () => {
  let toggle = document.querySelector(".toggle-btn");
  console.log(toggle);
  let navigation = document.querySelector(".navigation");
  let main = document.querySelector(".main");
  toggle.addEventListener("click", () => {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var logoutButton = document.getElementById("logoutBtn");
  var logoutModal = document.getElementById("logoutModal");
  var confirmLogoutBtn = document.getElementById("confirmLogout");
  var cancelLogoutBtn = document.getElementById("cancelLogout");
  var closeBtn = document.querySelector(".close");

  logoutButton.addEventListener("click", () => {
    logoutModal.style.display = "block";
  });

  confirmLogoutBtn.addEventListener("click", () => {
    window.location.href = "/logout";
  });

  cancelLogoutBtn.addEventListener("click", () => {
    logoutModal.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    logoutModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == logoutModal) {
      logoutModal.style.display = "none";
    }
  });
});

const joinRoom = document.getElementById("join-room");
joinRoom.addEventListener("click", function () {
  window.location.href = "/lobby";
});
