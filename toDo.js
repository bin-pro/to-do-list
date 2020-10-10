const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos", CHECK_LS = "checked";
let toDos = [], checkedList = [];

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

function saveChecked(){
  localStorage.setItem(CHECK_LS, JSON.stringify(checkedList))
}
function doneToDo(event){
  const btn = event.target;  
  btn.classList.toggle("none");
  console.log(btn);
  for(let i = 0; i<checkedList.length; i++){
    if(checkedList[i]===1){
      const checkIcon = document.querySelector(`.id${i + 1}`);
      checkIcon.classList.remove("none");
    }
  }
}

function paintChecked(){
  for(let i = 0; i<checkedList.length; i++){
    if(checkedList[i]===1){
      const checkIcon = document.querySelector(`.id${i + 1}`);
      checkIcon.classList.remove("none");
    }
  }
}

function paintToDo(text) {
  const li = document.createElement("li");
  const checkBox = document.createElement("i");
  const checkIcon = document.createElement("i");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  const checkId = newId;

  checkBox.classList.add("far");
  checkBox.classList.add("fa-square");
  checkIcon.classList.add("fas");
  checkIcon.classList.add("fa-check");
  checkIcon.classList.add("none");
  checkIcon.classList.add(`id${checkId}`);




  delBtn.innerHTML = "X";
  span.innerText = text;

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
  };
  toDos.push(toDosObj);
  saveToDos(toDos);

  checkedList.push(0);
  saveChecked(checkedList);
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
