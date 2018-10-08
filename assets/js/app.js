const button = document.getElementById("sendComment");
const txtarea = document.getElementById("txtarea");
const btnRemove = document.getElementById("remove")
const comments = document.getElementById("areaPrintComment");

const saveMessages = (messages) => {
  localStorage.setItem("messages", JSON.stringify(messages));
}

const readMessage = () => {
  return JSON.parse(localStorage.getItem("messages"));
}

const removeMessage = (i) => {
  let messages = readMessage();
  messages.splice(i, 1);
  saveMessages(messages);
  drawMessage();
}

const drawMessage = () => {
  const messages = readMessage();
  comments.innerHTML = "";
  messages.forEach((message, i) => {
    comments.innerHTML += /*html*/`
    <div class="card">
    <div class="card-body">
    <div class="row">
      <p class="card-text col-9">${message}</p>
      <a href="#" class="btn btn-primary float-right col-3" onclick="removeMessage(${i})" >Eliminar</a>
    </div>
    </div>
  </div>`;
  });
}

button.addEventListener("click", () => {
  let comment = txtarea.value;
  txtarea.value = "";
  let messages = readMessage();
  messages.push(comment);
  saveMessages(messages);
  drawMessage();
});

window.onload = () => {
  if (!readMessage()) {
    saveMessages([]);
  }
  drawMessage();
}