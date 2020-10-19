const form = document.querySelector(".js-form"),
  welcome = form.querySelector(".js-welcome"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function handleSubmit() {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName() {
  form.classList.add(SHOWING_CN);
  welcome.innerText = "Hello, What's your name?";
  form.addEventListener("submit", handleSubmit);
}

function getAppropriateGreeting() {
  const date = new Date();
  const hours = date.getHours();
  let appropriateGreeting = "";

  appropriateGreeting =
    6 <= hours && hours < 12
      ? "Good morning"
      : 12 <= hours && hours < 18
      ? "Good afternoon"
      : "Good evening";

  return appropriateGreeting;
}

function paintGreeting(text) {
  const toDoForm = document.querySelector(".js-toDoForm");
  form.classList.remove(SHOWING_CN);
  clockContainer.classList.add(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  toDoForm.classList.add(SHOWING_CN);
  greeting.innerText = `${getAppropriateGreeting()}, ${text}.`;
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    const checkedList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    localStorage.setItem("checked", JSON.stringify(checkedList));
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();

  const fiveMinutes = 1000*60*5;
  setInterval(loadName, fiveMinutes); // for changing way of greeting
}
init();
