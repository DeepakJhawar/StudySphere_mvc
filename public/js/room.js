let messagesContainer = document.getElementById("messages");
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById("members_container");
const memberButton = document.getElementById("members_button");

const chatContainer = document.getElementById("messages_container");
const chatButton = document.getElementById("chat_button");

let activeMemberContainer = false;

memberButton.addEventListener("click", () => {
  if (activeMemberContainer) {
    memberContainer.style.display = "none";
  } else {
    memberContainer.style.display = "block";
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener("click", () => {
  if (activeChatContainer) {
    chatContainer.style.display = "none";
  } else {
    chatContainer.style.display = "block";
  }

  activeChatContainer = !activeChatContainer;
});

let displayFrame = document.getElementById("stream_box");
let videoFrames = document.getElementsByClassName("video_container");
let userIdInDisplayFrame = null;

let expandVideoFrame = (event) => {
  let child = displayFrame.children[0];
  if (child) {
    document.getElementById("streams_container").appendChild(child);
  }

  displayFrame.style.display = "block";
  displayFrame.appendChild(event.currentTarget);
  userIdInDisplayFrame = event.currentTarget.id;

  for (let i = 0; i < videoFrames.length; i++) {
    if (videoFrames[i].id != userIdInDisplayFrame) {
      videoFrames[i].style.height = "100px";
      videoFrames[i].style.width = "100px";
    }
  }
};

for (let i = 0; i < videoFrames.length; i++) {
  videoFrames[i].addEventListener("click", expandVideoFrame);
}

let hideDisplayFrame = () => {
  userIdInDisplayFrame = null;
  displayFrame.style.display = null;
  let child = displayFrame.children[0];
  document.getElementById("streams_container").appendChild(child);
  for (let i = 0; i < videoFrames.length; i++) {
    videoFrames[i].style.height = "300px";
    videoFrames[i].style.width = "300px";
  }
};

displayFrame.addEventListener('click', hideDisplayFrame);