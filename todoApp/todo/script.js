let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let data = [];

//RESET FORM
const resetForm = () => {
    textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}

//EDIT TASK
const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
    
    
    }
    //DELETE TASK
    const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1)
    localStorage.setItem("data", JSON.stringify(data));

    
    }

//createTask
const createTask = () =>{
    tasks.innerHTML = '';
    data.map((item,index) => {
        return (tasks.innerHTML += `
        <div id=${item}>
              <span class="fw-bold">${item.text}</span>
              <span class="small text-secondary">${item.date}</span>
              <p>${item.description}</p>
      
              <span class="options">
                <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>
              </span>
            </div>
        `);
    })
    resetForm();
}

//function that accept Data;
const acceptData = () =>{
    msg.innerHTML = ''
    data.push({
        text:textInput.value,
        date: dateInput.value,
        description:textarea.value
    },
    )
    localStorage.setItem('data',JSON.stringify(data));
    createTask();
}



//IIFE
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
  })();


function showError(err)
{
 msg.classList.add('red');
msg.innerHTML = err;
}

function formValidation ()
{
if(textInput.value === '')
{
     showError("Task cannot be blank")
}
else
{
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  
}
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})


