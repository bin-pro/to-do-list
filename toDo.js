const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos", CHECK_LS = "checked";
let toDos = [], checkedList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let count = 0;

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
    for(let i = parseInt(li.id)-1; i<=toDos.length-1; i++){
      toDos[i].id = i + 1;    
    }
    saveToDos();

    if(document.getElementById(`${parseInt(li.id) + 1}`) !== null){
    for(let i = parseInt(li.id) + 1; i<=toDos.length + 1; i++){
        list = document.getElementById(`${i}`);
        if(list.id !== null){
          list.id = i - 1;
          console.log(list);
        }
      }
    } // for changing id of list
    getRealCheckedList();
    
    console.log(li.id-1);
     checkedList.splice(li.id-1 , 1); // delete element on li.id-1
     checkedList.push(0); // add element at tip of array
     saveChecked();
}

function getRealCheckedList(){
  const newCheckedList = localStorage.getItem(CHECK_LS);
  const nCL = newCheckedList.split(',');
  for(let i = 0; i < nCL.length; i++){
    if(nCL[i] === "[0"){
      nCL[i] = "0";
    }
    else if(nCL[i] === "0]"){
      nCL[i] = "0";
    }
    else if(nCL[i] === "[1"){
      nCL[i] = "1";
    }
    else if(nCL[i] === "1]"){
      nCL[i] = "1";
    }
  }
  for(let i = 0; i < checkedList.length; i++){
    checkedList[i] = parseInt(nCL[i]);
  }
  return checkedList;
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
  const li = btn.parentNode;
  const newCheckedList = localStorage.getItem(CHECK_LS);
  const nCL = newCheckedList.split(',');
  for(let i = 0; i < nCL.length; i++){
    if(nCL[i] === "[0"){
      nCL[i] = "0";
    }
    else if(nCL[i] === "0]"){
      nCL[i] = "0";
    }
    else if(nCL[i] === "[1"){
      nCL[i] = "1";
    }
    else if(nCL[i] === "1]"){
      nCL[i] = "1";
    }
  }
  
  if(nCL[li.id - 1] === "0"){
    nCL[li.id - 1] = "1";
  }
  else if(nCL[li.id - 1] === "1"){
    nCL[li.id - 1] = "0";
  }
  for(let i = 0; i < checkedList.length; i++){
    checkedList[i] = parseInt(nCL[i]);
  }
  saveChecked();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const checkBox = document.createElement("i");
  const checkIcon = document.createElement("i");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;

  checkBox.classList.add("far");
  checkBox.classList.add("fa-square");
  checkIcon.classList.add("fas");
  checkIcon.classList.add("fa-check");
  checkIcon.classList.add("none");

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

  if(parseInt(localStorage.getItem(CHECK_LS)[newId * 2 - 1]) === 1){
    checkIcon.classList.remove("none");   
  }
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
