const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";
let checked = true, toDos = [];

function handleSubmit() {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function doneToDo(event){
  const btn = event.target;
  console.log(btn);

 // toDos[btn.getElemen].checked = true;
  
  btn.classList.toggle("none");
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const checkBox = document.createElement("i");
  const checkIcon = document.createElement("i");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  const checked = false;
  const iconId = newId;

  checkBox.classList.add("far");
  checkBox.classList.add("fa-square");
  checkIcon.classList.add("fas");
  checkIcon.classList.add("fa-check");
  checkIcon.id = iconId;

  console.log(JSON.parse(localStorage.getItem("toDos"))[toDos.length].checked );
  delBtn.innerHTML = "X";
  span.innerText = text;
  
  if(JSON.parse(localStorage.getItem("toDos"))[toDos.length].checked === true){
    checkIcon.classList.remove("none");
  }else{
    checkIcon.classList.add("none");
  }
  
  li.appendChild(checkBox);
  li.appendChild(checkIcon);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  
  checkIcon.addEventListener("click", doneToDo);
  delBtn.addEventListener("click", deleteToDo);
  const toDosObj = {
    text: text,
    id: newId,
    checked: checked,
  };
  toDos.push(toDosObj);
  saveToDos(toDos);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);

}

init();
